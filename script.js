// --- CANVAS ANIMATION DATA ---
const crongCanvas = document.getElementById('crong-canvas');
const crongCtx = crongCanvas ? crongCanvas.getContext('2d') : null;
const spritesheet = document.getElementById('crong-spritesheet');
const spritesheetSkill = document.getElementById('crong-skill-spritesheet');

let spriteData = {
    idle: [
        // 1번 반복
        { x: 0, y: 0, w: 97, h: 103 },
        { x: 97, y: 0, w: 97, h: 103 },
        { x: 194, y: 0, w: 97, h: 103 },
        // 2번 반복
        { x: 0, y: 0, w: 97, h: 103 },
        { x: 97, y: 0, w: 97, h: 103 },
        { x: 194, y: 0, w: 97, h: 103 },
        // 3번 반복
        { x: 0, y: 0, w: 97, h: 103 },
        { x: 97, y: 0, w: 97, h: 103 },
        { x: 194, y: 0, w: 97, h: 103 },
        // 손 드는 모션 (4, 5번 프레임)
        { x: 291, y: 0, w: 97, h: 103 },
        { x: 388, y: 0, w: 97, h: 103 }
    ],
    walk: [
        { x: 0, y: 103, w: 97, h: 103 },
        { x: 97, y: 103, w: 97, h: 103 },
        { x: 194, y: 103, w: 97, h: 103 },
        { x: 291, y: 103, w: 97, h: 103 },
        { x: 388, y: 103, w: 97, h: 103 }
    ],
    attack: [
        { x: 0, y: 206, w: 97, h: 103 },
        { x: 97, y: 206, w: 97, h: 103 },
        { x: 194, y: 206, w: 97, h: 103 }
    ],
    attacked: [
        { x: 291, y: 206, w: 97, h: 103 },
        { x: 388, y: 206, w: 97, h: 103 }
    ],
    fire: [
        { x: 0, y: 100, w: 95, h: 100 },
        { x: 95, y: 100, w: 95, h: 100 },
        { x: 190, y: 100, w: 95, h: 100 },
        { x: 285, y: 100, w: 95, h: 100 },
        { x: 380, y: 100, w: 95, h: 100 }
    ],
    ice: [
        { x: 0, y: 200, w: 95, h: 100 },
        { x: 95, y: 200, w: 95, h: 100 },
        { x: 190, y: 200, w: 95, h: 100 },
        { x: 285, y: 200, w: 95, h: 100 },
        { x: 380, y: 200, w: 95, h: 100 }
    ],
    spark: [
        { x: 0, y: 300, w: 95, h: 100 },
        { x: 95, y: 300, w: 95, h: 100 },
        { x: 190, y: 300, w: 95, h: 100 },
        { x: 285, y: 300, w: 95, h: 100 },
        { x: 380, y: 300, w: 95, h: 100 }
    ],
    ghost: [
        { x: 0, y: 400, w: 95, h: 100 },
        { x: 95, y: 400, w: 95, h: 100 },
        { x: 190, y: 400, w: 95, h: 100 },
        { x: 285, y: 400, w: 95, h: 100 },
        { x: 380, y: 400, w: 95, h: 100 }
    ],
    sword: [
        { x: 0, y: 500, w: 95, h: 20 },
        { x: 95, y: 500, w: 95, h: 20 },
        { x: 190, y: 500, w: 95, h: 20 },
        { x: 285, y: 500, w: 95, h: 20 },
        { x: 380, y: 500, w: 95, h: 20 }
    ]
};

let w2 = 220, h2 = 220;

function buildSecondSpriteData(fw, fh) {
    return {
        idle: [
            { x: 0, y: 0, w: fw, h: fh }, { x: fw, y: 0, w: fw, h: fh }, { x: fw * 2, y: 0, w: fw, h: fh },
            { x: 0, y: 0, w: fw, h: fh }, { x: fw, y: 0, w: fw, h: fh }, { x: fw * 2, y: 0, w: fw, h: fh },
            { x: 0, y: 0, w: fw, h: fh }, { x: fw, y: 0, w: fw, h: fh }, { x: fw * 2, y: 0, w: fw, h: fh },
            { x: fw * 3, y: 0, w: fw, h: fh }, { x: fw * 4, y: 0, w: fw, h: fh }
        ],
        walk: [{ x: 0, y: fh, w: fw, h: fh }, { x: fw, y: fh, w: fw, h: fh }, { x: fw * 2, y: fh, w: fw, h: fh }, { x: fw * 3, y: fh, w: fw, h: fh }, { x: fw * 4, y: fh, w: fw, h: fh }],
        attack: [{ x: 0, y: fh * 2, w: fw, h: fh }, { x: fw, y: fh * 2, w: fw, h: fh }, { x: fw * 2, y: fh * 2, w: fw, h: fh }],
        attacked: [{ x: fw * 3, y: fh * 2, w: fw, h: fh }, { x: fw * 4, y: fh * 2, w: fw, h: fh }],
        fire: [{ x: 0, y: fh, w: fw, h: fh }, { x: fw, y: fh, w: fw, h: fh }, { x: fw * 2, y: fh, w: fw, h: fh }, { x: fw * 3, y: fh, w: fw, h: fh }, { x: fw * 4, y: fh, w: fw, h: fh }],
        ice: [{ x: 0, y: fh * 2, w: fw, h: fh }, { x: fw, y: fh * 2, w: fw, h: fh }, { x: fw * 2, y: fh * 2, w: fw, h: fh }, { x: fw * 3, y: fh * 2, w: fw, h: fh }, { x: fw * 4, y: fh * 2, w: fw, h: fh }],
        spark: [{ x: 0, y: fh * 3, w: fw, h: fh }, { x: fw, y: fh * 3, w: fw, h: fh }, { x: fw * 2, y: fh * 3, w: fw, h: fh }, { x: fw * 3, y: fh * 3, w: fw, h: fh }, { x: fw * 4, y: fh * 3, w: fw, h: fh }],
        ghost: [{ x: 0, y: fh * 4, w: fw, h: fh }, { x: fw, y: fh * 4, w: fw, h: fh }, { x: fw * 2, y: fh * 4, w: fw, h: fh }, { x: fw * 3, y: fh * 4, w: fw, h: fh }, { x: fw * 4, y: fh * 4, w: fw, h: fh }],
        sword: [{ x: 0, y: fh * 5, w: fw, h: fh }, { x: fw, y: fh * 5, w: fw, h: fh }, { x: fw * 2, y: fh * 5, w: fw, h: fh }, { x: fw * 3, y: fh * 5, w: fw, h: fh }, { x: fw * 4, y: fh * 5, w: fw, h: fh }]
    };
}

let spriteDataSecond = buildSecondSpriteData(w2, h2);

let w3 = 209, h3 = 209;
let spriteDataThird = buildSecondSpriteData(w3, h3);

