let audioCtx: AudioContext | null = null;
let isUnlocked = false;
let lastPlayTime = 0;
const COOLDOWN = 600; // ms

const getCtx = (): AudioContext | null => {
  const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
  if (!AudioCtx) return null;
  if (!audioCtx) audioCtx = new AudioCtx();
  return audioCtx;
};

export const unlockAudio = () => {
  if (isUnlocked) return;
  const ctx = getCtx();
  if (!ctx) return;

  ctx
    .resume()
    .then(() => {
      isUnlocked = true;
      console.log('Audio context unlocked!');
    })
    .catch((err) => {
      console.warn('Audio unlock failed:', err);
    });
};

export const playShortCircuitSound = () => {
  const now = Date.now();
  if (now - lastPlayTime < COOLDOWN) return;

  const ctx = getCtx();
  if (!ctx) return;

  if (ctx.state === 'suspended') {
    console.info('AudioContext suspended - will play after unlock');
    return;
  }

  if (!isUnlocked) {
    console.info('Audio not unlocked yet');
    return;
  }

  lastPlayTime = now;

  try {
    const duration = 0.5;
    const t0 = ctx.currentTime;
    const master = ctx.createGain();
    master.gain.value = 0.9;
    master.connect(ctx.destination);

    // Shared distortion curve for grit
    const makeDistortion = (amount: number) => {
      const shaper = ctx.createWaveShaper();
      const n = 44100;
      const curve = new Float32Array(n);
      for (let i = 0; i < n; i++) {
        const x = (i * 2) / n - 1;
        curve[i] = Math.tanh(x * amount);
      }
      shaper.curve = curve;
      return shaper;
    };

    // ---- Layer 1: sizzling noise bed (the "hot wire" hiss under everything) ----
    const noiseBufferSize = Math.floor(ctx.sampleRate * duration);
    const noiseBuffer = ctx.createBuffer(1, noiseBufferSize, ctx.sampleRate);
    const noiseData = noiseBuffer.getChannelData(0);
    for (let i = 0; i < noiseBufferSize; i++) {
      noiseData[i] = Math.random() * 2 - 1;
    }
    const sizzleSource = ctx.createBufferSource();
    sizzleSource.buffer = noiseBuffer;

    const sizzleFilter = ctx.createBiquadFilter();
    sizzleFilter.type = 'highpass';
    sizzleFilter.frequency.value = 3500;
    sizzleFilter.Q.value = 0.7;

    const sizzleGain = ctx.createGain();
    sizzleGain.gain.setValueAtTime(0, t0);
    sizzleGain.gain.linearRampToValueAtTime(0.12, t0 + 0.02);
    // flickery hiss level, modulated a bit
    const sizzleSteps = 20;
    for (let i = 1; i <= sizzleSteps; i++) {
      const tt = t0 + (i / sizzleSteps) * duration;
      const level = i === sizzleSteps ? 0 : 0.05 + Math.random() * 0.12;
      sizzleGain.gain.linearRampToValueAtTime(level, tt);
    }

    sizzleSource.connect(sizzleFilter);
    sizzleFilter.connect(sizzleGain);
    sizzleGain.connect(master);

    // ---- Layer 2: unstable arc tone (buzzy, jittery, never quite settles) ----
    const arcOsc = ctx.createOscillator();
    arcOsc.type = 'sawtooth';
    const arcJumps = 40;
    for (let i = 0; i < arcJumps; i++) {
      const tt = t0 + (i / arcJumps) * duration;
      // low buzzing frequency with random jitter, like arc flicker
      const base = 60 + Math.random() * 40;
      const jitter = Math.random() < 0.15 ? Math.random() * 300 : 0; // occasional spike
      arcOsc.frequency.setValueAtTime(base + jitter, tt);
    }

    const arcFilter = ctx.createBiquadFilter();
    arcFilter.type = 'lowpass';
    arcFilter.frequency.value = 2200;
    arcFilter.Q.value = 1;

    const arcDistortion = makeDistortion(12);

    // const arcGain = ctx.createGain();
    // arcGain.gain.setValueAtTime(0, t0);
    // const arcSteps = 16;
    // for (let i = 1; i <= arcSteps; i++) {
    //   const tt = t0 + (i / arcSteps) * duration;
    //   const level = i === arcSteps ? 0 : Math.random() * 0.25 + 0.05;
    //   arcGain.gain.linearRampToValueAtTime(level, tt);
    // }

    arcOsc.connect(arcFilter);
    arcFilter.connect(arcDistortion);
    // arcDistortion.connect(arcGain);
    // arcGain.connect(master);

    // ---- Layer 3: spark pops (sharp, random, high-energy transients) ----
    const numSparks = 8 + Math.floor(Math.random() * 6);
    for (let s = 0; s < numSparks; s++) {
      const sparkTime = t0 + Math.random() * duration * 2;
      const sparkDuration = 0.015 + Math.random() * 0.04;

      const sparkBufferSize = Math.max(1, Math.floor(ctx.sampleRate * sparkDuration));
      const sparkBuffer = ctx.createBuffer(1, sparkBufferSize, ctx.sampleRate);
      const sparkData = sparkBuffer.getChannelData(0);
      for (let i = 0; i < sparkBufferSize; i++) {
        // sharp exponential decay burst of noise = "pop"/"crack"
        const decay = Math.pow(1 - i / sparkBufferSize, 2);
        sparkData[i] = (Math.random() * 2 - 1) * decay;
      }

      const sparkSource = ctx.createBufferSource();
      sparkSource.buffer = sparkBuffer;

      const sparkFilter = ctx.createBiquadFilter();
      sparkFilter.type = 'bandpass';
      sparkFilter.frequency.value = 1500 + Math.random() * 4000;
      sparkFilter.Q.value = 2 + Math.random() * 4;

      const sparkDistortion = makeDistortion(6 + Math.random() * 6);

      const sparkGain = ctx.createGain();
      const sparkLevel = 0.4 + Math.random() * 0.5;
      sparkGain.gain.setValueAtTime(sparkLevel, sparkTime);
      sparkGain.gain.exponentialRampToValueAtTime(0.001, sparkTime + sparkDuration);

      sparkSource.connect(sparkFilter);
      sparkFilter.connect(sparkDistortion);
      sparkDistortion.connect(sparkGain);
      sparkGain.connect(master);

      sparkSource.start(sparkTime);
      sparkSource.stop(sparkTime + sparkDuration + 0.01);
    }

    // ---- Master envelope: quick attack, ragged decay to silence ----
    master.gain.setValueAtTime(0.0001, t0);
    master.gain.linearRampToValueAtTime(0.9, t0 + 0.01);
    master.gain.setValueAtTime(0.9, t0 + duration * 0.6);
    master.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);

    sizzleSource.start(t0);
    sizzleSource.stop(t0 + duration);
    arcOsc.start(t0);
    arcOsc.stop(t0 + duration);
  } catch (err) {
    console.error('Short circuit sound error:', err);
  }
};