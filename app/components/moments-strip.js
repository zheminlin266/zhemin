"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { momentPath } from "../content/moments.mjs";

export default function MomentsStrip({ collections, language }) {
  const [selected, setSelected] = useState(collections[0].slug);
  const drag = useRef(null);
  const strip = useRef(null);
  const current = collections.find((collection) => collection.slug === selected);

  function onPointerDown(event) {
    drag.current = null;
    if (event.pointerType !== "mouse" || event.button !== 0) return;
    drag.current = { id: event.pointerId, x: event.clientX, scrollLeft: event.currentTarget.scrollLeft, moved: false };
  }

  function onPointerMove(event) {
    const gesture = drag.current;
    if (!gesture || gesture.id !== event.pointerId || !(event.buttons & 1)) return;
    if (!gesture.moved && Math.abs(event.clientX - gesture.x) < 6) return;
    if (!gesture.moved) {
      gesture.moved = true;
      event.currentTarget.setPointerCapture(event.pointerId);
    }
    event.currentTarget.scrollLeft = gesture.scrollLeft - (event.clientX - gesture.x);
  }

  function onPointerEnd(event) {
    if (drag.current?.id === event.pointerId && event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  }

  return (
    <>
      <div className="moment-labels" role="group" aria-label={language === "cn" ? "选择相册" : "Choose an album"}>
        {collections.map((collection) => (
          <button
            key={collection.slug}
            type="button"
            className="moment-label"
            aria-pressed={selected === collection.slug}
            onClick={() => { setSelected(collection.slug); strip.current?.scrollTo({ left: 0 }); drag.current = null; }}
          >
            {collection.label[language]}
          </button>
        ))}
      </div>
      <div
        ref={strip}
        className="moment-strip"
        role="region"
        aria-label={language === "cn" ? `${current.label.cn}照片，横向滚动` : `${current.label.en} photos, scroll horizontally`}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerEnd}
        onPointerCancel={(event) => { onPointerEnd(event); drag.current = null; }}
        onClickCapture={(event) => {
          if (drag.current?.moved && event.detail > 0) {
            event.preventDefault();
            event.stopPropagation();
            drag.current = null;
          }
        }}
      >
        {current.photos.map((photo) => (
          <Link key={photo.id} className="moment-photo-link" href={`${momentPath(current.slug, language)}#${photo.id}`} prefetch={false} aria-label={`${photo.alt[language]}，${language === "cn" ? "查看相册" : "view album"}`}>
            <Image src={photo.thumb} alt={photo.alt[language]} width={photo.thumbWidth} height={photo.thumbHeight} unoptimized loading="lazy" draggable={false} />
          </Link>
        ))}
      </div>
    </>
  );
}