// jae_sprites.txt 파싱 → 자동으로 모든 단계 spriteData 갱신
fetch('jae/jae_sprites.txt')
    .then(r => r.text())
    .then(text => {
        const frames = [];
        for (const line of text.trim().split('\n')) {
            const parts = line.trim().split(',');
            if (parts.length < 5) continue;
            const x = parseInt(parts[1]), y = parseInt(parts[2]);
            const fw = parseInt(parts[3]), fh = parseInt(parts[4]);
            if (fw <= 1 || fh <= 1) continue;
            frames.push({ x, y, w: fw, h: fh });
        }
        if (!frames.length) return;

        w2 = frames[0].w; h2 = frames[0].h;
        w3 = frames[0].w; h3 = frames[0].h;

        const rowMap = new Map();
        for (const f of frames) {
            if (!rowMap.has(f.y)) rowMap.set(f.y, []);
            rowMap.get(f.y).push(f);
        }
        const rows = [...rowMap.entries()].sort((a, b) => a[0] - b[0]).map(([, fs]) => fs.sort((a, b) => a.x - b.x));

        const d = { idle: [], walk: [], attack: [], attacked: [], fire: [], ice: [], spark: [], ghost: [], sword: [] };
        if (rows[0]) {
            const idleRow = rows[0].slice(0, 6);
            const base = idleRow.slice(0, 3);
            d.idle = [...base, ...base, ...base, ...idleRow.slice(3)];
        }
        if (rows[1]) d.walk = rows[1].slice(0, 6);
        if (rows[2]) { d.attack = rows[2].slice(0, 3); d.attacked = rows[2].slice(3, 6); }
        if (rows[1]) d.fire = rows[1].slice(0, 6);
        if (rows[2]) d.ice = rows[2].slice(0, 6);
        if (rows[3]) d.spark = rows[3].slice(0, 6);
        if (rows[4]) d.ghost = rows[4].slice(0, 6);
        if (rows[5]) d.sword = rows[5].slice(0, 6);

        spriteData = d;
        spriteDataSecond = d;
        spriteDataThird = d;
    }).catch(() => { });

const frameIntervals = {
    idle: 500,
    walk: 120,
    attack: 120,
    attacked: 120,
    fire: 120,
    ice: 120,
    spark: 120,
    ghost: 120,
    sword: 120
};

const character = {
    state: 'idle',
    frameIndex: 0,
    x: 25,
    y: 20,
    scale: 1.5,
    animationTimer: 0,
    frameInterval: 250,
    lastTime: 0,
    sequence: [],
    sequenceIndex: 0,
    loopCount: 0,
    targetLoops: 0,
};

function changeState(newState, targetLoops = 0) {
    if (character.state !== newState || targetLoops > 0) {
        character.state = newState;
        character.frameIndex = 0;
        character.loopCount = 0;
        character.targetLoops = targetLoops;
        character.animationTimer = 0;
    }
}

function playSequence(seq) {
    character.sequence = seq;
    character.sequenceIndex = 0;
    const nextStep = character.sequence[0];
    changeState(nextStep.state, nextStep.loops);
}

function updateAnim(deltaTime) {
    character.animationTimer += deltaTime;
    const isSkill = ['fire', 'ice', 'spark', 'ghost', 'sword'].includes(character.state);
    const evoLevel = typeof crongEvolutionLevel !== 'undefined' ? crongEvolutionLevel : (crongEvolved ? 2 : 1);
    let currentData = spriteData;
    if (evoLevel === 3) currentData = spriteDataThird;
    else if (evoLevel === 2 || isSkill) currentData = spriteDataSecond;

    const usesAdvancedSpritesheet = isSkill || evoLevel >= 2;
    const currentFrames = currentData[character.state];
    const currentFrame = currentFrames ? currentFrames[character.frameIndex] : null;
    const isFourthColumnFrame = usesAdvancedSpritesheet && currentFrame && Math.round(currentFrame.x / currentFrame.w) === 3;
    const currentInterval = (frameIntervals[character.state] || character.frameInterval) * (isFourthColumnFrame ? 5 : 1);
    if (character.animationTimer >= currentInterval) {
        character.animationTimer = 0;
        character.frameIndex++;
        if (character.frameIndex >= currentFrames.length) {
            character.frameIndex = 0;
            character.loopCount++;
            if (character.targetLoops > 0 && character.loopCount >= character.targetLoops) {
                if (character.sequence.length > 0 && character.sequenceIndex < character.sequence.length - 1) {
                    character.sequenceIndex++;
                    const nextStep = character.sequence[character.sequenceIndex];
                    changeState(nextStep.state, nextStep.loops);
                }
            }
        }
    }
}

function drawAnim() {
    if (!crongCtx) return;
    crongCtx.clearRect(0, 0, crongCanvas.width, crongCanvas.height);
    const isSkill = ['fire', 'ice', 'spark', 'ghost', 'sword'].includes(character.state);
    const evoLevel = typeof crongEvolutionLevel !== 'undefined' ? crongEvolutionLevel : (crongEvolved ? 2 : 1);

    let currentData = spriteData;
    if (evoLevel === 3) currentData = spriteDataThird;
    else if (evoLevel === 2 || isSkill) currentData = spriteDataSecond;

    const frames = currentData[character.state];
    if (!frames) return;
    const frame = frames[character.frameIndex];

    let sheetToUse;
    if (evoLevel === 3) {
        sheetToUse = document.getElementById('crong-third-spritesheet');
    } else if (evoLevel === 2 || isSkill) {
        sheetToUse = document.getElementById('crong-second-spritesheet');
    } else {
        sheetToUse = spritesheet;
    }

    if (sheetToUse && sheetToUse.complete && sheetToUse.naturalWidth > 0) {
        const useAdvancedLayout = evoLevel >= 2 || isSkill;
        let scaleRef = evoLevel === 3 ? w3 : w2;
        const drawScale = useAdvancedLayout ? 195 / scaleRef : character.scale;
        const drawX = useAdvancedLayout ? 2 : character.x;
        const drawY = useAdvancedLayout ? 0 : character.y;

        crongCtx.drawImage(
            sheetToUse,
            frame.x, frame.y, frame.w, frame.h,
            drawX, drawY, frame.w * drawScale, frame.h * drawScale
        );

        const centerX = drawX + (frame.w * drawScale) / 2;
        const centerY = drawY + (frame.h * drawScale) / 2;
        if (typeof drawCustomOverlays === 'function') {
            drawCustomOverlays(crongCtx, centerX, centerY, drawScale, getEquippedItems());
        }
    }
}

function gameLoopAnim(timestamp) {
    const deltaTime = timestamp - character.lastTime;
    character.lastTime = timestamp;
    updateAnim(deltaTime);
    drawAnim();
    requestAnimationFrame(gameLoopAnim);
}

if (spritesheet && spritesheetSkill) {
    let loadedCount = 0;
    const checkLoaded = () => {
        loadedCount++;
        if (loadedCount === 2) {
            playSequence([{ state: 'idle', loops: 0 }]);
            character.lastTime = performance.now();
            requestAnimationFrame(gameLoopAnim);
        }
    };
    if (spritesheet.complete) checkLoaded(); else spritesheet.onload = checkLoaded;
    if (spritesheetSkill.complete) checkLoaded(); else spritesheetSkill.onload = checkLoaded;
}

