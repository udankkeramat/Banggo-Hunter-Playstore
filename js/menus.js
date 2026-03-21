// ==========================================
// FILE: js/menus.js
// FUNGSI: Mengatur Interaksi Tombol dan Layar Menu
// ==========================================

// --- FUNGSI AWAL (MELEWATI LOADING) ---
function startExperience() {
    // Sembunyikan layar loading
    document.getElementById('startGroup').classList.add('hidden');
    document.getElementById('loadingScreen').classList.add('hidden');
    
    // Munculkan Layar Judul (Title Screen)
    document.getElementById('titleLayer').classList.remove('hidden');
    
    // Animasi masuk elemen UI
    const uiLeft = document.getElementById('uiLeftWrapper');
    const uiRight = document.getElementById('uiRightWrapper');
    const uiTop = document.getElementById('uiTopWrapper');
    const uiBottom = document.getElementById('uiBottomWrapper');

    uiLeft.classList.add('anim-left-in');
    uiRight.classList.add('anim-right-in');
    uiTop.classList.add('anim-top-in');
    uiBottom.classList.add('anim-bot-in');
    
    // Pastikan opacity jadi 1 setelah animasi
    setTimeout(() => {
        uiLeft.style.opacity = 1;
        uiRight.style.opacity = 1;
        uiTop.style.opacity = 1;
        uiBottom.style.opacity = 1;
    }, 800);
    
    // Putar musik BGM Menu (kalau file audio.js udah jalan nanti)
    if(typeof playAudio === 'function') playAudio('bgm_menu');
}

// --- FUNGSI TRANSISI KE GAMEPLAY ---
function playGameTransition() {
    // Sembunyikan Title Screen
    document.getElementById('titleLayer').classList.add('hidden');
    
    // Munculkan layar hitung mundur (3.. 2.. 1..)
    const countdownLayer = document.getElementById('countdownLayer');
    const countdownText = document.getElementById('countdownText');
    countdownLayer.classList.remove('hidden');
    
    let count = 3;
    countdownText.innerText = count;
    if(typeof playAudio === 'function') playAudio('sfx_countdown');

    let countInterval = setInterval(() => {
        count--;
        if (count > 0) {
            countdownText.innerText = count;
            // Reset animasi pop
            countdownText.style.animation = 'none';
            void countdownText.offsetWidth; // trigger reflow
            countdownText.style.animation = 'countdownPop 0.8s forwards';
            if(typeof playAudio === 'function') playAudio('sfx_countdown');
        } else if (count === 0) {
            // Teks pas mulai tergantung bahasa
            let goText = "START!";
            if(typeof currentLang !== 'undefined') {
                if(currentLang === 'id') goText = "MULAI!";
                if(currentLang === 'mk') goText = "GASPOL!";
            }
            countdownText.innerText = goText;
            if(typeof playAudio === 'function') playAudio('sfx_go');
        } else {
            clearInterval(countInterval);
            countdownLayer.classList.add('hidden');
            
            // Panggil fungsi startGame yang ada di game.js
            if(typeof startGame === 'function') startGame();
        }
    }, 1000);
}

// --- FUNGSI BUKA TUTUP MENU LAINNYA ---
function showSetting() { document.getElementById('settingLayer').classList.remove('hidden'); document.getElementById('settingLayer').classList.add('active'); }
function hideSetting() { document.getElementById('settingLayer').classList.remove('active'); setTimeout(() => document.getElementById('settingLayer').classList.add('hidden'), 300); }

function showLeaderboard() { document.getElementById('leaderboardLayer').classList.remove('hidden'); document.getElementById('leaderboardLayer').classList.add('active'); }
function hideLeaderboard() { document.getElementById('leaderboardLayer').classList.remove('active'); setTimeout(() => document.getElementById('leaderboardLayer').classList.add('hidden'), 300); }

function showGacha() { document.getElementById('gachaLayer').classList.remove('hidden'); document.getElementById('gachaLayer').classList.add('active'); }
function hideGacha() { document.getElementById('gachaLayer').classList.remove('active'); setTimeout(() => document.getElementById('gachaLayer').classList.add('hidden'), 300); }

