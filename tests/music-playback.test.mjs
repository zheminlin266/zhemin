import assert from "node:assert/strict";
import { setImmediate } from "node:timers/promises";
import test from "node:test";
import { createMusicPlayback } from "../app/music-playback.mjs";

class TestAudio extends EventTarget {
  paused = true;
  error = null;
  playCalls = 0;
  loadCalls = 0;
  behaviors = [];

  play() {
    ++this.playCalls;
    const behavior = this.behaviors.shift();
    if (behavior) return behavior();
    this.paused = false;
    this.dispatchEvent(new Event("playing"));
    return Promise.resolve();
  }

  pause() {
    this.paused = true;
    this.dispatchEvent(new Event("pause"));
  }

  load() {
    ++this.loadCalls;
    this.error = null;
  }
}

function setup() {
  const audio = new TestAudio();
  const interactions = new EventTarget();
  const states = [];
  const playback = createMusicPlayback(audio, (state) => states.push(state), interactions);
  return { audio, interactions, states, playback };
}

test("music reflects actual playback and buffering, with pause/resume controls", async () => {
  const { audio, states, playback } = setup();
  await playback.play();
  assert.equal(states.at(-1), "playing");
  audio.dispatchEvent(new Event("waiting"));
  assert.equal(states.at(-1), "loading");
  audio.dispatchEvent(new Event("playing"));
  assert.equal(states.at(-1), "playing");
  playback.toggle();
  assert.equal(audio.paused, true);
  assert.equal(states.at(-1), "paused");
  playback.toggle();
  await setImmediate();
  assert.equal(audio.paused, false);
  assert.equal(states.at(-1), "playing");
  playback.dispose();
});

test("blocked autoplay retries on user input, ignores focus navigation, and never undoes a pause", async () => {
  const { audio, interactions, states, playback } = setup();
  audio.behaviors.push(() => Promise.reject(new DOMException("User input required", "NotAllowedError")));
  await playback.play();
  assert.equal(states.at(-1), "blocked");
  interactions.dispatchEvent(Object.assign(new Event("keydown"), { key: "Tab" }));
  assert.equal(audio.playCalls, 1);
  interactions.dispatchEvent(new Event("pointerdown"));
  await setImmediate();
  assert.equal(audio.playCalls, 2);
  assert.equal(states.at(-1), "playing");
  playback.toggle();
  interactions.dispatchEvent(new Event("pointerdown"));
  interactions.dispatchEvent(Object.assign(new Event("keydown"), { key: "Enter" }));
  assert.equal(audio.playCalls, 2);
  assert.equal(states.at(-1), "paused");
  playback.dispose();
});

test("a late autoplay rejection cannot restart music cancelled while loading", async () => {
  const { audio, interactions, states, playback } = setup();
  let rejectPlay;
  audio.behaviors.push(() => new Promise((_, reject) => { rejectPlay = reject; }));
  const pending = playback.play();
  playback.toggle();
  rejectPlay(new DOMException("Blocked", "NotAllowedError"));
  await pending;
  interactions.dispatchEvent(new Event("pointerdown"));
  assert.equal(audio.playCalls, 1);
  assert.equal(states.at(-1), "paused");
  playback.dispose();
});

test("media failures are reported and retry reloads a failed audio resource", async () => {
  const { audio, states, playback } = setup();
  audio.behaviors.push(() => Promise.reject(new DOMException("Cannot decode", "NotSupportedError")));
  await playback.play();
  assert.equal(states.at(-1), "error");
  audio.error = { code: 4 };
  audio.dispatchEvent(new Event("error"));
  audio.dispatchEvent(new Event("pause"));
  assert.equal(states.at(-1), "error");
  playback.toggle();
  await setImmediate();
  assert.equal(audio.loadCalls, 1);
  assert.equal(states.at(-1), "playing");
  playback.dispose();
});

test("leaving the page pauses audio and removes input/media listeners and pending updates", async () => {
  const { audio, interactions, states, playback } = setup();
  audio.behaviors.push(() => Promise.reject(new DOMException("Blocked", "NotAllowedError")));
  await playback.play();
  playback.dispose();
  const count = states.length;
  interactions.dispatchEvent(new Event("pointerdown"));
  audio.dispatchEvent(new Event("playing"));
  await playback.play();
  playback.toggle();
  assert.equal(audio.paused, true);
  assert.equal(audio.playCalls, 1);
  assert.equal(states.length, count);

  const pendingSetup = setup();
  let rejectPlay;
  pendingSetup.audio.behaviors.push(() => new Promise((_, reject) => { rejectPlay = reject; }));
  const pending = pendingSetup.playback.play();
  pendingSetup.playback.dispose();
  rejectPlay(new DOMException("Interrupted", "AbortError"));
  await pending;
  assert.deepEqual(pendingSetup.states, ["loading"]);
});
