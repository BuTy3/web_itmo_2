// Обновление часов каждые 10 секунд
function updateClock() {
    const clockElement = document.getElementById('clock');
    const now = new Date();
    const timeString = now.toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const dateString = now.toLocaleDateString('ru-RU');
    clockElement.textContent = `${dateString} ${timeString}`;
}

setInterval(updateClock, 10000);
updateClock(); // Первоначальная установка времени

// Доступ к веб-камере и отображение изображения
const webcamElement = document.getElementById('webcam');

navigator.mediaDevices.getUserMedia({ video: true })
    .then(stream => {
        // Отправляем поток в элемент video
        webcamElement.srcObject = stream;
    })
    .catch(error => {
        console.error('Ошибка доступа к веб-камере:', error);
    });

// Функция для отображения или скрытия видеопотока с веб-камеры
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
