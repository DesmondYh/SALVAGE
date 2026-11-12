'use strict';
const $ = selector => document.querySelector(selector);
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const videos = new Set();
const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const observer = new IntersectionObserver(entries => {
  for (const entry of entries) {
    const video = entry.target;
    if (entry.isIntersecting) {
      delete video.dataset.offscreen;
      if (!video.src) { video.src = video.dataset.src; video.load(); }
      if (!reduceMotion && !video.dataset.userPaused) video.play().catch(() => {});
    } else { video.dataset.offscreen = 'true'; video.pause(); }
  }
}, {threshold: 0.2});
function addVideo(demo, target, title) {
  const figure = document.createElement('figure');
  const measured = demo.hasTiming && demo.baselineSeconds > 0 && demo.salvageSeconds > 0;
  const approx = demo.approximateTiming ? '≈ ' : '';
  const methods = demo.methodLabels || ['Full inference', 'SALVAGE'];
  const single = methods.length === 1;
  const timingLabel = demo.timingKind === 'camera_phase' ? 'Phase time' : 'Rollout time';
  const timing = single
    ? `<div class="video-time" title="Approximate rollout time; speedup relative to full inference; common 1× playback">Rollout: ≈ ${demo.approxSeconds.toFixed(2)} s · ${demo.ratioAgainstFull.toFixed(2)}×</div>`
    : measured ? `<div class="video-time">${timingLabel}: ${approx}${demo.baselineSeconds.toFixed(1)} s → ${demo.salvageSeconds.toFixed(1)} s · ${esc(demo.speedup)}×</div>` : '';
  figure.className = single ? 'single-method' : '';
  figure.innerHTML = `<figcaption><div class="video-title">${esc(title || demo.title)}</div>${timing}</figcaption>${single ? '' : `<div class="method-labels">${methods.map(m => `<span>${esc(m)}</span>`).join('')}</div>`}<video muted loop playsinline controls preload="none" poster="${esc(demo.poster)}" data-src="${esc(demo.video)}" aria-label="${esc(single ? demo.title + ': LIBERO chocolate pudding' : methods.join(' and ') + ': ' + (title || demo.title))}"></video><div class="comparison-progress">${methods.map(m => `<div class="progress-item"><div class="progress-track" role="progressbar" aria-label="${esc(m)} selected clip progress" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><span></span></div></div>`).join('')}</div>`;
  const video = figure.querySelector('video');
  const tracks = [...figure.querySelectorAll('.progress-track')];
  let progressFrame;
  const updateProgress = () => {
    tracks.forEach((track, i) => {
      const end = demo.progressEnds?.[i] || video.duration;
      const fraction = Number.isFinite(end) && end > 0 ? Math.min(video.currentTime / end, 1) : 0;
      track.firstElementChild.style.transform = `scaleX(${fraction})`;
      track.setAttribute('aria-valuenow', String(Math.round(fraction * 100)));
    });
  };
  const animateProgress = () => {
    updateProgress();
    if (!video.paused) progressFrame = requestAnimationFrame(animateProgress);
  };
  ['loadedmetadata','timeupdate','seeked','ended'].forEach(event => video.addEventListener(event, updateProgress));
  if (demo.failureReason) {
    const reason = document.createElement('p');
    reason.className = 'failure-reason';
    reason.id = `reason-${demo.id}`;
    reason.textContent = demo.failureReason;
    figure.appendChild(reason);
    video.setAttribute('aria-describedby', reason.id);
  }
  video.addEventListener('pause', () => {
    cancelAnimationFrame(progressFrame);
    updateProgress();
    if (!demo.syncGroup && !video.ended && document.visibilityState === 'visible' && !video.dataset.offscreen) video.dataset.userPaused = 'true';
  });
  video.addEventListener('play', () => {
    delete video.dataset.userPaused;
    cancelAnimationFrame(progressFrame);
    animateProgress();
  });
  videos.add(video);
  $(target).appendChild(figure);
  if (!demo.syncGroup) observer.observe(video);
}

