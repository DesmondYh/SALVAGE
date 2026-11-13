(() => {
  'use strict';
  const root = document.getElementById('salvage-decision');
  if (!root) return;
  const arm = (id, ghost = false) => {
    const links = [95, 187, 117].map((length, i) => `
      <g id="${id}-link-${i}" ${ghost && i < 2 ? 'opacity="0"' : ''}>
        <path d="M 0 -13 L ${length} -13 L ${length + 7} -5 L 7 -5 Z" fill="#abc1d4" stroke="#3e6384" stroke-width="2.5"/>
        <path d="M 0 -5 L ${length} -5 L ${length} 13 L 0 13 Z" fill="#d9e5ee" stroke="#3e6384" stroke-width="2.5"/>
        <ellipse cx="${length}" cy="0" rx="13" ry="16" fill="#eff4f8" stroke="#3e6384" stroke-width="2.5"/>
      </g>`).join('');
    return `<g id="${id}" ${ghost ? 'opacity="0"' : ''}>
      ${links}
      <g id="${id}-gripper">
        <path d="M -13 0 L 7 -6 L 19 0 L -1 7 Z" fill="#a8bdcf" stroke="#3e6384" stroke-width="2"/>
        <path d="M -13 0 L -1 7 L 19 0 L 19 13 L 6 17 L 6 32 L -2 35 L -2 12 L -13 8 Z" fill="#bfd1df" stroke="#3e6384" stroke-width="2"/>
        <path d="M -13 8 L -13 28 L -6 31 L -6 10" fill="#dce7ef" stroke="#3e6384" stroke-width="2"/>
      </g>
    </g>`;
  };
  root.innerHTML = `<svg viewBox="0 0 930 550" role="img" aria-labelledby="decision-svg-title decision-svg-desc">
    <title id="decision-svg-title">One execution-guided SALVAGE decision</title>
    <desc id="decision-svg-desc">A robot executes a prefix of a predicted action chunk. The remaining actions stay available. At replanning, the observed end-effector position is compared with the target implied by the executed commands. Execution feedback selects few-step inference, using k sampling steps, where k &lt; K. This is a schematic animation, not a measured rollout.</desc>
    <defs>
      <marker id="decision-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0 L9 4.5 L0 9Z" fill="#171717"/></marker>
      <marker id="decision-teal-arrow" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0 L9 4.5 L0 9Z" fill="#27818a"/></marker>
      <marker id="decision-red-arrow" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto"><path d="M0 0 L8 4 L0 8Z" fill="#c82124"/></marker>
      <clipPath id="decision-chunk-clip"><rect x="438" y="60" width="432" height="32"/></clipPath>
    </defs>
    <text x="654" y="37" text-anchor="middle">Previously predicted action chunk</text>
    <g clip-path="url(#decision-chunk-clip)">
      <rect x="438" y="60" width="432" height="32" fill="#b9dcd6"/>
      <rect id="decision-executed" x="438" y="60" width="0" height="32" fill="#dce1e7"/>
      ${Array.from({length: 11}, (_, i) => `<line x1="${474 + i * 36}" y1="60" x2="${474 + i * 36}" y2="92" stroke="white"/>`).join('')}
    </g>
    <line id="decision-playhead" x1="438" y1="55" x2="438" y2="97" stroke="#42617d" stroke-width="2.5"/>
    <rect id="decision-active-action" x="438" y="59" width="36" height="34" fill="none" stroke="#27818a" stroke-width="2.5"/>
    <text id="decision-executed-label" class="decision-heavy" x="438" y="122" text-anchor="middle">Executed</text>
    <text id="decision-remaining-label" class="decision-heavy" x="654" y="122" text-anchor="middle">Remaining</text>
    <path d="M438 76 H263 V132" fill="none" stroke="#171717" stroke-width="3.5" marker-end="url(#decision-arrow)"/>
    <path d="M684 139 V221" fill="none" stroke="#171717" stroke-width="3.5" marker-end="url(#decision-arrow)"/>
    <g id="decision-table">
      <path d="M8 395 L191 320 L460 381 L276 465 Z" fill="#d3d3ce" stroke="#99998f" stroke-width="1.5"/>
      <path d="M8 395 L276 465 L276 481 L8 410 Z" fill="#b8b9b2" stroke="#99998f" stroke-width="1.5"/>
      <path d="M276 465 L460 381 V396 L276 481 Z" fill="#bfc0b8" stroke="#99998f" stroke-width="1.5"/>
      <path d="M269 415 L302 405 L333 416 L300 428 Z" fill="#efb4ab" stroke="#a04b43" stroke-width="1.5"/>
      <path d="M269 415 L300 428 V463 L269 450 Z" fill="#e58f82" stroke="#a04b43" stroke-width="1.5"/>
      <path d="M300 428 L333 416 V450 L300 463 Z" fill="#ca6b60" stroke="#a04b43" stroke-width="1.5"/>
      <path d="M344 375 L373 366 L398 375 L369 385 Z" fill="#a7d4d0" stroke="#348287" stroke-width="1.5"/>
      <path d="M344 375 L369 385 V411 L344 401 Z" fill="#8bbfbd" stroke="#348287" stroke-width="1.5"/>
      <path d="M369 385 L398 375 V402 L369 411 Z" fill="#67a3a6" stroke="#348287" stroke-width="1.5"/>
      <path d="M65 345 L126 323 L164 343 L104 366 Z" fill="#9fb7cb" stroke="#3e6384" stroke-width="2.5"/>
      <path d="M65 345 L104 366 V391 L65 372 Z" fill="#6d93b0" stroke="#3e6384" stroke-width="2.5"/>
      <path d="M104 366 L164 343 V369 L104 391 Z" fill="#406887" stroke="#3e6384" stroke-width="2.5"/>
    </g>
    <path id="decision-execution-trail" d="" fill="none" stroke="#27818a" stroke-width="3" stroke-linecap="round" opacity=".6"/>
    ${arm('decision-target-arm', true)}
    ${arm('decision-observe-arm')}
    <g id="decision-observation" opacity="0">
      <rect x="162" y="351" width="126" height="34" fill="white" stroke="#171717" stroke-width="1.5"/>
      <text x="225" y="376" text-anchor="middle">Observe</text>
      <path id="decision-observe-leader" d="M267 351 L282 319" fill="none" stroke="#555" stroke-width="1.5"/>
      <rect x="325" y="263" width="112" height="34" fill="white" stroke="#171717" stroke-width="1.5"/>
      <text x="381" y="288" text-anchor="middle">Target</text>
      <path id="decision-target-leader" d="M325 297 L306 310" fill="none" stroke="#555" stroke-width="1.5"/>
      <line id="decision-error-gap" x1="282" y1="319" x2="306" y2="310" stroke="#c82124" stroke-width="4"/>
      <circle id="decision-observe-point" cx="282" cy="319" r="4" fill="#c82124"/>
      <circle id="decision-target-point" cx="306" cy="310" r="4" fill="white" stroke="#c82124" stroke-width="2.5"/>
    </g>
    <g id="decision-feedback" opacity="0">
      <path id="decision-feedback-path" d="M297 319 H465 V255 H589" fill="none" stroke="#c82124" stroke-width="3.5" marker-end="url(#decision-red-arrow)"/>
      <text x="467" y="220" text-anchor="middle">Displacement error</text>
    </g>
    <rect id="decision-salvage-box" x="595" y="226" width="180" height="60" rx="6" fill="#e9f2ef" stroke="#171717" stroke-width="2"/>
    <text x="685" y="265" text-anchor="middle" class="decision-heavy">SALVAGE</text>
    <g fill="none" stroke="#27818a" stroke-width="3" marker-end="url(#decision-teal-arrow)">
      <path d="M685 286 V321 H553 V347"/>
      <path d="M685 321 V347"/>
      <path d="M685 321 H817 V347"/>
    </g>
    <path id="decision-selected-route" d="M685 286 V347" fill="none" stroke="#800084" stroke-width="4" opacity="0"/>
    <rect x="480" y="349" width="409" height="128" fill="white" stroke="#171717" stroke-width="1.5"/>
    <rect id="decision-few-highlight" x="619" y="350" width="134" height="126" fill="#f4eaf5" stroke="#800084" stroke-width="2" opacity="0"/>
    <g id="decision-reuse-choice">
      <rect x="500" y="370" width="105" height="7" fill="#ccc"/>
      <text x="552" y="411" text-anchor="middle" class="decision-heavy">Reuse</text>
      <text x="552" y="450" text-anchor="middle">0 steps</text>
    </g>
    <g id="decision-few-choice">
      <rect x="633" y="370" width="105" height="7" fill="#ccc"/>
      <rect id="decision-few-budget" x="633" y="370" width="32" height="7" fill="#ca8a40"/>
      <text x="685" y="411" text-anchor="middle" class="decision-heavy">Few-step</text>
      <text x="685" y="450" text-anchor="middle"><tspan font-style="italic">k</tspan> steps</text>
    </g>
    <g id="decision-full-choice">
      <rect x="766" y="370" width="105" height="7" fill="#ca8a40"/>
      <text x="818" y="411" text-anchor="middle" class="decision-heavy">Full</text>
      <text x="818" y="450" text-anchor="middle"><tspan font-style="italic">K</tspan> steps</text>
    </g>
    <text id="decision-output-label" x="685" y="514" text-anchor="middle">Next inference strategy</text>
    <g id="decision-new-chunk" opacity="0">
      <rect x="480" y="527" width="409" height="18" fill="#b9dcd6"/>
      ${Array.from({length: 11}, (_, i) => `<line x1="${480 + (i + 1) * 409 / 12}" y1="527" x2="${480 + (i + 1) * 409 / 12}" y2="545" stroke="white"/>`).join('')}
    </g>
  </svg>`;

  const el = id => document.getElementById(id);
  const set = (id, name, value) => el(id).setAttribute(name, value);
  const opacity = (id, value) => set(id, 'opacity', value);
  const clamp = x => Math.max(0, Math.min(1, x));
  const smooth = x => { x = clamp(x); return x * x * (3 - 2 * x); };
  const stage = el('decision-stage');
  const pause = el('decision-pause');
  const replay = el('decision-replay');
  const duration = 21000;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
  let elapsed = reduced.matches ? duration : 0;
  let visible = false;
  let started = false;
  let paused = false;
  let motionAllowed = !reduced.matches;
  let frame = 0;
  let last = null;
  let lastPhase = '';
  const startAngles = [-115, -75, 65];
  const endAngles = [-107, -24, 77];

  function anglesAt(progress) {
    return startAngles.map((v, i) => v + (endAngles[i] - v) * progress);
  }
  function endpoint(angles) {
    let x = 111, y = 335;
    [95, 187, 117].forEach((length, i) => {
      const theta = angles[i] * Math.PI / 180;
      x += length * Math.cos(theta); y += length * Math.sin(theta);
    });
    return {x, y: y + 30};
  }

  function pose(id, angles) {
    let x = 111, y = 335;
    [95, 187, 117].forEach((length, i) => {
      set(`${id}-link-${i}`, 'transform', `translate(${x} ${y}) rotate(${angles[i]})`);
      const theta = angles[i] * Math.PI / 180;
      x += length * Math.cos(theta); y += length * Math.sin(theta);
    });
    set(`${id}-gripper`, 'transform', `translate(${x} ${y})`);
    return {x, y: y + 30};
  }
  function draw() {
    const execution = smooth(elapsed / 9000);
    const count = 144 * execution;
    set('decision-executed', 'width', count);
    set('decision-playhead', 'x1', 438 + count);
    set('decision-playhead', 'x2', 438 + count);
    set('decision-active-action', 'x', 438 + Math.min(3, Math.floor(count / 36)) * 36);
    opacity('decision-active-action', elapsed < 9000 ? .85 : 0);
    set('decision-executed-label', 'x', 438 + count / 2);
    opacity('decision-executed-label', clamp(execution * 5));
    set('decision-remaining-label', 'x', 438 + count + (432 - count) / 2);
    const a = anglesAt(execution);
    const observed = pose('decision-observe-arm', a);
    const target = pose('decision-target-arm', [-107, -24, 65]);
    const trail = Array.from({length: 41}, (_, i) => endpoint(anglesAt(execution * i / 40)));
    set('decision-execution-trail', 'd', trail.map((p, i) => `${i ? 'L' : 'M'}${p.x} ${p.y}`).join(' '));
    const observation = smooth((elapsed - 9200) / 900);
    opacity('decision-target-arm', .25 * observation);
    opacity('decision-observation', observation);
    set('decision-observe-leader', 'd', `M267 351 L${observed.x} ${observed.y}`);
    set('decision-target-leader', 'd', `M325 297 L${target.x} ${target.y}`);
    ['decision-error-gap'].forEach(id => {
      set(id, 'x1', observed.x); set(id, 'y1', observed.y);
      set(id, 'x2', target.x); set(id, 'y2', target.y);
    });
    set('decision-observe-point', 'cx', observed.x); set('decision-observe-point', 'cy', observed.y);
    set('decision-target-point', 'cx', target.x); set('decision-target-point', 'cy', target.y);
    opacity('decision-error-gap', smooth((elapsed - 10600) / 1000));
    const signal = smooth((elapsed - 12000) / 2300);
    opacity('decision-feedback', clamp(signal * 4));
    const path = el('decision-feedback-path');
    path.setAttribute('d', `M${(observed.x + target.x) / 2} ${(observed.y + target.y) / 2} H465 V255 H589`);
    const signalLength = path.getTotalLength();
    path.style.strokeDasharray = String(signalLength);
    path.style.strokeDashoffset = String(signalLength * (1 - signal));
    const selected = smooth((elapsed - 15000) / 1000);
    opacity('decision-selected-route', selected);
    opacity('decision-few-highlight', selected);
    opacity('decision-reuse-choice', 1 - .55 * selected);
    opacity('decision-full-choice', 1 - .55 * selected);
    set('decision-few-budget', 'width', 32 * smooth((elapsed - 16500) / 1500));
    opacity('decision-new-chunk', smooth((elapsed - 18200) / 600));
    el('decision-output-label').textContent = elapsed >= 18200 ? 'New action chunk' : 'Next inference strategy';
    set('decision-salvage-box', 'stroke', selected > .5 ? '#800084' : '#171717');
    const phase = elapsed < 9200 ? 'execute' : elapsed < 12000 ? 'observe' : elapsed < 15000 ? 'feedback' : elapsed < 18200 ? 'decision' : 'plan';
    root.dataset.phase = phase;
    root.dataset.progress = String(Math.round(elapsed / duration * 100));
    root.querySelector('svg').style.opacity = String(motionAllowed && !paused ? Math.min(1, elapsed / 350, (duration - elapsed) / 500) : 1);
    if (phase !== lastPhase) {
      stage.textContent = {execute: 'Execute a prefix', observe: 'Observe the displacement error', feedback: 'Use execution feedback', decision: 'Select few-step inference', plan: 'Generate a new action chunk'}[phase];
      lastPhase = phase;
    }
    pause.disabled = !motionAllowed;
    pause.textContent = paused ? 'Play' : 'Pause';
    pause.setAttribute('aria-label', paused ? 'Resume decision animation' : 'Pause decision animation');
  }
  function tick(now) {
    frame = 0;
    if (!visible || paused || !motionAllowed || document.hidden) { last = null; return; }
    if (last !== null) elapsed = (elapsed + Math.min(now - last, 80)) % duration;
    last = now;
    draw();
    frame = requestAnimationFrame(tick);
  }
  function run() {
    last = null;
    if (!frame && visible && !paused && motionAllowed && !document.hidden) frame = requestAnimationFrame(tick);
  }
  pause.addEventListener('click', () => {
    paused = !paused;
    if (paused && frame) { cancelAnimationFrame(frame); frame = 0; }
    draw(); run();
  });
  replay.addEventListener('click', () => {
    if (frame) cancelAnimationFrame(frame);
    frame = 0; elapsed = 0; paused = false; started = true; motionAllowed = true;
    draw(); run();
  });
  const observer = new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    if (visible) { started = true; run(); }
    else if (frame) { cancelAnimationFrame(frame); frame = 0; last = null; }
  }, {threshold: .25});
  observer.observe(root);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden && frame) { cancelAnimationFrame(frame); frame = 0; last = null; }
    else if (started) run();
  });
  reduced.addEventListener('change', event => {
    motionAllowed = !event.matches;
    if (event.matches) {
      if (frame) cancelAnimationFrame(frame);
      frame = 0; elapsed = duration; draw();
    } else { elapsed = 0; draw(); run(); }
  });
  draw();
})();
