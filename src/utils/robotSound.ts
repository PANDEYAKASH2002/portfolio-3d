// Soothing voice utility — uses the Web Speech API (SpeechSynthesis) 
// with gentle, calming voice settings for a pleasant experience.

interface SpeakOptions {
  onStart?: () => void;
  onEnd?: () => void;
  onError?: (err: unknown) => void;
}

let cachedVoice: SpeechSynthesisVoice | null = null;

const pickSoothingVoice = (): SpeechSynthesisVoice | null => {
  if (cachedVoice) return cachedVoice;
  
  // Wait for voices to be loaded
  const voices = window.speechSynthesis.getVoices();
  if (!voices.length) return null;

  // Prioritize natural, soothing voices
  cachedVoice =
    // First try to find a natural female voice (usually smoother)
    voices.find((v) => 
      /en-US|en_US/i.test(v.lang) && 
      /female|samantha|zira|maria|google/i.test(v.name)
    ) ||
    // Then try any English voice with natural-sounding names
    voices.find((v) => 
      /en/i.test(v.lang) && 
      /samantha|zira|maria|karen|marcia|susan|tessa|emma|alice|amy|joanna|olivia|fiona|british/i.test(v.name)
    ) ||
    // Fallback to any English voice
    voices.find((v) => /en/i.test(v.lang)) ||
    // Last resort: any available voice
    voices[0];

  return cachedVoice;
};

export const speakRobotGreeting = (text: string, opts: SpeakOptions = {}) => {
  try {
    if (!('speechSynthesis' in window)) {
      opts.onError?.(new Error('speechSynthesis not supported'));
      return;
    }

    // Cancel any ongoing speech
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // SOOTHING SETTINGS - Gentle and pleasant
    utterance.rate = 0.85;        // Slightly slower for clarity
    utterance.pitch = 1.05;       // Slightly higher for warmth
    utterance.volume = 0.9;       // Comfortable volume
    utterance.lang = 'en-US';

    const assignVoiceAndSpeak = () => {
      const voice = pickSoothingVoice();
      if (voice) {
        utterance.voice = voice;
        console.log('Using voice:', voice.name, voice.lang);
      }
      
      // Set up event handlers
      utterance.onstart = () => {
        console.log('🎤 Speaking...');
        opts.onStart?.();
      };
      
      utterance.onend = () => {
        console.log('✅ Speech finished');
        opts.onEnd?.();
      };
      
      utterance.onerror = (e) => {
        console.error('Speech error:', e);
        opts.onError?.(e);
      };

      // Speak with a slight delay for smoother start
      setTimeout(() => {
        window.speechSynthesis.speak(utterance);
      }, 50);
    };

    // Handle voice loading
    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = () => {
        assignVoiceAndSpeak();
      };
    } else {
      assignVoiceAndSpeak();
    }
  } catch (err) {
    console.error('Speech synthesis error:', err);
    opts.onError?.(err);
  }
};

// Alternative: A more melodic version with ambient-like quality
export const speakMelodicGreeting = (text: string, opts: SpeakOptions = {}) => {
  try {
    if (!('speechSynthesis' in window)) {
      opts.onError?.(new Error('speechSynthesis not supported'));
      return;
    }

    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    
    // MELODIC SETTINGS - Even more pleasant
    utterance.rate = 0.75;        // Slow and clear
    utterance.pitch = 1.15;       // Higher pitch for a gentle, friendly tone
    utterance.volume = 0.85;      // Slightly softer
    utterance.lang = 'en-US';

    const assignVoiceAndSpeak = () => {
      const voices = window.speechSynthesis.getVoices();
      
      // Prefer the most natural, pleasant voice available
      let voice = voices.find((v) => 
        /samantha|zira|maria|joanna|olivia|fiona|emma|karen/i.test(v.name)
      );
      
      if (!voice) {
        voice = voices.find((v) => /en-US|en_US/i.test(v.lang));
      }
      
      if (!voice) {
        voice = voices[0];
      }

      if (voice) {
        utterance.voice = voice;
        console.log('🎵 Using melodic voice:', voice.name);
      }

      utterance.onstart = () => {
        console.log('🎵 Speaking melodically...');
        opts.onStart?.();
      };
      
      utterance.onend = () => {
        console.log('✅ Melodic speech finished');
        opts.onEnd?.();
      };
      
      utterance.onerror = (e) => {
        console.error('Speech error:', e);
        opts.onError?.(e);
      };

      window.speechSynthesis.speak(utterance);
    };

    if (window.speechSynthesis.getVoices().length === 0) {
      window.speechSynthesis.onvoiceschanged = () => {
        assignVoiceAndSpeak();
      };
    } else {
      assignVoiceAndSpeak();
    }
  } catch (err) {
    console.error('Speech synthesis error:', err);
    opts.onError?.(err);
  }
};

// Utility to stop ongoing speech
export const stopSpeaking = () => {
  try {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  } catch (err) {
    console.error('Error stopping speech:', err);
  }
};

// Utility to check if speech is supported
export const isSpeechSupported = (): boolean => {
  return 'speechSynthesis' in window && window.speechSynthesis !== null;
};

// Utility to get available voices (for debugging)
export const getAvailableVoices = (): SpeechSynthesisVoice[] => {
  if (!isSpeechSupported()) return [];
  return window.speechSynthesis.getVoices() || [];
};