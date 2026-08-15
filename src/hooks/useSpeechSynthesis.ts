import { useState, useCallback, useRef, useEffect } from 'react';

const SPEAK_TEXT = "HELLO MYSELF AKASH PANDEY. I AM A SOFTWARE DEVELOPER. WELCOME TO MY PORTFOLIO.";
const COOLDOWN_MS = 6000; // 6s cooldown between speeches

export const useSpeechSynthesis = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  const lastSpokenRef = useRef<number>(0);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      setIsSupported(false);
    }
  }, []);

  const triggerSpeech = useCallback(() => {
    const now = Date.now();
    if (now - lastSpokenRef.current < COOLDOWN_MS) {
      return; // In cooldown period
    }

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      // Fallback visual simulation if speech synthesis isn't available
      setIsSpeaking(true);
      lastSpokenRef.current = now;
      setTimeout(() => setIsSpeaking(false), 4500);
      return;
    }

    window.speechSynthesis.cancel(); // Stop any active speech

    const utterance = new SpeechSynthesisUtterance(SPEAK_TEXT);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.volume = 1.0;

    // Pick an English voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (v) => v.lang.startsWith('en') && (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('David') || v.name.includes('Alex'))
    ) || voices.find((v) => v.lang.startsWith('en'));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      lastSpokenRef.current = Date.now();
    };

    utterance.onend = () => {
      setIsSpeaking(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  }, []);

  const stopSpeech = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, []);

  return {
    isSpeaking,
    isSupported,
    triggerSpeech,
    stopSpeech,
    speakText: SPEAK_TEXT,
  };
};
