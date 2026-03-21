// ==========================================
// FILE: js/entities.js
// FUNGSI: Class Blueprint untuk Awan, Burung, dan Efek
// ==========================================

class Cloud {
    constructor(canvasWidth, canvasHeight) {
        this.y = Math.random() * (canvasHeight * 0.4); // Awan cuma di langit atas
        this.width = 100 + Math.random() * 150;
        this.height = this.width * 0.5;
        this.x = canvasWidth + 50; // Muncul dari kanan luar
        this.speed = 0.5 + Math.random() * 1.5;
        this.opacity = 0.3 + Math.random() * 0.5;
    }
    update() {
        this.x -= this.speed;
    }
    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.width/3, 0, Math.PI * 2);
        ctx.arc(this.x + this.width/4, this.y - this.height/4, this.width/4, 0, Math.PI * 2);
        ctx.arc(this.x + this.width/2, this.y, this.width/3, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    }
}

class Bird {
    constructor(canvasWidth, canvasHeight, type = 'normal') {
        this.type = type; // 'normal', 'gold' (Bawa Bulu Emas), 'boss' (Bawa Panci)
        this.width = type === 'boss' ? 120 : (type === 'gold' ? 70 : 80);
        this.height = type === 'boss' ? 100 : (type === 'gold' ? 60 : 70);
        
        // Burung terbang dari kiri atau kanan
        this.direction = Math.random() > 0.5 ? 1 : -1; 
        this.x = this.direction === 1 ? -100 : canvasWidth + 100;
        this.y = 50 + Math.random() * (canvasHeight * 0.6); // Area terbang
        
        let baseSpeed = 2 + Math.random() * 3;
        if (type === 'gold') baseSpeed *= 1.5; // Emas lebih gesit
        if (type === 'boss') baseSpeed *= 0.7; // Boss lebih lambat tapi tebal
        
        this.speedX = baseSpeed * this.direction;
        this.speedY = (Math.random() - 0.5) * 2; // Terbang agak naik turun
        
        // Poin & Darah
        this.hp = type === 'boss' ? 3 : 1; 
        this.scoreValue = type === 'boss' ? 50 : (type === 'gold' ? 100 : 10);
        
        // Animasi kepak sayap
        this.flapTimer = 0;
        this.flapState = 0; // 0: naik, 1: turun
    }
    
    update(canvasWidth, canvasHeight) {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Bikin gerakan terbang natural (mantul-mantul lembut di sumbu Y)
        if (this.y < 30 || this.y > canvasHeight - 200) this.speedY *= -1;
        
        // Flap animasi
        this.flapTimer++;
        if (this.flapTimer > 10) {
            this.flapState = this.flapState === 0 ? 1 : 0;
            this.flapTimer = 0;
        }
    }
    
    draw(ctx) {
        ctx.save();
        ctx.translate(this.x, this.y);
        
        // Balik gambar kalau hadap kiri
        if (this.direction === -1) ctx.scale(-1, 1);
        
        // Render Bodi Burung (Sementara pakai bentuk Canvas dasar, nanti bisa diganti gambar Bos)
        ctx.fillStyle = this.type === 'boss' ? '#ef4444' : (this.type === 'gold' ? '#facc15' : '#9ca3af');
        
        // Bodi
        ctx.beginPath();
        ctx.ellipse(0, 0, this.width/2, this.height/2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#1f2937";
        ctx.stroke();
        
        // Sayap (Gerak naik turun)
        ctx.fillStyle = this.type === 'boss' ? '#991b1b' : (this.type === 'gold' ? '#ca8a04' : '#4b5563');
        ctx.beginPath();
        if (this.flapState === 0) {
            ctx.ellipse(0, -this.height/3, this.width/3, this.height/4, Math.PI/6, 0, Math.PI*2); // Sayap naik
        } else {
            ctx.ellipse(0, this.height/3, this.width/3, this.height/4, -Math.PI/6, 0, Math.PI*2); // Sayap turun
        }
        ctx.fill();
        ctx.stroke();

        ctx.restore();
    }
}

class ShotEffect {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.radius = 5;
        this.maxRadius = 30;
        this.opacity = 1;
        this.isDead = false;
    }
    update() {
        this.radius += 3;
        this.opacity -= 0.1;
        if (this.opacity <= 0) this.isDead = true;
    }
    draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.opacity;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.strokeStyle = "#fbbf24"; // Efek ledakan peluru kuning
        ctx.lineWidth = 4;
        ctx.stroke();
        
        // Titik tengah
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius/3, 0, Math.PI * 2);
        ctx.fillStyle = "#ffffff";
        ctx.fill();
        ctx.restore();
    }
}