// ── HOME SCREEN CRONG ANIMATION ──────────────────────────
(function initHomeCrong() {
    const homeCanvas = document.getElementById('home-crong-canvas');
    if (!homeCanvas) return;
    const homeCtx = homeCanvas.getContext('2d');
    const homeSheet = document.getElementById('crong-spritesheet');
    const stage2Sheet = document.getElementById('crong-second-spritesheet');
    const stage3Sheet = document.getElementById('crong-third-spritesheet');
    const btnHomeEvolve = document.getElementById('btn-home-evolve');
    if (!homeSheet) return;

    // Use idle frames 1-3 (wave hand sequence) for the home screen
    const homeIdleFrames = [
        { x: 0, y: 0, w: 97, h: 103 },
        { x: 97, y: 0, w: 97, h: 103 },
        { x: 194, y: 0, w: 97, h: 103 },
        { x: 291, y: 0, w: 97, h: 103 },
        { x: 388, y: 0, w: 97, h: 103 }
    ];

    let homeFrame = 0;
    let homeTimer = 0;
    let homeLastTime = 0;
    const HOME_INTERVAL = 400; // slightly slower, relaxed wave
    const HOME_SCALE = 1.75;
    const HOME_X = (homeCanvas.width - 97 * HOME_SCALE) / 2;
    const HOME_Y = (homeCanvas.height - 103 * HOME_SCALE) / 2;

    let isEvolving = false;
    let evolveTimer = 0;
    let currentHomeLevel = parseInt(localStorage.getItem('crongEvolutionLevel')) || 1;
    let savedExp = localStorage.getItem('crongExp');
    let initialExp = savedExp !== null ? parseInt(savedExp) : 30;
    if (initialExp >= 70 && currentHomeLevel < 2) currentHomeLevel = 2;

    function getLevelData(lvl) {
        if (lvl === 3) return { sheet: stage3Sheet, data: spriteDataThird, w: w3, scale: 149 / w3 };
        if (lvl === 2) return { sheet: stage2Sheet, data: spriteDataSecond, w: w2, scale: 149 / w2 };
        return { sheet: homeSheet, frames: homeIdleFrames, scale: HOME_SCALE, x: HOME_X };
    }

    function drawHomeAnim() {
        homeCtx.clearRect(0, 0, homeCanvas.width, homeCanvas.height);

        const cur = getLevelData(currentHomeLevel);
        const next = getLevelData(currentHomeLevel + 1);

        if (!isEvolving) {
            if (currentHomeLevel >= 2) {
                if (cur.sheet && cur.sheet.complete) {
                    const idleFrames = cur.data.idle;
                    const sFrame = idleFrames[homeFrame % idleFrames.length];
                    const drawX = (homeCanvas.width - sFrame.w * cur.scale) / 2;
                    const floatY = Math.sin(Date.now() / 300) * 5;
                    homeCtx.drawImage(cur.sheet, sFrame.x, sFrame.y, sFrame.w, sFrame.h, drawX, HOME_Y + floatY, sFrame.w * cur.scale, sFrame.h * cur.scale);
                }
            } else {
                const f = cur.frames[homeFrame % cur.frames.length];
                if (cur.sheet && cur.sheet.complete) {
                    homeCtx.drawImage(cur.sheet, f.x, f.y, f.w, f.h, HOME_X, HOME_Y, f.w * HOME_SCALE, f.h * HOME_SCALE);
                }
            }
        } else {
            const progress = evolveTimer / 5000;
            homeCtx.save();

            if (progress < 0.8) {
                const freq = 0.005 + (progress * 0.05);
                const toggleValue = Math.sin(evolveTimer * freq);
                const isNextForm = toggleValue > 0;
                const glowIntensity = progress / 0.8;

                homeCtx.shadowColor = `rgba(0, 150, 255, 1)`;
                homeCtx.shadowBlur = 20 + (glowIntensity * 50);

                let active = isNextForm ? next : cur;

                if (active.sheet && active.sheet.complete) {
                    let sFrame, drawX, drawW, drawH;
                    if (isNextForm || currentHomeLevel >= 2) {
                        const idleFrames = active.data.idle;
                        sFrame = idleFrames[homeFrame % idleFrames.length];
                        drawX = (homeCanvas.width - sFrame.w * active.scale) / 2;
                        drawW = sFrame.w * active.scale;
                        drawH = sFrame.h * active.scale;
                    } else {
                        sFrame = active.frames[homeFrame % active.frames.length];
                        drawX = active.x;
                        drawW = sFrame.w * active.scale;
                        drawH = sFrame.h * active.scale;
                    }
                    homeCtx.drawImage(active.sheet, sFrame.x, sFrame.y, sFrame.w, sFrame.h, drawX, HOME_Y, drawW, drawH);
                    homeCtx.globalCompositeOperation = 'source-atop';
                    homeCtx.fillStyle = `rgba(255, 255, 255, ${0.3 + glowIntensity * 0.7})`;
                    homeCtx.fillRect(drawX, HOME_Y, drawW, drawH);
                }
            } else if (progress < 0.85) {
                homeCtx.fillStyle = `rgba(255, 255, 255, 1)`;
                homeCtx.fillRect(0, 0, homeCanvas.width, homeCanvas.height);
            } else {
                const appearProgress = (progress - 0.85) / 0.15;
                if (next.sheet && next.sheet.complete) {
                    let sFrame, drawX, drawW, drawH;
                    if (currentHomeLevel + 1 >= 2) {
                        const idleFrames = next.data.idle;
                        sFrame = idleFrames[homeFrame % idleFrames.length];
                        drawX = (homeCanvas.width - sFrame.w * next.scale) / 2;
                        drawW = sFrame.w * next.scale;
                        drawH = sFrame.h * next.scale;
                    }
                    homeCtx.drawImage(next.sheet, sFrame.x, sFrame.y, sFrame.w, sFrame.h, drawX, HOME_Y, drawW, drawH);
                }
                homeCtx.fillStyle = `rgba(255, 255, 255, ${1 - appearProgress})`;
                homeCtx.fillRect(0, 0, homeCanvas.width, homeCanvas.height);
            }
            homeCtx.restore();
        }
    }

    function homeLoop(ts) {
        const dt = ts - homeLastTime;
        homeLastTime = ts;

        if (typeof crongEvolutionLevel !== 'undefined' && crongEvolutionLevel > currentHomeLevel && !isEvolving) {
            currentHomeLevel = crongEvolutionLevel;
            updateEvolveBtn();
        }

        if (isEvolving) {
            evolveTimer += dt;
            if (evolveTimer >= 5000) {
                isEvolving = false;
                currentHomeLevel++;

                crongEvolutionLevel = currentHomeLevel;
                localStorage.setItem('crongEvolutionLevel', crongEvolutionLevel);

                const nextSheet = currentHomeLevel === 3 ? stage3Sheet : stage2Sheet;
                if (nextSheet && nextSheet.src) {
                    spritesheet.src = nextSheet.src;
                }
                updateEvolveBtn();
            }
        }

        homeTimer += dt;
        if (homeTimer >= HOME_INTERVAL) {
            homeTimer = 0;
            if (currentHomeLevel >= 2) {
                const data = currentHomeLevel === 3 ? spriteDataThird : spriteDataSecond;
                homeFrame = (homeFrame + 1) % data.idle.length;
            } else {
                homeFrame = (homeFrame + 1) % homeIdleFrames.length;
            }
        }

        drawHomeAnim();
        requestAnimationFrame(homeLoop);
    }

    function updateEvolveBtn() {
        if (!btnHomeEvolve) return;
        if (currentHomeLevel >= 3) {
            btnHomeEvolve.style.display = 'none';
        } else if (currentHomeLevel === 2) {
            btnHomeEvolve.style.display = 'block';
            btnHomeEvolve.innerText = '✨ Evolve Character (Stage 3) ✨';
        } else {
            btnHomeEvolve.style.display = 'block';
            btnHomeEvolve.innerText = '✨ Evolve Character ✨';
        }
    }

    if (btnHomeEvolve) {
        updateEvolveBtn();
        btnHomeEvolve.addEventListener('click', () => {
            if (!isEvolving && currentHomeLevel < 3) {
                isEvolving = true;
                evolveTimer = 0;
                btnHomeEvolve.style.display = 'none';
            }
        });
    }

    const startHome = () => { homeLastTime = performance.now(); requestAnimationFrame(homeLoop); };
    if (homeSheet.complete && homeSheet.naturalWidth > 0) startHome();
    else homeSheet.addEventListener('load', startHome);
})();
// ─────────────────────────────────────────────────────────


