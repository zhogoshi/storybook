"use client";

import { FileList, FileUpload, FileUploadDropzone, Image, ImageGallery, VideoPlayer } from "@hogoshi/ui";
import { defineStory } from "../define-story";
import { jsx } from "../story-code";

const options = (values: string[]) => values.map((value) => ({ value, label: value }));

const photo = (at: number) => ({
  src: `https://picsum.photos/id/${[10, 11, 15, 16, 17, 20, 24, 27, 28, 29, 36, 37][at % 12]}/1600/1067`,
  alt: `Photo ${at + 1}`,
  name: `photo-${at + 1}.jpg`,
});

const BUNNY = "https://upload.wikimedia.org/wikipedia/commons/transcoded/c/c0/Big_Buck_Bunny_4K.webm/Big_Buck_Bunny_4K.webm";

const SOURCES = ["1080p", "720p", "480p"].map((label) => ({ label, src: `${BUNNY}.${label}.vp9.webm`, type: "video/webm" }));

const POSTER = "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Big_Buck_Bunny_4K.webm/1280px--Big_Buck_Bunny_4K.webm.jpg";

const ACCEPT: Record<string, string | undefined> = {
  any: undefined,
  images: "image/*",
  documents: ".pdf,.doc,.docx,.txt",
  "png, jpg": "image/png,image/jpeg",
};

export const fileUploadStory = defineStory({
  slug: "file-upload",
  title: "File upload",
  category: "Forms",
  component: "FileUpload",
  description:
    "Drop zone with format and size rules. With one file the preview fills the card. FileList renders the files as a column or as a row of tiles.",
  controls: {
    accept: { type: "select", label: "accept", default: "images", options: options(Object.keys(ACCEPT)) },
    list: { type: "select", label: "FileList variant", default: "col", options: options(["col", "row"]) },
    multiple: { type: "boolean", label: "multiple", default: true },
    maxSize: { type: "number", label: "maxSize (MB)", min: 1, max: 50, step: 1, default: 5 },
    maxFiles: { type: "number", label: "maxFiles", min: 1, max: 20, step: 1, default: 6 },
    disabled: { type: "boolean", label: "disabled", default: false },
  },
  render: (props) => {
    const single = !props.multiple || Number(props.maxFiles) === 1;
    return (
      <div className="w-full max-w-md">
        <FileUpload
          key={`${String(props.list)}-${single}`}
          accept={ACCEPT[String(props.accept)]}
          multiple={Boolean(props.multiple)}
          maxSize={Number(props.maxSize) * 1024 * 1024}
          maxFiles={Number(props.maxFiles)}
          disabled={Boolean(props.disabled)}
        >
          <FileUploadDropzone />
          {single ? null : <FileList variant={props.list as "col" | "row"} />}
        </FileUpload>
      </div>
    );
  },
  code: (props) =>
    jsx(
      "FileUpload",
      [
        ACCEPT[String(props.accept)] ? `accept="${ACCEPT[String(props.accept)]}"` : "",
        props.multiple ? "multiple" : "",
        `maxSize={${Number(props.maxSize)} * 1024 * 1024}`,
        props.multiple ? `maxFiles={${Number(props.maxFiles)}}` : "",
        props.disabled ? "disabled" : "",
      ].filter(Boolean),
      [jsx("FileUploadDropzone"), jsx("FileList", props.list === "row" ? ['variant="row"'] : [])].join("\n"),
    ),
});

export const imageStory = defineStory({
  slug: "image",
  title: "Image",
  category: "Media",
  component: "ImageGallery",
  description:
    "Opens fullscreen on click. Wheel, pinch or double click to zoom, drag to pan, arrows or swipe to switch, right click or the menu to download.",
  controls: {
    count: { type: "number", label: "images", min: 1, max: 12, step: 1, default: 6 },
  },
  render: (props) => {
    const count = Number(props.count);
    if (count === 1) {
      const image = photo(0);
      return <Image {...image} className="h-56 w-auto" />;
    }
    return <ImageGallery className="w-full max-w-2xl" images={Array.from({ length: count }, (_, at) => photo(at))} />;
  },
  code: (props) =>
    Number(props.count) === 1
      ? jsx("Image", ['src="/photo.jpg"', 'alt="Photo"'])
      : jsx("ImageGallery", [`images={photos.slice(0, ${Number(props.count)})}`]),
});

export const videoStory = defineStory({
  slug: "video",
  title: "Video player",
  category: "Media",
  component: "VideoPlayer",
  description:
    "Custom controls with buffered ranges, timeline preview, speed, quality, loop, mini player and fullscreen. Focus the player and press keys: Space, F, M, J, L, arrows, 0 to 9.",
  controls: {
    title: { type: "text", label: "title", default: "Big Buck Bunny" },
    preview: { type: "boolean", label: "preview", default: true },
    loop: { type: "boolean", label: "loop", default: false },
  },
  render: (props) => (
    <div className="w-full max-w-3xl">
      <VideoPlayer
        title={String(props.title) || undefined}
        poster={POSTER}
        sources={SOURCES}
        preview={Boolean(props.preview)}
        loop={Boolean(props.loop)}
      />
    </div>
  ),
  code: (props) =>
    jsx("VideoPlayer", [
      `title="${String(props.title)}"`,
      'sources={[{ src: "/video-1080.webm", label: "1080p" }, { src: "/video-720.webm", label: "720p" }]}',
      props.preview ? "" : "preview={false}",
      props.loop ? "loop" : "",
    ].filter(Boolean)),
});
