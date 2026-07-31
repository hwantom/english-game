        }, delay);
    }

    const orb = document.createElement('div');
    orb.className = 'ghost-orb';
    orb.style.cssText = `
        left: ${startX}px;
        top:  ${startY - 18}px;
        --orb-x: ${dx}px;
        --orb-dur: 0.75s;
        --orb-delay: 0ms;
    `;
    effectsLayer.appendChild(orb);

    const tint = document.createElement('div');
    tint.className = 'ghost-screen-tint';
    effectsLayer.appendChild(tint);
    setTimeout(() => tint.remove(), 1000);

    setTimeout(() => {
        orb.remove();
        if (onDone) onDone();
    }, totalDuration);
}

function handleBossAttack(ability) {
    if (bossHp <= 0 || isAnimating) return;
    isAnimating = true;
    stopPhase3Timer();

    const enemyImg = document.getElementById('enemy-img');
    const enemyContainer = document.getElementById('enemy');
    const typeStr = ability.toLowerCase();
    const hasSkillSprite = BOSS_ABILITIES.map(a => a.toLowerCase()).includes(typeStr);
    const kirbyRect = kirbySprite.getBoundingClientRect();
    const enemyRect = enemyContainer.getBoundingClientRect();
    const targetDistance = Math.max(0, enemyRect.left - kirbyRect.right - 6);

    enemyImg.dataset.bossType = '';
    enemyImg.src = currentBoss.default;
    crongCanvas.style.filter = 'none';

    kirbySprite.style.setProperty('--crong-skill-distance', `${targetDistance}px`);
    kirbySprite.classList.remove('walk-forward', 'attack', 'return-pos', 'crong-skill-close-attack');
    void kirbySprite.offsetWidth;
    kirbySprite.classList.add('crong-skill-close-attack');

    playSequence([{ state: 'idle', loops: 0 }]);

    setTimeout(() => {
        if (hasSkillSprite) {
            playSequence([{ state: typeStr, loops: 1 }, { state: 'idle', loops: 0 }]);
        }
    }, 430);

    setTimeout(() => {
        damageText.textContent = `${ability} Attack! -1`;
        damageText.classList.add('show');
        enemyContainer.style.animation = 'vibrateKirby 0.3s 3';
        bossHp -= 1;
        score += 1;
        totalCorrectAnswers += 1;
        currentCombo++;
        advanceBossIfNeeded();

        if (currentCombo >= 2) {
            comboText.textContent = `${currentCombo} Combo!`;
            comboText.classList.remove('show');
            void comboText.offsetWidth;
            comboText.classList.add('show');
        }
    }, 820);

    setTimeout(() => {
        enemyContainer.style.animation = '';
        damageText.classList.remove('show');
        kirbySprite.classList.remove('crong-skill-close-attack');
        statusBadge.textContent = `⭐ ${ability}`;
        feedback.textContent = `${ability} hit the Boss!`;
        updateUI();

        if (bossHp <= 0) {
            if (!isPhase3) {
                startPhase3();
            } else {
                triggerVictorySequence();
            }
        } else {
            currentQuestionIndex++;
            nextQuestion();
        }
    }, 1950);
}

function startPhase3() {
    isPhase3 = true;

    const enemyImg = document.getElementById('enemy-img');
    const enemyContainer = document.getElementById('enemy');

    const flash = document.createElement('div');
    flash.style.cssText = 'position: absolute; left: 0; top: 0; width: 100%; height: 100%; background: #aa00ff; z-index: 1000; opacity: 1; transition: opacity 2s ease-out; pointer-events: none; mix-blend-mode: overlay;';
    document.body.appendChild(flash);

    setTimeout(() => {
        enemyImg.dataset.bossType = '';
        enemyImg.src = 'phase3.png';
        enemyContainer.style.filter = 'drop-shadow(0 0 25px #ff0000) drop-shadow(0 0 15px #000000)';
    }, 150);

    setTimeout(() => {
        flash.style.opacity = '0';
    }, 300);

    setTimeout(() => {
        flash.remove();
    }, 2300);

    let newWords = [...failedWords];

    let pool = [];
    for(let i=1; i<stageBtns.length; i++) {
        pool = pool.concat(stageWords[i] || []);
    }
    pool.sort(() => 0.5 - Math.random());
    let extraWords = pool.slice(0, 5);

    newWords = newWords.concat(extraWords);

    if (newWords.length === 0) {
        newWords = ['Apple', 'Banana', 'Cat', 'Dog', 'Elephant'];
    }

    newWords.sort(() => 0.5 - Math.random());

    currentWords = newWords;
    currentQuestionIndex = 0;

    phase3TotalHp = currentWords.length;
    bossHp = phase3TotalHp;

    feedback.textContent = "PHASE 3! The ultimate battle begins!";
    feedback.style.color = '#ff0055';

    setTimeout(() => {
        updateUI();
        nextQuestion();
    }, 2000);
}

function triggerVictorySequence() {
    const battlefield = document.querySelector('.battlefield');

    document.getElementById('boss-hp-container').style.opacity = '0';
    document.querySelector('.hp-bar-container').style.opacity = '0';
    document.getElementById('enemy').style.opacity = '0';
    document.getElementById('ability-selector').classList.add('hidden');

    battlefield.classList.add('victory');
    crongCanvas.style.filter = 'none';

    setTimeout(() => {
        document.getElementById('kirby-sprite').classList.add('victory-jump');
        feedback.textContent = "Victory!! Defeated the Boss! 😆🎉";
        feedback.style.color = '#10B981';

        setTimeout(() => {
            currentQuestionIndex++;
            endStage();
        }, 3500);
    }, 1000);
}

