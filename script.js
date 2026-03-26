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
const stageBtns = [
    document.getElementById('stage-btn-1'),
    document.getElementById('stage-btn-2'),
    document.getElementById('stage-btn-3')
];
const kirbyMapIcon = document.getElementById('kirby-map-icon');

// Per-stage modal elements
const stageInputModal = document.getElementById('stage-input-modal');
const stageWordInput  = document.getElementById('stage-word-input');
const stageInputBadge = document.getElementById('stage-input-badge');
const stageInputLabel = document.getElementById('stage-input-label');
const stageInputHint  = document.getElementById('stage-input-hint');
const btnStageConfirm = document.getElementById('btn-stage-input-confirm');
const btnStageCancel  = document.getElementById('btn-stage-input-cancel');

let pendingStage = 1; // which stage the modal is for

// State Variables
let level1Words = [];
let level2Words = [];
let level3Words = [];
let failedWords = [];
let currentWords = [];
let currentQuestionIndex = 0;
let score = 0;
let totalCorrectAnswers = 0;
let hp = 100;
let stageNum = 1;
let unlockedStage = 1;

let currentCombo = 0;

let isAnimating = false;

let bossHp = 8; // Boss takes 8 hits
let collectedAbilities = ['Normal'];

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
        id: 'boss',
        default: 'boss.png',
        variants: {
            fire: 'boss_fire.png',
            ice:  'boss_ice.png',
            ghost: 'boss_ghost.png',
            spark: 'boss_spark.png'
        }
    },
    {
        id: 'darkeye',
        default: 'darkeye.png',
        variants: {
            fire: 'darkeye_fire.png',
            ice:  'darkeye_ice.png',
            ghost: 'darkeye_ghost.png',
            spark: 'darkeye_spark.png'
        }
    },
    {
        id: 'meta',
        default: 'meta.png',
        variants: {
            fire: 'meta_fire.png',
            ice:  'meta_ice.png',
            ghost: 'meta_ghost.png',
            spark: 'meta_spark.png'
        }
    },
    {
        id: 'boss3',
        default: 'boss3.webp',
        variants: {
            fire: 'boss3_fire.png',
            ice:  'boss3_ice.png',
            ghost: 'boss3_ghost.png',
            spark: 'boss3_spark.png'
        }
    }
];

let bossQueue     = [];  // Shuffled copy of BOSSES for each Stage 3 run
let bossQueueIdx  = 0;  // Which boss we are currently fighting
let currentBoss   = BOSSES[0];
const HITS_PER_BOSS = 2; // Each boss takes this many hits before dying
// ────────────────────────────────────────────────────────

// Helper: get total boss HP for current stage 3 run
function totalBossHp() { return BOSSES.length * HITS_PER_BOSS; }

// Helper: advance to the next boss in queue (call after a hit drops HP).
// Returns true if all bosses have been defeated.
function advanceBossIfNeeded() {
    // How many hits have landed so far?
    const hitsLanded = totalBossHp() - bossHp;
    const expectedBossIdx = Math.floor(hitsLanded / HITS_PER_BOSS);

    if (expectedBossIdx >= bossQueue.length) return; // all done

    if (expectedBossIdx !== bossQueueIdx) {
        // Time to switch bosses!
        bossQueueIdx = expectedBossIdx;
        currentBoss  = bossQueue[bossQueueIdx];

        const enemyImg = document.getElementById('enemy-img');
        enemyImg.dataset.bossType = '';
        enemyImg.src = currentBoss.default;

        // Small flash effect to signal the switch
        const enemyEl = document.getElementById('enemy');
        enemyEl.style.animation = 'none';
        void enemyEl.offsetWidth;
        enemyEl.style.animation = '';
    }
}

