// 1. 스프라이트 프레임 데이터 (sprites.txt 기반, width가 2인 프레임 제외)
const spriteData = {
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
    // 나중에 skill, happy, ghost 등의 다른 상태를 추가할 때 여기에 동일한 구조로 삽입하면 됩니다.
};

const w2 = 220, h2 = 220;
const spriteDataSecond = {
    idle: [
        { x: 0, y: 0, w: w2, h: h2 }, { x: w2, y: 0, w: w2, h: h2 }, { x: w2*2, y: 0, w: w2, h: h2 },
        { x: 0, y: 0, w: w2, h: h2 }, { x: w2, y: 0, w: w2, h: h2 }, { x: w2*2, y: 0, w: w2, h: h2 },
        { x: 0, y: 0, w: w2, h: h2 }, { x: w2, y: 0, w: w2, h: h2 }, { x: w2*2, y: 0, w: w2, h: h2 },
        { x: w2*3, y: 0, w: w2, h: h2 }, { x: w2*4, y: 0, w: w2, h: h2 }
    ],
    walk: [
        { x: 0, y: h2, w: w2, h: h2 }, { x: w2, y: h2, w: w2, h: h2 }, { x: w2*2, y: h2, w: w2, h: h2 }, { x: w2*3, y: h2, w: w2, h: h2 }, { x: w2*4, y: h2, w: w2, h: h2 }
    ],
    attack: [
        { x: 0, y: h2*2, w: w2, h: h2 }, { x: w2, y: h2*2, w: w2, h: h2 }, { x: w2*2, y: h2*2, w: w2, h: h2 }
    ],
    attacked: [
        { x: w2*3, y: h2*2, w: w2, h: h2 }, { x: w2*4, y: h2*2, w: w2, h: h2 }
    ]
};

// 2. 캔버스와 컨텍스트 설정
const canvas = document.getElementById('crong-canvas');
const ctx = canvas.getContext('2d');
const spritesheet = document.getElementById('crong-spritesheet');
const crongSecondImg = document.getElementById('crong-second-img');

// 3. 애니메이션 상태를 관리하는 State Machine 객체
const frameIntervals = {
    idle: 500,      // 손 흔드는 모션은 천천히 (250ms 단위)
    walk: 120,
    attack: 120,
    attacked: 120
};

const character = {
    state: 'idle',           // 현재 캐릭터의 상태 (기본: idle)
    frameIndex: 0,           // 현재 상태 안에서 보여줄 프레임 번호
    x: 25,                   // 캔버스 내 x 좌표 (중앙 정렬을 위해 25로 설정)
    y: 20,                   // 캔버스 내 y 좌표
    scale: 1.5,              // 캐릭터 크기 확대 비율
    animationTimer: 0,       // 프레임 넘김을 위한 경과 시간
    frameInterval: 250,      // 한 프레임을 보여줄 시간 (ms) - 작을수록 애니메이션이 빨라짐
    lastTime: 0,             // 이전 requestAnimationFrame 타임스탬프

    // 동작의 흐름(Sequence) 처리를 위한 속성 (예: walk -> attack -> idle)
    sequence: [],
    sequenceIndex: 0,
    loopCount: 0,            // 현재 상태가 몇 번 반복되었는지
    targetLoops: 0,          // 목표 반복 횟수 (0이면 무한 반복)

    isEvolving: false,
    evolveTimer: 0,
    isEvolved: false
};

// 4. 캐릭터의 상태를 변경하는 함수
function changeState(newState, targetLoops = 0) {
    if (character.state !== newState || targetLoops > 0) {
        character.state = newState;
        character.frameIndex = 0;       // 새로운 상태가 시작되면 첫 번째 프레임부터
        character.loopCount = 0;
        character.targetLoops = targetLoops;
        character.animationTimer = 0;
    }
}