function handlePass() {
    if (isAnimating) return;
    isAnimating = true;

    if (isPhase3) {
        stopPhase3Timer();
    }

    score++;

    let actionAnim = 'attack';
    if (crongEvolutionLevel === 3) actionAnim = 'stage3_fire';
    else if (crongEvolved) actionAnim = 'fire';

    playSequence([{ state: actionAnim, loops: 1 }, { state: 'idle', loops: 0 }]);

    if (crongEvolutionLevel === 3 || crongEvolved) {
        if (typeof playPunchSound === 'function') playPunchSound();
        createParticleBlast();
    } else {
        if (typeof playPunchSound === 'function') playPunchSound();
    }

    kirbySprite.classList.remove('crong-walk-forward', 'crong-return-pos', 'crong-fail-forward', 'crong-fail-return');
    kirbySprite.classList.add('crong-walk-forward');

    setTimeout(() => {
        kirbySprite.classList.remove('crong-walk-forward');
        kirbySprite.classList.add('crong-return-pos');
        setTimeout(() => kirbySprite.classList.remove('crong-return-pos'), 450);
    }, 450);

    feedback.textContent = `Great job! Correct answer! 🎉 (+10 Diamonds)`;
    feedback.style.color = 'var(--success)';
    window.addDiamonds(10, false);

    currentCombo++;
    if (currentCombo > maxCombo) maxCombo = currentCombo;
    if (currentCombo >= 2) {
        comboText.textContent = `${currentCombo} COMBO! 🔥`;
        comboText.classList.add('show');
        if (typeof playComboSound === 'function') playComboSound(currentCombo);
    }

    if (isPhase3) {
        bossHp--;
        updateUI();

        if (bossHp <= 0) {
            triggerVictorySequence();
            return;
        }
    }

    totalCorrectAnswers++;

    setTimeout(() => {
        feedback.style.color = 'var(--primary)';
        if (!crongEvolved) {
            crongCanvas.style.filter = enemyColors['Normal'];
        }
        statusBadge.textContent = `⭐ Normal`;

        currentQuestionIndex++;
        updateUI();

        const maxQ = isPhase3 ? currentWords.length : 10;
        if (currentQuestionIndex >= maxQ) {
            endStage();
        } else {
            nextQuestion();
        }
    }, 1400);
}

function handleFail() {
    if (isAnimating) return;
    isAnimating = true;

    if (isPhase3) {
        stopPhase3Timer();
    }

    const failedWord = currentWords[currentQuestionIndex];
    if (failedWord && !failedWords.includes(failedWord)) {
        failedWords.push(failedWord);
    }

    playSequence([{ state: 'walk', loops: 1 }, { state: 'attacked', loops: 1 }, { state: 'idle', loops: 0 }]);

    kirbySprite.classList.remove('crong-walk-forward', 'crong-return-pos', 'crong-fail-forward', 'crong-fail-return');
    kirbySprite.classList.add('crong-fail-forward');

    setTimeout(() => {
        kirbySprite.classList.remove('crong-fail-forward');
        kirbySprite.classList.add('crong-fail-return');
        setTimeout(() => kirbySprite.classList.remove('crong-fail-return'), 450);
    }, 450);

    kirbySprite.classList.add('fail');
    hp -= 10;
    if (hp < 0) hp = 0;

    currentCombo = 0;
    comboText.classList.remove('show');

    feedback.textContent = `Oops! Better luck next time!`;
    feedback.style.color = 'var(--danger)';

    setTimeout(() => {
        kirbySprite.classList.remove('fail');
        feedback.style.color = 'var(--primary)';

        if (!crongEvolved) {
            crongCanvas.style.filter = enemyColors['Normal'];
        }
        statusBadge.textContent = `⭐ Normal`;

        currentQuestionIndex++;
        updateUI();

        const maxQ = isPhase3 ? currentWords.length : 10;
        if (currentQuestionIndex >= maxQ) {
            endStage();
        } else {
            nextQuestion();
        }
    }, 1400);
}

function endStage() {
    isAnimating = false;
    stopPhase3Timer();
    const timerDisplay = document.getElementById('phase3-timer');
    if (timerDisplay) timerDisplay.classList.add('hidden');
    showOverlay();
}

function showOverlay() {
    if (overlay) overlay.classList.remove('hidden');
    const title = document.getElementById('overlay-title');
    const msg = document.getElementById('overlay-message');

    const isBossDefeated = (stageNum === stageBtns.length && bossHp <= 0);

    if (score >= 8 || isBossDefeated) {
        if (title) title.innerHTML = '🎉 Stage Clear! 🎉';

        if (stageNum === stageBtns.length) {
            if (msg) msg.innerHTML = `You conquered all stages! Kirby flies away on a Warp Star!`;
            if (btnNext) btnNext.textContent = "Play Again";
        } else {
            if (msg) msg.innerHTML = `Amazing! Passed with ${score}/10 points!`;
            if (btnNext) btnNext.textContent = "Back to Map";
        }

        if (stageNum === unlockedStage && unlockedStage < stageBtns.length) {
            unlockedStage++;
        }
    } else {
        if (title) title.innerHTML = '💦 Stage Failed! 💦';
        if (msg) msg.innerHTML = `Score was a bit low (${score}/10 points). Try again!`;
        if (btnNext) btnNext.textContent = "Back to Map";
    }
}

// Event Listeners
if (btnStart) btnStart.addEventListener('click', initGame);
if (btnPass) btnPass.addEventListener('click', handlePass);
if (btnFail) btnFail.addEventListener('click', handleFail);

