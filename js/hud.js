// ==========================================
// FILE: js/hud.js
// FUNGSI: Mengatur UI Saat Bermain & Game Over
// ==========================================

// --- FUNGSI VIDEO COMBO ---
// Dipanggil oleh game.js pas Bos berhasil nembak jatuh burung
function triggerComboVideo() {
    const comboVid = document.getElementById('comboVideo');
    if (!comboVid) return;

    // Munculkan video di atas canvas
    comboVid.style.display = 'block';
    comboVid.style.position = 'absolute';
    comboVid.style.top = '50%';
    comboVid.style.left = '50%';
    comboVid.style.transform = 'translate(-50%, -50%) scale(1.5)';
    comboVid.style.zIndex = '30';
    comboVid.style.pointerEvents = 'none'; // Biar tetep bisa nembak tembus video
    comboVid.style.opacity = '0.7'; // Agak transparan biar game di belakang kelihatan
    
    // Putar videonya
    comboVid.currentTime = 0;
    comboVid.play().catch(e => console.log("Auto-play video ditahan browser:", e));

    // Sembunyikan otomatis setelah 2 detik
    setTimeout(() => {
        comboVid.style.display = 'none';
        comboVid.pause();
    }, 2000);
}

// --- FUNGSI GAME OVER / END SCREEN ---
// Dipanggil oleh game.js pas waktu habis
function showEndScreen(finalScore, fired, hit) {
    // Sembunyikan HUD atas (Timer & Skor)
    document.getElementById('hud').classList.add('hidden');
    
    // Hitung Akurasi Tembakan Bos
    let accuracy = 0;
    if (fired > 0) {
        accuracy = Math.round((hit / fired) * 100);
    }
    
    // Masukkan data ke layar
    document.getElementById('finalScore').innerText = finalScore;
    document.getElementById('finalAccuracy').innerText = accuracy + "%";
    
    // Tampilkan Layar Akhir
    const endScreen = document.getElementById('endScreen');
    endScreen.classList.remove('hidden');
    endScreen.classList.add('active');
    
    // Bikin efek bintang bermunculan berdasarkan akurasi
    const starsContainer = document.getElementById('starsContainer');
    starsContainer.innerHTML = ''; // Bersihkan bintang sebelumnya
    
    let starCount = 1;
    if (accuracy >= 50) starCount = 2;
    if (accuracy >= 80) starCount = 3;
    
    for(let i = 0; i < starCount; i++) {
        setTimeout(() => {
            // Nanti pakai gambar bintang punya Bos, sementara pakai emoji
            const star = document.createElement('span');
            star.innerHTML = "⭐";
            star.className = "text-8xl drop-shadow-lg star-icon visible";
            starsContainer.appendChild(star);
            if(typeof playAudio === 'function') playAudio('sfx_star');
        }, i * 400); // Muncul bergantian tiap 0.4 detik
    }
    
    // Animasi masuk tombol "Menu" dan "Play Again"
    setTimeout(() => {
        document.getElementById('wrapper-btn-menu').classList.remove('btn-start-center');
        document.getElementById('wrapper-btn-menu').classList.add('btn-go-left');
        
        document.getElementById('wrapper-btn-replay').classList.remove('btn-start-center');
        document.getElementById('wrapper-btn-replay').classList.add('btn-go-right');
    }, 1500);
}

// --- KEMBALI KE MENU DARI GAME OVER ---
function backToMenu() {
    document.getElementById('endScreen').classList.remove('active');
    setTimeout(() => {
        document.getElementById('endScreen').classList.add('hidden');
        document.getElementById('titleLayer').classList.remove('hidden');
        
        // Kembalikan posisi tombol untuk animasi berikutnya
        document.getElementById('wrapper-btn-menu').className = "absolute top-[180px] z-10 btn-start-center";
        document.getElementById('wrapper-btn-replay').className = "absolute top-[180px] z-10 btn-start-center";
    }, 300);
}

// --- MAIN LAGI (RESTART) ---
function startCountdownGame() {
    document.getElementById('endScreen').classList.remove('active');
    setTimeout(() => {
        document.getElementById('endScreen').classList.add('hidden');
        
        // Kembalikan posisi tombol
        document.getElementById('wrapper-btn-menu').className = "absolute top-[180px] z-10 btn-start-center";
        document.getElementById('wrapper-btn-replay').className = "absolute top-[180px] z-10 btn-start-center";
        
        // Langsung panggil transisi hitung mundur
        if(typeof playGameTransition === 'function') playGameTransition();
    }, 300);
}
