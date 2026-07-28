(() => {
    'use strict';

    const shell = document.getElementById('level1-course');
    const content = document.getElementById('l1-content');
    if (!shell || !content) return;

    const courses = [
        {
            icon: '🗺️', title: '가고 싶은 장소', subtitle: '여름방학에 가고 싶은 곳을 말해요',
            lines: [
                ['A', 'Where do you want to go?', '너는 어디에 가기를 원하니?'],
                ['B', 'I want to go to an amusement park.', '나는 놀이공원에 가고 싶어!'],
                ['A', 'Where do you want to go for the summer vacation?', '너는 여름방학에 어디 가고 싶어?'],
                ['B', 'I want to go to the beach.', '나는 해변에 가고 싶어.']
            ]
        },
        {
            icon: '✈️', title: '여행 경험', subtitle: '어디에 다녀왔는지 이야기해요',
            lines: [
                ['A', 'Where did you go?', '너는 어디 갔었니?'],
                ['B', 'I went to Japan', '나는 일본에 갔었어'],
                ['A', 'What did you do there?', '너는 거기서 뭐했어?'],
                ['B', 'I met my sister!', '나는 내 언니를 만났어!']
            ]
        },
        {
            icon: '🍪', title: '간식 나누기', subtitle: '친구와 간식을 나눠요',
            lines: [
                ['A', 'Do you want a cookie?', '쿠키 먹을래?'],
                ['B', 'Yes, please.', '응, 부탁해.'],
                ['A', 'Here you are.', '여기 있어.'],
                ['B', 'Thank you!', '고마워!']
            ]
        },
        {
            icon: '🐶', title: '반려동물', subtitle: '나의 반려동물을 소개해요',
            lines: [
                ['A', 'Do you have a pet?', '반려동물이 있니?'],
                ['B', 'Yes, I have a dog.', '응, 강아지가 있어.'],
                ['A', 'What is its name?', '이름이 뭐야?'],
                ['B', 'Its name is Coco.', '이름은 코코야.']
            ]
        },
        {
            icon: '🧥', title: '날씨와 옷', subtitle: '날씨에 맞는 옷을 말해요',
            lines: [
                ['A', "How's the weather?", '날씨가 어때?'],
                ['B', "It's cold today.", '오늘은 추워.'],
                ['A', 'Put on your jacket.', '재킷을 입어.'],
                ['B', 'Okay, I will.', '응, 그럴게.']
            ]
        },
        {
            icon: '✏️', title: '교실 물건 빌리기', subtitle: '친구에게 정중하게 부탁해요',
            lines: [
                ['A', 'Can I use your pencil?', '네 연필을 써도 될까?'],
                ['B', 'Yes, you can.', '응, 그래도 돼.'],
                ['A', 'Here you are.', '여기 있어.'],
                ['B', 'Thank you!', '고마워!']
            ]
        },
        {
            icon: '👨‍👩‍👧', title: '우리 가족', subtitle: '가족을 소개해요',
            lines: [
                ['A', 'Who is she?', '그녀는 누구야?'],
                ['B', 'She is my sister.', '그녀는 내 여동생이야.'],
                ['A', 'What is her name?', '그녀의 이름은 뭐야?'],
                ['B', 'Her name is Amy.', '그녀의 이름은 에이미야.']
            ]
        },
        {
            icon: '🛝', title: '놀이터', subtitle: '친구와 함께 놀아요',
            lines: [
                ['A', "Let's play outside.", '밖에서 놀자.'],
                ['B', 'That sounds fun!', '재미있겠다!'],
                ['A', 'Do you like the slide?', '미끄럼틀을 좋아하니?'],
                ['B', 'Yes, I do!', '응, 좋아해!']
            ]
        },
        {
            icon: '🎨', title: '좋아하는 색', subtitle: '좋아하는 색을 물어봐요',
            lines: [
                ['A', 'What color do you like?', '무슨 색을 좋아하니?'],
                ['B', 'I like blue.', '나는 파란색을 좋아해.'],
                ['A', 'Blue is pretty.', '파란색은 예뻐.'],
                ['B', 'Yes, it is!', '응, 맞아!']
            ]
        },
        {
            icon: '🍱', title: '점심시간', subtitle: '좋아하는 음식을 말해요',
            lines: [
                ['A', 'What do you have?', '무엇을 가지고 있니?'],
                ['B', 'I have a sandwich.', '나는 샌드위치가 있어.'],
                ['A', 'Does it taste good?', '맛있니?'],
                ['B', 'Yes, it is yummy!', '응, 맛있어!']
            ]
        },
        {
            icon: '🎂', title: '생일 축하', subtitle: '친구의 생일을 축하해요',
            lines: [
                ['A', 'Happy birthday!', '생일 축하해!'],
                ['B', 'Thank you so much!', '정말 고마워!'],
                ['A', 'This gift is for you.', '이 선물은 너를 위한 거야.'],
                ['B', 'I love it!', '마음에 들어!']
            ]
        },
        {
            icon: '🚲', title: '주말 계획', subtitle: '주말에 할 일을 말해요',
            lines: [
                ['A', 'What will you do?', '무엇을 할 거니?'],
                ['B', 'I will ride my bike.', '자전거를 탈 거야.'],
                ['A', 'Can I come with you?', '나도 같이 가도 될까?'],
                ['B', 'Sure, come with me!', '물론이지, 같이 가자!']
            ]
        },
        {
            icon: '⚽', title: '좋아하는 운동', subtitle: '좋아하는 운동을 이야기해요',
            lines: [
                ['A', 'Do you like soccer?', '축구를 좋아하니?'],
                ['B', 'Yes, I love soccer.', '응, 축구를 정말 좋아해.'],
                ['A', 'Can you play well?', '잘할 수 있니?'],
                ['B', 'Yes, I can!', '응, 할 수 있어!']
            ]
        },
        {
            icon: '🚌', title: '학교 가는 길', subtitle: '학교에 어떻게 가는지 말해요',
            lines: [
                ['A', 'How do you go to school?', '학교에 어떻게 가니?'],
                ['B', 'I take the bus.', '나는 버스를 타.'],
                ['A', 'Is the bus fast?', '버스는 빠르니?'],
                ['B', 'Yes, it is fast.', '응, 빨라.']
            ]
        },
        {
            icon: '📚', title: '도서관', subtitle: '읽고 싶은 책을 찾아요',
            lines: [
                ['A', 'What book do you want?', '어떤 책을 원하니?'],
                ['B', 'I want a space book.', '우주 책을 원해.'],
                ['A', 'Here is a good one.', '여기 좋은 책이 있어.'],
                ['B', 'Great! Thank you.', '좋아! 고마워.']
            ]
        },
        {
            icon: '🤒', title: '몸이 아플 때', subtitle: '어디가 아픈지 말해요',
            lines: [
                ['A', 'Are you okay?', '괜찮니?'],
                ['B', 'My head hurts.', '머리가 아파.'],
                ['A', 'Please take a rest.', '좀 쉬어.'],
                ['B', 'Okay, thank you.', '응, 고마워.']
            ]
        },
        {
            icon: '🛍️', title: '가게에서', subtitle: '원하는 물건을 골라요',
            lines: [
                ['A', 'May I help you?', '도와드릴까요?'],
                ['B', 'I want this ball.', '이 공을 원해요.'],
                ['A', 'Here you are.', '여기 있습니다.'],
                ['B', 'Thank you very much.', '정말 감사합니다.']
            ]
        },
        {
            icon: '🗺️', title: '길 묻기', subtitle: '장소를 찾는 방법을 물어요',
            lines: [
                ['A', 'Where is the park?', '공원은 어디에 있나요?'],
                ['B', 'Go straight, please.', '곧장 가세요.'],
                ['A', 'Is it far?', '멀리 있나요?'],
                ['B', 'No, it is close.', '아니요, 가까워요.']
            ]
        },
        {
            icon: '🧺', title: '즐거운 소풍', subtitle: '친구와 소풍을 준비해요',
            lines: [
                ['A', 'Are you ready for the picnic?', '소풍 갈 준비가 됐니?'],
                ['B', 'Yes, I am ready!', '응, 준비됐어!'],
                ['A', "Let's have fun together.", '우리 함께 재미있게 놀자.'],
                ['B', 'What a great day!', '정말 멋진 날이야!']
            ]
        }
    ].map((course, index) => ({
        ...course,
        level: index + 1,
        lines: course.lines.map(([speaker, text, ko]) => ({ speaker, text, ko }))
    }));

    const levelVocabulary = {
        1: [
            { en: 'beach', ko: '해변' },
            { en: 'amusement park', ko: '놀이공원' },
            { en: 'vacation', ko: '방학' },
            { en: 'want', ko: '원하다' }
        ],
        2: [
            { en: 'do', ko: '하다' },
            { en: 'did', ko: '했다' },
            { en: 'go', ko: '가다' },
            { en: 'went', ko: '갔다' },
            { en: 'eat', ko: '먹다' },
            { en: 'ate', ko: '먹었다' },
            { en: 'sleep', ko: '자다' },
            { en: 'slept', ko: '잤다' },
            { en: 'meet', ko: '만나다' },
            { en: 'met', ko: '만났다' }
        ]
    };

    const dailyVocabulary = levelVocabulary[1];

    const state = {
        level: 1,
        course: courses[0],
        completed: new Set(),
        selectedOrder: [],
        orderPool: [],
        matchEnglish: [],
        matchKorean: [],
        matchSelectedEnglish: null,
        matchSelectedKorean: null,
        matchedWords: new Set(),
        matchTargetCount: 4,
        builderIndex: 0,
        builderPool: [],
        builderSelected: [],
        builderAnswered: false,
        translationIndex: 0,
        translationOptions: [],
        translationAnswered: false,
        locked: false,
        speakingIndex: 0,
        courseRewarded: false,
        motionIndex: 0,
        motionTimer: null,
        playToken: 0,
        audioPreference: 'tts',
        rewards: loadRewards()
    };

    const $ = (selector, root = document) => root.querySelector(selector);
    const $$ = (selector, root = document) => Array.from(root.querySelectorAll(selector));
    const avatar = speaker => `<span class="l1-dialogue-avatar ${speaker === 'A' ? 'jae' : 'crong'}" aria-hidden="true"></span>`;
    let correctSoundContext = null;
    const escapeHtml = value => String(value).replace(/[&<>"']/g, char => ({
        '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#039;'
    })[char]);

    function loadRewards() {
        const defaults = { hearts: 5, streak: 1, xp: 0, gems: 0, lastStudyDate: '' };
        try {
            return { ...defaults, ...JSON.parse(localStorage.getItem('dialogueCourseRewards') || '{}') };
        } catch {
            return defaults;
        }
    }

    function saveRewards() {
        localStorage.setItem('dialogueCourseRewards', JSON.stringify(state.rewards));
        updateHeader();
    }

    function refillHeartsForThisUpdate() {
        const refillKey = 'dialogueCourseHeartRefill-20260724-1';
        try {
            if (localStorage.getItem(refillKey) === 'done') return;
            state.rewards.hearts = 5;
            localStorage.setItem(refillKey, 'done');
            saveRewards();
        } catch {
            state.rewards.hearts = 5;
        }
    }

    function updateHeader() {
        $('#l1-level-label').textContent = `LEVEL ${state.level}`;
        $('#l1-hearts').textContent = state.rewards.hearts;
        const topStep = $('#l1-top-step');
        const topFill = $('#l1-top-fill');
        if (topStep) topStep.textContent = `${Math.max(1, state.completed.size)} / 6`;
        if (topFill) topFill.style.width = `${Math.max(1, state.completed.size) * (100 / 6)}%`;
    }

    function reward(xp = 0, gems = 0) {
        state.rewards.xp += xp;
        state.rewards.gems += gems;
        if (gems && window.addDiamonds) {
            window.addDiamonds(gems, false);
        }
        saveRewards();
        if (xp || gems) toast(`+${xp} XP${gems ? ` · +${gems} 💎` : ''}`);
    }

    function loseHeart() {
        state.rewards.hearts = Math.max(0, state.rewards.hearts - 1);
        saveRewards();
        toast('괜찮아요. 소리를 다시 듣고 도전해요! 💚');
    }

    function toast(message) {
        let node = $('.l1-toast');
        if (!node) {
            node = document.createElement('div');
            node.className = 'l1-toast';
            shell.appendChild(node);
        }
        node.textContent = message;
        requestAnimationFrame(() => node.classList.add('show'));
        clearTimeout(toast.timer);
        toast.timer = setTimeout(() => node.classList.remove('show'), 2100);
    }

    function showJaeMotion(message = '정답이에요!') {
        const portrait = $('.l1-jae-lesson-portrait');
        if (!portrait) return;
        playCorrectSound();
        const row = state.motionIndex % 6;
        state.motionIndex++;
        clearInterval(state.motionTimer);
        portrait.classList.remove('casting');
        void portrait.offsetWidth;
        portrait.classList.add('casting');
        portrait.setAttribute('data-skill-message', message);

        let frame = 0;
        const draw = () => {
            portrait.style.backgroundPosition = `${(frame % 6) * 20}% ${row * 20}%`;
            frame++;
            if (frame >= 6) {
                clearInterval(state.motionTimer);
                setTimeout(() => {
                    portrait.style.backgroundPosition = '0 0';
                    portrait.classList.remove('casting');
                    portrait.removeAttribute('data-skill-message');
                }, 220);
            }
        };
        draw();
        state.motionTimer = setInterval(draw, 105);
    }

    function progressBars(stage) {
        return `<div class="l1-progress">${[1, 2, 3, 4, 5, 6].map(index =>
            `<span class="${index < stage ? 'done' : index === stage ? 'active' : ''}"></span>`
        ).join('')}</div>`;
    }

    function lessonHeader(stage, title, subtitle) {
        const topStep = $('#l1-top-step');
        const topFill = $('#l1-top-fill');
        if (topStep) topStep.textContent = `${stage} / 6`;
        if (topFill) topFill.style.width = `${stage * (100 / 6)}%`;
        return `
            <div class="l1-lesson-head">
                <span class="l1-stage-number">${stage}</span>
                <div>
                    <p class="l1-course-label">LEVEL ${state.level} · ${state.course.icon} ${escapeHtml(state.course.title)}</p>
                    <h1>${title}</h1>
                    <p>${subtitle}</p>
                </div>
                <span class="l1-jae-lesson-portrait" aria-hidden="true"></span>
            </div>`;
    }

    function shuffled(values) {
        const copy = [...values];
        for (let index = copy.length - 1; index > 0; index--) {
            const swap = Math.floor(Math.random() * (index + 1));
            [copy[index], copy[swap]] = [copy[swap], copy[index]];
        }
        return copy;
    }

    function stopAudio() {
        state.playToken++;
        if ('speechSynthesis' in window) speechSynthesis.cancel();
    }

    function playCorrectSound() {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;

        try {
            correctSoundContext ||= new AudioContextClass();
            const context = correctSoundContext;
            if (context.state === 'suspended') context.resume();
            const startedAt = context.currentTime + .01;
            const notes = [
                { frequency: 523.25, delay: 0, duration: .13 },
                { frequency: 659.25, delay: .11, duration: .15 },
                { frequency: 783.99, delay: .22, duration: .28 }
            ];

            notes.forEach(note => {
                const oscillator = context.createOscillator();
                const gain = context.createGain();
                const noteStart = startedAt + note.delay;
                const noteEnd = noteStart + note.duration;
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(note.frequency, noteStart);
                gain.gain.setValueAtTime(.0001, noteStart);
                gain.gain.exponentialRampToValueAtTime(.18, noteStart + .018);
                gain.gain.exponentialRampToValueAtTime(.0001, noteEnd);
                oscillator.connect(gain);
                gain.connect(context.destination);
                oscillator.start(noteStart);
                oscillator.stop(noteEnd + .02);
            });
        } catch {
            // 음향 기능이 제한된 브라우저에서도 학습 진행은 계속됩니다.
        }
    }

    function preferredGirlVoice() {
        const englishVoices = speechSynthesis.getVoices().filter(voice =>
            /^en([-_]|$)/i.test(voice.lang)
        );
        const priorities = [
            /Microsoft Ana/i,
            /Ana/i,
            /Jenny/i,
            /Aria/i,
            /Zira/i,
            /Samantha/i,
            /Google US English/i,
            /female/i
        ];
        for (const pattern of priorities) {
            const match = englishVoices.find(voice => pattern.test(voice.name));
            if (match) return match;
        }
        return englishVoices.find(voice => /en-US/i.test(voice.lang)) || englishVoices[0] || null;
    }

    function preferredBoyVoice() {
        const englishVoices = speechSynthesis.getVoices().filter(voice =>
            /^en([-_]|$)/i.test(voice.lang)
        );
        const priorities = [
            /Microsoft Guy/i,
            /Guy/i,
            /David/i,
            /Mark/i,
            /Alex/i,
            /Daniel/i,
            /Google UK English Male/i,
            /male/i
        ];
        for (const pattern of priorities) {
            const match = englishVoices.find(voice => pattern.test(voice.name));
            if (match) return match;
        }
        return englishVoices.find(voice => /en-US/i.test(voice.lang)) || englishVoices[0] || null;
    }

    function preferredKoreanGirlVoice() {
        const koreanVoices = speechSynthesis.getVoices().filter(voice =>
            /^ko([-_]|$)/i.test(voice.lang)
        );
        const priorities = [/SunHi/i, /Yuna/i, /Heami/i, /female/i];
        for (const pattern of priorities) {
            const match = koreanVoices.find(voice => pattern.test(voice.name));
            if (match) return match;
        }
        return koreanVoices[0] || null;
    }

    function preferredKoreanBoyVoice() {
        const koreanVoices = speechSynthesis.getVoices().filter(voice =>
            /^ko([-_]|$)/i.test(voice.lang)
        );
        const priorities = [/InJoon/i, /Hyunsu/i, /MinSu/i, /male/i];
        for (const pattern of priorities) {
            const match = koreanVoices.find(voice => pattern.test(voice.name));
            if (match) return match;
        }
        return koreanVoices[0] || null;
    }

    function getPresetAudioUrl(text) {
        if (!text) return null;
        const clean = text.trim().toLowerCase().replace(/[?!.,]/g, '');
        const PRESET_MAP = {
            'where did you go': 'jae/level/level2/Where+did+you+go_.mp3',
            'what did you do there': 'jae/level/level2/What+did+you+do+there_.mp3'
        };
        return PRESET_MAP[clean] || null;
    }

    function speakTTS(text, rate = .92, speaker = 'A') {
        return new Promise(resolve => {
            const presetUrl = getPresetAudioUrl(text);
            if (speaker === 'A' && presetUrl) {
                const audio = new Audio(presetUrl);
                audio.onended = resolve;
                audio.onerror = () => {
                    fallbackTTS(text, rate, speaker).then(resolve);
                };
                audio.play().then(() => {}).catch(() => {
                    fallbackTTS(text, rate, speaker).then(resolve);
                });
                return;
            }
            fallbackTTS(text, rate, speaker).then(resolve);
        });
    }

    function fallbackTTS(text, rate = .92, speaker = 'A') {
        return new Promise(resolve => {
            if (!('speechSynthesis' in window)) {
                toast('이 브라우저는 AI 원 음성(TTS) 재생을 지원하지 않아요.');
                resolve();
                return;
            }
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            utterance.rate = Math.max(.65, rate - .06);
            utterance.pitch = speaker === 'B' ? .96 : 1.24;
            utterance.volume = 1;
            utterance.voice = speaker === 'B' ? preferredBoyVoice() : preferredGirlVoice();
            utterance.onend = resolve;
            utterance.onerror = resolve;
            speechSynthesis.speak(utterance);
        });
    }

    function speakStudentVoice(text) {
        return new Promise(resolve => {
            if (window.VoiceRecorder && window.VoiceRecorder.hasRecording(text)) {
                window.VoiceRecorder.play(text, resolve);
            } else {
                toast('마이크 🎙️ 버튼을 눌러 먼저 목소리를 녹음해 보세요!');
                resolve();
            }
        });
    }

    function speak(text, rate = .92, speaker = 'A', forceMode = null) {
        if (forceMode === 'tts') {
            return speakTTS(text, rate, speaker);
        }
        if (forceMode === 'student') {
            return speakStudentVoice(text);
        }
        if (state.audioPreference === 'student' && window.VoiceRecorder && window.VoiceRecorder.hasRecording(text)) {
            return speakStudentVoice(text);
        }
        return speakTTS(text, rate, speaker);
    }

    function speakKorean(text, speaker = 'A') {
        return new Promise(resolve => {
            if (state.audioPreference === 'student' && window.VoiceRecorder && window.VoiceRecorder.hasRecording(text)) {
                window.VoiceRecorder.play(text, resolve);
                return;
            }
            if (!('speechSynthesis' in window)) {
                resolve();
                return;
            }
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'ko-KR';
            utterance.rate = .82;
            utterance.pitch = speaker === 'B' ? .96 : 1.16;
            utterance.volume = 1;
            utterance.voice = speaker === 'B' ? preferredKoreanBoyVoice() : preferredKoreanGirlVoice();
            utterance.onend = resolve;
            utterance.onerror = resolve;
            speechSynthesis.speak(utterance);
        });
    }

    async function playDialogue(rate = .92) {
        stopAudio();
        const token = state.playToken;
        for (let index = 0; index < state.course.lines.length; index++) {
            if (token !== state.playToken) return;
            $$('.l1-line-card').forEach(card =>
                card.classList.toggle('speaking', Number(card.dataset.line) === index)
            );
            await speak(state.course.lines[index].text, rate, state.course.lines[index].speaker);
            await new Promise(resolve => setTimeout(resolve, 220));
        }
        $$('.l1-line-card').forEach(card => card.classList.remove('speaking'));
    }

    function renderListening(autoPlay = false) {
        stopAudio();
        state.currentStep = 1;
        content.innerHTML = `
            <div class="l1-page">
                ${lessonHeader(1, '대화 흐름 듣기 🎧', 'AI 원음(TTS)과 학생 녹음 음성을 자유롭게 선택해서 들을 수 있어요!')}
                <div class="l1-card">
                    <div class="l1-audio-mode-selector">
                        <button class="l1-audio-mode-btn ${state.audioPreference === 'tts' ? 'active' : ''}" type="button" data-set-audio-pref="tts">
                            🤖 AI 원음 (TTS)으로 듣기
                        </button>
                        <button class="l1-audio-mode-btn ${state.audioPreference === 'student' ? 'active' : ''}" type="button" data-set-audio-pref="student">
                            🎤 학생 녹음 음성으로 듣기
                        </button>
                    </div>

                    ${state.course.lines.map((line, index) => {
                        const hasRec = window.VoiceRecorder && window.VoiceRecorder.hasRecording(line.text);
                        return `
                        <div class="l1-line-row">
                            <div class="l1-line-card l1-line-button" data-line="${index}" data-speak-line="${index}" data-speaker="${line.speaker}" style="flex: 1; margin-bottom: 0;">
                                <span class="speaker">${avatar(line.speaker)}</span>
                                <span><strong>${escapeHtml(line.text)}</strong> ${hasRec ? '<span class="l1-voice-badge">🎤 녹음됨</span>' : ''}<small>${escapeHtml(line.ko)}</small></span>
                            </div>
                            <div class="l1-line-audio-actions">
                                <button class="l1-audio-btn tts-btn" type="button" data-play-tts="${index}" title="AI 원음 (TTS) 듣기">
                                    🤖 TTS
                                </button>
                                <button class="l1-audio-btn rec-play-btn ${hasRec ? 'has-rec' : ''}" type="button" data-play-recorded="${escapeHtml(line.text)}" title="학생 녹음 듣기">
                                    🎤 ${hasRec ? '내 녹음' : '녹음 필요'}
                                </button>
                                <button class="l1-rec-btn ${hasRec ? 'has-rec' : ''}" type="button" data-record-text="${escapeHtml(line.text)}" title="학생 목소리 녹음하기">
                                    🎙️ ${hasRec ? '재녹음' : '녹음'}
                                </button>
                            </div>
                        </div>`;
                    }).join('')}
                    <div class="l1-listen-controls">
                        <button class="l1-btn blue" type="button" data-action="listen-all">▶️ 전체 듣기 (${state.audioPreference === 'student' ? '🎤 학생녹음' : '🤖 AI원음'})</button>
                        <button class="l1-btn purple" type="button" data-action="listen-slow">🐢 천천히 듣기 (TTS)</button>
                    </div>
                    <div class="l1-action-row">
                        <button class="l1-btn primary" type="button" data-action="finish-listening">순서 맞추기로 이동</button>
                    </div>
                </div>
            </div>`;
        content.scrollTop = 0;
        if (autoPlay) setTimeout(() => playDialogue(.92), 450);
    }

    function renderOrdering(reset = true) {
        stopAudio();
        state.currentStep = 2;
        if (reset) {
            state.selectedOrder = [];
            state.orderPool = shuffled(state.course.lines.map((line, original) => ({ ...line, original })));
            if (state.orderPool.every((line, index) => line.original === index)) {
                [state.orderPool[0], state.orderPool[1]] = [state.orderPool[1], state.orderPool[0]];
            }
        }
        content.innerHTML = `
            <div class="l1-page l1-page-wide">
                ${lessonHeader(2, '대화 순서 맞추기 🔀', '오른쪽 한국어 뜻에 맞춰 아래 카드 박스를 직접 드래그하여 연결하세요!')}
                <div class="l1-card">
                    <div class="l1-sort-zone" id="l1-sort-zone"></div>
                    <div class="l1-choice-grid" id="l1-order-pool"></div>
                    <div class="l1-feedback" id="l1-order-feedback">한국어 뜻을 보고 문장 카드를 직접 드래그하거나 눌러 보세요!</div>
                    <div class="l1-action-row">
                        <button class="l1-btn" type="button" data-action="reset-order">다시 섞기</button>
                        <button class="l1-btn primary" type="button" data-action="check-order">순서 확인하기</button>
                    </div>
                </div>
            </div>`;
        updateOrderBoard();
        content.scrollTop = 0;
    }

    function updateOrderBoard() {
        const zone = $('#l1-sort-zone');
        const pool = $('#l1-order-pool');

        zone.innerHTML = state.course.lines.map((targetLine, index) => {
            const selectedLine = state.selectedOrder[index];
            return `
            <div class="l1-order-slot-row" data-order-slot="${index}">
                <div class="l1-order-slot-left">
                    <span class="l1-order-num">${index + 1}</span>
                    ${selectedLine ? `
                        <button class="l1-choice l1-draggable-choice l1-placed-choice" type="button" data-remove-order="${index}" draggable="true" data-drag-remove="${index}">
                            <span class="l1-drag-handle">⋮⋮</span> ${avatar(selectedLine.speaker)} <strong>${escapeHtml(selectedLine.text)}</strong> <span class="l1-choice-sound" data-speak-text="${escapeHtml(selectedLine.text)}" title="소리 듣기">🔊</span> <span class="l1-remove-btn" title="카드 빼기">✕</span>
                        </button>
                    ` : `
                        <div class="l1-slot-placeholder" data-order-slot="${index}">🖐️ 여기에 문장 카드를 드래그하거나 선택하세요</div>
                    `}
                </div>
                <div class="l1-order-slot-right">
                    <div class="l1-order-ko-badge">💬 ${escapeHtml(targetLine.ko)}</div>
                </div>
            </div>`;
        }).join('');

        const remaining = state.orderPool.filter(line => !state.selectedOrder.includes(line));
        pool.innerHTML = remaining.map(line => `
            <button class="l1-choice l1-draggable-choice" type="button" draggable="true" data-add-order="${line.original}" data-drag-order="${line.original}">
                <span class="l1-drag-handle">⋮⋮</span> ${avatar(line.speaker)} ${escapeHtml(line.text)} <span>🔊</span>
            </button>`).join('');
    }

    function setupWordMatching() {
        const vocabList = levelVocabulary[state.level] || dailyVocabulary;
        const entries = vocabList.map((word, index) => ({ ...word, key: index }));
        state.matchEnglish = shuffled(entries);
        state.matchKorean = shuffled(entries);
        state.matchSelectedEnglish = null;
        state.matchSelectedKorean = null;
        state.matchedWords = new Set();
        state.matchTargetCount = entries.length;
        state.locked = false;
    }

    function renderWordMatching(reset = true) {
        stopAudio();
        if (reset) setupWordMatching();
        content.innerHTML = `
            <div class="l1-page">
                ${lessonHeader(3, '단어 짝 맞추기 🧩', '왼쪽 영어 카드를 오른쪽 한국어 카드로 직접 드래그하여 연결하세요!')}
                <div class="l1-card">
                    <div class="l1-match-board">
                        <div class="l1-match-column">
                            <h3>English</h3>
                            ${state.matchEnglish.map(word => `
                                <button class="l1-match-card english l1-draggable-choice" type="button" draggable="true"
                                    data-match-side="english" data-match-key="${word.key}">
                                    <span class="l1-drag-handle">⋮⋮</span> ${escapeHtml(word.en)} <span>🔊</span>
                                </button>`).join('')}
                        </div>
                        <div class="l1-match-column">
                            <h3>한국어</h3>
                            ${state.matchKorean.map(word => `
                                <button class="l1-match-card korean" type="button"
                                    data-match-side="korean" data-match-key="${word.key}">
                                    ${escapeHtml(word.ko)}
                                </button>`).join('')}
                        </div>
                    </div>
                    <div class="l1-feedback" id="l1-match-feedback">영어 카드를 한국어 카드로 직접 드래그하거나 클릭하여 연결해 보세요.</div>
                </div>
            </div>`;
        content.scrollTop = 0;
        updateMatchBoard();
    }

    function updateMatchBoard() {
        $$('.l1-match-card').forEach(card => {
            const key = Number(card.dataset.matchKey);
            const side = card.dataset.matchSide;
            card.classList.toggle('matched', state.matchedWords.has(key));
            card.classList.toggle('selected',
                side === 'english' ? state.matchSelectedEnglish === key : state.matchSelectedKorean === key
            );
            card.disabled = state.matchedWords.has(key);
        });
    }

    function setupSentenceBuilder(index = 0) {
        state.builderIndex = index;
        state.builderSelected = [];
        state.builderAnswered = false;
        state.locked = false;
        const words = state.course.lines[index].text.match(/[A-Za-z]+(?:'[A-Za-z]+)?/g) || [];
        state.builderPool = shuffled(words.map((text, original) => ({
            id: `${index}-${original}`,
            text,
            original
        })));
    }

    function renderSentenceBuilder(reset = true) {
        stopAudio();
        if (reset) setupSentenceBuilder(0);
        const line = state.course.lines[state.builderIndex];
        content.innerHTML = `
            <div class="l1-page">
                ${lessonHeader(4, '한국어 듣고 영어 순서 배열하기 🧩', '캐릭터가 말하는 한국어를 듣고 영어 단어를 순서대로 눌러 문장을 완성하세요.')}
                <div class="l1-card l1-builder-card">
                    <div class="l1-sentence-count">문장 ${state.builderIndex + 1} / 4</div>
                    <div class="l1-builder-speaker">
                        <span class="l1-builder-avatar">${avatar(line.speaker)}</span>
                        <div class="l1-builder-bubble">
                            <button class="l1-sound-btn" type="button" data-action="hear-builder-korean" aria-label="한국어 다시 듣기">🔊</button>
                            <strong>${escapeHtml(line.ko)}</strong>
                        </div>
                    </div>
                    <div class="l1-word-answer" id="l1-builder-answer" aria-label="선택한 영어 단어"></div>
                    <div class="l1-word-bank" id="l1-builder-bank" aria-label="영어 단어 카드"></div>
                    <div class="l1-feedback" id="l1-builder-feedback">아래 영어 단어를 문장 순서대로 눌러 보세요.</div>
                    <div class="l1-action-row" id="l1-builder-actions">
                        <button class="l1-btn" type="button" data-action="reset-builder">다시 놓기</button>
                        <button class="l1-btn primary" type="button" data-action="check-builder">정답 확인</button>
                    </div>
                </div>
            </div>`;
        updateSentenceBuilderBoard();
        content.scrollTop = 0;
        setTimeout(() => {
            if (!state.locked) speakKorean(line.ko, line.speaker);
        }, 300);
    }

    function updateSentenceBuilderBoard() {
        const answer = $('#l1-builder-answer');
        const bank = $('#l1-builder-bank');
        if (!answer || !bank) return;
        answer.innerHTML = state.builderSelected.length
            ? state.builderSelected.map((word, index) => `
                <button class="l1-word-chip selected l1-draggable-choice" type="button" draggable="true" data-builder-remove="${index}" data-builder-drag-index="${index}">
                    <span class="l1-drag-handle">⋮⋮</span> ${escapeHtml(word.text)}
                </button>`).join('')
            : '<span class="l1-builder-placeholder">🖐️ 아래 단어를 이 자리로 직접 드래그해 놓으세요!</span>';
        const selectedIds = new Set(state.builderSelected.map(word => word.id));
        bank.innerHTML = state.builderPool
            .filter(word => !selectedIds.has(word.id))
            .map(word => `
                <button class="l1-word-chip l1-draggable-choice" type="button" draggable="true" data-builder-add="${word.id}">
                    <span class="l1-drag-handle">⋮⋮</span> ${escapeHtml(word.text)} <span>🔊</span>
                </button>`).join('');
    }

    function setupTranslation(index = 0) {
        state.translationIndex = index;
        state.translationAnswered = false;
        state.locked = false;
        const correct = state.course.lines[index];
        const distractors = shuffled(state.course.lines.filter((_, lineIndex) => lineIndex !== index)).slice(0, 2);
        state.translationOptions = shuffled([correct, ...distractors]);
    }

    function renderTranslation(reset = true) {
        stopAudio();
        if (reset) setupTranslation(0);
        const line = state.course.lines[state.translationIndex];
        content.innerHTML = `
            <div class="l1-page">
                ${lessonHeader(5, '한국어를 영어로 통역하기 🌏', '한국어 뜻에 맞는 영어를 고르고 큰 소리로 말해 보세요.')}
                <div class="l1-card l1-translation-card">
                    <div class="l1-sentence-count">통역 ${state.translationIndex + 1} / 4</div>
                    <p class="l1-korean-label">이 문장을 영어로 말하면?</p>
                    <div class="l1-korean-prompt">“${escapeHtml(line.ko)}”</div>
                    ${state.translationAnswered ? `
                        <div class="l1-translation-success">
                            <span>정답</span>
                            <strong>${escapeHtml(line.text)}</strong>
                            <button class="l1-sound-btn" type="button" data-action="hear-translation">🔊</button>
                        </div>
                        <p class="l1-say-guide">🎤 위 영어 문장을 큰 소리로 말해 보세요.</p>
                        <div class="l1-action-row">
                            <button class="l1-btn primary l1-pass-btn" type="button" data-action="pass-translation">통과 ✓</button>
                        </div>
                    ` : `
                        <div class="l1-choice-grid l1-translation-options">
                            ${state.translationOptions.map((option, index) => `
                                <button class="l1-choice" type="button" data-translation-option="${index}">
                                    ${escapeHtml(option.text)} <span>🔊</span>
                                </button>`).join('')}
                        </div>
                        <div class="l1-feedback" id="l1-translation-feedback">카드를 누르면 발음이 먼저 나와요.</div>
                    `}
                </div>
            </div>`;
        content.scrollTop = 0;
    }

    function renderSpeaking(reset = true) {
        stopAudio();
        state.currentStep = 5;
        if (reset) state.speakingIndex = 0;
        const line = state.course.lines[state.speakingIndex];
        const hasRec = window.VoiceRecorder && window.VoiceRecorder.hasRecording(line.text);
        content.innerHTML = `
            <div class="l1-page">
                ${lessonHeader(6, '한국어를 영어로 말하기 & 녹음하기 🎤', '영어로 말하면서 🎙️ 버튼을 눌러 본인의 목소리를 녹음해 보세요!')}
                <div class="l1-card l1-speaking-card">
                    <div class="l1-sentence-count">문장 ${state.speakingIndex + 1} / 4</div>
                    <div class="l1-speaking-characters">
                        <span class="l1-big-avatar">${avatar(line.speaker)}</span>
                    </div>
                    <p class="l1-korean-label">이 문장을 영어로 통역해 말해보세요.</p>
                    <div class="l1-speech-target l1-speaking-korean-target">“${escapeHtml(line.ko)}”</div>
                    
                    <div style="margin: 18px 0; display: flex; gap: 10px; justify-content: center; align-items: center; flex-wrap: wrap;">
                        <button class="l1-audio-btn tts-btn" type="button" data-play-tts="${state.speakingIndex}" style="padding: 12px 16px; font-size: 0.95rem;">
                            🤖 AI 원음 들어보기 (TTS)
                        </button>
                        <button class="l1-rec-btn ${hasRec ? 'has-rec' : ''}" type="button" data-record-text="${escapeHtml(line.text)}" style="padding: 12px 18px; font-size: 0.95rem;">
                            ${hasRec ? '🎙️ 내 목소리 다시 녹음하기' : '🎙️ 내 목소리로 녹음하기'}
                        </button>
                        ${hasRec ? `<button class="l1-audio-btn rec-play-btn has-rec" type="button" data-play-recorded="${escapeHtml(line.text)}" style="padding: 12px 16px; font-size: 0.95rem;">🎤 내 녹음 들어보기</button>` : ''}
                    </div>

                    <p class="l1-say-guide">학생의 녹음 또는 답을 확인한 뒤 통과 버튼을 눌러 주세요.</p>
                    <button class="l1-btn primary l1-pass-btn" type="button" data-action="pass-speaking">통과 ✓</button>
                </div>
            </div>`;
        content.scrollTop = 0;
    }

    function finishCourse() {
        stopAudio();
        state.completed.add(6);
        if (!state.courseRewarded) {
            state.courseRewarded = true;
            state.rewards.hearts = 5;
            const todayKey = new Date().toISOString().slice(0, 10);
            if (state.rewards.lastStudyDate !== todayKey) {
                state.rewards.streak += 1;
                state.rewards.lastStudyDate = todayKey;
            }
            reward(50, 12);
        }
        updateHeader();
        confetti();
        content.innerHTML = `
            <div class="l1-page l1-complete">
                <div>
                    <div class="l1-complete-badge" id="l1-complete-badge-wrap">
                        <canvas id="l1-complete-canvas" width="160" height="160"></canvas>
                        <div class="l1-complete-crown-tag">🏆 CHAMPION!</div>
                    </div>
                    <h1>LEVEL ${state.level} 완주!</h1>
                    <p>${state.course.icon} ${escapeHtml(state.course.title)}의 6단계 반복 학습을 모두 마쳤어요.</p>
                    <div class="l1-reward-summary">
                        <span>⚡ +50 XP</span>
                        <span>💎 +12</span>
                        <span>🔥 ${state.rewards.streak}</span>
                    </div>
                    <div class="l1-action-row">
                        <button class="l1-btn" type="button" data-action="back-map">맵으로 돌아가기</button>
                        ${state.level < courses.length
                            ? '<button class="l1-btn primary" type="button" data-action="next-level">다음 레벨 시작</button>'
                            : '<button class="l1-btn primary" type="button" data-action="restart-listening">다시 연습하기</button>'}
                    </div>
                </div>
            </div>`;
        if (window.initL1CompleteCanvas) window.initL1CompleteCanvas();
        showJaeMotion('레벨 완주!');
        window.dispatchEvent(new CustomEvent('dialogueCourseComplete', {
            detail: { level: state.level, xp: 50, gems: 12 }
        }));
    }

    function markStageComplete(stage, xp, gems, next) {
        if (!state.completed.has(stage)) reward(xp, gems);
        state.completed.add(stage);
        updateHeader();
        showJaeMotion('아주 잘했어요!');
        setTimeout(next, 750);
    }

    function returnToMap() {
        stopAudio();
        shell.classList.add('hidden');
        document.getElementById('map-area')?.classList.remove('hidden');
        document.getElementById('stage-input-modal')?.classList.add('hidden');
    }

    function startCourse(level = 1) {
        const safeLevel = Math.max(1, Math.min(courses.length, Number(level) || 1));
        state.level = safeLevel;
        state.course = courses[safeLevel - 1];
        state.completed = new Set();
        state.courseRewarded = false;
        state.locked = false;
        document.getElementById('map-area')?.classList.add('hidden');
        document.getElementById('stage-input-modal')?.classList.add('hidden');
        document.getElementById('battle-view')?.classList.add('hidden');
        shell.classList.remove('hidden');
        updateHeader();
        renderListening(true);
    }

    function confetti(count = 70) {
        const layer = $('#l1-confetti');
        const colors = ['#58cc02', '#1cb0f6', '#ff9600', '#ce82ff', '#ff4b4b', '#ffc800'];
        for (let index = 0; index < count; index++) {
            const piece = document.createElement('i');
            piece.style.left = `${Math.random() * 100}%`;
            piece.style.background = colors[index % colors.length];
            piece.style.setProperty('--time', `${2.2 + Math.random() * 2}s`);
            piece.style.setProperty('--drift', `${-100 + Math.random() * 200}px`);
            piece.style.animationDelay = `${Math.random() * .7}s`;
            layer.appendChild(piece);
            setTimeout(() => piece.remove(), 5000);
        }
    }

    function handleClick(event) {
        const playTtsBtn = event.target.closest('[data-play-tts]');
        if (playTtsBtn) {
            stopAudio();
            const index = Number(playTtsBtn.dataset.playTts);
            const line = state.course.lines[index];
            if (line) speakTTS(line.text, .86, line.speaker);
            return;
        }

        const setAudioPref = event.target.closest('[data-set-audio-pref]');
        if (setAudioPref) {
            state.audioPreference = setAudioPref.dataset.setAudioPref;
            toast(state.audioPreference === 'student' ? '🎤 학생 녹음 음성 모드로 변경되었습니다.' : '🤖 AI 원 음성 (TTS) 모드로 변경되었습니다.');
            renderListening(false);
            return;
        }

        const recBtn = event.target.closest('[data-record-text]');
        if (recBtn) {
            const textKey = recBtn.dataset.recordText;
            if (window.VoiceRecorder) {
                if (window.VoiceRecorder.isRecording) {
                    window.VoiceRecorder.stopRecording();
                } else {
                    recBtn.classList.add('is-recording');
                    recBtn.innerHTML = '⏹️ 녹음 중... (누르면 완료)';
                    window.VoiceRecorder.startRecording(textKey, (res) => {
                        if (res.state === 'stopped') {
                            toast('🎤 학생 음성이 저장되었어요!');
                            if (state.currentStep === 5) renderSpeaking(false);
                            else renderListening(false);
                        } else if (res.state === 'error') {
                            recBtn.classList.remove('is-recording');
                            recBtn.innerHTML = '🎙️ 학생 녹음';
                        }
                    });
                }
            }
            return;
        }

        const playRecBtn = event.target.closest('[data-play-recorded]');
        if (playRecBtn) {
            const textKey = playRecBtn.dataset.playRecorded;
            if (window.VoiceRecorder) {
                window.VoiceRecorder.play(textKey);
            }
            return;
        }

        const speakLine = event.target.closest('[data-speak-line]');
        if (speakLine) {
            stopAudio();
            const line = state.course.lines[Number(speakLine.dataset.speakLine)];
            speak(line.text, .86, line.speaker);
            return;
        }

        const addOrder = event.target.closest('[data-add-order]');
        if (addOrder) {
            const line = state.orderPool.find(item => item.original === Number(addOrder.dataset.addOrder));
            if (line) {
                state.selectedOrder.push(line);
                stopAudio();
                speak(line.text, .86, line.speaker);
            }
            updateOrderBoard();
            return;
        }

        const removeOrder = event.target.closest('[data-remove-order]');
        if (removeOrder) {
            const speakBtn = event.target.closest('[data-speak-text]');
            if (speakBtn) {
                stopAudio();
                speak(speakBtn.dataset.speakText);
                return;
            }
            state.selectedOrder.splice(Number(removeOrder.dataset.removeOrder), 1);
            updateOrderBoard();
            return;
        }

        const matchCard = event.target.closest('[data-match-side]');
        if (matchCard && !state.locked) {
            const key = Number(matchCard.dataset.matchKey);
            const side = matchCard.dataset.matchSide;
            if (state.matchedWords.has(key)) return;
            const word = dailyVocabulary[key];
            stopAudio();
            speak(word.en, .75);

            if (side === 'english') state.matchSelectedEnglish = key;
            else state.matchSelectedKorean = key;
            updateMatchBoard();

            if (state.matchSelectedEnglish !== null && state.matchSelectedKorean !== null) {
                state.locked = true;
                const feedback = $('#l1-match-feedback');
                if (state.matchSelectedEnglish === state.matchSelectedKorean) {
                    state.matchedWords.add(key);
                    feedback.className = 'l1-feedback good';
                    feedback.textContent = `${word.en} = ${word.ko} · 정답이에요!`;
                    reward(2, 0);
                    updateMatchBoard();

                    if (state.matchedWords.size === state.matchTargetCount) {
                        markStageComplete(3, 20, 3, () => renderSentenceBuilder(true));
                    } else {
                        showJaeMotion('단어 짝 정답!');
                        setTimeout(() => {
                            state.matchSelectedEnglish = null;
                            state.matchSelectedKorean = null;
                            state.locked = false;
                            feedback.className = 'l1-feedback';
                            feedback.textContent = `${state.matchedWords.size} / ${state.matchTargetCount}개를 연결했어요.`;
                            updateMatchBoard();
                        }, 700);
                    }
                } else {
                    feedback.className = 'l1-feedback bad';
                    feedback.textContent = '서로 다른 뜻이에요. 다시 골라 보세요.';
                    loseHeart();
                    setTimeout(() => {
                        state.matchSelectedEnglish = null;
                        state.matchSelectedKorean = null;
                        state.locked = false;
                        feedback.className = 'l1-feedback';
                        feedback.textContent = '영어와 알맞은 한국어 뜻을 다시 연결하세요.';
                        updateMatchBoard();
                    }, 700);
                }
            }
            return;
        }

        const builderAdd = event.target.closest('[data-builder-add]');
        if (builderAdd && !state.locked) {
            const word = state.builderPool.find(item => item.id === builderAdd.dataset.builderAdd);
            if (word && !state.builderSelected.some(item => item.id === word.id)) {
                state.builderSelected.push(word);
                stopAudio();
                speak(word.text, .76, state.course.lines[state.builderIndex].speaker);
                updateSentenceBuilderBoard();
            }
            return;
        }

        const builderRemove = event.target.closest('[data-builder-remove]');
        if (builderRemove && !state.locked) {
            const [word] = state.builderSelected.splice(Number(builderRemove.dataset.builderRemove), 1);
            if (word) {
                stopAudio();
                speak(word.text, .76, state.course.lines[state.builderIndex].speaker);
            }
            updateSentenceBuilderBoard();
            return;
        }

        const translationOption = event.target.closest('[data-translation-option]');
        if (translationOption && !state.locked) {
            const option = state.translationOptions[Number(translationOption.dataset.translationOption)];
            stopAudio();
            speak(option.text, .82, option.speaker);
            if (option.text === state.course.lines[state.translationIndex].text) {
                state.locked = true;
                state.translationAnswered = true;
                reward(3, 0);
                showJaeMotion('통역 정답!');
                setTimeout(() => renderTranslation(false), 650);
            } else {
                const feedback = $('#l1-translation-feedback');
                feedback.className = 'l1-feedback bad';
                feedback.textContent = '뜻이 조금 달라요. 다른 문장도 들어 보세요.';
                loseHeart();
            }
            return;
        }

        const actionButton = event.target.closest('[data-action]');
        if (!actionButton) return;
        const action = actionButton.dataset.action;

        if (action === 'listen-all') playDialogue(.92);
        else if (action === 'listen-slow') playDialogue(.66);
        else if (action === 'finish-listening') {
            markStageComplete(1, 10, 1, () => renderOrdering(true));
        } else if (action === 'reset-order') {
            renderOrdering(true);
        } else if (action === 'check-order') {
            const feedback = $('#l1-order-feedback');
            if (state.selectedOrder.length !== 4) {
                feedback.className = 'l1-feedback bad';
                feedback.textContent = '4개 문장을 모두 골라 주세요.';
            } else if (state.selectedOrder.every((line, index) => line.original === index)) {
                feedback.className = 'l1-feedback good';
                feedback.textContent = '자연스러운 대화 순서예요!';
                markStageComplete(2, 15, 2, () => renderWordMatching(true));
            } else {
                feedback.className = 'l1-feedback bad';
                feedback.textContent = '첫 질문과 대답의 순서를 다시 생각해 보세요.';
                loseHeart();
            }
        } else if (action === 'hear-builder-korean') {
            stopAudio();
            const line = state.course.lines[state.builderIndex];
            speakKorean(line.ko, line.speaker);
        } else if (action === 'reset-builder') {
            setupSentenceBuilder(state.builderIndex);
            renderSentenceBuilder(false);
        } else if (action === 'check-builder') {
            const feedback = $('#l1-builder-feedback');
            const wordCount = state.builderPool.length;
            if (state.builderSelected.length !== wordCount) {
                feedback.className = 'l1-feedback bad';
                feedback.textContent = '모든 영어 단어를 순서대로 놓아 주세요.';
            } else if (state.builderSelected.every((word, index) => word.original === index)) {
                state.locked = true;
                state.builderAnswered = true;
                feedback.className = 'l1-feedback good';
                feedback.textContent = '영어 문장을 정확한 순서로 완성했어요! 전체 문장을 들어 보세요.';
                reward(3, 0);
                showJaeMotion('문장 배열 정답!');
                const completedLine = state.course.lines[state.builderIndex];
                setTimeout(() => {
                    if (state.builderAnswered && state.course.lines[state.builderIndex] === completedLine) {
                        stopAudio();
                        speak(completedLine.text, .82, completedLine.speaker);
                    }
                }, 480);
                $('#l1-builder-actions').innerHTML = `
                    <button class="l1-btn primary" type="button" data-action="next-builder">
                        ${state.builderIndex < 3 ? '다음 문장' : '통역 단계로'}
                    </button>`;
            } else {
                feedback.className = 'l1-feedback bad';
                feedback.textContent = '단어 순서를 다시 생각해 보세요. 선택한 단어를 눌러 뺄 수 있어요.';
                loseHeart();
            }
        } else if (action === 'next-builder') {
            if (state.builderIndex < 3) {
                setupSentenceBuilder(state.builderIndex + 1);
                renderSentenceBuilder(false);
            } else {
                markStageComplete(4, 20, 3, () => renderTranslation(true));
            }
        } else if (action === 'hear-translation') {
            stopAudio();
            const line = state.course.lines[state.translationIndex];
            speak(line.text, .78, line.speaker);
        } else if (action === 'pass-translation') {
            if (state.translationIndex < 3) {
                setupTranslation(state.translationIndex + 1);
                renderTranslation(false);
            } else {
                markStageComplete(5, 20, 3, () => renderSpeaking(true));
            }
        } else if (action === 'pass-speaking') {
            reward(5, 0);
            showJaeMotion('말하기 통과!');
            setTimeout(() => {
                if (state.speakingIndex < 3) {
                    state.speakingIndex++;
                    renderSpeaking(false);
                } else {
                    finishCourse();
                }
            }, 700);
        } else if (action === 'restart-listening') {
            state.completed = new Set();
            state.courseRewarded = false;
            updateHeader();
            renderListening(true);
        } else if (action === 'back-map') {
            returnToMap();
        } else if (action === 'next-level') {
            startCourse(state.level + 1);
        }
    }

    function initDragAndDrop() {
        let draggedData = null;
        let activeTouch = null;
        let touchGhost = null;
        let touchSourceEl = null;

        function triggerTouchDrop(targetSlot, data) {
            if (!data || !targetSlot) return;

            if (data.type === 'order') {
                const slot = targetSlot.closest('[data-order-slot]');
                if (slot) {
                    const slotIndex = Number(slot.dataset.orderSlot);
                    const line = state.orderPool.find(item => item.original === data.original);
                    if (line) {
                        state.selectedOrder[slotIndex] = line;
                        stopAudio();
                        speak(line.text, .86, line.speaker);
                        updateOrderBoard();
                    }
                }
                return;
            }

            if (data.type === 'match') {
                const koreanCard = targetSlot.closest('[data-match-side="korean"]');
                if (koreanCard && !state.locked) {
                    const koreanKey = Number(koreanCard.dataset.matchKey);
                    state.matchSelectedEnglish = data.key;
                    state.matchSelectedKorean = koreanKey;

                    const word = dailyVocabulary[data.key];
                    stopAudio();
                    speak(word.en, .75);
                    updateMatchBoard();

                    if (state.matchSelectedEnglish === state.matchSelectedKorean) {
                        state.matchedWords.add(data.key);
                        const feedback = $('#l1-match-feedback');
                        if (feedback) {
                            feedback.className = 'l1-feedback good';
                            feedback.textContent = `${word.en} = ${word.ko} · 정답이에요!`;
                        }
                        reward(2, 0);
                        updateMatchBoard();

                        if (state.matchedWords.size === state.matchTargetCount) {
                            markStageComplete(3, 20, 3, () => renderSentenceBuilder(true));
                        } else {
                            showJaeMotion('단어 짝 정답!');
                            setTimeout(() => {
                                state.matchSelectedEnglish = null;
                                state.matchSelectedKorean = null;
                                state.locked = false;
                                if (feedback) {
                                    feedback.className = 'l1-feedback';
                                    feedback.textContent = `${state.matchedWords.size} / ${state.matchTargetCount}개를 연결했어요.`;
                                }
                                updateMatchBoard();
                            }, 700);
                        }
                    } else {
                        const feedback = $('#l1-match-feedback');
                        if (feedback) {
                            feedback.className = 'l1-feedback bad';
                            feedback.textContent = '서로 다른 뜻이에요. 다시 골라 보세요.';
                        }
                        loseHeart();
                        setTimeout(() => {
                            state.matchSelectedEnglish = null;
                            state.matchSelectedKorean = null;
                            state.locked = false;
                            if (feedback) {
                                feedback.className = 'l1-feedback';
                                feedback.textContent = '영어와 알맞은 한국어 뜻을 다시 연결하세요.';
                            }
                            updateMatchBoard();
                        }, 700);
                    }
                }
                return;
            }

            if (data.type === 'builder') {
                const answerZone = targetSlot.closest('#l1-builder-answer');
                if (answerZone && !state.locked) {
                    const word = state.builderPool.find(item => item.id === data.wordId);
                    if (word && !state.builderSelected.some(item => item.id === word.id)) {
                        state.builderSelected.push(word);
                        stopAudio();
                        speak(word.text, .76, state.course.lines[state.builderIndex].speaker);
                        updateSentenceBuilderBoard();
                    }
                }
                return;
            }

            if (data.type === 'builder-reorder') {
                const targetChip = targetSlot.closest('[data-builder-drag-index]');
                if (targetChip && !state.locked) {
                    const toIndex = Number(targetChip.dataset.builderDragIndex);
                    const fromIndex = data.fromIndex;
                    if (fromIndex !== undefined && toIndex !== undefined && fromIndex !== toIndex) {
                        const [movedWord] = state.builderSelected.splice(fromIndex, 1);
                        state.builderSelected.splice(toIndex, 0, movedWord);
                        stopAudio();
                        speak(movedWord.text, .76, state.course.lines[state.builderIndex].speaker);
                        updateSentenceBuilderBoard();
                    }
                }
                return;
            }
        }

        // Instant Touch Handlers (zero long-press delay)
        content.addEventListener('touchstart', (e) => {
            const draggable = e.target.closest('.l1-draggable-choice');
            if (!draggable) return;

            activeTouch = e.touches[0];
            touchSourceEl = draggable;

            const matchCard = draggable.closest('[data-match-side="english"]');
            if (matchCard) {
                draggedData = { type: 'match', key: Number(matchCard.dataset.matchKey) };
            } else if (draggable.closest('[data-drag-order]')) {
                draggedData = { type: 'order', original: Number(draggable.dataset.dragOrder) };
            } else if (draggable.closest('[data-builder-drag-index]')) {
                draggedData = { type: 'builder-reorder', fromIndex: Number(draggable.dataset.builderDragIndex) };
            } else if (draggable.closest('[data-builder-add]')) {
                draggedData = { type: 'builder', wordId: draggable.dataset.builderAdd };
            }
        }, { passive: true });

        content.addEventListener('touchmove', (e) => {
            if (!touchSourceEl || !draggedData) return;
            const touch = e.touches[0];

            if (!touchGhost) {
                touchGhost = touchSourceEl.cloneNode(true);
                touchGhost.style.position = 'fixed';
                touchGhost.style.pointerEvents = 'none';
                touchGhost.style.zIndex = '9999';
                touchGhost.style.opacity = '0.88';
                touchGhost.style.transform = 'scale(1.04)';
                touchGhost.style.boxShadow = '0 8px 20px rgba(0,0,0,0.18)';
                document.body.appendChild(touchGhost);
                touchSourceEl.classList.add('dragging');
            }

            touchGhost.style.left = `${touch.clientX - 40}px`;
            touchGhost.style.top = `${touch.clientY - 20}px`;

            const elemBelow = document.elementFromPoint(touch.clientX, touch.clientY);
            $$('.drag-over').forEach(el => el.classList.remove('drag-over'));
            if (elemBelow) {
                const targetSlot = elemBelow.closest('[data-order-slot], [data-match-side="korean"], #l1-builder-answer, [data-builder-drag-index]');
                if (targetSlot) targetSlot.classList.add('drag-over');
            }
        }, { passive: true });

        content.addEventListener('touchend', (e) => {
            if (!touchSourceEl) return;
            if (touchGhost) {
                touchGhost.remove();
                touchGhost = null;
            }
            touchSourceEl.classList.remove('dragging');

            if (draggedData && e.changedTouches && e.changedTouches[0]) {
                const changedTouch = e.changedTouches[0];
                const elemBelow = document.elementFromPoint(changedTouch.clientX, changedTouch.clientY);
                if (elemBelow) {
                    const dropTarget = elemBelow.closest('[data-order-slot], [data-match-side="korean"], #l1-builder-answer, [data-builder-drag-index]');
                    if (dropTarget) {
                        triggerTouchDrop(dropTarget, draggedData);
                    }
                }
            }

            $$('.drag-over').forEach(el => el.classList.remove('drag-over'));
            touchSourceEl = null;
            activeTouch = null;
            draggedData = null;
        });

        content.addEventListener('dragstart', (e) => {
            const matchCard = e.target.closest('[data-match-side="english"]');
            if (matchCard) {
                const key = Number(matchCard.dataset.matchKey);
                draggedData = { type: 'match', key };
                e.dataTransfer.setData('text/plain', JSON.stringify(draggedData));
                matchCard.classList.add('dragging');
                return;
            }

            const orderChoice = e.target.closest('[data-drag-order]');
            if (orderChoice) {
                const original = Number(orderChoice.dataset.dragOrder);
                draggedData = { type: 'order', original };
                e.dataTransfer.setData('text/plain', JSON.stringify(draggedData));
                orderChoice.classList.add('dragging');
                return;
            }

            const builderPlacedChip = e.target.closest('[data-builder-drag-index]');
            if (builderPlacedChip) {
                const fromIndex = Number(builderPlacedChip.dataset.builderDragIndex);
                draggedData = { type: 'builder-reorder', fromIndex };
                e.dataTransfer.setData('text/plain', JSON.stringify(draggedData));
                builderPlacedChip.classList.add('dragging');
                return;
            }

            const builderWord = e.target.closest('[data-builder-add]');
            if (builderWord) {
                const wordId = builderWord.dataset.builderAdd;
                draggedData = { type: 'builder', wordId };
                e.dataTransfer.setData('text/plain', JSON.stringify(draggedData));
                builderWord.classList.add('dragging');
                return;
            }
        });

        content.addEventListener('dragend', () => {
            $$('.dragging').forEach(el => el.classList.remove('dragging'));
            $$('.drag-over').forEach(el => el.classList.remove('drag-over'));
            draggedData = null;
        });

        content.addEventListener('dragover', (e) => {
            const targetSlot = e.target.closest('[data-order-slot], [data-match-side="korean"], #l1-builder-answer, [data-builder-drag-index]');
            if (targetSlot) {
                e.preventDefault();
                targetSlot.classList.add('drag-over');
            }
        });

        content.addEventListener('dragleave', (e) => {
            const targetSlot = e.target.closest('[data-order-slot], [data-match-side="korean"], #l1-builder-answer, [data-builder-drag-index]');
            if (targetSlot) {
                targetSlot.classList.remove('drag-over');
            }
        });

        content.addEventListener('drop', (e) => {
            e.preventDefault();
            $$('.drag-over').forEach(el => el.classList.remove('drag-over'));

            let data = draggedData;
            try {
                const raw = e.dataTransfer.getData('text/plain');
                if (raw) data = JSON.parse(raw);
            } catch (err) {}

            if (!data) return;

            // 1. Order Step Drop
            if (data.type === 'order') {
                const slot = e.target.closest('[data-order-slot]');
                if (slot) {
                    const slotIndex = Number(slot.dataset.orderSlot);
                    const line = state.orderPool.find(item => item.original === data.original);
                    if (line) {
                        state.selectedOrder[slotIndex] = line;
                        stopAudio();
                        speak(line.text, .86, line.speaker);
                        updateOrderBoard();
                    }
                }
                return;
            }

            // 2. Match Step Drop
            if (data.type === 'match') {
                const koreanCard = e.target.closest('[data-match-side="korean"]');
                if (koreanCard && !state.locked) {
                    const koreanKey = Number(koreanCard.dataset.matchKey);
                    state.matchSelectedEnglish = data.key;
                    state.matchSelectedKorean = koreanKey;

                    const word = dailyVocabulary[data.key];
                    stopAudio();
                    speak(word.en, .75);
                    updateMatchBoard();

                    if (state.matchSelectedEnglish === state.matchSelectedKorean) {
                        state.matchedWords.add(data.key);
                        const feedback = $('#l1-match-feedback');
                        if (feedback) {
                            feedback.className = 'l1-feedback good';
                            feedback.textContent = `${word.en} = ${word.ko} · 정답이에요!`;
                        }
                        reward(2, 0);
                        updateMatchBoard();

                        if (state.matchedWords.size === state.matchTargetCount) {
                            markStageComplete(3, 20, 3, () => renderSentenceBuilder(true));
                        } else {
                            showJaeMotion('단어 짝 정답!');
                            setTimeout(() => {
                                state.matchSelectedEnglish = null;
                                state.matchSelectedKorean = null;
                                state.locked = false;
                                if (feedback) {
                                    feedback.className = 'l1-feedback';
                                    feedback.textContent = `${state.matchedWords.size} / ${state.matchTargetCount}개를 연결했어요.`;
                                }
                                updateMatchBoard();
                            }, 700);
                        }
                    } else {
                        const feedback = $('#l1-match-feedback');
                        if (feedback) {
                            feedback.className = 'l1-feedback bad';
                            feedback.textContent = '서로 다른 뜻이에요. 다시 골라 보세요.';
                        }
                        loseHeart();
                        setTimeout(() => {
                            state.matchSelectedEnglish = null;
                            state.matchSelectedKorean = null;
                            state.locked = false;
                            if (feedback) {
                                feedback.className = 'l1-feedback';
                                feedback.textContent = '영어와 알맞은 한국어 뜻을 다시 연결하세요.';
                            }
                            updateMatchBoard();
                        }, 700);
                    }
                }
                return;
            }

            // 3. Sentence Builder Drop (Add from bank)
            if (data.type === 'builder') {
                const answerZone = e.target.closest('#l1-builder-answer');
                if (answerZone && !state.locked) {
                    const word = state.builderPool.find(item => item.id === data.wordId);
                    if (word && !state.builderSelected.some(item => item.id === word.id)) {
                        state.builderSelected.push(word);
                        stopAudio();
                        speak(word.text, .76, state.course.lines[state.builderIndex].speaker);
                        updateSentenceBuilderBoard();
                    }
                }
                return;
            }

            // 4. Sentence Builder Reorder (Move placed words)
            if (data.type === 'builder-reorder') {
                const targetChip = e.target.closest('[data-builder-drag-index]');
                if (targetChip && !state.locked) {
                    const toIndex = Number(targetChip.dataset.builderDragIndex);
                    const fromIndex = data.fromIndex;
                    if (fromIndex !== undefined && toIndex !== undefined && fromIndex !== toIndex) {
                        const [movedWord] = state.builderSelected.splice(fromIndex, 1);
                        state.builderSelected.splice(toIndex, 0, movedWord);
                        stopAudio();
                        speak(movedWord.text, .76, state.course.lines[state.builderIndex].speaker);
                        updateSentenceBuilderBoard();
                    }
                }
                return;
            }
        });
    }

    function unlockAudioOnTablet() {
        if (typeof speechSynthesis !== 'undefined' && speechSynthesis.resume) {
            speechSynthesis.resume();
        }
    }
    document.addEventListener('touchstart', unlockAudioOnTablet, { passive: true });
    document.addEventListener('click', unlockAudioOnTablet, { passive: true });

    content.addEventListener('click', handleClick);
    $('#l1-back-map').addEventListener('click', returnToMap);
    initDragAndDrop();

    window.openLevelOneCourse = startCourse;
    refillHeartsForThisUpdate();
    updateHeader();
})();
