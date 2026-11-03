"use client";

import {
  Button,
  ChatActions,
  ChatAttach,
  ChatComposer,
  ChatDiff,
  ChatMedia,
  ChatMessage,
  ChatSuggest,
  ChatThinking,
  ChatToolCall,
  CodeBlock,
  Icon,
  type ChatContextItem,
  type ChatModelOption,
  type ChatSuggestItem,
  type ChatToolStatus,
} from "@hogoshi/ui";
import { ArrowTurnForwardIcon, Copy01Icon, File01Icon } from "@hugeicons-pro/core-stroke-rounded";
import { useEffect, useState, type KeyboardEvent } from "react";
import { defineStory } from "../define-story";
import { jsx } from "../story-code";

const options = (values: string[]) => values.map((value) => ({ value, label: value }));

const photo = (at: number) => {
  const file = `mark-${(at % 6) + 1}.png`;
  return { src: `/photos/${file}`, alt: `Mark ${at + 1}`, name: file };
};

const DIFF = `@@ -12,7 +12,9 @@ export class HudController implements OnStart {
  onStart() {
-    this.hud.render({});
+    this.hud.render({
+      kills: this.kills.count(),
+    });
  }
}`;

const SNIPPET = `export class HudController implements OnStart {
  private readonly kills = Flamework.resolve<KillsService>();

  public onStart(): void {
    this.hud.render({ kills: this.kills.count(), health: this.health.current() });
  }
}`;

function ChatThread({
  toolStatus,
  attention,
  streaming,
  images,
}: {
  toolStatus: ChatToolStatus;
  attention: boolean;
  streaming: boolean;
  images: number;
}) {
  return (
    <div className="flex w-full max-w-lg min-w-0 flex-col gap-4">
      <ChatMessage role="user" attachments={[photo(1), photo(2)]}>
        Add a kill counter to the player HUD.
      </ChatMessage>
      <ChatMessage
        role="assistant"
        streaming={streaming}
        actions={
          <ChatActions>
            <Button size="icon-sm" variant="ghost" aria-label="Copy">
              <Icon icon={Copy01Icon} variant="stroke" />
            </Button>
            <Button size="icon-sm" variant="ghost" aria-label="Retry">
              <Icon icon={ArrowTurnForwardIcon} variant="stroke" />
            </Button>
          </ChatActions>
        }
      >
        <div className="flex w-full min-w-0 flex-col gap-3">
          <ChatThinking
            status="Reading the HUD controller"
            state={attention ? "attention" : "working"}
            reasoning={
              <>
                The HUD renders inside HudController. A kill counter needs the Kills service total and a label that
                refreshes on the Killed event.
              </>
            }
          />
          <ChatToolCall status={toolStatus} label="Edited HudController.ts" meta="src/client/controllers" defaultOpen>
            <ChatDiff diff={DIFF} />
          </ChatToolCall>
          <ChatMedia images={Array.from({ length: images }, (_, at) => photo(at))} />
          <p>
            The counter subscribes to <code>Kills</code> and renders beside the health bar. Hover the turn for actions.
          </p>
          <CodeBlock code={SNIPPET} language="typescript" scroll />
        </div>
      </ChatMessage>
    </div>
  );
}

const FILES = [
  "src/client/controllers/HudController.ts",
  "src/client/components/KillCounter.ts",
  "src/server/services/KillsService.ts",
  "src/shared/types.ts",
];

const MODELS: ChatModelOption[] = [
  { id: "sonnet", label: "Claude 3.5 Sonnet" },
  { id: "gpt4o", label: "GPT-4o", hint: "Fast" },
  { id: "o1mini", label: "o1-mini", hint: "Thinking" },
];

const IMAGE_EXT = /\.(png|jpe?g|gif|webp|svg|avif)$/i;

