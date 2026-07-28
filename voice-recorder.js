/**
 * VoiceRecorder: Manages student microphone recording, storage, and playback.
 * Replaces TTS audio with recorded student voice audio clips.
 */
(function() {
    'use strict';

    class VoiceRecorderEngine {
        constructor() {
            this.mediaRecorder = null;
            this.audioChunks = [];
            this.currentKey = null;
            this.isRecording = false;
            this.activeAudio = null;
            this.onStateChangeCallback = null;
            this.cache = new Map();

            this.loadRecordingsFromStorage();
        }

        normalizeKey(key) {
            if (!key) return '';
            return String(key).trim().toLowerCase().replace(/\s+/g, '_');
        }

        loadRecordingsFromStorage() {
            try {
                for (let i = 0; i < localStorage.length; i++) {
                    const k = localStorage.key(i);
                    if (k && k.startsWith('student_voice_')) {
                        const textKey = k.replace('student_voice_', '');
                        const dataUrl = localStorage.getItem(k);
                        if (dataUrl) {
                            this.cache.set(textKey, dataUrl);
                        }
                    }
                }
            } catch (e) {
                console.warn('VoiceRecorder storage load error:', e);
            }
        }

        hasRecording(rawKey) {
            const key = this.normalizeKey(rawKey);
            return this.cache.has(key);
        }

        getRecordingUrl(rawKey) {
            const key = this.normalizeKey(rawKey);
            return this.cache.get(key) || null;
        }

        async startRecording(rawKey, onStateChange = null) {
            if (this.isRecording) {
                await this.stopRecording();
            }

            const key = this.normalizeKey(rawKey);
            if (!key) {
                throw new Error('Valid text key is required to start recording.');
            }

            if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
                alert('마이크 접근이 지원되지 않는 브라우저입니다.');
                return false;
            }

            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                this.currentKey = key;
                this.audioChunks = [];
                this.onStateChangeCallback = onStateChange;

                const options = MediaRecorder.isTypeSupported('audio/webm')
                    ? { mimeType: 'audio/webm' }
                    : (MediaRecorder.isTypeSupported('audio/mp4') ? { mimeType: 'audio/mp4' } : {});

                this.mediaRecorder = new MediaRecorder(stream, options);

                this.mediaRecorder.ondataavailable = (e) => {
                    if (e.data && e.data.size > 0) {
                        this.audioChunks.push(e.data);
                    }
                };

                this.mediaRecorder.onstop = async () => {
                    const mimeType = this.mediaRecorder.mimeType || 'audio/webm';
                    const audioBlob = new Blob(this.audioChunks, { type: mimeType });

                    // Stop all audio tracks
                    stream.getTracks().forEach(track => track.stop());

                    const reader = new FileReader();
                    reader.onloadend = () => {
                        const base64Data = reader.result;
                        this.cache.set(this.currentKey, base64Data);
                        try {
                            localStorage.setItem('student_voice_' + this.currentKey, base64Data);
                        } catch (err) {
                            console.warn('localStorage full, voice saved in memory cache.', err);
                        }
                        this.isRecording = false;
                        if (this.onStateChangeCallback) {
                            this.onStateChangeCallback({ state: 'stopped', key: this.currentKey, hasAudio: true });
                        }
                    };
                    reader.readAsDataURL(audioBlob);
                };

                this.mediaRecorder.start(100);
                this.isRecording = true;
                if (this.onStateChangeCallback) {
                    this.onStateChangeCallback({ state: 'recording', key: this.currentKey });
                }
                return true;
            } catch (err) {
                console.error('Microphone permission or recording error:', err);
                alert('마이크 사용 권한을 허용해 주세요!');
                this.isRecording = false;
                if (this.onStateChangeCallback) {
                    this.onStateChangeCallback({ state: 'error', error: err });
                }
                return false;
            }
        }

        stopRecording() {
            return new Promise((resolve) => {
                if (this.mediaRecorder && this.isRecording) {
                    const originalStop = this.mediaRecorder.onstop;
                    this.mediaRecorder.onstop = (e) => {
                        if (originalStop) originalStop(e);
                        resolve(this.currentKey);
                    };
                    this.mediaRecorder.stop();
                } else {
                    this.isRecording = false;
                    resolve(null);
                }
            });
        }

        play(rawKey, onEnded = null) {
            const key = this.normalizeKey(rawKey);
            const dataUrl = this.getRecordingUrl(key);

            if (!dataUrl) {
                return false;
            }

            if (this.activeAudio) {
                this.activeAudio.pause();
                this.activeAudio = null;
            }

            const audio = new Audio(dataUrl);
            this.activeAudio = audio;

            audio.onended = () => {
                this.activeAudio = null;
                if (onEnded) onEnded();
            };

            audio.onerror = (e) => {
                console.error('Error playing student recorded audio:', e);
                this.activeAudio = null;
                if (onEnded) onEnded();
            };

            audio.play().catch(err => {
                console.warn('Audio playback interrupted:', err);
                if (onEnded) onEnded();
            });

            return true;
        }

        stopPlayback() {
            if (this.activeAudio) {
                this.activeAudio.pause();
                this.activeAudio = null;
            }
        }

        deleteRecording(rawKey) {
            const key = this.normalizeKey(rawKey);
            this.cache.delete(key);
            try {
                localStorage.removeItem('student_voice_' + key);
            } catch (e) {}
        }
    }

    window.VoiceRecorder = new VoiceRecorderEngine();
})();