const kirbySprite = document.getElementById('kirby-sprite');
const enemySprite = document.getElementById('enemy-sprite');
const actionArea = document.getElementById('action-area');
const statusBadge = document.getElementById('status-badge');
const hpFill = document.getElementById('hp-fill');
const damageText = document.getElementById('damage-text');

const wordDisplay = document.getElementById('word-display');
const currentQNum = document.getElementById('current-q-num');
const scoreDisplay = document.getElementById('score');
const feedback = document.getElementById('feedback');
const comboText = document.getElementById('combo-text');

const btnPass = document.getElementById('btn-pass');
const btnFail = document.getElementById('btn-fail');
const overlay = document.getElementById('overlay');
const btnNext = document.getElementById('btn-next');

const setupArea = document.getElementById('setup-area');
const btnStart = document.getElementById('btn-start');
const stageNumDisplay = document.getElementById('stage-num');
const btnBackMap = document.getElementById('btn-back-map');

const dashboardView = document.getElementById('dashboard-view');
const btnOpenDashboard = document.getElementById('btn-open-dashboard');
const btnCloseDashboard = document.getElementById('btn-close-dashboard');
const btnDownloadDashboard = document.getElementById('btn-download-dashboard');

const mapArea = document.getElementById('map-area');
const battleView = document.getElementById('battle-view');
let stageBtns = Array.from(document.querySelectorAll('.stage-hitbox'));
const kirbyMapIcon = document.getElementById('kirby-map-icon');

// ── MAP ICON ANIMATION ─────────────────────────────────
(function initMapIcon() {
    const mapIconCanvas = document.getElementById('map-icon-canvas');
    if (!mapIconCanvas) return;
    const mapIconCtx = mapIconCanvas.getContext('2d');

    let mapIconFrameIdx = 0;
    let mapIconLastTime = 0;

    function renderMapIconCanvas(timestamp) {
        if (!mapArea.classList.contains('hidden')) {
            if (timestamp - mapIconLastTime > 200) {
                mapIconLastTime = timestamp;
                mapIconFrameIdx++;
            }
            mapIconCtx.clearRect(0, 0, mapIconCanvas.width, mapIconCanvas.height);
            
            const evoLevel = typeof crongEvolutionLevel !== 'undefined' ? crongEvolutionLevel : (typeof crongEvolved !== 'undefined' && crongEvolved ? 2 : 1);
            let cData = evoLevel === 3 ? spriteDataThird : (evoLevel === 2 ? spriteDataSecond : spriteData);
            let sSheet = evoLevel === 3 ? document.getElementById('crong-third-spritesheet') : 
                         (evoLevel === 2 ? document.getElementById('crong-second-spritesheet') : document.getElementById('crong-spritesheet'));
                         
            if (cData && cData.idle && cData.idle.length > 0 && sSheet && sSheet.complete && sSheet.naturalWidth > 0) {
                const frames = cData.idle;
                const f = frames[mapIconFrameIdx % frames.length];
                const scale = 60 / f.w;
                const drawX = (mapIconCanvas.width - f.w * scale) / 2;
                const drawY = (mapIconCanvas.height - f.h * scale) / 2;
                mapIconCtx.drawImage(sSheet, f.x, f.y, f.w, f.h, drawX, drawY, f.w * scale, f.h * scale);
                const centerX = drawX + (f.w * scale) / 2;
                const centerY = drawY + (f.h * scale) / 2;
                if (typeof drawCustomOverlays === 'function') {
                    drawCustomOverlays(mapIconCtx, centerX, centerY, scale, getEquippedItems());
                }
            }
        }
        requestAnimationFrame(renderMapIconCanvas);
    }
    requestAnimationFrame(renderMapIconCanvas);
})();
// ────────────────────────────────────────────────────────

// Story elements
const storyArea = document.getElementById('story-area');
const storyImg = document.getElementById('story-img');
const btnStoryNext = document.getElementById('btn-story-next');
const btnStorySkip = document.getElementById('btn-story-skip');

const storySlides = [
    'story1.png',
    'story2.png',
    'story3.png'
];
let currentStoryIndex = 0;

if (btnStoryNext) {
    btnStoryNext.addEventListener('click', () => {
        currentStoryIndex++;
        if (currentStoryIndex >= storySlides.length) {
            storyArea.classList.add('hidden');
            startBattle();
        } else {
            storyImg.style.opacity = 0;
            setTimeout(() => {
                storyImg.src = storySlides[currentStoryIndex];
                storyImg.style.opacity = 1;
            }, 300);
        }
    });
}
if (btnStorySkip) {
    btnStorySkip.addEventListener('click', () => {
        storyArea.classList.add('hidden');
        startBattle();
    });
}

function startStorySequence() {
    currentStoryIndex = 0;
    storyImg.src = storySlides[currentStoryIndex];
    storyImg.style.opacity = 1;
    storyArea.classList.remove('hidden');
}

// Per-stage modal elements
const stageInputModal = document.getElementById('stage-input-modal');
const stageWordInput = document.getElementById('stage-word-input');
const stageInputBadge = document.getElementById('stage-input-badge');
const stageInputLabel = document.getElementById('stage-input-label');
const stageInputHint = document.getElementById('stage-input-hint');
const btnStageConfirm = document.getElementById('btn-stage-input-confirm');
const btnStageCancel = document.getElementById('btn-stage-input-cancel');

let pendingStage = 1; // which stage the modal is for

// State Variables
let stageWords = {};
let failedWords = [];
let currentWords = [];
let currentQuestionIndex = 0;
let score = 0;
let totalCorrectAnswers = 0;
let hp = 100;
let stageNum = 1;
let unlockedStage = 1;
let lastIconStage = 1;

let currentCombo = 0;

let isAnimating = false;

let bossHp = 8; // Boss takes 8 hits
let isPhase3 = false;
let phase3TotalHp = 0;

let collectedAbilities = ['Normal'];
const BOSS_ABILITIES = ['Fire', 'Ice', 'Spark', 'Ghost', 'Sword'];

let phase3TimerInterval = null;
let phase3TimeLeft = 10;

function startPhase3Timer() {
    clearInterval(phase3TimerInterval);
    const timerDisplay = document.getElementById('phase3-timer');
    if (!isPhase3 || !timerDisplay) {
        if (timerDisplay) timerDisplay.classList.add('hidden');
        return;
    }

    timerDisplay.classList.remove('hidden');
    phase3TimeLeft = 10;
    document.getElementById('timer-count').textContent = phase3TimeLeft;

    phase3TimerInterval = setInterval(() => {
        if (isAnimating || !document.getElementById('overlay').classList.contains('hidden')) {
            return;
        }

        phase3TimeLeft--;
        document.getElementById('timer-count').textContent = phase3TimeLeft;

        if (phase3TimeLeft <= 0) {
            clearInterval(phase3TimerInterval);
            handleFail();
        }
    }, 1000);
}

function stopPhase3Timer() {
    clearInterval(phase3TimerInterval);
}