function ComposerDemo() {
  const [value, setValue] = useState("");
  const [busy, setBusy] = useState(false);
  const [active, setActive] = useState(0);
  const [dismissed, setDismissed] = useState(false);
  const [model, setModel] = useState(MODELS[0]);
  const [context, setContext] = useState<ChatContextItem[]>([
    { id: "preview", label: "hud-preview.png", src: "/photos/mark-2.png" },
  ]);

  const token = /@([\w/.-]*)$/.exec(value)?.[1];
  const open = token !== undefined && !dismissed;
  const items: ChatSuggestItem[] = open
    ? FILES.filter((file) => file.toLowerCase().includes(token!.toLowerCase())).map((file) => ({
        id: file,
        label: file,
        icon: File01Icon,
        hint: "Add to context",
        group: "Files",
      }))
    : [];

  useEffect(() => {
    setActive(0);
    setDismissed(false);
  }, [token]);

  const insert = (file: string) => setValue((current) => `${current.replace(/@[\w/.-]*$/, "")}@${file} `);

  const submit = () => {
    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      setValue("");
    }, 1600);
  };

  const upload = (files: File[]) => {
    setContext((current) => [
      ...current,
      ...files.map((file) => ({
        id: `${file.name}-${current.length}`,
        label: file.name,
        src: IMAGE_EXT.test(file.name) ? URL.createObjectURL(file) : undefined,
      })),
    ]);
  };

  const remove = (id: string) => setContext((current) => current.filter((item) => item.id !== id));

  const handleKeys = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!open || items.length === 0) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((active + 1) % items.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((active - 1 + items.length) % items.length);
    } else if (event.key === "Enter") {
      event.preventDefault();
      insert(items[active].id);
    } else if (event.key === "Escape") {
      event.preventDefault();
      setDismissed(true);
    }
  };

  return (
    <div className="relative w-full max-w-lg">
      <div className="absolute bottom-full left-0 mb-2 w-[min(24rem,100%)]">
        <ChatSuggest
          open={open && items.length > 0}
          items={items}
          activeIndex={active}
          onActiveIndexChange={setActive}
          onSelect={(item) => insert(item.id)}
        />
      </div>
      <ChatComposer
        value={value}
        onValueChange={setValue}
        onSubmit={submit}
        onStop={() => setBusy(false)}
        onKeyDown={handleKeys}
        busy={busy}
        placeholder="Ask anything, @ to attach files"
        context={context}
        onRemoveContext={remove}
        model={model}
        models={MODELS}
        onModelChange={(id) => setModel(MODELS.find((option) => option.id === id) ?? model)}
        actions={
          <ChatAttach
            items={FILES.map((file) => ({ id: file, label: file, icon: File01Icon }))}
            onInsert={insert}
            onUpload={upload}
          />
        }
      />
    </div>
  );
}

export const chatStory = defineStory({
  slug: "chat",
  title: "Chat",
  category: "Chat",
  component: "ChatMessage",
  description:
    "Agent turn with attachments, shimmering thinking, a collapsible tool call, a diff, media, and hover actions.",
  controls: {
    toolStatus: { type: "select", label: "tool status", default: "success", options: options(["running", "success", "error", "attention"]) },
    thinkingState: { type: "select", label: "thinking", default: "working", options: options(["working", "attention"]) },
    streaming: { type: "boolean", label: "streaming", default: false },
    images: { type: "number", label: "images", min: 1, max: 4, step: 1, default: 1 },
  },
  render: (props) => (
    <ChatThread
      toolStatus={String(props.toolStatus) as ChatToolStatus}
      attention={String(props.thinkingState) === "attention"}
      streaming={Boolean(props.streaming)}
      images={Number(props.images)}
    />
  ),
  code: () =>
    [
      jsx("ChatMessage", ['role="user"', "attachments={[hudShot, killsShot]}"], "Add a kill counter to the player HUD."),
      jsx(
        "ChatMessage",
        ['role="assistant"', "streaming", "actions={turnActions}"],
        [
          jsx("ChatThinking", ['status="Reading the HUD controller"', 'state="working"', "reasoning={thinking}"]),
          jsx(
            "ChatToolCall",
            ['status="success"', 'label="Edited HudController.ts"', 'meta="src/client/controllers"', "defaultOpen"],
            jsx("ChatDiff", ["diff={DIFF}"]),
          ),
          jsx("ChatMedia", ["images={photos}"]),
          jsx("CodeBlock", ["code={snippet}", 'language="typescript"', "scroll"]),
        ].join("\n"),
      ),
    ].join("\n"),
});

export const composerStory = defineStory({
  slug: "chat-composer",
  title: "Chat composer",
  category: "Chat",
  component: "ChatComposer",
  description:
    "Prompt box with removable file and image chips, a model picker, an attach menu with project files and computer upload, and an @ file palette.",
  controls: {},
  render: () => <ComposerDemo />,
  code: () =>
    jsx(
      "ChatComposer",
      [
        "value={value}",
        "onValueChange={setValue}",
        "onSubmit={submit}",
        "onStop={stop}",
        "onKeyDown={paletteKeys}",
        "busy={busy}",
        'placeholder="Ask anything"',
        "context={context}",
        "onRemoveContext={remove}",
        "model={model}",
        "models={MODELS}",
        "onModelChange={setModel}",
      ],
      jsx(
        "ChatAttach",
        ["items={projectFiles}", "onInsert={insertMention}", "onUpload={addUploads}"],
      ),
    ),
});