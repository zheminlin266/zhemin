"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createMusicPlayback } from "../music-playback.mjs";

export default function CloudMusic({ language }) {
  const [expanded, setExpanded] = useState(false);
  const [status, setStatus] = useState("loading");
  const audioRef = useRef(null);
  const playbackRef = useRef(null);
  const rootRef = useRef(null);
  const toggleRef = useRef(null);
  const panelRef = useRef(null);
  const panelId = useId();
  const labels = language === "cn"
    ? { music: "背景音乐", details: "歌曲信息", play: "播放音乐", pause: "暂停音乐", retry: "重试播放", loading: "加载中…", paused: "已暂停", blocked: "点击播放", error: "播放失败，请重试" }
    : { music: "Background music", details: "Song details", play: "Play music", pause: "Pause music", retry: "Retry playback", loading: "Loading…", paused: "Paused", blocked: "Click to play", error: "Unable to play; try again" };
  const active = status === "playing" || status === "loading";
  const statusText = labels[status] ?? "";

  useEffect(() => {
    const playback = createMusicPlayback(audioRef.current, setStatus, document);
    playbackRef.current = playback;
    void playback.play();
    return () => {
      playbackRef.current = null;
      playback.dispose();
    };
  }, []);

  useEffect(() => {
    if (!expanded) return;
    function closeOutside(event) {
      if (!rootRef.current?.contains(event.target)) setExpanded(false);
    }
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, [expanded]);

  function closePanel() {
    if (panelRef.current?.contains(document.activeElement)) {
      toggleRef.current?.focus({ preventScroll: true });
    }
    setExpanded(false);
  }

  return (
    <div
      ref={rootRef}
      className="cloud-music"
      data-expanded={expanded}
      data-playing={status === "playing"}
      role="group"
      aria-label={labels.music}
      lang={language === "cn" ? "zh-CN" : "en"}
      onPointerDown={(event) => event.stopPropagation()}
      onPointerLeave={(event) => { if (event.pointerType === "mouse") closePanel(); }}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setExpanded(false); }}
      onKeyDown={(event) => {
        event.stopPropagation();
        if (event.key === "Escape") closePanel();
      }}
    >
      <audio ref={audioRef} src="/music/hayd-head-in-the-clouds.mp3" preload="auto" loop hidden />
      <div ref={panelRef} className="cloud-music-panel" id={panelId} inert={!expanded} aria-hidden={!expanded}>
        <div className="cloud-music-panel-clip">
          <div className="cloud-music-panel-content">
            <div className="cloud-music-track">
              <p className="cloud-music-title">Head In The Clouds</p>
              <p className="cloud-music-artist">Hayd<span role="status" aria-live="polite">{statusText ? ` · ${statusText}` : ""}</span></p>
            </div>
            <button
              className="cloud-music-button"
              type="button"
              aria-label={active ? labels.pause : status === "error" ? labels.retry : labels.play}
              onClick={() => playbackRef.current?.toggle()}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true">
                {active ? <path d="M8 5v14M16 5v14" fill="none" stroke="currentColor" strokeWidth="3" /> : <path d="m8 4 12 8-12 8Z" fill="currentColor" />}
              </svg>
            </button>
          </div>
        </div>
      </div>
      <button
        ref={toggleRef}
        className="cloud-music-button cloud-music-toggle"
        type="button"
        aria-label={`${labels.details}: Head In The Clouds — Hayd`}
        aria-expanded={expanded}
        aria-controls={panelId}
        title={statusText || "Head In The Clouds — Hayd"}
        onClick={() => {
          if (expanded) closePanel();
          else {
            setExpanded(true);
            if (status === "blocked") void playbackRef.current?.play();
          }
        }}
      >
        <svg className="cloud-music-note" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M9 18V5l12-2v13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
          <ellipse cx="6" cy="18" rx="3.5" ry="2.5" fill="currentColor" transform="rotate(-20 6 18)" />
          <ellipse cx="18" cy="16" rx="3.5" ry="2.5" fill="currentColor" transform="rotate(-20 18 16)" />
        </svg>
      </button>
    </div>
  );
}