// ── EXP / Evolution System ──────────────────────────────
const EXP_MAX = 170;
let savedExpVal = localStorage.getItem('crongExp');
let crongExp = savedExpVal !== null ? parseInt(savedExpVal) : 30; // cumulative correct answers
let crongEvolutionLevel = parseInt(localStorage.getItem('crongEvolutionLevel')) || 1;
let crongEvolved = crongEvolutionLevel >= 2;

if (localStorage.getItem('forceReset_2') !== 'done') {
    crongExp = 59;
    crongEvolutionLevel = 2;
    crongEvolved = true;
    localStorage.setItem('crongExp', 59);
    localStorage.setItem('crongEvolutionLevel', 2);
    localStorage.setItem('forceReset_2', 'done');
}

if (localStorage.getItem('forceReset_3') !== 'done') {
    if (crongExp < 79) crongExp = 79;
    if (crongEvolutionLevel < 3) crongEvolutionLevel = 3;
    crongEvolved = true;
    localStorage.setItem('crongExp', crongExp);
    localStorage.setItem('crongEvolutionLevel', crongEvolutionLevel);
    localStorage.setItem('forceReset_3', 'done');
}

const expFill = document.getElementById('crong-exp-fill');
const expCount = document.getElementById('exp-count');
const evolutionOverlay = document.getElementById('evolution-overlay');

function updateExpBar(isInitialLoad = false) {
    if (!expFill || !expCount) return;
    const pct = Math.min(crongExp / EXP_MAX * 100, 100);
    expFill.style.width = pct + '%';
    expCount.textContent = crongExp;
    expFill.classList.toggle('full', crongExp >= EXP_MAX);

    localStorage.setItem('crongExp', crongExp);

    if (crongExp >= EXP_MAX) {
        if (crongEvolutionLevel === 1) {
            crongEvolutionLevel = 2;
            crongEvolved = true;
            localStorage.setItem('crongEvolutionLevel', 2);

            if (isInitialLoad) {
                const stage2Sheet = document.getElementById('crong-second-spritesheet');
                if (stage2Sheet) {
                    const swapSrc = () => {
                        spritesheet.src = stage2Sheet.src;
                        const homeSheet = document.getElementById('crong-spritesheet');
                        if (homeSheet) homeSheet.src = stage2Sheet.src;
                    };
                    if (stage2Sheet.complete && stage2Sheet.naturalWidth > 0) {
                        swapSrc();
                    } else {
                        stage2Sheet.addEventListener('load', swapSrc);
                    }
                }
                crongCanvas.style.filter = 'drop-shadow(0 0 18px #facc15) drop-shadow(0 0 6px #f97316)';
            } else {
                triggerEvolution();
            }
        } else if (crongEvolutionLevel === 2) {
            if (isInitialLoad) {
                crongEvolutionLevel = 3;
                localStorage.setItem('crongEvolutionLevel', 3);
                const stage3Sheet = document.getElementById('crong-third-spritesheet');
                if (stage3Sheet) {
                    const swapSrc3 = () => {
                        spritesheet.src = stage3Sheet.src;
                        const homeSheet = document.getElementById('crong-spritesheet');
                        if (homeSheet) homeSheet.src = stage3Sheet.src;
                    };
                    if (stage3Sheet.complete && stage3Sheet.naturalWidth > 0) {
                        swapSrc3();
                    } else {
                        stage3Sheet.addEventListener('load', swapSrc3);
                    }
                }
                crongCanvas.style.filter = 'drop-shadow(0 0 18px #facc15) drop-shadow(0 0 6px #f97316)';
            } else {
                crongEvolutionLevel = 3;
                localStorage.setItem('crongEvolutionLevel', 3);
                triggerEvolutionStage3();
            }
        }
    }

    // Ensure stage3Sheet is set initially if level 3
    if (isInitialLoad && crongEvolutionLevel === 3) {
        const stage3Sheet = document.getElementById('crong-third-spritesheet');
        if (stage3Sheet) {
            const swapSrc3 = () => {
                spritesheet.src = stage3Sheet.src;
                const homeSheet = document.getElementById('crong-spritesheet');
                if (homeSheet) homeSheet.src = stage3Sheet.src;
            };
            if (stage3Sheet.complete && stage3Sheet.naturalWidth > 0) {
                swapSrc3();
            } else {
                stage3Sheet.addEventListener('load', swapSrc3);
            }
        }
        crongCanvas.style.filter = 'drop-shadow(0 0 18px #facc15) drop-shadow(0 0 6px #f97316)';
    }
}
updateExpBar(true); // initialize bar on page load

function triggerEvolution() {
    if (!evolutionOverlay) return;
    // Re-create the flash element so the animation replays each time
    const oldFlash = evolutionOverlay.querySelector('.evolution-flash');
    if (oldFlash) oldFlash.remove();
    const flash = document.createElement('div');
    flash.className = 'evolution-flash';
    evolutionOverlay.prepend(flash);

    evolutionOverlay.classList.add('show');

    // Swap spritesheet to stage-2 if the file is present (crong_second_pixel_spritesheet.png)
    const stage2Sheet = document.getElementById('crong-second-spritesheet');
    if (stage2Sheet && stage2Sheet.naturalWidth > 0) {
        // Point the main spritesheet src to the stage 2 image
        spritesheet.src = stage2Sheet.src;
        // Also update the home screen canvas sheet
        const homeSheet = document.getElementById('crong-spritesheet');
        if (homeSheet) homeSheet.src = stage2Sheet.src;
    }
    crongCanvas.style.filter = 'drop-shadow(0 0 18px #facc15) drop-shadow(0 0 6px #f97316)';

    setTimeout(() => {
        evolutionOverlay.classList.remove('show');
        // Keep the golden glow as a visual mark of evolution
    }, 2500);
}
// ───────────────────────────────────────────────────────

const enemyTypes = ['Normal', 'Fire', 'Ice', 'Spark', 'Ghost', 'Sword'];
const enemyColors = {
    'Normal': 'none',
    'Fire': 'sepia(1) hue-rotate(-20deg) saturate(3) brightness(0.9)',
    'Ice': 'sepia(1) hue-rotate(180deg) saturate(2)',
    'Spark': 'sepia(1) hue-rotate(40deg) saturate(3) brightness(1.2)',
    'Ghost': 'grayscale(1) brightness(1.5) opacity(0.8)'
};

let currentEnemyType = 'Normal';

// ── Boss roster ─────────────────────────────────────────
// Each boss has a default image and optional ability-specific variants.
// Abilities without a variant fall back to the default image.
const BOSSES = [
    {
        id: 'fecto-epilis',
        default: 'fecto epilis.webp',
        variants: {}
    },
    {
        id: 'chaos-epilis',
        default: 'chaos_epilis.png',
        variants: {}
    }
];

let bossQueue = [];  // Boss list for each Stage 3 run
let bossQueueIdx = 0;  // Which boss we are currently fighting
let currentBoss = BOSSES[0];
const HITS_PER_BOSS = 5; // Boss takes this many hits before dying
// ────────────────────────────────────────────────────────

// Helper: get total boss HP for current stage 3 run
function totalBossHp() { return BOSSES.length * HITS_PER_BOSS; }