function synchronizeComposition() {
  const container = $('#composition-videos');
  const members = [...container.querySelectorAll('video')];
  if (members.length !== 4) return;
  let desiredPlaying = false;
  let userPaused = false;
  let offscreen = true;
  let loading;
  let animation;
  let restarting = false;
  const programmaticSeeks = new WeakMap();
  const programmaticPauses = new WeakSet();
  const seek = (video, time) => {
    programmaticSeeks.set(video, time);
    video.currentTime = time;
  };
  const loadAll = () => loading ||= Promise.all(members.map(video => new Promise((resolve, reject) => {
    if (video.readyState >= 2) { resolve(); return; }
    video.addEventListener('loadeddata', resolve, {once: true});
    video.addEventListener('error', reject, {once: true});
    video.src = video.dataset.src;
    video.load();
  })));
  const align = time => members.forEach(video => {
    if (video.readyState && Math.abs(video.currentTime - time) > 0.04) seek(video, time);
  });
  const keepClock = () => {
    if (!desiredPlaying) return;
    const time = members[0].currentTime;
    members.slice(1).forEach(video => {
      if (video.readyState >= 2 && !video.seeking && Math.abs(video.currentTime - time) > 0.08) seek(video, time);
    });
    animation = requestAnimationFrame(keepClock);
  };
  const pauseAll = user => {
    desiredPlaying = false;
    if (user) userPaused = true;
    cancelAnimationFrame(animation);
    members.forEach(video => {
      if (!video.paused) { programmaticPauses.add(video); video.pause(); }
    });
  };
  const playAll = async (source = members[0], user = false) => {
    if (user) userPaused = false;
    desiredPlaying = true;
    try {
      await loadAll();
      if (!desiredPlaying || offscreen || document.hidden) return;
      align(source.currentTime);
      await Promise.all(members.map(video => video.play()));
      cancelAnimationFrame(animation);
      animation = requestAnimationFrame(keepClock);
    } catch { pauseAll(false); }
  };
  members.forEach(video => {
    video.loop = false;
    video.addEventListener('play', () => { if (!desiredPlaying) playAll(video, true); });
    video.addEventListener('pause', () => {
      if (programmaticPauses.has(video)) { programmaticPauses.delete(video); return; }
      if (restarting) return;
      if (desiredPlaying && !video.ended) pauseAll(!offscreen && !document.hidden);
    });
    video.addEventListener('seeking', () => {
      const target = programmaticSeeks.get(video);
      if (target !== undefined && Math.abs(video.currentTime - target) < 0.08) return;
      align(video.currentTime);
    });
    video.addEventListener('seeked', () => programmaticSeeks.delete(video));
    video.addEventListener('ratechange', () => {
      members.forEach(member => { if (member.playbackRate !== video.playbackRate) member.playbackRate = video.playbackRate; });
    });
    video.addEventListener('ended', () => {
      if (!desiredPlaying || restarting) return;
      restarting = true;
      pauseAll(false);
      members.forEach(member => seek(member, 0));
      playAll().finally(() => { restarting = false; });
    });
  });
  new IntersectionObserver(entries => {
    offscreen = !entries[0].isIntersecting;
    if (offscreen) pauseAll(false);
    else {
      loadAll().catch(() => pauseAll(false));
      if (!reduceMotion && !userPaused && !document.hidden) playAll();
    }
  }, {threshold: 0.15}).observe(container);
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) pauseAll(false);
    else if (!offscreen && !reduceMotion && !userPaused) playAll();
  });
}
function fill(data) {
  document.title = 'SALVAGE';
  const notes = new Map(data.authorNotes.map(n => [n.id, n]));
  const affiliations = new Map(data.affiliations.map(a => [a.id, a]));
  $('#authors').innerHTML = data.authors.map(a => {
    const marks = a.affiliations.map(id => `<a href="#affiliation-${esc(id)}" aria-label="Affiliation ${esc(id)}: ${esc(affiliations.get(id).name)}">${esc(id)}</a>`);
    marks.push(...a.notes.map(id => `<a href="#author-${esc(id)}" aria-label="${esc(notes.get(id).text)}">${esc(notes.get(id).symbol)}</a>`));
    return `<span class="author">${esc(a.name)}<sup>${marks.join(',')}</sup></span>`;
  }).join('');
  $('#affiliations').innerHTML = data.affiliations.map(a => `<p id="affiliation-${esc(a.id)}"><sup>${esc(a.id)}</sup>${esc(a.name)}</p>`).join('');
  $('#author-notes').innerHTML = data.authorNotes.map(n => `<p id="author-${esc(n.id)}"><sup>${esc(n.symbol)}</sup>${esc(n.text)}</p>`).join('');
  $('#abstract').innerHTML = `<p>${esc(data.abstract)}</p>`;
  const names = ['RealMan · Pick and place','RealMan · Ordered stacking','SO-100 · Pick and place','SO-100 · Pouring'];
  data.featured.forEach((d,i) => addVideo(d,'#featured-videos',names[i]));
  data.realRobot.forEach(d => addVideo(d,'#real-videos'));
  data.simulation.forEach(d => addVideo(d,d.benchmark === 'LIBERO' ? '#libero-videos' : '#robotwin-videos'));
  (data.failures || []).forEach(d => addVideo(d,'#failure-videos'));
  (data.composition || []).forEach(d => addVideo(d,'#composition-videos'));
  synchronizeComposition();
  for (const item of data.comparisonFigures || []) {
    const figure = document.createElement('figure');
    figure.className = item.kind === 'excerpt' ? 'original-excerpt' : `original-table${item.kind === 'narrow-table' ? ' narrow-table' : ''}`;
    figure.innerHTML = `<a href="${esc(item.pdf)}" aria-label="${esc(item.title)}"><img src="${esc(item.image)}" alt="${esc(item.title)}" loading="lazy"></a>`;
    $(`#${item.target}`).appendChild(figure);
  }
  $('#citation-code').textContent = data.citation;
}
document.addEventListener('visibilitychange', () => { if (document.hidden) videos.forEach(v => v.pause()); });
if (window.SALVAGE_DATA) fill(window.SALVAGE_DATA);
else fetch('data.json').then(r => r.json()).then(fill);
