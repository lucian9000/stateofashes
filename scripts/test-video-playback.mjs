import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import ts from 'typescript';

const source = readFileSync(new URL('../app/components/video-playback.ts', import.meta.url), 'utf8');
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } });
const exports = {};
new Function('exports', compiled.outputText)(exports);
const { observeVideoPlayback } = exports;
class Video extends EventTarget { paused = true; readyState = 0; error = null; }
function setup(video) { const states = []; const observer = observeVideoPlayback(video, state => states.push(state)); return { states, observer, latest: () => states.at(-1) }; }

// The browser starts playback before hydration attaches event listeners.
{
 const video = new Video(); video.paused = false; video.readyState = 4;
 video.dispatchEvent(new Event('playing'));
 const { latest, observer } = setup(video);
 assert.deepEqual(latest(), { playing: true, hasFrame: true, failed: false });
 observer.dispose(); console.log('PASS: already-playing video is visible without another playing event');
}
{
 const video = new Video(); const { latest, observer } = setup(video);
 assert.deepEqual(latest(), { playing: false, hasFrame: false, failed: false });
 video.paused = false; video.readyState = 3; video.dispatchEvent(new Event('canplay'));
 assert.equal(latest().hasFrame, true); assert.equal(latest().playing, true);
 video.paused = true; video.dispatchEvent(new Event('pause'));
 assert.equal(latest().playing, false); assert.equal(latest().hasFrame, true);
 observer.dispose(); console.log('PASS: delayed readiness reveals video and pausing retains its frame');
}
{
 const video = new Video(); video.readyState = 4; const { latest, observer } = setup(video);
 assert.equal(latest().hasFrame, false); assert.equal(latest().playing, false);
 observer.dispose(); console.log('PASS: autoplay-blocked or reduced-motion video keeps its poster');
}
{
 const video = new Video(); const { latest, observer } = setup(video);
 video.paused = false; video.readyState = 4; observer.refresh();
 assert.equal(latest().hasFrame, true);
 observer.dispose(); console.log('PASS: play promise can reconcile presentation when events are missed');
}
{
 const video = new Video(); video.paused = false; video.readyState = 4; const { latest, observer } = setup(video);
 video.error = { code: 3 }; video.dispatchEvent(new Event('error'));
 assert.equal(latest().failed, true); assert.equal(latest().playing, false);
 observer.dispose(); console.log('PASS: decode error restores the poster fallback');
}
{
 const video = new Video(); const { states, observer } = setup(video);
 const count = states.length; observer.dispose(); video.dispatchEvent(new Event('playing')); observer.refresh();
 assert.equal(states.length, count); console.log('PASS: cleanup prevents updates after unmount');
}
