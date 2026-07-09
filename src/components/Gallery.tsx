import { TypewriterHeading } from "./TypewriterHeading";
import { PixelDecor } from "./PixelDecor";
import { galleryPosts } from "../data/gallery";

export function Gallery() {
  return (
    <section
      id="gallery"
      aria-labelledby="gallery-heading"
      className="bg-[var(--color-bg)] py-10 md:py-14 px-6 md:px-10 border-t-4 border-[var(--color-ink)]"
    >
      <div className="mx-auto max-w-[1400px]">
        <div className="reveal mb-6 md:mb-8">
          <p className="text-xs tracking-[0.2em] text-[var(--color-accent)] mb-2 font-[family-name:var(--font-pixel)] flex items-center gap-2">
            03
            <PixelDecor kind="note" color="var(--color-corgi)" className="w-3.5 h-3.5" />
          </p>
          <TypewriterHeading
            id="gallery-heading"
            text="GALLERY"
            className="font-[family-name:var(--font-title)] text-lg md:text-2xl text-[var(--color-ink)] leading-relaxed"
          />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {galleryPosts.map((post) => (
            <article
              key={post.id}
              className="reveal pixel-border bg-[var(--color-bg-alt)] flex flex-col"
            >
              {post.type === "photo" && post.image && (
                <div className="border-b-4 border-[var(--color-ink)] bg-black aspect-square overflow-hidden">
                  <img
                    src={post.image}
                    alt=""
                    className="w-full h-full object-cover"
                    style={{ imageRendering: "pixelated" }}
                  />
                </div>
              )}
              <div className="p-4 flex flex-col gap-2">
                <p className="text-[10px] tracking-[0.2em] text-[var(--color-accent)] font-[family-name:var(--font-pixel)]">
                  {post.date}
                </p>
                <p className="text-xs md:text-sm leading-relaxed text-[var(--color-ink)]">
                  {post.caption}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
