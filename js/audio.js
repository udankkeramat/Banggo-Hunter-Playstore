// ==========================================
// FILE: js/audio.js
// FUNGSI: Mengatur BGM dan Sound Effects (SFX)
// ==========================================

// Daftar aset suara (Pastikan nama filenya ada di folder assets/sounds/)
const audioAssets = {
    bgm_menu: 'assets/sounds/bgm_menu.mp3',
    bgm_game: 'assets/sounds/bgm_game.mp3',
    sfx_click: 'assets/sounds/sfx_click.mp3',
    sfx_shoot: 'assets/sounds/sfx_shoot.mp3',
    sfx_countdown: 'assets/sounds/sfx_countdown.mp3',
    sfx_go: 'assets/sounds/sfx_go.mp3',
    sfx_star: 'assets/sounds/sfx_star.mp3'
};

// Objek untuk nyimpen audio yang lagi jalan
const audioObjects = {};
let isBgmEnabled = true;
let isSfxEnabled = true;

// Preload audio sederhana
for (let key in audioAssets) {
    let audio = new Audio(audioAssets[key]);
    if (key.startsWith('bgm_')) {
        audio.loop = true;
        audio.volume = 0.5; // BGM volumenya setengah aja biar gak nutupin SFX
    }
    audioObjects[key] = audio;
}

// Fungsi Utama Putar Suara
function playAudio(key) {
    if (!audioObjects[key]) return; // Kalau file gak ada, cuekin aja biar gak error

    if (key.startsWith('bgm_') && isBgmEnabled) {
        // Stop BGM lain yang lagi nyala sebelum muter yang baru
        stopAllBgm();
        audioObjects[key].currentTime = 0;
        audioObjects[key].play().catch(e => console.log("BGM ketahan browser (harus klik layar dulu)"));
    } 
    else if (key.startsWith('sfx_') && isSfxEnabled) {
        // SFX bisa ditumpuk (misal nembak cepet-cepet)
        let sfxClone = audioObjects[key].cloneNode();
        sfxClone.play().catch(e => console.log("SFX error"));
    }
}

function stopAllBgm() {
    for (let key in audioObjects) {
        if (key.startsWith('bgm_')) {
            audioObjects[key].pause();
        }
    }
}

// Terhubung dengan tombol Switch di Menu Setting
function toggleAudioSetting() {
    const bgmToggle = document.getElementById('toggleBGM').checked;
    const sfxToggle = document.getElementById('toggleSFX').checked;
    
    isBgmEnabled = bgmToggle;
    isSfxEnabled = sfxToggle;

    if (!isBgmEnabled) {
        stopAllBgm();
    } else {
        // Kalau game lagi main, putar bgm game. Kalau di menu, bgm menu.
        if (typeof isPlaying !== 'undefined' && isPlaying) {
            playAudio('bgm_game');
        } else {
            playAudio('bgm_menu');
        }
    }
    
    // Simpan ke ingatan (Panggil API)
    if (typeof saveGameData === 'function') saveGameData();
}

window.playAudio = playAudio;
window.toggleAudioSetting = toggleAudioSetting;
