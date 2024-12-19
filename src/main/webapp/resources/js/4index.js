const themeToggleButton = document.getElementById('thema-button');
var flag_theme = document.documentElement.classList.contains('dark-theme');

function toggleTheme() {
    document.documentElement.classList.toggle('dark-theme');
    flag_theme = document.documentElement.classList.contains('dark-theme');
    if (flag_theme) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
}

themeToggleButton.addEventListener('click', toggleTheme);

// Обновление часов каждые 10 секунд
function updateClock() {
    const clockElement = document.getElementById('clock');
    const now = new Date();
    const timeString = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const dateString = now.toLocaleDateString('ru-RU');
    clockElement.textContent = `${dateString} ${timeString}`;
}

setInterval(updateClock, 10000);
updateClock();

const webcamElement = document.getElementById('webcam');

navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        webcamElement.srcObject = stream;
    })
    .catch(error => {
        console.error('Ошибка доступа к веб-камере:', error);
    });

const boredButton = document.getElementById('bored-toggle');
const webcamContainer = document.getElementById('webcam-container');

boredButton.addEventListener('click', () => {
    if (webcamContainer.style.display === 'none') {
        webcamContainer.style.display = 'block';
        boredButton.textContent = 'Мне не скучно';
    } else {
        webcamContainer.style.display = 'none';
        boredButton.textContent = 'Мне скучно';
    }
});
