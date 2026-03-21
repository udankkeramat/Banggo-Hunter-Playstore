// ==========================================
// FILE: js/api.js
// FUNGSI: Penyimpanan Lokal (Save/Load Data) & Logika Gacha/Harian
// ==========================================

// Data bawaan kalau pemain baru pertama kali main
let playerSaveData = {
    coins: 0,
    feathers: 0,
    bestScore: 0,
    unlockedChars: ['char_banggo'], // Banggo otomatis kebuka
    equippedChar: 'char_banggo',
    playerName: 'HUNTER',
    profilePhoto: '',
    bgmOn: true,
    sfxOn: true
};

// --- FUNGSI SAVE & LOAD (OTAK GAME) ---
function saveGameData() {
    // Ambil nama dari input sebelum disave
    const nameInput = document.getElementById('mainPlayerName');
    if(nameInput) playerSaveData.playerName = nameInput.value;
    
    // Ambil setting audio
    playerSaveData.bgmOn = document.getElementById('toggleBGM').checked;
    playerSaveData.sfxOn = document.getElementById('toggleSFX').checked;

    localStorage.setItem('BanggoHunterSave', JSON.stringify(playerSaveData));
    updateMenuUI();
}

function loadGameData() {
    const saved = localStorage.getItem('BanggoHunterSave');
    if (saved) {
        playerSaveData = JSON.parse(saved);
        
        // Kembalikan status audio
        document.getElementById('toggleBGM').checked = playerSaveData.bgmOn;
        document.getElementById('toggleSFX').checked = playerSaveData.sfxOn;
        
        // Kembalikan nama & foto
        if(document.getElementById('mainPlayerName')) {
            document.getElementById('mainPlayerName').value = playerSaveData.playerName;
        }
        if(playerSaveData.profilePhoto && playerSaveData.profilePhoto !== '') {
            applyProfilePhoto(playerSaveData.profilePhoto);
        }
    }
    updateMenuUI();
}

function updateMenuUI() {
    if(document.getElementById('uiBanggoCoin')) document.getElementById('uiBanggoCoin').innerText = playerSaveData.coins;
    if(document.getElementById('uiBanggoFeather')) document.getElementById('uiBanggoFeather').innerText = playerSaveData.feathers;
    if(document.getElementById('uiBestScore')) document.getElementById('uiBestScore').innerText = playerSaveData.bestScore;
}

// --- FUNGSI GANTI FOTO PROFIL LOKAL ---
function handlePhotoUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageData = e.target.result;
            // Tampilkan popup konfirmasi (dari index.html)
            document.getElementById('photoConfirmPreview').src = imageData;
            document.getElementById('photoConfirmLayer').classList.remove('hidden');
            document.getElementById('photoConfirmLayer').classList.add('active');
            
            // Simpan sementara di variabel global untuk dikonfirmasi
            window.tempPhotoData = imageData;
        };
        reader.readAsDataURL(file);
    }
}

function confirmPhoto() {
    if(window.tempPhotoData) {
        playerSaveData.profilePhoto = window.tempPhotoData;
        applyProfilePhoto(window.tempPhotoData);
        saveGameData();
    }
    document.getElementById('photoConfirmLayer').classList.remove('active');
    setTimeout(() => document.getElementById('photoConfirmLayer').classList.add('hidden'), 300);
}

function cancelPhoto() {
    document.getElementById('photoConfirmLayer').classList.remove('active');
    setTimeout(() => document.getElementById('photoConfirmLayer').classList.add('hidden'), 300);
    window.tempPhotoData = null;
}

function applyProfilePhoto(dataUrl) {
    const imgElement = document.getElementById('profilePhotoImg');
    const placeholder = document.getElementById('profilePhotoPlaceholder');
    if(imgElement && placeholder) {
        imgElement.src = dataUrl;
        imgElement.classList.remove('hidden');
        placeholder.classList.add('hidden');
    }
}

// --- LOGIKA GACHA SUNGGUHAN (Ganti fungsi mock di menus.js) ---
function pullGacha() {
    const gachaCost = 100;
    const box = document.getElementById('gachaResultBox');
    
    if (playerSaveData.coins < gachaCost) {
        box.innerHTML = `<span class="text-red-400 text-5xl font-black drop-shadow-lg p-4 bg-black/80 rounded-2xl">KOIN KURANG BOS!<br>Main lagi gih!</span>`;
        return;
    }

    // Potong koin & Simpan
    playerSaveData.coins -= gachaCost;
    saveGameData();
    
    // Bunyiin efek
    if(typeof playAudio === 'function') playAudio('sfx_star');

    // Kocok karakter acak dari array charData (yang udah Bos buat)
    const randomChar = charData[Math.floor(Math.random() * charData.length)];
    
    // Cek udah punya belum
    let isNew = !playerSaveData.unlockedChars.includes(randomChar.id);
    if (isNew) {
        playerSaveData.unlockedChars.push(randomChar.id);
        saveGameData();
        box.innerHTML = `
            <div class="anim-gacha-result flex flex-col items-center">
                <span class="text-yellow-400 text-4xl font-black drop-shadow-lg mb-2">✨ KARAKTER BARU! ✨</span>
                <img src="${randomChar.img}" class="w-[300px] h-[400px] object-contain drop-shadow-[0_0_20px_rgba(250,204,21,0.8)]">
                <span class="text-white text-6xl font-black drop-shadow-lg mt-4 italic uppercase">${randomChar.name}</span>
            </div>
        `;
    } else {
        // Kalau dapet dobel, ubah jadi 1 Bulu Emas sebagai ganti
        playerSaveData.feathers += 1;
        saveGameData();
        box.innerHTML = `
            <div class="anim-gacha-result flex flex-col items-center">
                <span class="text-gray-300 text-3xl font-black drop-shadow-lg mb-2">YAH, DAPET DOBEL...</span>
                <span class="text-white text-5xl font-black drop-shadow-lg mt-4 italic uppercase">${randomChar.name}</span>
                <span class="text-orange-400 text-2xl font-black drop-shadow-lg mt-4 bg-black/80 p-4 rounded-xl">DIKONVERSI JADI 1 BULU EMAS 🪶</span>
            </div>
        `;
    }
}

// --- LOGIKA SETELAH GAME OVER BIAR DAPET KOIN ---
// Kita ubah sedikit fungsi showEndScreen yang ada di hud.js dari luar sini
const originalShowEndScreen = window.showEndScreen;
window.showEndScreen = function(finalScore, fired, hit) {
    // Jalankan animasi UI dari hud.js
    if(originalShowEndScreen) originalShowEndScreen(finalScore, fired, hit);
    
    // Update Koin (Setiap 10 Poin dapet 1 Koin)
    let koinDapet = Math.floor(finalScore / 10);
    playerSaveData.coins += koinDapet;
    
    // Update High Score
    if (finalScore > playerSaveData.bestScore) {
        playerSaveData.bestScore = finalScore;
    }
    
    saveGameData(); // Simpan permanen!
};

// Panggil load data saat pertama kali buka browser
window.onload = () => {
    loadGameData();
};