if (btnStageCancel) {
    btnStageCancel.addEventListener('click', () => {
        if (stageInputModal) stageInputModal.classList.add('hidden');
    });
}

if (btnStageConfirm) {
    btnStageConfirm.addEventListener('click', () => {
        const raw = stageWordInput.value.split(',').map(w => w.trim()).filter(w => w.length > 0);
        const defaults = [
            ['Apple', 'Banana', 'Cat', 'Dog', 'Elephant', 'Fire', 'Good', 'Happy', 'Ice', 'Jump'],
            ['do', 'did', 'go', 'went', 'eat', 'ate', 'sleep', 'slept', 'meet', 'met'],
            ['Galaxy', 'Universe', 'Quantum', 'Mystery', 'Adventure', 'Dragon', 'Castle', 'Wizard', 'Diamond', 'Phoenix'],
        ];
        const words = raw.length > 0 ? raw : (defaults[pendingStage - 1] || defaults[0].map(x => x + pendingStage));
        stageWords[pendingStage] = words;

        if (stageInputModal) stageInputModal.classList.add('hidden');
        enterStage(pendingStage);
    });
}

if (btnBackMap) {
    btnBackMap.addEventListener('click', () => {
        if (battleView) battleView.classList.add('hidden');
        if (mapArea) mapArea.classList.remove('hidden');

        if (kirbySprite) kirbySprite.classList.remove('fail', 'inhale');
        if (crongCanvas) crongCanvas.style.filter = 'none';
        playSequence([{ state: 'idle', loops: 0 }]);
        if (statusBadge) statusBadge.textContent = '⭐ Normal';

        updateMap();
    });
}

if (btnNext) {
    btnNext.addEventListener('click', () => {
        if (overlay) overlay.classList.add('hidden');

        if (unlockedStage === stageBtns.length && score >= 8 && stageNum === stageBtns.length) {
            if (battleView) battleView.classList.add('hidden');
            stageWords = {};
            unlockedStage = 1;
            lastIconStage = 1;
            collectedAbilities = ['Normal'];
            if (setupArea) setupArea.classList.remove('hidden');
        } else {
            if (battleView) battleView.classList.add('hidden');
            if (mapArea) mapArea.classList.remove('hidden');

            if (kirbySprite) kirbySprite.classList.remove('fail', 'inhale');
            if (crongCanvas) crongCanvas.style.filter = 'none';
            playSequence([{ state: 'idle', loops: 0 }]);
            if (statusBadge) statusBadge.textContent = '⭐ Normal';

            updateMap();
        }
    });
}

function updateDashboardUI() {
    const dashTotal = document.getElementById('dash-total-correct');
    const dashUnlocked = document.getElementById('dash-unlocked-stage');
    if (dashTotal) dashTotal.textContent = totalCorrectAnswers;
    if (dashUnlocked) dashUnlocked.textContent = `${unlockedStage} / ${stageBtns.length}`;

    const dashWordLists = document.getElementById('dashboard-word-lists');
    if (dashWordLists) {
        dashWordLists.innerHTML = '';
        for (let i = 1; i <= stageBtns.length; i++) {
            const w = stageWords[i] || [];
            const div = document.createElement('div');
            div.className = 'lvl-list';
            let badgeClass = 'b-lvl' + (i > 3 ? 3 : i);
            div.innerHTML = `<span class="lvl-badge ${badgeClass}">Level ${i}</span> <span>${w.length > 0 ? w.join(', ') : '-'}</span>`;
            dashWordLists.appendChild(div);
        }
    }

    const dashFailed = document.getElementById('dash-failed-words');
    if (dashFailed) {
        if (failedWords.length > 0) {
            dashFailed.textContent = [...new Set(failedWords)].join(', ');
            dashFailed.style.color = '#DC2626';
            dashFailed.style.fontWeight = 'bold';
        } else {
            dashFailed.textContent = "None yet! Great job!";
            dashFailed.style.color = '#4B5563';
            dashFailed.style.fontWeight = 'normal';
        }
    }
}

if (btnOpenDashboard) {
    btnOpenDashboard.addEventListener('click', () => {
        updateDashboardUI();
        if (dashboardView) dashboardView.classList.remove('hidden');
    });
}

if (btnCloseDashboard) {
    btnCloseDashboard.addEventListener('click', () => {
        if (dashboardView) dashboardView.classList.add('hidden');
    });
}