// Helper: advance to the next boss in queue (call after a hit drops HP).
// Returns true if all bosses have been defeated.
function advanceBossIfNeeded() {
    const hitsLanded = totalBossHp() - bossHp;
    const expectedBossIdx = Math.floor(hitsLanded / HITS_PER_BOSS);

    if (expectedBossIdx >= bossQueue.length) return; // all done

    if (expectedBossIdx !== bossQueueIdx) {
        bossQueueIdx = expectedBossIdx;
        currentBoss = bossQueue[bossQueueIdx];

        const enemyImg = document.getElementById('enemy-img');
        const enemyEl = document.getElementById('enemy');
        const effectsLayer = document.getElementById('effects-layer');

        // Huge flash explosion effect for Phase 2 transition
        const flash = document.createElement('div');
        flash.style.cssText = 'position: absolute; left: 0; top: 0; width: 100%; height: 100%; background: white; z-index: 1000; opacity: 1; transition: opacity 2s ease-out; pointer-events: none; mix-blend-mode: overlay;';
        document.body.appendChild(flash);

        // Shake screen
        const gameContainer = document.getElementById('game-container') || document.body;
        gameContainer.style.animation = 'shake 0.8s cubic-bezier(.36,.07,.19,.97) both';

        // Change image in the middle of flash
        setTimeout(() => {
            enemyImg.dataset.bossType = '';
            enemyImg.src = currentBoss.default;

            // Add chaos glow to the boss
            enemyEl.style.filter = 'drop-shadow(0 0 20px #ff0055) drop-shadow(0 0 10px #aa00ff)';
        }, 150);

        setTimeout(() => {
            flash.style.opacity = '0';
        }, 300);

        setTimeout(() => {
            flash.remove();
            gameContainer.style.animation = '';
        }, 2300);
    }
}

function updateUI() {
    const maxQ = isPhase3 ? currentWords.length : 10;
    currentQNum.textContent = Math.min(currentQuestionIndex + 1, maxQ);
    scoreDisplay.textContent = score;
    hpFill.style.width = `${hp}%`;

    if (stageNum === 3) {
        document.getElementById('boss-hp-container').classList.remove('hidden');
        if (isPhase3) {
            const pct = Math.max(0, Math.min(phase3TotalHp, bossHp)) / phase3TotalHp * 100;
            document.getElementById('boss-hp-fill').style.width = `${pct}%`;
        } else {
            // Show HP of the current boss (each boss has HITS_PER_BOSS max HP)
            const hitsOnCurrentBoss = bossHp - (bossQueue.length - 1 - bossQueueIdx) * HITS_PER_BOSS;
            const pct = Math.max(0, Math.min(HITS_PER_BOSS, hitsOnCurrentBoss)) / HITS_PER_BOSS * 100;
            document.getElementById('boss-hp-fill').style.width = `${pct}%`;
        }
    } else {
        document.getElementById('boss-hp-container').classList.add('hidden');
    }
}

function initGame() {
    // No word input needed here — words are entered per-stage
    failedWords = []; // clear failed words on fresh game start

    setupArea.classList.add('hidden');
    mapArea.classList.remove('hidden');
    updateMap();
}

// ── Per-Stage Modal helpers ────────────────────────────────
function openStageInputModal(stage) {
    if (typeof window.openLevelOneCourse === 'function') {
        window.openLevelOneCourse(stage);
        return;
    }

    pendingStage = stage;
    const isBoss = stage === stageBtns.length; // The last stage is the boss

    stageInputBadge.textContent = isBoss ? `Stage ${stage} (Boss!)` : `Stage ${stage}`;
    stageInputBadge.className = 'stage-input-badge stage-' + (stage > 3 ? 3 : stage);
    stageInputLabel.textContent = `Level ${stage} Words (쉼표로 구분, 최소 10개 권장)`;
    stageWordInput.placeholder = 'ex) Word1, Word2, Word3 ...';
    stageInputHint.textContent = isBoss ? '※ 보스 스테이지에서는 이전에 틀린 단어도 함께 출제됩니다!' : '※ 단어를 입력하지 않으면 기본 단어로 시작합니다.';

    // Pre-fill with previously entered words for this stage
    const existingWords = stageWords[stage] || [];
    stageWordInput.value = existingWords.length > 0 ? existingWords.join(', ') : '';

    stageInputModal.classList.remove('hidden');
    setTimeout(() => stageWordInput.focus(), 350);
}

function updateMap() {
    stageBtns.forEach((btn, index) => {
        const stage = index + 1;

        // Remove old listeners to avoid multiple triggers
        const newBtn = btn.cloneNode(true);
        btn.parentNode.replaceChild(newBtn, btn);
        stageBtns[index] = newBtn;

        // All stages are always unlocked — click to open modal
        newBtn.classList.remove('locked');
        newBtn.addEventListener('click', () => openStageInputModal(stage));
    });

    if (kirbyMapIcon && stageBtns[unlockedStage - 1]) {
        // Start at last known position
        const startBtn = stageBtns[lastIconStage - 1] || stageBtns[0];
        
        // Remove transitions temporarily to snap to the start position
        kirbyMapIcon.style.transition = 'none';
        kirbyMapIcon.style.left = startBtn.style.left;
        kirbyMapIcon.style.top = startBtn.style.top;
        
        // Force reflow
        void kirbyMapIcon.offsetWidth;
        
        // Restore transition
        kirbyMapIcon.style.transition = '';

        if (lastIconStage !== unlockedStage) {
            // Give browser time to acknowledge display:block before transitioning
            setTimeout(() => {
                // Move to new position
                const activeBtn = stageBtns[unlockedStage - 1];
                kirbyMapIcon.style.left = activeBtn.style.left;
                kirbyMapIcon.style.top = activeBtn.style.top;
                
                // Re-trigger the jump animation
                kirbyMapIcon.classList.remove('moving');
                void kirbyMapIcon.offsetWidth; 
                kirbyMapIcon.classList.add('moving');
                
                setTimeout(() => kirbyMapIcon.classList.remove('moving'), 600);
                
                lastIconStage = unlockedStage;
            }, 50);
        } else {
            // Just pulse or bounce in place since we didn't move
            kirbyMapIcon.classList.remove('moving');
            void kirbyMapIcon.offsetWidth;
            kirbyMapIcon.classList.add('moving');
            setTimeout(() => kirbyMapIcon.classList.remove('moving'), 600);
        }
    }
}

function enterStage(stage) {
    stageNum = stage;
    stageNumDisplay.textContent = stageNum;

    // Wait a brief moment before transitioning to battle
    setTimeout(() => {
        mapArea.classList.add('hidden');

        if (stageNum === 3) {
            startStorySequence();
        } else {
            startBattle();
        }
    }, 150);
}