function confirmExitApp() { document.getElementById('exitLayer').classList.remove('hidden'); document.getElementById('exitLayer').classList.add('active'); }
function cancelExit() { document.getElementById('exitLayer').classList.remove('active'); setTimeout(() => document.getElementById('exitLayer').classList.add('hidden'), 300); }
function exitApp() { alert("Nutup aplikasi (Berfungsi penuh saat di-build jadi APK)"); }

function quitToMenu() {
    document.getElementById('pauseLayer').classList.add('hidden');
    document.getElementById('hud').classList.add('hidden');
    document.getElementById('titleLayer').classList.remove('hidden');
    // Hentikan game
    if(typeof window.pauseGame === 'function') window.pauseGame(); // Pause akan menghentikan loop sementara
}
function resumeGame() {
    if(typeof window.pauseGame === 'function') window.pauseGame(); // Toggle pause lagi untuk lanjut
}

// --- MOCKUP TOMBOL KARAKTER & GACHA ---
function pullGacha() {
    const box = document.getElementById('gachaResultBox');
    box.innerHTML = `<span class="text-yellow-400 text-8xl font-black anim-gacha-result drop-shadow-lg">✨ B.A.N.G.G.O ✨</span>`;
}

function showCharacterScreen() {
    document.getElementById('charScreenLayer').classList.remove('hidden'); 
    document.getElementById('charScreenLayer').classList.add('active');
    // Set data karakter pertama
    if(typeof charData !== 'undefined' && charData.length > 0) {
        document.getElementById('charNameDisplay').innerText = charData[0].name;
        document.getElementById('charDetailNameDisplay').innerText = charData[0].name;
        document.getElementById('charLoreDisplay').innerText = charData[0].lore.id; // Default ID
    }
}
function closeCharacterScreen() { document.getElementById('charScreenLayer').classList.remove('active'); setTimeout(() => document.getElementById('charScreenLayer').classList.add('hidden'), 300); }

// Animasi tombol umum
function handleBtnAction(id, callback) {
    const btn = document.getElementById(id);
    if(btn) {
        btn.classList.add('pressed');
        if(typeof playAudio === 'function') playAudio('sfx_click');
        setTimeout(() => {
            btn.classList.remove('pressed');
            if(callback) callback();
        }, 150);
    } else {
        if(callback) callback();
    }
}

// Fitur Ganti Bahasa (Sederhana)
function selectLang(lang) {
    if(typeof currentLang !== 'undefined') currentLang = lang;
    alert("Bahasa diubah ke: " + lang.toUpperCase() + ". (Teks akan berubah otomatis di fase selanjutnya!)");
    document.getElementById('langDropdown').classList.add('hidden');
}
function toggleLangDropdown() {
    const drop = document.getElementById('langDropdown');
    drop.classList.toggle('hidden');
}

// ==========================================
// TAMBAHAN DARI SERA: MESIN PEMANAS (BOOTING)
// ==========================================

function initGameIntro() {
    // 1. Hilangkan layar hitam logo 'Back Sleep' setelah 4.5 detik
    setTimeout(() => {
        const splash = document.getElementById('customSplashScreen');
        if(splash) {
            splash.style.opacity = '0';
            splash.style.transition = 'opacity 0.5s ease';
            setTimeout(() => splash.style.display = 'none', 500); // Hilang total dari layar
        }

        // 2. Mulai jalankan animasi bar loading
        simulateLoading();
    }, 4500); 
}

function simulateLoading() {
    let progress = 0;
    const barFill = document.getElementById('loadingBarFill');
    const loadingGroup = document.getElementById('loadingGroup');
    const startGroup = document.getElementById('startGroup');

    let interval = setInterval(() => {
        progress += Math.random() * 20; // Loading nambah secara acak biar natural
        if (progress >= 100) progress = 100;

        if (barFill) barFill.style.width = progress + '%';

        // Kalau loading udah penuh (100%)
        if (progress === 100) {
            clearInterval(interval);
            setTimeout(() => {
                loadingGroup.classList.add('hidden'); // Sembunyikan bar loading
                startGroup.classList.remove('hidden'); // Munculkan tombol "SENTUH UNTUK MULAI"
            }, 600);
        }
    }, 400); // Update loading setiap 0.4 detik
}

// Langsung jalankan mesinnya saat game dibuka!
initGameIntro();
