const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particlesArray = [];
let hue = 220;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const mouse = {
    x: undefined,
    y: undefined,
    radius: 100
}

window.addEventListener('mousemove', (event) => {
    mouse.x = event.x;
    mouse.y = event.y;
});

// Theme switcher
const themeToggle = document.querySelector('.theme-toggle');
const htmlElement = document.documentElement;

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme') || 'dark';
htmlElement.setAttribute('data-theme', savedTheme);

// Theme toggle handler
themeToggle.addEventListener('click', () => {
    const currentTheme = htmlElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    htmlElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // Update particle colors for light theme
    if (newTheme === 'light') {
        ctx.fillStyle = 'rgba(241, 245, 249, 0.0005)';
    } else {
        ctx.fillStyle = 'rgba(10, 15, 30, 0.0005)';
    }
});

// Update particle colors for light theme
function getParticleColor(theme) {
    const baseHue = theme === 'light' ? 220 : 225;
    const baseSaturation = theme === 'light' ? '70%' : '100%';
    const baseLightness = theme === 'light' ? '60%' : '70%';
    const baseAlpha = theme === 'light' ? 0.5 : 0.8;
    
    return {
        hue: baseHue,
        saturation: baseSaturation,
        lightness: baseLightness,
        alpha: baseAlpha
    };
}

class Particle {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 1.5 + 0.1;
        this.speedX = Math.random() * 0.2 - 0.1;
        this.speedY = Math.random() * 0.2 - 0.1;
        this.baseHue = Math.random() * 30 - 15;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;

        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
            const force = (mouse.radius - distance) / mouse.radius;
            this.speedX -= dx * force * 0.002;
            this.speedY -= dy * force * 0.002;
        }
    }

    draw() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const colors = getParticleColor(currentTheme);
        
        const gradient = ctx.createRadialGradient(
            this.x, this.y, 0,
            this.x, this.y, this.size
        );
        
        gradient.addColorStop(0, `hsla(${hue + this.baseHue}, ${colors.saturation}, ${colors.lightness}, ${colors.alpha})`);
        gradient.addColorStop(1, `hsla(${hue + this.baseHue}, ${colors.saturation}, ${colors.lightness}, 0)`);
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

function init() {
    particlesArray = [];
    const numberOfParticles = (canvas.width * canvas.height) / 15000;
    for (let i = 0; i < numberOfParticles; i++) {
        particlesArray.push(new Particle());
    }
}

function connect() {
    const maxDistance = 120;
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const baseOpacity = currentTheme === 'light' ? 0.05 : 0.08;
    
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            const dx = particlesArray[a].x - particlesArray[b].x;
            const dy = particlesArray[a].y - particlesArray[b].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < maxDistance) {
                const opacity = (1 - (distance / maxDistance)) * baseOpacity;
                ctx.strokeStyle = `hsla(${hue}, 70%, 50%, ${opacity})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function drawGrid() {
    const gridSize = 80;
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const opacity = currentTheme === 'light' ? 0.015 : 0.02;
    
    ctx.strokeStyle = `hsla(${hue}, 70%, 50%, ${opacity})`;
    ctx.lineWidth = 0.2;
    
    // Vertical lines
    for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

function animate() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const fadeColor = currentTheme === 'light' 
        ? 'rgba(241, 245, 249, 0.1)' 
        : 'rgba(10, 15, 30, 0.1)';
    
    ctx.fillStyle = fadeColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    drawGrid();
    
    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
    }
    connect();
    
    hue += 0.05;
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

init();
animate(); 