if (btnDownloadDashboard) {
    btnDownloadDashboard.addEventListener('click', () => {
        const currentDate = new Date().toLocaleDateString();
        let content = `====== Kirby English Adventure: Parent Dashboard ======\n`;
        content += `Date: ${currentDate}\n\n`;
        content += `[ 🏆 Overall Progress ]\n`;
        content += `- Total Correct Answers: ${totalCorrectAnswers}\n`;
        content += `- Current Stage Unlocked: ${unlockedStage} / ${stageBtns.length}\n\n`;

        content += `[ 📚 Today's Vocabulary ]\n`;
        for (let i = 1; i <= stageBtns.length; i++) {
            const w = stageWords[i] || [];
            content += `Level ${i}: ${w.length > 0 ? w.join(', ') : '-'}\n`;
        }
        content += `\n`;

        content += `[ ⚠️ Words to Review ]\n`;
        if (failedWords.length > 0) {
            content += [...new Set(failedWords)].join(', ') + '\n';
        } else {
            content += `None yet! Great job!\n`;
        }

        content += `=======================================================\n`;

        const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `Kirby_Dashboard_${currentDate.replace(/\//g, '-')}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    });
}

updateUI();

function triggerEvolutionStage3() {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position: fixed; inset: 0; background: black; z-index: 10000; opacity: 0; transition: opacity 1.5s; display: flex; align-items: center; justify-content: center;';
    document.body.appendChild(overlay);

    setTimeout(() => {
        overlay.style.opacity = '1';
    }, 50);

    setTimeout(() => {
        overlay.style.background = 'url("evolve_background.png") center/cover no-repeat';

        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 400;
        overlay.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        let frame = 0;
        let lastTime = performance.now();
        let evolveTimer = 0;
        let timer = 0;

        const stage2Sheet = document.getElementById('crong-second-spritesheet');
        const stage3Sheet = document.getElementById('crong-third-spritesheet');

        const loop = (ts) => {
            const dt = ts - lastTime;
            lastTime = ts;
            evolveTimer += dt;
            timer += dt;

            if (timer >= 400) {
                timer = 0;
                frame++;
            }

            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const curScale = 250 / 253;
            const nextScale = 250 / 209;

            const progress = evolveTimer / 5000;
            ctx.save();

            if (progress < 0.8) {
                const freq = 0.005 + (progress * 0.05);
                const toggleValue = Math.sin(evolveTimer * freq);
                const isNextForm = toggleValue > 0;
                const glowIntensity = progress / 0.8;

                ctx.shadowColor = 'rgba(255, 255, 255, 1)';
                ctx.shadowBlur = 20 + (glowIntensity * 80);

                let activeSheet = isNextForm ? stage3Sheet : stage2Sheet;
                let activeData = isNextForm ? spriteDataThird : spriteDataSecond;
                let scale = isNextForm ? nextScale : curScale;

                if (activeSheet && activeSheet.complete && activeData && activeData.idle) {
                    const idleFrames = activeData.idle;
                    if (idleFrames.length > 0) {
                        const sFrame = idleFrames[frame % idleFrames.length];
                        const drawX = (canvas.width - sFrame.w * scale) / 2;
                        const drawY = (canvas.height - sFrame.h * scale) / 2;
                        ctx.drawImage(activeSheet, sFrame.x, sFrame.y, sFrame.w, sFrame.h, drawX, drawY, sFrame.w * scale, sFrame.h * scale);
                        ctx.globalCompositeOperation = 'source-atop';
                        ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + glowIntensity * 0.7})`;
                        ctx.fillRect(drawX, drawY, sFrame.w * scale, sFrame.h * scale);
                    }
                }
            } else if (progress < 0.85) {
                ctx.fillStyle = 'rgba(255, 255, 255, 1)';
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            } else if (progress <= 1) {
                const appearProgress = (progress - 0.85) / 0.15;
                if (stage3Sheet && stage3Sheet.complete && spriteDataThird && spriteDataThird.idle) {
                    const idleFrames = spriteDataThird.idle;
                    if (idleFrames.length > 0) {
                        const sFrame = idleFrames[frame % idleFrames.length];
                        const drawX = (canvas.width - sFrame.w * nextScale) / 2;
                        const drawY = (canvas.height - sFrame.h * nextScale) / 2;
                        ctx.drawImage(stage3Sheet, sFrame.x, sFrame.y, sFrame.w, sFrame.h, drawX, drawY, sFrame.w * nextScale, sFrame.h * nextScale);
                    }
                }
                ctx.fillStyle = `rgba(255, 255, 255, ${1 - appearProgress})`;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
            ctx.restore();

            if (progress <= 1) {
                requestAnimationFrame(loop);
            } else {
                const mainSheet = document.getElementById('crong-spritesheet');
                if (mainSheet && stage3Sheet) {
                    mainSheet.src = stage3Sheet.src;
                    spritesheet.src = stage3Sheet.src;
                }
                crongCanvas.style.filter = 'drop-shadow(0 0 18px #facc15) drop-shadow(0 0 6px #f97316)';

                overlay.style.opacity = '0';
                setTimeout(() => overlay.remove(), 1500);
            }
        };

        requestAnimationFrame(loop);
    }, 2000);
}

// --- INTRO SEQUENCE LOGIC ---
const introArea = document.getElementById('intro-area');
const introTextEl = document.getElementById('intro-text');
const introInputContainer = document.getElementById('intro-input-container');
const introNameInput = document.getElementById('intro-name-input');
const btnIntroNext = document.getElementById('btn-intro-next');
const btnIntroStart = document.getElementById('btn-intro-start');
const btnIntroSubmit = document.getElementById('btn-intro-submit');
const introCanvas = document.getElementById('intro-crong-canvas');
const introCtx = introCanvas ? introCanvas.getContext('2d') : null;

const introDialogs = [
    "Hi Jae!",
    "I'm your english buddy!",
    "Can you give me my name?"
];
let currentIntroStep = 0;
let typingTimeout = null;

function typeWriterEffect(text, element, callback) {
    element.innerHTML = '';
    let i = 0;
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            typingTimeout = setTimeout(type, 50);
        } else if (callback) {
            callback();
        }
    }
    type();
}

function showIntroDialogStep() {
    clearTimeout(typingTimeout);
    if (btnIntroNext) btnIntroNext.classList.add('hidden');
    if (introInputContainer) introInputContainer.classList.add('hidden');

    if (currentIntroStep < introDialogs.length && introTextEl) {
        typeWriterEffect(introDialogs[currentIntroStep], introTextEl, () => {
            if (currentIntroStep === 2) {
                if (introInputContainer) introInputContainer.classList.remove('hidden');
            } else {
                if (btnIntroNext) btnIntroNext.classList.remove('hidden');
            }
        });
    }
}

// --- PRE-INTRO STORY LOGIC ---
const jaeStoryArea = document.getElementById('jae-story-area');
const jaeStoryCanvas = document.getElementById('jae-story-canvas');
const btnJaeStoryNext = document.getElementById('btn-jae-story-next');
const jaeStoryCtx = jaeStoryCanvas ? jaeStoryCanvas.getContext('2d') : null;

