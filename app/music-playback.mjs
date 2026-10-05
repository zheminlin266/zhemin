export function createMusicPlayback(audio, onStatusChange, interactionTarget) {
  let disposed = false;
  let attempt = 0;
  let status = "paused";

  function update(nextStatus) {
    if (disposed) return;
    status = nextStatus;
    onStatusChange(nextStatus);
  }

  function removeInteractionListeners() {
    interactionTarget.removeEventListener("pointerdown", resume);
    interactionTarget.removeEventListener("keydown", resume);
  }

  function resume(event) {
    if (event.type === "keydown" && (event.isComposing || ["Tab", "Shift", "Control", "Alt", "Meta", "Escape"].includes(event.key))) return;
    void play();
  }

  async function play() {
    if (disposed) return;
    removeInteractionListeners();
    if (audio.error) audio.load();
    const currentAttempt = ++attempt;
    update("loading");
    try {
      await audio.play();
    } catch (error) {
      // A cancelled request must not overwrite a newer play/pause decision.
      if (disposed || currentAttempt !== attempt) return;
      if (error.name === "NotAllowedError") {
        update("blocked");
        interactionTarget.addEventListener("pointerdown", resume);
        interactionTarget.addEventListener("keydown", resume);
      } else if (error.name === "AbortError") {
        if (audio.paused) update("paused");
      } else {
        update("error");
      }
    }
  }

  const listeners = {
    playing: () => { removeInteractionListeners(); update("playing"); },
    pause: () => { if (status !== "error") update("paused"); },
    waiting: () => { if (!audio.paused) update("loading"); },
    ended: () => update("paused"),
    error: () => { ++attempt; removeInteractionListeners(); update("error"); },
  };
  for (const [event, listener] of Object.entries(listeners)) {
    audio.addEventListener(event, listener);
  }

  return {
    play,
    toggle() {
      if (disposed) return;
      if (!audio.paused || status === "loading") {
        ++attempt;
        removeInteractionListeners();
        audio.pause();
        update("paused");
      } else {
        void play();
      }
    },
    dispose() {
      disposed = true;
      ++attempt;
      removeInteractionListeners();
      for (const [event, listener] of Object.entries(listeners)) {
        audio.removeEventListener(event, listener);
      }
      audio.pause();
    },
  };
}
