alert("Klik tombol musik pada bagian kanan atas untuk memulai. Setelah tekan play, langsung pause saja jika takut terkena copyright");

// ELEMENTS
const audio = document.getElementById('bg-music');
const toggle = document.getElementById('music-toggle');
const teksContainer = document.getElementById("reveal");
const chatbox = document.getElementById("chatbox");
const textarea = document.getElementById("typeTarget");
const sendBtn = document.querySelector(".send-btn");
const lastBox = document.querySelector('.last');
const ulangBtn = document.querySelector('.ulang');


let firstClick = true;
let confettiStarted = false;
let chatboxShown = false;

// --- AUDIO CONTROL ---
audio.volume = 0.5;
audio.loop = true;

function updateButton() {
    toggle.textContent = audio.paused ? '▶️ Play Music' : '⏸️ Pause Music';
}

// AUTOPLAY attempt
audio.play().then(() => {
    document.getElementById('music-control').style.display = 'none';
}).catch(() => {
    updateButton();
    document.getElementById('music-control').style.display = 'inline-block';
});

// =========================
//     START CONFETTI
// =========================
function startConfettiTimer() {
    if (confettiStarted) return;
    confettiStarted = true;

    setTimeout(() => {

        const duration = 5000; // 5 sec
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 9999 };

        function randomInRange(min, max) {
            return Math.random() * (max - min) + min;
        }

        const interval = setInterval(() => {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) return clearInterval(interval);

            const particleCount = 50 * (timeLeft / duration);

            // kiri
            confetti(Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            }));

            // kanan
            confetti(Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            }));

        }, 250);

    }, 25000); 
}

// =========================
//     START CHATBOX
// =========================
function startChatboxTimer() {
    if (chatboxShown) return;
    chatboxShown = true;

    setTimeout(() => {
        chatbox.style.opacity = "1";
        chatbox.style.animation = "popOut 0.5s ease forwards";

        // === MULAI TYPEWRITER ===
        typeWriter();
    }, 31000); 
}

// =========================
//     TYPEWRITER EFFECT
// =========================
const message = 
`Happy birthday kawi, aku harap kamu sehat selalu dan yang kamu inginkan dapat tercapai. Aku ingin mengungkapkan rasa terimakasihku akan kehadiranmu kaw, karena kamu aku masih berada di lubang kelinci ini; kamu juga yang selalu membuat malam-malamku penuh warna kaw, cerita yang kamu bawakan selalu bisa menghiburku; kamu juga membuat aku tuh selalu menanti hari esok, karena aku tak sabar akan pembahasan apalagi yang kamu akan bawa di stream. Intinya kehadiranmu sangat berarti buat aku kaw. Aku juga ingin minta maaf, karena aku jarang bisa nonton stream kamu ataupun baru datang saat stream kamu udah mau selesai. Semenjak pindah keluar kota, aku jadi lebih sibuk dengan rl😥. Namun, vod stream kamu selalu menjadi hiburanku dikala waktu senggang. Jadi terimakasih ya kawi buat segalanya dan Otanjoubi omedetou`;

let i = 0;
let speed = 45;

function typeWriter() {
    if (i < message.length) {
        textarea.value += message.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

// =========================
//     ON MUSIC BUTTON CLICK
// =========================
toggle.addEventListener('click', () => {

    if (audio.paused) {
        audio.play();

        if (firstClick) {
            firstClick = false;

           
            teksContainer.classList.add("start-anim");

       
            startConfettiTimer();
            startChatboxTimer();
        }

    } else {
        audio.pause();
    }

    updateButton();
});


sendBtn.addEventListener("click", () => {
    chatbox.classList.add("chatbox-disappear");
   
    setTimeout(() => {
        chatbox.style.display = "none";
    }); 
    lastBox.classList.add('show');
       // START CONFETTI ON SEND
    // =========================
    const duration = 15 * 1000; // 15 detik
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);

        // kiri
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        }));

        // kanan
        confetti(Object.assign({}, defaults, {
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        }));
    }, 250);
});