function startBattle() {
    battleView.classList.remove('hidden');

    // Update Action Area Background (castle image for Level 3)
    if (stageNum === stageBtns.length) {
        actionArea.style.background = "url('story2.png') center/cover no-repeat";
    } else {
        actionArea.style.background = "url('crong_background.png') center/cover no-repeat";
    }

    currentQuestionIndex = 0;
    score = 0;
    hp = 100;
    bossHp = 8;
    currentCombo = 0;
    isPhase3 = false;
    phase3TotalHp = 0;

    // Stage 3: fight Fecto Epilis.
    if (stageNum === stageBtns.length) {
        bossQueue = [...BOSSES];
        bossQueueIdx = 0;
        currentBoss = bossQueue[0];
        bossHp = totalBossHp();
    }

    // Populate currentWords based on stage
    currentWords = [];
    let sourceWords = [...(stageWords[stageNum] || [])];
    
    if (stageNum === stageBtns.length) {
        // Mix of failed words (high priority) and boss words
        sourceWords = [...failedWords, ...sourceWords];
        // Shuffle them
        sourceWords.sort(() => 0.5 - Math.random());
    }

    // Ensure exactly 10 words
    while (currentWords.length < 10) {
        currentWords = currentWords.concat(sourceWords);
    }
    currentWords = currentWords.slice(0, 10);
    // Shuffle the final 10 to add variety
    currentWords.sort(() => 0.5 - Math.random());

    document.getElementById('enemy-img').dataset.bossType = '';

    // Reset victory animations
    document.querySelector('.battlefield').classList.remove('victory');
    document.getElementById('kirby-sprite').classList.remove('victory-jump');
    document.getElementById('boss-hp-container').style.opacity = '1';
    document.querySelector('.hp-bar-container').style.opacity = '1';
    document.getElementById('enemy').style.opacity = '1';
    feedback.style.color = 'var(--primary)';
    comboText.classList.remove('show');

    // ─── Reset Player Animation ───
    playSequence([{ state: 'idle', loops: 0 }]);

    setupAbilitySelector();

    nextQuestion();
    updateUI();
}

function setupAbilitySelector() {
    const selector = document.getElementById('ability-selector');
    const container = selector.querySelector('.ability-buttons');
    const controls = document.querySelector('.controls');

    container.innerHTML = '';

    if (stageNum === stageBtns.length) {
        selector.classList.remove('hidden');
        controls.classList.add('hidden'); // Hide normal pass/fail buttons

        // Show the full skill set in the ability selector.
        const uniqueAbilities = BOSS_ABILITIES;

        // Generate buttons for collected abilities and one fail option
        uniqueAbilities.forEach(ability => {
            const btn = document.createElement('button');
            btn.className = `ability-btn ${ability.toLowerCase()}`;
            btn.innerText = `💥 ${ability} Attack! (Correct)`;
            btn.onclick = () => handleBossAttack(ability);
            container.appendChild(btn);
        });

        const failBtn = document.createElement('button');
        failBtn.className = 'ability-btn';
        failBtn.style.background = '#4B5563';
        failBtn.innerText = 'Oops, Incorrect!';
        failBtn.onclick = handleFail;
        container.appendChild(failBtn);

    } else {
        selector.classList.add('hidden');
        controls.classList.remove('hidden');
    }
}

function spawnEnemy() {
    const enemyImg = document.getElementById('enemy-img');
    const enemyContainer = document.getElementById('enemy');

    if (stageNum === 3) {
        // Boss Stage
        currentEnemyType = 'Boss';
        const bossType = enemyImg.dataset.bossType;
        if (bossType && currentBoss.variants[bossType]) {
            enemyImg.src = currentBoss.variants[bossType];
        } else {
            enemyImg.src = currentBoss.default;
        }
        enemyImg.style.filter = 'none'; // No color filter for the boss
        enemyContainer.classList.add('boss');
    } else {
        // Normal Stage
        currentEnemyType = enemyTypes[Math.floor(Math.random() * enemyTypes.length)];
        enemyImg.src = 'enemy.png';

        // Force the filter to apply immediately by temporarily resetting it
        enemyImg.style.filter = 'none';
        setTimeout(() => {
            enemyImg.style.filter = enemyColors[currentEnemyType];
        }, 10);

        enemyContainer.classList.remove('boss');
    }
}

function nextQuestion() {
    const maxQ = isPhase3 ? currentWords.length : 10;
    if (currentQuestionIndex >= maxQ) {
        endStage();
        return;
    }
    wordDisplay.textContent = currentWords[currentQuestionIndex];
    spawnEnemy();
    feedback.textContent = "";
    isAnimating = false;
    startPhase3Timer();
}