// 5. 시퀀스 시작 (배열로 여러 동작을 받아 순차적으로 실행)
function playSequence(seq) {
    character.sequence = seq;
    character.sequenceIndex = 0;

    // 시퀀스의 첫 번째 동작 시작
    const nextStep = character.sequence[0];
    changeState(nextStep.state, nextStep.loops);
}

// 6. 매 프레임 상태 업데이트 로직 (타이머 체크 및 프레임 이동)
function update(deltaTime) {
    if (character.isEvolving) {
        character.evolveTimer += deltaTime;
        if (character.evolveTimer >= 5000) {
            character.isEvolving = false;
            character.isEvolved = true;
        }
    }

    character.animationTimer += deltaTime;

    // 현재 상태에 맞는 프레임 간격 가져오기
    const currentInterval = frameIntervals[character.state] || character.frameInterval;

    // 지정된 시간(currentInterval)이 지났을 때 다음 프레임으로 넘김
    if (character.animationTimer >= currentInterval) {
        character.animationTimer = 0;
        character.frameIndex++;

        const currentData = character.isEvolved ? spriteDataSecond : spriteData;
        const currentFrames = currentData[character.state];

        // 해당 상태의 마지막 프레임까지 재생했다면?
        if (character.frameIndex >= currentFrames.length) {
            character.frameIndex = 0; // 다시 첫 프레임으로
            character.loopCount++;    // 반복 횟수 +1

            // 목표 반복 횟수에 도달했는지 확인 (targetLoops > 0 일 때만 유효)
            if (character.targetLoops > 0 && character.loopCount >= character.targetLoops) {
                // 시퀀스 큐에 다음 동작이 있다면 다음 단계로 진행
                if (character.sequence.length > 0 && character.sequenceIndex < character.sequence.length - 1) {
                    character.sequenceIndex++;
                    const nextStep = character.sequence[character.sequenceIndex];
                    changeState(nextStep.state, nextStep.loops);
                }
            }
        }
    }
}

