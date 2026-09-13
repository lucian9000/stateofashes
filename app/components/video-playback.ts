export type VideoPlaybackState = {
  playing: boolean;
  hasFrame: boolean;
  failed: boolean;
};

/** Keep presentation in sync with native playback, including playback before hydration. */
export function observeVideoPlayback(
  video: HTMLVideoElement,
  onState: (state: VideoPlaybackState) => void,
) {
  let disposed = false;
  let hasFrame = false;
  let previous: VideoPlaybackState | undefined;
  const refresh = () => {
    if (disposed) return;
    const failed = video.error !== null;
    const playing = !video.paused && video.readyState >= 2 && !failed;
    hasFrame = hasFrame || playing;
    const state = { playing, hasFrame, failed };
    if (!previous || Object.keys(state).some(key => state[key as keyof VideoPlaybackState] !== previous![key as keyof VideoPlaybackState])) {
      previous = state;
      onState(state);
    }
  };
  const events = ['playing', 'pause', 'loadeddata', 'canplay', 'error'] as const;
  events.forEach(event => video.addEventListener(event, refresh));
  // Native autoplay may have fired playing before React attached listeners.
  refresh();
  return {
    refresh,
    dispose() {
      disposed = true;
      events.forEach(event => video.removeEventListener(event, refresh));
    },
  };
}