function handlePass() {
    if (isAnimating) return;
    isAnimating = true;
    stopPhase3Timer();

    const enemyContainer = document.getElementById('enemy');
    const kirbyRect = kirbySprite.getBoundingClientRect();
    const enemyRect = enemyContainer.getBoundingClientRect();
    const targetDistance = Math.max(0, enemyRect.left - kirbyRect.right - 8);

    // Pass uses only the first row of the base spritesheet.
    playSequence([{ state: 'idle', loops: 0 }]);

    kirbySprite.style.setProperty('--crong-pass-distance', `${targetDistance}px`);
    kirbySprite.classList.remove('crong-walk-forward', 'crong-return-pos', 'crong-fail-forward', 'crong-fail-return', 'crong-pass-punch');
    void kirbySprite.offsetWidth;
    kirbySprite.classList.add('crong-pass-punch');

    // When Crong reaches the enemy, show the punch feedback.
    setTimeout(() => {
        enemyContainer.classList.add('sucked');
        damageText.textContent = "Great!";
        damageText.classList.add('show');
    }, 620);

    // After the punch motion finishes, handle game logic.
    setTimeout(() => {
        feedback.textContent = `Correct! Great job!`;

        enemyContainer.classList.remove('sucked');
        damageText.classList.remove('show');

        kirbySprite.classList.remove('crong-pass-punch');

        score++;
        totalCorrectAnswers++;
        crongExp++;
        updateExpBar();
        currentCombo++;

        if (currentCombo >= 2) {
            comboText.textContent = `${currentCombo} Combo!`;
            comboText.classList.remove('show');
            void comboText.offsetWidth;
            comboText.classList.add('show');
        }

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

// ── Fire-breath helper ──────────────────────────────────
function spawnFireBreath(onDone) {
    const effectsLayer = document.getElementById('effects-layer');
    const kirbyRect = kirbySprite.getBoundingClientRect();
    const layerRect = effectsLayer.getBoundingClientRect();

    // Kirby's mouth position relative to the effects-layer
    const startX = kirbyRect.right - layerRect.left + 50;
    const startY = kirbyRect.top + kirbyRect.height * 0.4 - layerRect.top;

    const orbCount = 7;
    const totalDuration = 900; // total ms until done callback

    for (let i = 0; i < orbCount; i++) {
        const orb = document.createElement('div');
        orb.className = 'fire-orb';

        // Each orb: slightly different size, Y-spread, delay
        const size = 22 + Math.random() * 18; // 22–40px
        const flyX = 170 + Math.random() * 60;  // 170–230px
        const flyY = (Math.random() - 0.5) * 60; // ±30px vertical spread
        const delay = i * 60;  // stagger 60ms apart
        const dur = 0.45 + Math.random() * 0.15; // 0.45–0.60s

        orb.style.cssText = `
            left: ${startX}px;
            top: ${startY - size / 2}px;
            width: ${size}px;
            height: ${size}px;
            --fly-x: ${flyX}px;
            --fly-y: ${flyY}px;
            --fly-dur: ${dur}s;
            --fly-delay: ${delay}ms;
        `;
        effectsLayer.appendChild(orb);

        // Spawn impact burst when orb reaches destination
        setTimeout(() => {
            const impact = document.createElement('div');
            impact.className = 'fire-impact';
            impact.style.cssText = `
                left: ${startX + flyX - 40}px;
                top: ${startY + flyY - 40}px;
            `;
            effectsLayer.appendChild(impact);
            setTimeout(() => impact.remove(), 450);
        }, delay + dur * 1000 * 0.6);
    }

    // Clean up orbs and call done
    setTimeout(() => {
        effectsLayer.querySelectorAll('.fire-orb').forEach(o => o.remove());
        if (onDone) onDone();
    }, totalDuration);
}
// ────────────────────────────────────────────────────────

// ── Lightning-strike helper ──────────────────────────────
function spawnLightningStrike(onDone) {
    const effectsLayer = document.getElementById('effects-layer');
    const enemyEl = document.getElementById('enemy');
    const enemyRect = enemyEl.getBoundingClientRect();
    const layerRect = effectsLayer.getBoundingClientRect();

    const bossCenterX = enemyRect.left + enemyRect.width * 0.5 - layerRect.left;
    const bossCenterY = enemyRect.top - layerRect.top;
    const boltBottom = bossCenterY + enemyRect.height * 0.5;

    const boltCount = 2;
    const totalDuration = 900;

    for (let i = 0; i < boltCount; i++) {
        const offsetX = (i - 0.5) * 30;
        const delayMs = i * 120;

        const bolt = document.createElement('div');
        bolt.className = 'lightning-bolt';
        bolt.style.cssText = `
            left: ${bossCenterX + offsetX - 11}px;
            top: 0px;
            height: ${bossCenterY + enemyRect.height * 0.25}px;
            --bolt-dur: 0.2s;
            --bolt-delay: ${delayMs}ms;
        `;
        effectsLayer.appendChild(bolt);

        const impactDelay = delayMs + 140;
        setTimeout(() => {
            // Screen flash
            const flash = document.createElement('div');
            flash.className = 'lightning-flash';
            effectsLayer.appendChild(flash);
            setTimeout(() => flash.remove(), 350);

            // Electric spark
            const spark = document.createElement('div');
            spark.className = 'lightning-spark';
            spark.style.cssText = `
                left: ${bossCenterX + offsetX - 35}px;
                top:  ${boltBottom - 35}px;
            `;
            effectsLayer.appendChild(spark);
            setTimeout(() => spark.remove(), 450);
        }, impactDelay);
    }

    setTimeout(() => {
        effectsLayer.querySelectorAll('.lightning-bolt').forEach(b => b.remove());
        if (onDone) onDone();
    }, totalDuration);
}
// ────────────────────────────────────────────────────────

// ── Sword-slash helper ───────────────────────────────────
function spawnSwordSlash(onDone) {
    const effectsLayer = document.getElementById('effects-layer');
    const enemyRect = document.getElementById('enemy').getBoundingClientRect();
    const layerRect = effectsLayer.getBoundingClientRect();

    const cx = enemyRect.left + enemyRect.width * 0.5 - layerRect.left;
    const cy = enemyRect.top + enemyRect.height * 0.4 - layerRect.top;

    // Impact flare first (appears behind slash)
    const flare = document.createElement('div');
    flare.className = 'sword-impact';
    flare.style.cssText = `left: ${cx}px; top: ${cy}px;`;
    effectsLayer.appendChild(flare);
    setTimeout(() => flare.remove(), 450);

    // X-slash mark (slight delay so flare appears first)
    setTimeout(() => {
        const slash = document.createElement('div');
        slash.className = 'sword-slash';
        slash.style.cssText = `left: ${cx}px; top: ${cy}px;`;
        effectsLayer.appendChild(slash);
        setTimeout(() => slash.remove(), 600);
    }, 60);

    setTimeout(() => {
        if (onDone) onDone();
    }, 800);
}
// ────────────────────────────────────────────────────────

// ── Ice shard burst helper ───────────────────────────────
function spawnIceAttack(onDone) {
    const effectsLayer = document.getElementById('effects-layer');
    const kirbyRect = kirbySprite.getBoundingClientRect();
    const enemyEl = document.getElementById('enemy');
    const enemyRect = enemyEl.getBoundingClientRect();
    const layerRect = effectsLayer.getBoundingClientRect();

    const startX = kirbyRect.right - layerRect.left + 50;
    const startY = kirbyRect.top + kirbyRect.height * 0.45 - layerRect.top;
    const targetX = enemyRect.left + enemyRect.width * 0.5 - layerRect.left;
    const targetY = enemyRect.top + enemyRect.height * 0.5 - layerRect.top;

    const shardCount = 6;
    const totalDuration = 850;

    for (let i = 0; i < shardCount; i++) {
        const shard = document.createElement('div');
        shard.className = 'ice-shard';

        const spread = (i - (shardCount - 1) / 2) * 18;
        const dx = targetX - startX + (Math.random() - 0.5) * 20;
        const dy = (targetY - startY) + spread;
        const rot = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
        const delay = i * 55;
        const dur = 0.42 + Math.random() * 0.1;

        shard.style.cssText = `
            left: ${startX}px;
            top:  ${startY - 11}px;
            --shard-x: ${dx}px;
            --shard-y: ${dy}px;
            --shard-rot: ${rot}deg;
            --shard-dur: ${dur}s;
            --shard-delay: ${delay}ms;
        `;
        effectsLayer.appendChild(shard);

        setTimeout(() => {
            const impact = document.createElement('div');
            impact.className = 'ice-impact';
            impact.style.cssText = `left: ${targetX}px; top: ${targetY}px;`;
            effectsLayer.appendChild(impact);
            setTimeout(() => impact.remove(), 500);
        }, delay + dur * 1000 * 0.7);
    }

    const tint = document.createElement('div');
    tint.className = 'ice-screen-tint';
    effectsLayer.appendChild(tint);
    setTimeout(() => tint.remove(), 600);

    setTimeout(() => {
        effectsLayer.querySelectorAll('.ice-shard').forEach(s => s.remove());
        if (onDone) onDone();
    }, totalDuration);
}
// ────────────────────────────────────────────────────────

// ── Ghost wave helper ────────────────────────────────────
function spawnGhostAttack(onDone) {
    const effectsLayer = document.getElementById('effects-layer');
    const kirbyRect = kirbySprite.getBoundingClientRect();
    const enemyEl = document.getElementById('enemy');
    const enemyRect = enemyEl.getBoundingClientRect();
    const layerRect = effectsLayer.getBoundingClientRect();

    const startX = kirbyRect.right - layerRect.left;
    const startY = kirbyRect.top + kirbyRect.height * 0.4 - layerRect.top;
    const targetX = enemyRect.left + enemyRect.width * 0.5 - layerRect.left;
    const targetY = enemyRect.top + enemyRect.height * 0.45 - layerRect.top;
    const dx = targetX - startX;

    const totalDuration = 950;

    for (let i = 0; i < 3; i++) {
        const delay = 180 + i * 140;
        setTimeout(() => {
            const ring = document.createElement('div');
            ring.className = 'ghost-ring';
            ring.style.cssText = `
                left: ${targetX}px;
                top:  ${targetY}px;
                --ring-dur: ${0.65 + i * 0.08}s;
                --ring-delay: 0ms;
            `;
            effectsLayer.appendChild(ring);
            setTimeout(() => ring.remove(), 800);
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
    const shopModal = document.getElementById('shop-modal');
    const btnOpenShop = document.getElementById('btn-open-shop');
    const btnMapOpenShop = document.getElementById('btn-map-open-shop');
    const mapDiamondBtn = document.getElementById('map-diamond-btn');
    const btnCloseShop = document.getElementById('btn-close-shop');
    const btnGetBonusGem = document.getElementById('btn-get-bonus-gem');
    const shopDiamondBox = document.getElementById('shop-diamond-click-box');
    const btnEquipSave = document.getElementById('btn-shop-equip-save');
    const tabs = document.querySelectorAll('.shop-tab');

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
