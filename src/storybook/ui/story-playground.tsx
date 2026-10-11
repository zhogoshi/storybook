"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { CodeBlock, Icon, Tabs, TabsList, TabsTrigger, Tooltip, TooltipContent, TooltipTrigger } from "@hogoshi/ui";
import { FullScreenIcon } from "@hugeicons-pro/core-solid-rounded";
import { AppleIcon, ComputerIcon, GridIcon, SmartPhone01Icon, Tablet01Icon } from "@hugeicons-pro/core-stroke-rounded";
import { DEVICE_PRESETS } from "../model/params";
import { PREVIEW_CHANGE, PREVIEW_MESSAGE, PREVIEW_READY } from "../model/preview-channel";
import type { IconStyle, StoryDefinition, StoryDevice, StoryProps, StoryTab } from "../model/types";
import { CollapseScreenIcon } from "./collapse-screen-icon";

const devices = [
  { id: "phone", icon: SmartPhone01Icon, label: "Phone" },
  { id: "tablet", icon: Tablet01Icon, label: "Tablet" },
  { id: "desktop", icon: ComputerIcon, label: "Desktop" },
] as const;

const iconStyles = [
  { id: "ios", icon: AppleIcon, label: "iOS" },
  { id: "basic", icon: GridIcon, label: "Basic" },
] as const;

function useNarrowScreen() {
  const [narrow, setNarrow] = useState(false);

  useLayoutEffect(() => {
    const query = window.matchMedia("(max-width: 1279px)");
    const update = () => setNarrow(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return narrow;
}

function DeviceFrame({
  device,
  src,
  props,
  icons,
  onPropChange,
}: {
  device: StoryDevice;
  src: string;
  props: StoryProps;
  icons: IconStyle;
  onPropChange: (key: string, value: unknown) => void;
}) {
  const preset = DEVICE_PRESETS[device];
  const box = useRef<HTMLDivElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLIFrameElement>(null);
  const [scale, setScale] = useState(1);
  const [full, setFull] = useState(false);

  useEffect(() => {
    const sync = () => setFull(document.fullscreenElement === root.current);
    document.addEventListener("fullscreenchange", sync);
    document.addEventListener("webkitfullscreenchange", sync);
    return () => {
      document.removeEventListener("fullscreenchange", sync);
      document.removeEventListener("webkitfullscreenchange", sync);
    };
  }, []);

  const toggleFull = () => {
    const node = root.current as (HTMLDivElement & { webkitRequestFullscreen?: () => void }) | null;
    if (!node) return;
    if (document.fullscreenElement) void document.exitFullscreen();
    else if (node.requestFullscreen) void node.requestFullscreen();
    else node.webkitRequestFullscreen?.();
  };

  useLayoutEffect(() => {
    const node = box.current;
    if (!node) return;
    const measure = () => {
      const available = node.clientWidth;
      if (!available) return;
      const byWidth = available / preset.width;
      const byHeight = window.innerWidth < 1280 ? (window.innerHeight * 0.62) / preset.height : byWidth;
      setScale(Math.min(1, byWidth, byHeight));
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [preset.width]);

  useEffect(() => {
    const send = () => frame.current?.contentWindow?.postMessage({ type: PREVIEW_MESSAGE, props, icons }, window.location.origin);
    const onMessage = (event: MessageEvent) => {
      if (event.origin !== window.location.origin) return;
      if (event.data?.type === PREVIEW_READY) send();
      if (event.data?.type === PREVIEW_CHANGE) onPropChange(event.data.key, event.data.value);
    };
    send();
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [icons, onPropChange, props]);

  return (
    <div ref={box} className="w-full min-w-0">
      <div
        ref={root}
        className={
          full
            ? "bg-bg relative h-full w-full max-w-none overflow-hidden"
            : "border-border bg-bg relative mx-auto max-w-full overflow-hidden rounded-[var(--radius-lg)] border shadow-[var(--shadow-md)]"
        }
        style={full ? undefined : { width: preset.width * scale, height: preset.height * scale }}
      >
        <iframe
          ref={frame}
          title={`${preset.label} preview`}
          src={src}
          className={full ? "size-full border-0" : "absolute top-0 left-0 origin-top-left border-0"}
          style={full ? undefined : { width: preset.width, height: preset.height, transform: `scale(${scale})` }}
        />
        <Tooltip>
          <TooltipTrigger
            delay={0}
            render={
              <button
                type="button"
                aria-label={full ? "Exit fullscreen" : "Fullscreen"}
                className="bg-bg-elevated/80 text-fg-muted hover:bg-bg-muted hover:text-fg absolute right-2 bottom-2 z-10 inline-flex size-7 items-center justify-center rounded-[var(--radius-sm)] backdrop-blur-md"
                onClick={toggleFull}
              />
            }
          >
            <Icon icon={full ? CollapseScreenIcon : FullScreenIcon} size={16} />
          </TooltipTrigger>
          <TooltipContent>{full ? "Exit fullscreen" : "Fullscreen"}</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}

export function StoryPlayground({
  story,
  props,
  tab,
  device,
  icons,
  onTabChange,
  onDeviceChange,
  onIconsChange,
  onPropChange,
}: {
  story: StoryDefinition;
  props: StoryProps;
  tab: StoryTab;
  device: StoryDevice;
  icons: IconStyle;
  onTabChange: (tab: StoryTab) => void;
  onDeviceChange: (device: StoryDevice) => void;
  onIconsChange: (icons: IconStyle) => void;
  onPropChange: (key: string, value: unknown) => void;
}) {
  const src = `/preview/${story.slug}`;
  const narrow = useNarrowScreen();
  const frameDevice = narrow ? "phone" : device;

  return (
    <div className="flex w-full min-w-0 flex-col gap-4 overflow-x-hidden">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Tabs value={tab} onValueChange={(value) => onTabChange(value as StoryTab)}>
          <TabsList>
            <TabsTrigger value="preview">Preview</TabsTrigger>
            <TabsTrigger value="code">Code</TabsTrigger>
          </TabsList>
        </Tabs>
        {tab === "preview" ? (
          <div className="flex items-center gap-2">
            <Tabs value={icons} onValueChange={(value) => onIconsChange(value as IconStyle)}>
              <TabsList>
                {iconStyles.map((item) => (
                  <TabsTrigger key={item.id} value={item.id} aria-label={item.label} className="px-2">
                    <Icon icon={item.icon} variant="stroke" size={16} />
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            {narrow ? null : (
              <Tabs value={device} onValueChange={(value) => onDeviceChange(value as StoryDevice)}>
                <TabsList>
                  {devices.map((item) => (
                    <TabsTrigger key={item.id} value={item.id} aria-label={item.label} className="px-2">
                      <Icon icon={item.icon} variant="stroke" size={16} />
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            )}
          </div>
        ) : null}
      </div>
      {tab === "code" ? (
        <CodeBlock code={story.code(props)} language="tsx" />
      ) : (
        <DeviceFrame device={frameDevice} src={src} props={props} icons={icons} onPropChange={onPropChange} />
      )}
    </div>
  );
}