let currentStoryRow = 0;
const totalStoryRows = 5;
const storyImage = new Image();
storyImage.src = 'jae/jae_story.png';

function drawStoryRow() {
    if (!jaeStoryCtx || !storyImage.complete || storyImage.naturalHeight === 0) return;
    const rowHeight = storyImage.naturalHeight / totalStoryRows;
    const sX = 0;
    const sY = currentStoryRow * rowHeight;
    const sW = storyImage.naturalWidth;
    const sH = rowHeight;

    jaeStoryCanvas.width = sW;
    jaeStoryCanvas.height = sH;

    jaeStoryCtx.clearRect(0, 0, jaeStoryCanvas.width, jaeStoryCanvas.height);
    jaeStoryCtx.drawImage(storyImage, sX, sY, sW, sH, 0, 0, sW, sH);
}

storyImage.onload = drawStoryRow;

if (jaeStoryArea && btnJaeStoryNext) {
    btnJaeStoryNext.addEventListener('click', () => {
        currentStoryRow++;
        if (currentStoryRow < totalStoryRows) {
            drawStoryRow();
        } else {
            jaeStoryArea.style.opacity = '0';
            setTimeout(() => {
                jaeStoryArea.classList.add('hidden');
                if (introArea) {
                    introArea.classList.remove('hidden');
                    setTimeout(() => showIntroDialogStep(), 500);
                }
            }, 1000);
        }
    });
}

if (introArea && setupArea) {
    localStorage.setItem('buddyName', '고양이공주');
    if (jaeStoryArea) jaeStoryArea.classList.add('hidden');
    introArea.classList.add('hidden');
    setupArea.classList.remove('hidden');

    let introFrameIdx = 0;
    let introLastTime = 0;
    function renderIntroCanvas(timestamp) {
        if (!introArea.classList.contains('hidden') && introCtx) {
            if (timestamp - introLastTime > 200) {
                introLastTime = timestamp;
                introFrameIdx++;
            }
            introCtx.clearRect(0, 0, introCanvas.width, introCanvas.height);
            if (spriteData && spriteData.idle && spriteData.idle.length > 0) {
                const frames = spriteData.idle;
                const f = frames[introFrameIdx % frames.length];
                const sheet = document.getElementById('crong-spritesheet');
                if (sheet && sheet.complete && sheet.naturalWidth > 0) {
                    const scale = 180 / f.w;
                    const drawX = (introCanvas.width - f.w * scale) / 2;
                    const drawY = (introCanvas.height - f.h * scale) / 2;
                    introCtx.drawImage(sheet, f.x, f.y, f.w, f.h, drawX, drawY, f.w * scale, f.h * scale);
                }
            }
        }
        requestAnimationFrame(renderIntroCanvas);
    }
    requestAnimationFrame(renderIntroCanvas);
}

// ═════════════════════════════════════════════════════════════════════════════
// 💎 DIAMOND SHOP & CHARACTER CUSTOMIZATION SYSTEM (COSTUMES & PETS)
// ═════════════════════════════════════════════════════════════════════════════

const SHOP_ITEMS = {
    clothes: [
        { id: 'clothes_default', name: '기본 의상', desc: '주인공 재의 오리지널 스타일', price: 0, isPortrait: true, icon: '👕' },
        { id: 'clothes_taekwondo', name: '태권도 도복', desc: '용맹하고 기품 있는 검은 띠 태권도 도복', price: 15, image: 'jae/jae_costume/jae_taekwondo.png' },
        { id: 'clothes_supergirl', name: '슈퍼히어로 수트', desc: '정의의 히어로 수트와 펄럭이는 빨간 망토', price: 30, image: 'jae/jae_costume/jae_supergirl.png' },
        { id: 'clothes_royal', name: '국왕 로열 롭', desc: '우아한 보라빛 왕실 롭과 금빛 장식', price: 50, image: 'jae/jae_costume/jae_royal.png' },
        { id: 'clothes_spaceship', name: '우주비행사 수트', desc: '첨단 우주 탐사 미래형 비행 수트', price: 75, image: 'jae/jae_costume/jae_spaceship.png' },
        { id: 'clothes_dragon', name: '드래곤 황금 갑옷', desc: '전설의 용맹함이 서린 드래곤 황금 갑옷', price: 100, image: 'jae/jae_costume/jae_dragon.png' }
    ],
    pets: [
        { id: 'pet_none', name: '펫 없음', desc: '동반 펫 없이 홀로 탐험', price: 0, icon: '❌' },
        { id: 'pet_dongbucat', name: '삼색이 동부캣', desc: '귀엽고 사랑스러운 삼색 아기 고양이 펫', price: 30, image: 'jae/jae_pet/dongbucat.png' },
        { id: 'pet_blackcat', name: '네로 블랙캣', desc: '매혹적인 까만 모피의 아기 검은 고양이 펫', price: 40, image: 'jae/jae_pet/blackcat.png' },
        { id: 'pet_firefox', name: '불꽃 여우 펫', desc: '따스한 불꽃 이펙트를 둘러싼 신비한 여우', price: 55, image: 'jae/jae_pet/firefox.png' },
        { id: 'pet_dragon', name: '수호 드래곤 펫', desc: '주인공의 용맹함을 지켜주는 아기 드래곤', price: 70, image: 'jae/jae_pet/dragon.png' },
        { id: 'pet_robot', name: '사이버 로봇 펫', desc: '네온 탐사 라이트가 들어오는 인공지능 로봇', price: 85, image: 'jae/jae_pet/robot.png' }
    ]
};