// 7. 캔버스 그리기 로직
function draw() {
    // 화면(캔버스) 깨끗하게 비우기
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const currentData = character.isEvolved ? spriteDataSecond : spriteData;
    const frames = currentData[character.state];
    const frame = frames[character.frameIndex];
    
    if (character.isEvolved) {
        if (crongSecondImg.complete) {
            const drawScale = 1.19;
            const drawX = 23;
            const drawY = 15;
            
            // 둥둥 떠있는 효과
            const floatY = Math.sin(Date.now() / 300) * 5;
            
            ctx.drawImage(crongSecondImg, frame.x, frame.y, frame.w, frame.h, drawX, drawY + floatY, frame.w * drawScale, frame.h * drawScale);
        }
        return;
    }

    const drawX = character.x;
    const drawY = character.y;
    const drawW = frame.w * character.scale;
    const drawH = frame.h * character.scale;

    // 이미지가 브라우저에 완전히 로드되었는지 확인 후 그리기
    if (spritesheet.complete && spritesheet.naturalWidth > 0) {
        if (!character.isEvolving) {
            ctx.drawImage(spritesheet, frame.x, frame.y, frame.w, frame.h, drawX, drawY, drawW, drawH);
        } else {
            // 진화 효과 렌더링
            const progress = character.evolveTimer / 5000; // 0 ~ 1

            ctx.save();
            
            if (progress < 0.8) {
                // 1단계: 점점 빨라지는 깜빡임 (0 ~ 4초)
                const freq = 0.005 + (progress * 0.05);
                const toggleValue = Math.sin(character.evolveTimer * freq);
                const isCrongSecond = toggleValue > 0;
                
                const glowIntensity = progress / 0.8; 
                
                ctx.shadowColor = `rgba(0, 150, 255, 1)`;
                ctx.shadowBlur = 20 + (glowIntensity * 50);
                
                if (isCrongSecond && crongSecondImg.complete) {
                    const sFrame = spriteDataSecond.idle[character.frameIndex % spriteDataSecond.idle.length];
                    const drawScale = 1.19;
                    const secondDrawX = 23;
                    
                    ctx.drawImage(crongSecondImg, sFrame.x, sFrame.y, sFrame.w, sFrame.h, secondDrawX, drawY, sFrame.w * drawScale, sFrame.h * drawScale);
                    
                    ctx.globalCompositeOperation = 'source-atop';
                    ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + glowIntensity * 0.7})`;
                    ctx.fillRect(secondDrawX, drawY, sFrame.w * drawScale, sFrame.h * drawScale);
                } else {
                    ctx.drawImage(spritesheet, frame.x, frame.y, frame.w, frame.h, drawX, drawY, drawW, drawH);
                    
                    ctx.globalCompositeOperation = 'source-atop';
                    ctx.fillStyle = `rgba(255, 255, 255, ${0.3 + glowIntensity * 0.7})`;
                    ctx.fillRect(drawX, drawY, drawW, drawH);
                }
            }
            else if (progress < 0.85) {
                ctx.fillStyle = `rgba(255, 255, 255, 1)`;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
            else {
                const appearProgress = (progress - 0.85) / 0.15; // 0 ~ 1
                
                if (crongSecondImg.complete) {
                    const sFrame = spriteDataSecond.idle[character.frameIndex % spriteDataSecond.idle.length];
                    const drawScale = 1.19;
                    const secondDrawX = 23;
                    
                    ctx.drawImage(crongSecondImg, sFrame.x, sFrame.y, sFrame.w, sFrame.h, secondDrawX, drawY, sFrame.w * drawScale, sFrame.h * drawScale);
                }
                
                ctx.fillStyle = `rgba(255, 255, 255, ${1 - appearProgress})`;
                ctx.fillRect(0, 0, canvas.width, canvas.height);
            }
            ctx.restore();
        }
    }
}

// 8. 무한 게임 루프 (requestAnimationFrame)
function gameLoop(timestamp) {
    // 델타 타임(ms) 계산 (이전 호출과 현재 호출 사이의 시간차)
    const deltaTime = timestamp - character.lastTime;
    character.lastTime = timestamp;

    update(deltaTime); // 로직 업데이트
    draw();            // 화면 다시 그리기

    requestAnimationFrame(gameLoop); // 다음 프레임 예약
}

// 9. 버튼 이벤트 리스너 설정
document.getElementById('btn-correct').addEventListener('click', () => {
    // Pass 버튼 클릭 시: walk를 1번 반복 후 -> attack 1번 반복 후 -> idle을 무한(0) 반복
    playSequence([
        { state: 'walk', loops: 1 },
        { state: 'attack', loops: 1 },
        { state: 'idle', loops: 0 }
    ]);
});

document.getElementById('btn-incorrect').addEventListener('click', () => {
    // Fail 버튼 클릭 시: walk 1번 -> attacked 1번 -> idle 무한
    playSequence([
        { state: 'walk', loops: 1 },
        { state: 'attacked', loops: 1 },
        { state: 'idle', loops: 0 }
    ]);
});

document.getElementById('btn-evolve').addEventListener('click', () => {
    if (!character.isEvolved && !character.isEvolving) {
        character.isEvolving = true;
        character.evolveTimer = 0;
        changeState('idle', 0); // idle 상태에서 진화 시작
    }
});

// 10. 초기화
// 이미지가 로드되면 애니메이션 시작
spritesheet.onload = () => {
    playSequence([{ state: 'idle', loops: 0 }]); // 기본 상태는 idle 무한
    character.lastTime = performance.now();      // 시작 시간 기록
    requestAnimationFrame(gameLoop);             // 루프 시작
};

// 혹시 이미지가 이미 브라우저 캐시에 있어 onload가 안 불릴 경우 대비
if (spritesheet.complete && spritesheet.naturalWidth > 0) {
    playSequence([{ state: 'idle', loops: 0 }]);
    character.lastTime = performance.now();
    requestAnimationFrame(gameLoop);
}
