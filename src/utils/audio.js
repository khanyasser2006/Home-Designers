// Web Audio API procedural soundscape engine for architectural ambiance

class AmbianceEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.masterGain = null;
    this.oscillators = [];
    this.noiseNode = null;
    this.filter = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(220, this.ctx.currentTime);
      this.filter.Q.setValueAtTime(3.0, this.ctx.currentTime);
      this.filter.connect(this.masterGain);

      // Deep harmonic chord for Midnight Navy atmosphere
      const freqs = [55, 82.41, 110, 164.81];
      freqs.forEach((freq) => {
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();
        
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
        osc.detune.setValueAtTime((Math.random() - 0.5) * 8, this.ctx.currentTime);

        oscGain.gain.setValueAtTime(0.08 / freqs.length, this.ctx.currentTime);
        
        osc.connect(oscGain);
        oscGain.connect(this.filter);
        osc.start();
        this.oscillators.push({ osc, oscGain });
      });

      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        b3 = 0.86650 * b3 + white * 0.3104856;
        b4 = 0.55000 * b4 + white * 0.5329522;
        b5 = -0.7616 * b5 - white * 0.0168980;
        output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.02;
        b6 = white * 0.115926;
      }

      this.noiseNode = this.ctx.createBufferSource();
      this.noiseNode.buffer = noiseBuffer;
      this.noiseNode.loop = true;

      const noiseFilter = this.ctx.createBiquadFilter();
      noiseFilter.type = 'bandpass';
      noiseFilter.frequency.setValueAtTime(450, this.ctx.currentTime);
      noiseFilter.Q.setValueAtTime(1.2, this.ctx.currentTime);

      const noiseGain = this.ctx.createGain();
      noiseGain.gain.setValueAtTime(0.03, this.ctx.currentTime);

      this.noiseNode.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(this.masterGain);
      this.noiseNode.start();
    }
  }

  toggle() {
    this.init();
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (!this.isPlaying) {
      this.masterGain.gain.linearRampToValueAtTime(0.4, this.ctx.currentTime + 1.5);
      this.isPlaying = true;
    } else {
      this.masterGain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.8);
      this.isPlaying = false;
    }
    return this.isPlaying;
  }

  updateSpatialTone(progress) {
    if (this.filter && this.ctx && this.isPlaying) {
      const targetFreq = 180 + progress * 240;
      this.filter.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.2);
    }
  }
}

export const ambiance = new AmbianceEngine();
