import re
with open('script.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace updateExpBar
old_update = '''    if (crongExp >= EXP_MAX && crongEvolutionLevel < 2) {
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
    }'''

new_update = '''    if (crongExp >= EXP_MAX) {
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
    }'''

if old_update in content:
    content = content.replace(old_update, new_update)
    print('Replaced updateExpBar logic successfully.')
else:
    print('COULD NOT FIND old_update block!')

stage3_cutscene = '''
function triggerEvolutionStage3() {
    const overlay = document.createElement('div');
    overlay.style.cssText = 'position: fixed; inset: 0; background: black; z-index: 10000; opacity: 0; transition: opacity 1.5s; display: flex; align-items: center; justify-content: center;';
    document.body.appendChild(overlay);
    
    // Play a dark fade
    setTimeout(() => {
        overlay.style.opacity = '1';
    }, 50);
    
    setTimeout(() => {
        // Change overlay background to evolve_background.png
        overlay.style.background = 'url("evolve_background.png") center/cover no-repeat';
        
        // Add a canvas for the crong animation
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
'''

content += "\n" + stage3_cutscene

with open('script.js', 'w', encoding='utf-8') as f:
    f.write(content)