// Image Cache Preloader
const loadedCostumeImages = {};
const loadedPetImages = {};

function preloadShopAssets() {
    SHOP_ITEMS.clothes.forEach(item => {
        if (item.image && !item.isSprite) {
            const img = new Image();
            img.src = item.image;
            loadedCostumeImages[item.id] = img;
        }
    });
    SHOP_ITEMS.pets.forEach(item => {
        if (item.image) {
            const img = new Image();
            img.src = item.image;
            loadedPetImages[item.id] = img;
        }
    });
}
preloadShopAssets();

// --- DATA ACCESSORS ---
function getUserDiamonds() {
    const saved = localStorage.getItem('userDiamonds');
    if (saved !== null) return parseInt(saved) || 0;
    try {
        const courseRewards = JSON.parse(localStorage.getItem('dialogueCourseRewards') || '{}');
        if (typeof courseRewards.gems === 'number') {
            localStorage.setItem('userDiamonds', courseRewards.gems);
            return courseRewards.gems;
        }
    } catch(e){}
    localStorage.setItem('userDiamonds', 50);
    return 50;
}

function setUserDiamonds(amount) {
    const val = Math.max(0, parseInt(amount) || 0);
    localStorage.setItem('userDiamonds', val);
    try {
        const courseRewards = JSON.parse(localStorage.getItem('dialogueCourseRewards') || '{}');
        courseRewards.gems = val;
        localStorage.setItem('dialogueCourseRewards', JSON.stringify(courseRewards));
    } catch(e){}

    const shopCount = document.getElementById('shop-diamond-count');
    const mapCount = document.getElementById('map-diamond-count');
    if (shopCount) shopCount.textContent = val;
    if (mapCount) mapCount.textContent = val;
}

window.addDiamonds = function(amount, showToastFlag = true) {
    const current = getUserDiamonds();
    const next = current + amount;
    setUserDiamonds(next);
    if (showToastFlag && typeof toast === 'function') {
        toast(`💎 +${amount} 다이아 획득! (총 ${next}개)`);
    }
};

function getPurchasedItems() {
    try {
        const saved = JSON.parse(localStorage.getItem('userPurchasedItems') || '[]');
        const defaults = ['clothes_default', 'pet_none'];
        return Array.from(new Set([...defaults, ...saved]));
    } catch(e) {
        return ['clothes_default', 'pet_none'];
    }
}

function setPurchasedItems(arr) {
    localStorage.setItem('userPurchasedItems', JSON.stringify(arr));
}

function getEquippedItems() {
    try {
        const saved = JSON.parse(localStorage.getItem('userEquippedItems') || '{}');
        return {
            clothes: saved.clothes || 'clothes_default',
            pet: saved.pet || 'pet_none'
        };
    } catch(e) {
        return { clothes: 'clothes_default', pet: 'pet_none' };
    }
}

function setEquippedItems(obj) {
    localStorage.setItem('userEquippedItems', JSON.stringify(obj));
    if (typeof updateMap === 'function') updateMap();
}

// ═════════════════════════════════════════════════════════════════════════════
// 🎨 DYNAMIC OVERLAY CANVAS RENDERER FOR COSTUMES & PET COMPANIONS
// ═════════════════════════════════════════════════════════════════════════════
function drawCustomOverlays(ctx, centerX, centerY, scale, equipped, animFrame = 0) {
    if (!ctx) return;
    const { clothes, pet } = equipped || getEquippedItems();

    ctx.save();

    // --- 1. COSTUME IMAGE OVERLAY ---
    if (clothes && clothes !== 'clothes_default') {
        const costumeImg = loadedCostumeImages[clothes];
        if (costumeImg && costumeImg.complete && costumeImg.naturalWidth > 0) {
            const targetH = 185 * scale;
            const aspect = costumeImg.naturalWidth / costumeImg.naturalHeight;
            const costumeW = targetH * aspect;
            const costumeH = targetH;
            const drawX = centerX - costumeW / 2;
            const drawY = centerY - costumeH / 2;
            ctx.drawImage(costumeImg, drawX, drawY, costumeW, costumeH);
        }
    }

    // --- 2. PET COMPANION OVERLAY ---
    if (pet && pet !== 'pet_none') {
        const petImg = loadedPetImages[pet];
        if (petImg && petImg.complete && petImg.naturalWidth > 0) {
            const petBounce = Math.sin((Date.now() + 100) / 250) * 5;
            const petTargetH = 65 * scale;
            const petAspect = petImg.naturalWidth / petImg.naturalHeight;
            const petW = petTargetH * petAspect;
            const petH = petTargetH;
            const petX = centerX + 48 * scale;
            const petY = centerY + 12 * scale + petBounce;

            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            ctx.beginPath();
            ctx.ellipse(petX + petW / 2, petY + petH - 2, petW * 0.35, 6, 0, 0, Math.PI * 2);
            ctx.fill();

            ctx.drawImage(petImg, petX, petY, petW, petH);
        }
    }

    ctx.restore();
}

