"use client";

import { useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { PauseIcon, PlayIcon } from "@/components/ui/icons";

/**
 * Asphalt page — inline field video (client asset Video 1, crack sealing;
 * Video 2, hot-mix preparation). Supporting proof, not decoration: muted
 * by default, plays inline, loops, lazy (preload="metadata"), poster
 * paints instantly. Reduced-motion users get the poster with a play
 * control instead of autoplay — playback is always a choice.
 */
export function AsphaltFieldVideo({
  src = "/videos/asphalt-crack-sealing.mp4",
  poster = "/videos/asphalt-crack-sealing-poster.jpg",
  caption = "Crack sealing in the field — real Terravian operations footage.",
  ariaLabel = "Terravian field video: a wheeled crack-sealing applicator filling pavement cracks on a commercial lot",
  aspectClass = "aspect-[9/16]",
  label = "crack-sealing field video",
}: {
  src?: string;
  poster?: string;
  caption?: string;
  ariaLabel?: string;
  aspectClass?: string;
  label?: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const reducedMotion = useReducedMotion();
  const [playing, setPlaying] = useState(false);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      void v.play();
      setPlaying(true);
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  return (
    <figure>
      <div className="relative">
        <video
          ref={videoRef}
          src={src}
          poster={poster}
          autoPlay={!reducedMotion}
          muted
          loop
          playsInline
          controls={false}
          preload="metadata"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          className={`${aspectClass} w-full object-cover`}
          aria-label={ariaLabel}
        />
        <button
          type="button"
          onClick={toggle}
          aria-label={playing ? `Pause ${label}` : `Play ${label}`}
          aria-pressed={playing}
          className="focus-on-dark absolute bottom-3 right-3 flex h-11 w-11 items-center justify-center bg-charcoal/85 text-cream transition-colors duration-fast hover:bg-charcoal"
        >
          {playing ? <PauseIcon size={18} /> : <PlayIcon size={18} />}
        </button>
      </div>
      <figcaption className="mt-2 text-sm text-charcoal/60">
        {caption}
      </figcaption>
    </figure>
  );
}