function updateUI() {
    currentQNum.textContent = Math.min(currentQuestionIndex + 1, 10);
    scoreDisplay.textContent = score;
    hpFill.style.width = `${hp}%`;

    if (stageNum === 3) {
        document.getElementById('boss-hp-container').classList.remove('hidden');
        // Show HP of the current boss (each boss has HITS_PER_BOSS max HP)
        const hitsOnCurrentBoss = bossHp - (bossQueue.length - 1 - bossQueueIdx) * HITS_PER_BOSS;
        const pct = Math.max(0, Math.min(HITS_PER_BOSS, hitsOnCurrentBoss)) / HITS_PER_BOSS * 100;
        document.getElementById('boss-hp-fill').style.width = `${pct}%`;
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
const STAGE_LABELS = [
    { badge: 'Stage 1', label: 'Level 1 Words (쉼표로 구분, 최소 10개 권장)', placeholder: 'ex) Apple, Banana, Orange ...', hint: '※ 단어를 입력하지 않으면 기본 단어로 시작합니다.' },
    { badge: 'Stage 2', label: 'Level 2 Words (쉼표로 구분, 최소 10개 권장)', placeholder: 'ex) House, Mountain, River ...', hint: '※ 단어를 입력하지 않으면 기본 단어로 시작합니다.' },
    { badge: 'Stage 3 (Boss!)', label: 'Level 3 Words (쉼표로 구분, 최소 10개 권장)', placeholder: 'ex) Galaxy, Universe, Phoenix ...', hint: '※ 스테이지 3에서는 이전에 틀린 단어도 함께 출제됩니다!' },
];

function openStageInputModal(stage) {
    pendingStage = stage;
    const cfg = STAGE_LABELS[stage - 1];

    stageInputBadge.textContent = cfg.badge;
    stageInputBadge.className = 'stage-input-badge stage-' + stage;
    stageInputLabel.textContent = cfg.label;
    stageWordInput.placeholder = cfg.placeholder;
    stageInputHint.textContent = cfg.hint;

    // Pre-fill with previously entered words for this stage
    const existingWords = stage === 1 ? level1Words : stage === 2 ? level2Words : level3Words;
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

    // Move kirby to the last selected stage (or stage 1 by default)
    const activeBtn = stageBtns[stageNum - 1] || stageBtns[0];
    kirbyMapIcon.style.left = activeBtn.style.left;
    kirbyMapIcon.style.top = activeBtn.style.top;
}

function enterStage(stage) {
    stageNum = stage;
    stageNumDisplay.textContent = stageNum;

    kirbyMapIcon.classList.add('moving');

    // Move Kirby icon smoothly mapping to the button
    const btn = stageBtns[stage - 1];
    kirbyMapIcon.style.left = btn.style.left;
    kirbyMapIcon.style.top = btn.style.top;

    // Wait for the icon animation then transition to battle
    setTimeout(() => {
        kirbyMapIcon.classList.remove('moving');
        mapArea.classList.add('hidden');
        battleView.classList.remove('hidden');

        currentQuestionIndex = 0;
        score = 0;
        hp = 100;
        bossHp = 8;
        currentCombo = 0;

        // Stage 3: prepare all 4 bosses in shuffled order
        if (stageNum === 3) {
            bossQueue    = [...BOSSES].sort(() => 0.5 - Math.random());
            bossQueueIdx = 0;
            currentBoss  = bossQueue[0];
            bossHp       = totalBossHp(); // 4 bosses × 2 hits = 8
        }

        // Populate currentWords based on stage
        currentWords = [];
        let sourceWords = [];
        if (stageNum === 1) {
            sourceWords = [...level1Words];
        } else if (stageNum === 2) {
            sourceWords = [...level2Words];
        } else if (stageNum === 3) {
            // Mix of failed words (high priority) and level 3 words
            sourceWords = [...failedWords, ...level3Words];
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

        // ─── Krong entrance animation (Stage 1 only) ───
        const krongContainer = document.getElementById('krong-container');
        if (stageNum === 1) {
            // Reset for re-entry
            krongContainer.classList.remove('hidden', 'run-in');
            krongContainer.style.animation = '';
            // Remove any leftover bubble
            const oldBubble = krongContainer.querySelector('.krong-bubble');
            if (oldBubble) oldBubble.remove();

            // Small delay so the battle screen is visible first
            setTimeout(() => {
                krongContainer.classList.add('run-in');

                // Show speech bubble after Krong lands (~1.1s)
                setTimeout(() => {
                    krongContainer.classList.remove('run-in');
                    // Switch to idle float
                    krongContainer.style.animation = 'floatKirby 2s infinite alternate ease-in-out';

                    const bubble = document.createElement('div');
                    bubble.className = 'krong-bubble';
                    bubble.textContent = "Let's fight together! 💪";
                    krongContainer.appendChild(bubble);

                    // Remove bubble after 2s
                    setTimeout(() => bubble.remove(), 2000);
                }, 1150);
            }, 300);
        } else {
            // Stage 2/3: Krong stays visible from stage 1, keep idle
            krongContainer.classList.remove('hidden');
            krongContainer.style.animation = 'floatKirby 2s infinite alternate ease-in-out';
        }

        setupAbilitySelector();

        nextQuestion();
        updateUI();
    }, 600);
}

function setupAbilitySelector() {
    const selector = document.getElementById('ability-selector');
    const container = selector.querySelector('.ability-buttons');
    const controls = document.querySelector('.controls');

    container.innerHTML = '';

    if (stageNum === 3) {
        selector.classList.remove('hidden');
        controls.classList.add('hidden'); // Hide normal pass/fail buttons

        // Ensure no duplicates
        const uniqueAbilities = [...new Set(collectedAbilities)];

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
    if (currentQuestionIndex >= 10) {
        endStage();
        return;
    }
    wordDisplay.textContent = currentWords[currentQuestionIndex];
    spawnEnemy();
    feedback.textContent = "";
    isAnimating = false;
}

function handlePass() {
    if (isAnimating) return;
    isAnimating = true;

    // Inhale Animation (normal mode — simple suck-in only)
    kirbySprite.classList.add('inhale');
    document.getElementById('kirby-img').src = 'kirby_inhale.png';

    const enemyContainer = document.getElementById('enemy');
    enemyContainer.classList.add('sucked');
    damageText.textContent = "Great!";
    damageText.classList.add('show');

    setTimeout(() => {
        // Update Status
        statusBadge.textContent = `⭐ ${currentEnemyType}`;
        feedback.textContent = `Kirby transformed into ${currentEnemyType} mode!`;

        if (['Fire', 'Ice', 'Spark', 'Ghost', 'Sword'].includes(currentEnemyType)) {
            document.getElementById('kirby-img').style.filter = 'none';
        } else {
            document.getElementById('kirby-img').style.filter = enemyColors[currentEnemyType];
        }

        if (currentEnemyType !== 'Normal' && currentEnemyType !== 'Boss') {
            collectedAbilities.push(currentEnemyType);
        }

        setTimeout(() => {
            kirbySprite.classList.remove('inhale');

            if (['Fire', 'Ice', 'Spark', 'Ghost', 'Sword'].includes(currentEnemyType)) {
                document.getElementById('kirby-img').src = `kirby_${currentEnemyType.toLowerCase()}.png`;
            } else {
                document.getElementById('kirby-img').src = 'kirby.png';
            }

            enemyContainer.classList.remove('sucked');
            damageText.classList.remove('show');

            score++;
            totalCorrectAnswers++;
            currentCombo++;

            if (currentCombo >= 2) {
                comboText.textContent = `${currentCombo} Combo!`;
                comboText.classList.remove('show');
                void comboText.offsetWidth;
                comboText.classList.add('show');
            }

            currentQuestionIndex++;
            updateUI();

            if (currentQuestionIndex >= 10) {
                endStage();
            } else {
                nextQuestion();
            }
        }, 800);
    }, 800);
}

// ── Fire-breath helper ──────────────────────────────────
function spawnFireBreath(onDone) {
    const effectsLayer = document.getElementById('effects-layer');
    const kirbyRect = kirbySprite.getBoundingClientRect();
    const layerRect = effectsLayer.getBoundingClientRect();

    // Kirby's mouth position relative to the effects-layer
    const startX = kirbyRect.right - layerRect.left - 10;
    const startY = kirbyRect.top + kirbyRect.height * 0.4 - layerRect.top;

    const orbCount = 7;
    const totalDuration = 900; // total ms until done callback

    for (let i = 0; i < orbCount; i++) {
        const orb = document.createElement('div');
        orb.className = 'fire-orb';

        // Each orb: slightly different size, Y-spread, delay
        const size = 22 + Math.random() * 18; // 22–40px
        const flyX = 230 + Math.random() * 60;  // 230–290px
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
    const enemyEl      = document.getElementById('enemy');
    const enemyRect    = enemyEl.getBoundingClientRect();
    const layerRect    = effectsLayer.getBoundingClientRect();

    const bossCenterX = enemyRect.left + enemyRect.width  * 0.5 - layerRect.left;
    const bossCenterY = enemyRect.top                           - layerRect.top;
    const boltBottom  = bossCenterY + enemyRect.height * 0.5;

    const boltCount     = 2;
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
    const enemyRect    = document.getElementById('enemy').getBoundingClientRect();
    const layerRect    = effectsLayer.getBoundingClientRect();

    const cx = enemyRect.left + enemyRect.width  * 0.5 - layerRect.left;
    const cy = enemyRect.top  + enemyRect.height * 0.4 - layerRect.top;

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
    const kirbyRect    = kirbySprite.getBoundingClientRect();
    const enemyEl      = document.getElementById('enemy');
    const enemyRect    = enemyEl.getBoundingClientRect();
    const layerRect    = effectsLayer.getBoundingClientRect();

    const startX = kirbyRect.right  - layerRect.left - 10;
    const startY = kirbyRect.top    + kirbyRect.height * 0.45 - layerRect.top;
    const targetX = enemyRect.left  + enemyRect.width  * 0.5  - layerRect.left;
    const targetY = enemyRect.top   + enemyRect.height * 0.5  - layerRect.top;

    const shardCount  = 6;
    const totalDuration = 850;

    for (let i = 0; i < shardCount; i++) {
        const shard = document.createElement('div');
        shard.className = 'ice-shard';

        const spread  = (i - (shardCount - 1) / 2) * 18;
        const dx      = targetX - startX + (Math.random() - 0.5) * 20;
        const dy      = (targetY - startY) + spread;
        const rot     = Math.atan2(dy, dx) * (180 / Math.PI) + 90;
        const delay   = i * 55;
        const dur     = 0.42 + Math.random() * 0.1;

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
    const kirbyRect    = kirbySprite.getBoundingClientRect();
    const enemyEl      = document.getElementById('enemy');
    const enemyRect    = enemyEl.getBoundingClientRect();
    const layerRect    = effectsLayer.getBoundingClientRect();

    const startX  = kirbyRect.right - layerRect.left;
    const startY  = kirbyRect.top   + kirbyRect.height * 0.4 - layerRect.top;
    const targetX = enemyRect.left  + enemyRect.width  * 0.5 - layerRect.left;
    const targetY = enemyRect.top   + enemyRect.height * 0.45 - layerRect.top;
    const dx      = targetX - startX;

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
// ────────────────────────────────────────────────────────

function handleBossAttack(ability) {
    if (bossHp <= 0 || isAnimating) return;
    isAnimating = true;

    const enemyImg = document.getElementById('enemy-img');
    const kirbyImg = document.getElementById('kirby-img');
    const enemyContainer = document.getElementById('enemy');

    // Update Kirby and Boss images for this ability
    if (['Fire', 'Ice', 'Spark', 'Ghost', 'Sword'].includes(ability)) {
        const typeStr = ability.toLowerCase();
        kirbyImg.src = `kirby_${typeStr}.png`;
        kirbyImg.style.filter = 'none';
        if (currentBoss.variants[typeStr]) {
            enemyImg.dataset.bossType = typeStr;
            enemyImg.src = currentBoss.variants[typeStr];
        } else {
            // No variant for this ability → use boss default
            enemyImg.dataset.bossType = '';
            enemyImg.src = currentBoss.default;
        }
    } else {
        kirbyImg.src = 'kirby.png';
        kirbyImg.style.filter = enemyColors[ability] || 'none';
        enemyImg.dataset.bossType = '';
        enemyImg.src = currentBoss.default;
    }

    // ─── FIRE MODE: breath animation ───
    if (ability === 'Fire') {
        spawnFireBreath(() => {
            damageText.textContent = '🔥 Fire Attack! -1';
            damageText.classList.add('show');
            enemyContainer.style.animation = 'vibrateKirby 0.3s 3';
            bossHp -= 1; score += 1; totalCorrectAnswers += 1; currentCombo++;
            advanceBossIfNeeded();
            if (currentCombo >= 2) {
                comboText.textContent = `${currentCombo} Combo!`;
                comboText.classList.remove('show'); void comboText.offsetWidth;
                comboText.classList.add('show');
            }
            setTimeout(() => {
                enemyContainer.style.animation = '';
                damageText.classList.remove('show');
                statusBadge.textContent = '⭐ Fire';
                feedback.textContent = '🔥 Fire damage hit the Boss!';
                updateUI();
                if (bossHp <= 0) { triggerVictorySequence(); }
                else { currentQuestionIndex++; nextQuestion(); }
            }, 800);
        });
        return;
    }

    // ─── SPARK MODE: lightning strike ───
    if (ability === 'Spark') {
        spawnLightningStrike(() => {
            damageText.textContent = '⚡ Spark Attack! -1';
            damageText.classList.add('show');
            enemyContainer.style.animation = 'vibrateKirby 0.3s 4';
            bossHp -= 1; score += 1; totalCorrectAnswers += 1; currentCombo++;
            advanceBossIfNeeded();
            if (currentCombo >= 2) {
                comboText.textContent = `${currentCombo} Combo!`;
                comboText.classList.remove('show'); void comboText.offsetWidth;
                comboText.classList.add('show');
            }
            setTimeout(() => {
                enemyContainer.style.animation = '';
                damageText.classList.remove('show');
                statusBadge.textContent = '⭐ Spark';
                feedback.textContent = '⚡ Thunder bolt hit the Boss!';
                updateUI();
                if (bossHp <= 0) { triggerVictorySequence(); }
                else { currentQuestionIndex++; nextQuestion(); }
            }, 800);
        });
        return;
    }

    // ─── SWORD MODE: dash + X slash ───
    if (ability === 'Sword') {
        // Quick dash forward then slash
        kirbySprite.classList.add('walk-forward');
        setTimeout(() => {
            kirbySprite.classList.remove('walk-forward');
            kirbySprite.classList.add('attack');
            spawnSwordSlash(() => {
                kirbySprite.classList.remove('attack');
                damageText.textContent = '⚔️ Sword Attack! -1';
                damageText.classList.add('show');
                enemyContainer.style.animation = 'vibrateKirby 0.3s 4';
                bossHp -= 1; score += 1; totalCorrectAnswers += 1; currentCombo++;
                advanceBossIfNeeded();
                if (currentCombo >= 2) {
                    comboText.textContent = `${currentCombo} Combo!`;
                    comboText.classList.remove('show'); void comboText.offsetWidth;
                    comboText.classList.add('show');
                }
                setTimeout(() => {
                    enemyContainer.style.animation = '';
                    damageText.classList.remove('show');
                    kirbySprite.classList.add('return-pos');
                    statusBadge.textContent = '⭐ Sword';
                    feedback.textContent = '⚔️ Sword slash hit the Boss!';
                    updateUI();
                    setTimeout(() => {
                        kirbySprite.classList.remove('return-pos');
                        if (bossHp <= 0) { triggerVictorySequence(); }
                        else { currentQuestionIndex++; nextQuestion(); }
                    }, 600);
                }, 600);
            });
        }, 600); // Shorter dash for sword (0.6s vs 1s)
        return;
    }

    // ─── ICE MODE: shard burst ───
    if (ability === 'Ice') {
        spawnIceAttack(() => {
            damageText.textContent = '❄️ Ice Attack! -1';
            damageText.classList.add('show');
            enemyContainer.style.animation = 'vibrateKirby 0.3s 3';
            bossHp -= 1; score += 1; totalCorrectAnswers += 1; currentCombo++;
            advanceBossIfNeeded();
            if (currentCombo >= 2) {
                comboText.textContent = `${currentCombo} Combo!`;
                comboText.classList.remove('show'); void comboText.offsetWidth;
                comboText.classList.add('show');
            }
            setTimeout(() => {
                enemyContainer.style.animation = '';
                damageText.classList.remove('show');
                statusBadge.textContent = '⭐ Ice';
                feedback.textContent = '❄️ Frozen shards hit the Boss!';
                updateUI();
                if (bossHp <= 0) { triggerVictorySequence(); }
                else { currentQuestionIndex++; nextQuestion(); }
            }, 800);
        });
        return;
    }

    // ─── GHOST MODE: wave + orb ───
    if (ability === 'Ghost') {
        spawnGhostAttack(() => {
            damageText.textContent = '👻 Ghost Attack! -1';
            damageText.classList.add('show');
            enemyContainer.style.animation = 'vibrateKirby 0.3s 3';
            bossHp -= 1; score += 1; totalCorrectAnswers += 1; currentCombo++;
            advanceBossIfNeeded();
            if (currentCombo >= 2) {
                comboText.textContent = `${currentCombo} Combo!`;
                comboText.classList.remove('show'); void comboText.offsetWidth;
                comboText.classList.add('show');
            }
            setTimeout(() => {
                enemyContainer.style.animation = '';
                damageText.classList.remove('show');
                statusBadge.textContent = '⭐ Ghost';
                feedback.textContent = '👻 Haunting energy hit the Boss!';
                updateUI();
                if (bossHp <= 0) { triggerVictorySequence(); }
                else { currentQuestionIndex++; nextQuestion(); }
            }, 800);
        });
        return;
    }

    // ─── OTHER ABILITIES: walk → attack ───
    kirbySprite.classList.add('walk-forward');

    setTimeout(() => {
        kirbySprite.classList.remove('walk-forward');
        kirbySprite.classList.add('attack');
        kirbySprite.classList.add('inhale');

        setTimeout(() => {
            kirbySprite.classList.remove('attack');

            damageText.textContent = `${ability} Attack! -1`;
            damageText.classList.add('show');
            enemyContainer.style.animation = 'vibrateKirby 0.3s 3';

            bossHp -= 1;
            advanceBossIfNeeded();
            score += 1;
            totalCorrectAnswers += 1;
            currentCombo++;
            if (currentCombo >= 2) {
                comboText.textContent = `${currentCombo} Combo!`;
                comboText.classList.remove('show');
                void comboText.offsetWidth;
                comboText.classList.add('show');
            }

            setTimeout(() => {
                enemyContainer.style.animation = '';
                kirbySprite.classList.remove('inhale');
                damageText.classList.remove('show');
                kirbySprite.classList.add('return-pos');

                statusBadge.textContent = `⭐ ${ability}`;
                feedback.textContent = `${ability} damage hit the Boss!`;
                updateUI();

                setTimeout(() => {
                    kirbySprite.classList.remove('return-pos');
                    if (bossHp <= 0) {
                        triggerVictorySequence();
                    } else {
                        currentQuestionIndex++;
                        nextQuestion();
                    }
                }, 600);
            }, 800);
        }, 500);
    }, 1000);
}

function triggerVictorySequence() {
    const battlefield = document.querySelector('.battlefield');

    // Hide HP bars and enemy
    document.getElementById('boss-hp-container').style.opacity = '0';
    document.querySelector('.hp-bar-container').style.opacity = '0';
    document.getElementById('enemy').style.opacity = '0';
    document.getElementById('ability-selector').classList.add('hidden');

    // Trigger transition class to move Kirby to center
    battlefield.classList.add('victory');

    // Change Kirby to normal for celebration
    document.getElementById('kirby-img').src = 'kirby.png';
    document.getElementById('kirby-img').style.filter = 'none';

    setTimeout(() => {
        document.getElementById('kirby-sprite').classList.add('victory-jump');
        feedback.textContent = "Victory!! Defeated the Boss! 😆🎉";
        feedback.style.color = '#10B981';

        setTimeout(() => {
            currentQuestionIndex++;
            endStage(); // Force end stage anyway since boss is dead
        }, 3500); // 3.5 seconds of celebrating before ending overlay
    }, 1000); // Wait 1s for Kirby to slide to center
}

function handleFail() {
    if (isAnimating) return;
    isAnimating = true;

    // Track failed word for Stage 3 review
    const failedWord = currentWords[currentQuestionIndex];
    if (failedWord && !failedWords.includes(failedWord)) {
        failedWords.push(failedWord);
    }

    // Fail Animation
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

        // Reset ability on fail
        document.getElementById('kirby-img').src = 'kirby.png';
        document.getElementById('kirby-img').style.filter = enemyColors['Normal'];
        statusBadge.textContent = `⭐ Normal`;

        currentQuestionIndex++;
        updateUI();

        if (currentQuestionIndex >= 10) {
            endStage();
        } else {
            nextQuestion();
        }
    }, 800);
}

function endStage() {
    isAnimating = false; // Release lock in case of stage end
    overlay.classList.remove('hidden');
    const title = document.getElementById('overlay-title');
    const msg = document.getElementById('overlay-message');

    if (score >= 8) {
        title.innerHTML = '🎉 Stage Clear! 🎉';

        if (stageNum === 3) {
            msg.innerHTML = `Amazing! You defeated the Boss!`;
            // Day 3 Warp star logic
            title.innerHTML = '🌠 Warp to another stage! 🌠';
            msg.innerHTML = `You conquered all stages! Kirby flies away on a Warp Star!`;
            btnNext.textContent = "Play Again";
        } else {
            msg.innerHTML = `Amazing! Passed with ${score}/10 points!`;
            btnNext.textContent = "Back to Map";
        }

        // Unlock next stage if applicable
        if (stageNum === unlockedStage && unlockedStage < 3) {
            unlockedStage++;
        }
    } else {
        title.innerHTML = '💦 Stage Failed! 💦';
        msg.innerHTML = `Score was a bit low (${score}/10 points). Try again!`;
        btnNext.textContent = "Back to Map";
    }
}

// Event Listeners
btnStart.addEventListener('click', initGame);
btnPass.addEventListener('click', handlePass);
btnFail.addEventListener('click', handleFail);

// ── Per-Stage Modal buttons ──
btnStageCancel.addEventListener('click', () => {
    stageInputModal.classList.add('hidden');
});

btnStageConfirm.addEventListener('click', () => {
    const raw = stageWordInput.value.split(',').map(w => w.trim()).filter(w => w.length > 0);

    const defaults = [
        ['Apple', 'Banana', 'Cat', 'Dog', 'Elephant', 'Fire', 'Good', 'Happy', 'Ice', 'Jump'],
        ['House', 'Train', 'Car', 'Plane', 'Boat', 'Mountain', 'River', 'Forest', 'Desert', 'Ocean'],
        ['Galaxy', 'Universe', 'Quantum', 'Mystery', 'Adventure', 'Dragon', 'Castle', 'Wizard', 'Diamond', 'Phoenix'],
    ];

    const words = raw.length > 0 ? raw : defaults[pendingStage - 1];

    if (pendingStage === 1)      level1Words = words;
    else if (pendingStage === 2) level2Words = words;
    else                         level3Words = words;

    stageInputModal.classList.add('hidden');
    enterStage(pendingStage);
});

btnBackMap.addEventListener('click', () => {
    battleView.classList.add('hidden');
    mapArea.classList.remove('hidden');

    // Clear the current enemy/Kirby states
    kirbySprite.classList.remove('fail', 'inhale');
    document.getElementById('kirby-img').src = 'kirby.png';
    document.getElementById('kirby-img').style.filter = enemyColors['Normal'];
    statusBadge.textContent = '⭐ Normal';

    // Hide Krong on map
    document.getElementById('krong-container').classList.add('hidden');

    updateMap();
});

btnNext.addEventListener('click', () => {
    overlay.classList.add('hidden');

    if (unlockedStage === 3 && score >= 8 && stageNum === 3) {
        // Full Reset back to start screen
        battleView.classList.add('hidden');
        level1Words = [];
        level2Words = [];
        level3Words = [];
        unlockedStage = 1;
        collectedAbilities = ['Normal'];
        document.getElementById('krong-container').classList.add('hidden');
        setupArea.classList.remove('hidden');
    } else {
        // Back to Map
        battleView.classList.add('hidden');
        mapArea.classList.remove('hidden');

        kirbySprite.classList.remove('fail', 'inhale');
        document.getElementById('kirby-img').src = 'kirby.png';
        document.getElementById('kirby-img').style.filter = enemyColors['Normal'];
        statusBadge.textContent = '⭐ Normal';
        document.getElementById('krong-container').classList.add('hidden');
        
        updateMap();
    }
});

function updateDashboardUI() {
    document.getElementById('dash-total-correct').textContent = totalCorrectAnswers;
    document.getElementById('dash-unlocked-stage').textContent = `${unlockedStage} / 3`;

    document.getElementById('dash-lvl1').textContent = level1Words.length > 0 ? level1Words.join(', ') : '-';
    document.getElementById('dash-lvl2').textContent = level2Words.length > 0 ? level2Words.join(', ') : '-';
    document.getElementById('dash-lvl3').textContent = level3Words.length > 0 ? level3Words.join(', ') : '-';

    const dashFailed = document.getElementById('dash-failed-words');
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

btnOpenDashboard.addEventListener('click', () => {
    // Words are already stored in the level arrays from per-stage input
    updateDashboardUI();
    dashboardView.classList.remove('hidden');
});

btnCloseDashboard.addEventListener('click', () => {
    dashboardView.classList.add('hidden');
});

btnDownloadDashboard.addEventListener('click', () => {
    // Generate text content for the dashboard
    const currentDate = new Date().toLocaleDateString();

    let content = `====== Kirby English Adventure: Parent Dashboard ======\n`;
    content += `Date: ${currentDate}\n\n`;
    content += `[ 🏆 Overall Progress ]\n`;
    content += `- Total Correct Answers: ${totalCorrectAnswers}\n`;
    content += `- Current Stage Unlocked: ${unlockedStage} / 3\n\n`;

    content += `[ 📚 Today's Vocabulary ]\n`;
    content += `Level 1: ${level1Words.length > 0 ? level1Words.join(', ') : '-'}\n`;
    content += `Level 2: ${level2Words.length > 0 ? level2Words.join(', ') : '-'}\n`;
    content += `Level 3: ${level3Words.length > 0 ? level3Words.join(', ') : '-'}\n\n`;

    content += `[ ⚠️ Words to Review (Needs more practice) ]\n`;
    if (failedWords.length > 0) {
        content += [...new Set(failedWords)].join(', ') + '\n';
    } else {
        content += `None yet! Great job!\n`;
    }

    content += `=======================================================\n`;

    // Create a Blob with the text content
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });

    // Create an invisible link to trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Kirby_Dashboard_${currentDate.replace(/\//g, '-')}.txt`;

    document.body.appendChild(link);
    link.click();

    // Cleanup
    document.body.removeChild(link);
});

// Init on load
updateUI();