// ═════════════════════════════════════════════════════════════════════════════
// LEVEL COMPLETE BADGE ANIMATION
// ═════════════════════════════════════════════════════════════════════════════
let l1CompleteAnimTimer = null;
window.initL1CompleteCanvas = function() {
    const canvas = document.getElementById('l1-complete-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const sheet = document.getElementById('crong-spritesheet');
    if (!sheet) return;

    if (l1CompleteAnimTimer) cancelAnimationFrame(l1CompleteAnimTimer);

    let frameIdx = 0;
    let lastTime = 0;

    function renderL1Complete(timestamp) {
        if (!document.getElementById('l1-complete-canvas')) return;
        if (timestamp - lastTime > 150) {
            lastTime = timestamp;
            frameIdx++;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const bounceY = Math.abs(Math.sin(Date.now() / 200)) * 12;

        const evoLevel = typeof crongEvolutionLevel !== 'undefined' ? crongEvolutionLevel : (crongEvolved ? 2 : 1);
        let cData = evoLevel === 3 ? spriteDataThird : (evoLevel === 2 ? spriteDataSecond : spriteData);
        let sSheet = evoLevel === 3 ? document.getElementById('crong-third-spritesheet') :
                     (evoLevel === 2 ? document.getElementById('crong-second-spritesheet') : sheet);

        const equipped = getEquippedItems();
        const hasCustomClothes = equipped.clothes && equipped.clothes !== 'clothes_default';

        if (!hasCustomClothes && cData && cData.idle && cData.idle.length > 0 && sSheet && sSheet.complete) {
            const frames = cData.idle;
            const f = frames[frameIdx % frames.length];
            const scale = 110 / f.w;
            const drawX = (canvas.width - f.w * scale) / 2;
            const drawY = (canvas.height - f.h * scale) / 2 - bounceY + 8;

            ctx.drawImage(sSheet, f.x, f.y, f.w, f.h, drawX, drawY, f.w * scale, f.h * scale);
        }

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2 - bounceY;
        drawCustomOverlays(ctx, centerX, centerY, 0.8, equipped, frameIdx);

        ctx.font = '16px sans-serif';
        ctx.fillText('✨', 20 + Math.sin(Date.now() / 300) * 10, 40);
        ctx.fillText('🌟', 130 + Math.cos(Date.now() / 300) * 10, 35);
        ctx.fillText('🎉', 25, 130);
        ctx.fillText('✨', 135, 125);

        l1CompleteAnimTimer = requestAnimationFrame(renderL1Complete);
    }

    if (typeof playLevelUpSound === 'function') playLevelUpSound();
    requestAnimationFrame(renderL1Complete);
};

// ═════════════════════════════════════════════════════════════════════════════
// SHOP MODAL & UI LOGIC
// ═════════════════════════════════════════════════════════════════════════════
let shopPreviewAnimTimer = null;
let currentShopTab = 'clothes';
let shopPreviewEquipped = getEquippedItems();

function initShopSystem() {
    const btnOpenShop = document.getElementById('btn-open-shop');
    const btnMapOpenShop = document.getElementById('btn-map-open-shop');
    const btnOpenDuolingoMap = document.getElementById('btn-open-duolingo-map');
    const mapDiamondBtn = document.getElementById('map-diamond-btn');
    const btnCloseShop = document.getElementById('btn-close-shop');
    const btnGetBonusGem = document.getElementById('btn-get-bonus-gem');
    const shopDiamondBox = document.getElementById('shop-diamond-click-box');
    const btnEquipSave = document.getElementById('btn-shop-equip-save');
    const tabs = document.querySelectorAll('.shop-tab');

    if (btnOpenDuolingoMap) {
        btnOpenDuolingoMap.addEventListener('click', () => {
            if (typeof window.openCourseSelectionMap === 'function') {
                window.openCourseSelectionMap();
            }
        });
    }

    setUserDiamonds(getUserDiamonds());

    [btnOpenShop, btnMapOpenShop, mapDiamondBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                shopPreviewEquipped = getEquippedItems();
                if (shopModal) shopModal.classList.remove('hidden');
                updateShopUI();
                startShopPreviewLoop();
            });
        }
    });

    if (btnCloseShop && shopModal) {
        btnCloseShop.addEventListener('click', () => {
            shopModal.classList.add('hidden');
            if (shopPreviewAnimTimer) cancelAnimationFrame(shopPreviewAnimTimer);
        });
    }

    if (btnGetBonusGem) {
        btnGetBonusGem.addEventListener('click', (e) => {
            e.stopPropagation();
            window.addDiamonds(10, true);
            if (typeof playLevelUpSound === 'function') playLevelUpSound();
            updateShopUI();
        });
    }

    if (shopDiamondBox) {
        shopDiamondBox.addEventListener('click', () => {
            window.addDiamonds(10, true);
            if (typeof playLevelUpSound === 'function') playLevelUpSound();
            updateShopUI();
        });
    }

    if (btnEquipSave && shopModal) {
        btnEquipSave.addEventListener('click', () => {
            setEquippedItems(shopPreviewEquipped);
            if (typeof toast === 'function') toast('✨ 커스텀 의상 & 펫 조합이 적용되었어요!');
            if (typeof playLevelUpSound === 'function') playLevelUpSound();
            shopModal.classList.add('hidden');
            if (shopPreviewAnimTimer) cancelAnimationFrame(shopPreviewAnimTimer);
        });
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentShopTab = tab.getAttribute('data-tab');
            renderShopCatalog();
        });
    });
}

function updateShopUI() {
    setUserDiamonds(getUserDiamonds());
    updateEquippedLabels();
    renderShopCatalog();
}

function updateEquippedLabels() {
    const eqClothes = document.getElementById('eq-clothes-name');
    const eqPet = document.getElementById('eq-pet-name');

    const cItem = SHOP_ITEMS.clothes.find(i => i.id === shopPreviewEquipped.clothes);
    const pItem = SHOP_ITEMS.pets.find(i => i.id === shopPreviewEquipped.pet);

    if (eqClothes && cItem) eqClothes.textContent = cItem.name;
    if (eqPet && pItem) eqPet.textContent = pItem.name;
}

