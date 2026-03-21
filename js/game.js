// ==========================================
// FILE: js/game.js
// FUNGSI: Mesin Utama (Looping, Spawn, Collision, Input)
// ==========================================

const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

let isPlaying = false;
let gameMode = 'classic'; // 'classic' atau 'rank'
let score = 0;
let shotsFired = 0;
let shotsHit = 0;
let timeLeft = 60;
let animationFrameId;

// Array penampung
let clouds = [];
let birds = [];
let effects = [];

// Elemen HUD
const scoreValHUD = document.getElementById('scoreVal');
const timeValHUD = document.getElementById('timeVal');

// Setup Ukuran Canvas biar responsif sesuai layar tablet/HP
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// ================= INPUT (NEMBAK) =================
canvas.addEventListener('mousedown', handleShoot);
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault(); // Mencegah scrolling nggak sengaja pas main di tablet
    handleShoot(e.touches[0]);
}, { passive: false });

function handleShoot(event) {
    if (!isPlaying) return;
    
    // Ambil koordinat titik tembak
    const rect = canvas.getBoundingClientRect();
    const clickX = (event.clientX || event.pageX) - rect.left;
    const clickY = (event.clientY || event.pageY) - rect.top;
    
    shotsFired++;
    
    // Bikin efek ledakan kecil
    effects.push(new ShotEffect(clickX, clickY));
    
    // Bunyikan suara tembakan (Akan berfungsi kalau file audio.js udah kita buat)
    if (typeof playAudio === "function") playAudio('sfx_shoot'); 
    
    let hitSomething = false;

    // Cek tabrakan dari belakang array (biar nembak burung yang posisinya paling depan di layar)
    for (let i = birds.length - 1; i >= 0; i--) {
        let b = birds[i];
        
        // Deteksi Hitbox (kotak kena tembak)
        if (clickX >= b.x - b.width/2 && clickX <= b.x + b.width/2 &&
            clickY >= b.y - b.height/2 && clickY <= b.y + b.height/2) {
            
            b.hp--;
            hitSomething = true;
            
            if (b.hp <= 0) {
                // Burung mati, tambah skor
                score += b.scoreValue;
                updateHUD();
                birds.splice(i, 1);
                
                // Memicu video combo jika ada (Akan berfungsi kalau file hud.js udah kita buat)
                checkCombo(); 
            }
            break; // Cuma kena 1 burung per peluru, nggak tembus pandang
        }
    }
    
    if (hitSomething) shotsHit++;
}

function updateHUD() {
    if(scoreValHUD) scoreValHUD.innerText = score;
    if(timeValHUD) timeValHUD.innerText = timeLeft;
}

function checkCombo() {
    if(typeof triggerComboVideo === "function") triggerComboVideo();
}

// ================= SPAWN MANAGER =================
function spawnManager() {
    // Spawn Awan (Random)
    if (Math.random() < 0.02) {
        clouds.push(new Cloud(canvas.width, canvas.height));
    }
    
    // Spawn Burung B.A.N.G.G.O
    let spawnRate = gameMode === 'rank' ? 0.04 : 0.02; // Mode rank burungnya lebih banyak
    
    if (Math.random() < spawnRate) {
        let rand = Math.random();
        let type = 'normal';
        
        if (rand < 0.05) type = 'boss';      // 5% kemungkinan burung gede
        else if (rand < 0.15) type = 'gold'; // 10% kemungkinan burung emas
        
        birds.push(new Bird(canvas.width, canvas.height, type));
    }
}

// ================= GAME LOOP UTAMA =================
function gameLoop() {
    if (!isPlaying) return;
    
    // Bersihkan layar setiap frame (60 FPS)
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 1. Gambar Awan
    for (let i = clouds.length - 1; i >= 0; i--) {
        let c = clouds[i];
        c.update();
        c.draw(ctx);
        if (c.x + c.width < -100) clouds.splice(i, 1); // Buang memori kalau awan udah lewat layar
    }
    
    // 2. Gambar Burung
    for (let i = birds.length - 1; i >= 0; i--) {
        let b = birds[i];
        b.update(canvas.width, canvas.height);
        b.draw(ctx);
        if (b.x < -200 || b.x > canvas.width + 200) birds.splice(i, 1); // Buang kalau burung kabur
    }
    
    // 3. Gambar Efek Ledakan
    for (let i = effects.length - 1; i >= 0; i--) {
        let e = effects[i];
        e.update();
        e.draw(ctx);
        if (e.isDead) effects.splice(i, 1);
    }
    
    spawnManager();
    animationFrameId = requestAnimationFrame(gameLoop);
}

// ================= KONTROL PERMAINAN =================
function startGame() {
    isPlaying = true;
    score = 0;
    shotsFired = 0;
    shotsHit = 0;
    timeLeft = gameMode === 'rank' ? 60 : 90; // Mode rank 60 detik, Classic 90 detik
    
    birds = [];
    effects = [];
    
    // Bikin 5 awan duluan biar pas mulai langitnya nggak sepi
    for(let i=0; i<5; i++) {
        let c = new Cloud(canvas.width, canvas.height);
        c.x = Math.random() * canvas.width; 
        clouds.push(c);
    }
    
    updateHUD();
    document.getElementById('hud').classList.remove('hidden'); // Tampilkan tulisan skor & waktu
    
    gameLoop();
    startTimer();
}

let timerInterval;
function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        if (!isPlaying) return;
        
        timeLeft--;
        updateHUD();
        
        if (timeLeft <= 0) {
            endGame();
        }
    }, 1000);
}

function endGame() {
    isPlaying = false;
    clearInterval(timerInterval);
    cancelAnimationFrame(animationFrameId);
    
    // Tampilkan layar Game Over (Fungsi ada di file js lain nanti)
    if(typeof showEndScreen === "function") showEndScreen(score, shotsFired, shotsHit);
}

function pauseGame() {
    isPlaying = !isPlaying; 
    if (isPlaying) {
        document.getElementById('pauseLayer').classList.add('hidden');
        gameLoop();
    } else {
        document.getElementById('pauseLayer').classList.remove('hidden');
    }
}

// Global functions biar bisa dipanggil dari UI/HTML
window.startGame = startGame;
window.pauseGame = pauseGame;
window.setGameMode = (mode) => { gameMode = mode; };