function renderShopCatalog() {
    const grid = document.getElementById('shop-items-grid');
    if (!grid) return;

    grid.innerHTML = '';
    const items = SHOP_ITEMS[currentShopTab] || [];
    const purchased = getPurchasedItems();
    const diamonds = getUserDiamonds();

    items.forEach(item => {
        const isOwned = purchased.includes(item.id) || item.price === 0;
        const categoryKey = currentShopTab === 'clothes' ? 'clothes' : 'pet';
        const isEquipped = getEquippedItems()[categoryKey] === item.id;
        const isPreviewing = shopPreviewEquipped[categoryKey] === item.id;

        const card = document.createElement('div');
        card.className = `shop-item-card ${isEquipped ? 'equipped' : ''} ${isPreviewing ? 'previewing' : ''}`;
        card.style.cursor = 'pointer';

        let btnHTML = '';
        if (isEquipped) {
            btnHTML = `<button class="item-btn equipped-btn" disabled>✅ 착용 중</button>`;
        } else if (isOwned) {
            btnHTML = `<button class="item-btn equip" data-id="${item.id}" data-category="${categoryKey}">✨ 착용하기</button>`;
        } else {
            const canAfford = diamonds >= item.price;
            btnHTML = `<button class="item-btn buy" data-id="${item.id}" data-price="${item.price}" data-category="${categoryKey}" ${!canAfford ? 'style="opacity:0.6; cursor:not-allowed;"' : ''}>💎 ${item.price} 구매</button>`;
        }

        let thumbHTML = '';
        if (item.isPortrait) {
            thumbHTML = `<div class="item-portrait-thumb" style="display: flex; align-items: center; justify-content: center; overflow: hidden;"><span class="l1-jae-lesson-portrait" aria-hidden="true" style="transform: scale(0.56); transform-origin: center center; margin: 0; animation: none;"></span></div>`;
        } else if (item.image) {
            thumbHTML = `<img src="${item.image}" class="item-img-thumb" alt="${item.name}" />`;
        } else {
            thumbHTML = `<div class="item-icon">${item.icon}</div>`;
        }

        card.innerHTML = `
            ${thumbHTML}
            <div class="item-name">${item.name}</div>
            <div class="item-desc">${item.desc}</div>
            ${btnHTML}
        `;

        card.addEventListener('click', () => {
            shopPreviewEquipped[categoryKey] = item.id;
            updateShopUI();
        });

        grid.appendChild(card);
    });

    grid.querySelectorAll('.item-btn.buy').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const itemId = btn.getAttribute('data-id');
            const price = parseInt(btn.getAttribute('data-price')) || 0;
            const category = btn.getAttribute('data-category');

            const currentGems = getUserDiamonds();
            if (currentGems < price) {
                if (typeof toast === 'function') toast(`💦 다이아몬드가 부족해요! (${currentGems}/${price}개)`);
                return;
            }

            setUserDiamonds(currentGems - price);
            const purchasedList = getPurchasedItems();
            purchasedList.push(itemId);
            setPurchasedItems(purchasedList);

            shopPreviewEquipped[category] = itemId;

            if (typeof toast === 'function') toast(`🎉 아이템 구매 및 착용 완료!`);
            if (typeof playLevelUpSound === 'function') playLevelUpSound();

            updateShopUI();
        });
    });

    grid.querySelectorAll('.item-btn.equip').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const itemId = btn.getAttribute('data-id');
            const category = btn.getAttribute('data-category');

            shopPreviewEquipped[category] = itemId;
            if (typeof playPunchSound === 'function') playPunchSound();

            updateShopUI();
        });
    });
}

function startShopPreviewLoop() {
    const canvas = document.getElementById('shop-preview-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const sheet = document.getElementById('crong-spritesheet');
    if (!sheet) return;

    if (shopPreviewAnimTimer) cancelAnimationFrame(shopPreviewAnimTimer);

    let frameIdx = 0;
    let lastTime = 0;

    function renderPreview(timestamp) {
        if (!document.getElementById('shop-modal') || document.getElementById('shop-modal').classList.contains('hidden')) return;

        if (timestamp - lastTime > 180) {
            lastTime = timestamp;
            frameIdx++;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const bounceY = Math.sin(Date.now() / 250) * 6;
        const currentEquipped = shopPreviewEquipped || {};
        const hasCustomClothes = currentEquipped.clothes && currentEquipped.clothes !== 'clothes_default';

        if (!hasCustomClothes) {
            const evoLevel = typeof crongEvolutionLevel !== 'undefined' ? crongEvolutionLevel : 1;
            let cData = evoLevel === 3 ? spriteDataThird : (evoLevel === 2 ? spriteDataSecond : spriteData);
            let sSheet = evoLevel === 3 ? document.getElementById('crong-third-spritesheet') :
                         (evoLevel === 2 ? document.getElementById('crong-second-spritesheet') : sheet);

            if (cData && cData.idle && cData.idle.length > 0 && sSheet && sSheet.complete) {
                const frames = cData.idle;
                const f = frames[frameIdx % frames.length];
                const scale = 140 / f.w;
                const drawX = (canvas.width - f.w * scale) / 2;
                const drawY = (canvas.height - f.h * scale) / 2 - bounceY;

                ctx.drawImage(sSheet, f.x, f.y, f.w, f.h, drawX, drawY, f.w * scale, f.h * scale);
            }
        }

        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2 - bounceY;
        drawCustomOverlays(ctx, centerX, centerY, 1, currentEquipped, frameIdx);

        shopPreviewAnimTimer = requestAnimationFrame(renderPreview);
    }

    requestAnimationFrame(renderPreview);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initShopSystem);
} else {
    initShopSystem();
}
