function checkOnlyOne(checkbox) {
    var checkboxes = document.getElementsByName('y'); // Получаем все элементы с именем 'y' (группа чекбоксов).
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false; // Оставляем отмеченным только тот, который был выбран, остальные сбрасываем.
    });
}

const themeToggleButton = document.getElementById('thema-button'); // Получаем кнопку переключения темы.
var flag_theme = document.documentElement.classList.contains('dark-theme'); // Проверяем, есть ли у документа класс "dark-theme".

function toggleTheme() {
    document.documentElement.classList.toggle('dark-theme'); // Переключаем класс "dark-theme" у документа.
    flag_theme = document.documentElement.classList.contains('dark-theme'); // Обновляем флаг текущей темы.
    if (flag_theme) {
        localStorage.setItem('theme', 'dark'); // Сохраняем тему как "dark" в localStorage.
    } else {
        localStorage.setItem('theme', 'light'); // Сохраняем тему как "light" в localStorage.
    }
    try {
        redraw(); // Перерисовываем график для адаптации к новой теме.
    } catch {} // Игнорируем ошибки, если `redraw` не определён.
}

themeToggleButton.addEventListener('click', toggleTheme); // Добавляем обработчик на кнопку переключения темы.

var example = document.getElementById("example"), // Получаем элемент холста.
    ctx = example.getContext('2d'); // Устанавливаем 2D-контекст для рисования.
ctx.translate(example.width / 2, example.height / 2); // Сдвигаем начало координат в центр холста.

function savePointLocally(x, y, r, isHit) {
    const points = JSON.parse(localStorage.getItem('points')) || []; // Получаем существующие точки из localStorage или создаём пустой массив.
    points.push({ x, y, r, isHit }); // Добавляем новую точку.
    localStorage.setItem('points', JSON.stringify(points)); // Сохраняем обновлённый массив точек в localStorage.
}

async function sendPoint(x, y, r) {
    try {
        const response = await fetch(`controller?x=${x}&y=${y}&r=${r}`, { method: 'GET' }); // Отправляем запрос на сервер с координатами точки.
        if (response.ok) {
            const isHit = getCookie('isInside'); // Читаем результат попадания из cookie.
            console.log(`Hit status: ${isHit}`); // Логируем статус попадания.
            drawPoint(x, y, r, isHit); // Рисуем точку на холсте.
            savePointLocally(x, y, r, isHit); // Сохраняем точку локально.
        } else {
            console.error("Server error:", response.status, response.statusText); // Логируем ошибку сервера.
            alert("Ошибка обработки данных на сервере."); // Показываем сообщение об ошибке.
        }
    } catch (error) {
        console.error('Error:', error); // Логируем ошибку.
        alert('Произошла ошибка при отправке данных.'); // Показываем сообщение об ошибке.
    }
}

document.getElementById("example").addEventListener("click", function(event) {
    const rInput = document.getElementById('r'); // Получаем поле ввода значения R.
    const rValue = parseFloat(rInput.value); // Преобразуем значение R в число.
    if (!/^-?\d+(\.\d+)?$/.test(rValue) || rValue < 0.1 || rValue > 3) { // Проверяем корректность значения R.
        alert("Введите корректное значение R в диапазоне от 0.1 до 3"); // Показываем сообщение об ошибке.
        return;
    }
    const canvas = event.target; // Получаем холст, на который был клик.
    const rect = canvas.getBoundingClientRect(); // Получаем координаты холста относительно окна.
    const scale = ((example.height - 30) * 0.6) * rValue; // Вычисляем масштаб относительно значения R.
    const x = rValue * (event.clientX - rect.left - canvas.width / 2) / scale; // Вычисляем координату X относительно R.
    const y = -rValue * (event.clientY - rect.top - canvas.height / 2) / scale; // Вычисляем координату Y относительно R.
    sendPoint(x, y, rValue); // Отправляем точку на сервер.
});

function drawPoint(x, y, r, isHit) {
    const scale = ((example.height - 30) * 0.6) * r; // Вычисляем масштаб для R.
    const canvasX = (x / r) * scale; // Преобразуем координату X для холста.
    const canvasY = -(y / r) * scale; // Преобразуем координату Y для холста.
    console.log('Drawing point at:', canvasX, canvasY, isHit); // Логируем координаты точки.
    ctx.beginPath();
    ctx.arc(canvasX, canvasY, 3, 0, 2 * Math.PI); // Рисуем точку.
    ctx.fillStyle = isHit === "true" ? 'green' : 'red'; // Устанавливаем цвет точки в зависимости от попадания.
    ctx.fill();
    ctx.closePath();
}

function base() {
    const r = parseFloat(localStorage.getItem('lastR')) || 3; // Получаем последнее значение R или используем R = 3.
    const scale = ((example.height - 30) * 0.6) * r; // Вычисляем масштаб для R.

    ctx.beginPath();
    ctx.strokeStyle = flag_theme ? 'white' : 'black'; // Выбираем цвет осей в зависимости от темы.

    // Рисуем оси
    ctx.moveTo(-130, 0); ctx.lineTo(130, 0); // Ось X.
    ctx.lineTo(125, -5); ctx.moveTo(130, 0); ctx.lineTo(125, 5); // Стрелка на оси X.
    ctx.moveTo(0, 130); ctx.lineTo(0, -130); // Ось Y.
    ctx.lineTo(5, -125); ctx.moveTo(0, -130); ctx.lineTo(-5, -125); // Стрелка на оси Y.

    // Деления и подписи
    for (let i = 1; i <= 2; i++) {
        const offset = (scale * i) / 2; // Вычисляем позиции для R/2 и R.
        ctx.moveTo(offset, -5); ctx.lineTo(offset, 5); // Деления на оси X.
        ctx.moveTo(-offset, -5); ctx.lineTo(-offset, 5); // Деления на оси -X.
        ctx.moveTo(5, -offset); ctx.lineTo(-5, -offset); // Деления на оси -Y.
        ctx.moveTo(5, offset); ctx.lineTo(-5, offset); // Деления на оси Y.

        ctx.font = '12px Arial';
        ctx.fillStyle = flag_theme ? 'white' : 'black'; // Выбираем цвет текста.
        ctx.fillText(`${i === 1 ? 'R/2' : 'R'}`, offset - 5, -10); // Подписи для R/2 и R на X.
        ctx.fillText(`${i === 1 ? '-R/2' : '-R'}`, -offset - 20, -10); // Подписи для -R/2 и -R на X.
        ctx.fillText(`${i === 1 ? 'R/2' : 'R'}`, 10, -offset + 3); // Подписи для R/2 и R на Y.
        ctx.fillText(`${i === 1 ? '-R/2' : '-R'}`, 10, offset + 3); // Подписи для -R/2 и -R на Y.
    }

    ctx.stroke(); // Отрисовываем оси.
}

function shapes() {
    const r = parseFloat(localStorage.getItem('lastR')) || 3; // Получаем последнее значение R или используем R = 3.
    const scale = (canvas_h * 0.6) * r; // Вычисляем масштаб для R.

    // Рисуем треугольник
    ctx.beginPath();
    ctx.moveTo(0, -scale / 2); // Верхняя вершина.
    ctx.lineTo(-scale / 2, 0); // Левая вершина.
    ctx.lineTo(0, 0); // Центр.
    ctx.closePath();
    ctx.fillStyle = 'blue'; // Цвет фигуры.
    ctx.fill();

    // Рисуем прямоугольник
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, 0, -scale / 2, scale); // Прямоугольник слева внизу.

    // Рисуем четверть круга
    ctx.beginPath();
    ctx.arc(0, 0, scale, 0, -Math.PI / 2, true); // Четверть окружности.
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fill();
}

function redraw() {
    ctx.clearRect(-example.width / 2, -example.height / 2, example.width, example.height); // Очищаем холст.
    shapes(); // Рисуем фигуры.
    base(); // Рисуем оси.
    const points = JSON.parse(localStorage.getItem('points')) || []; // Получаем точки из localStorage.
    points.forEach(({ x, y, r, isHit }) => {
        drawPoint(x, y, r, isHit); // Перерисовываем каждую точку.
    });
}

document.getElementById('r').addEventListener('input', function () {
    const rInput = document.getElementById('r'); // Получаем поле ввода R.
    const newR = parseFloat(rInput.value); // Преобразуем значение в число.

    if (!/^-?\d+(\.\d+)?$/.test(newR) || newR < 0.1 || newR > 3) { // Проверяем корректность.
        alert("Введите корректное значение R в диапазоне от 2 до 4"); // Сообщение об ошибке.
        return;
    }

    const oldR = localStorage.getItem('lastR') ? parseFloat(localStorage.getItem('lastR')) : 3; // Предыдущее значение R.
    localStorage.setItem('lastR', newR); // Сохраняем новое значение R.

    const points = JSON.parse(localStorage.getItem('points')) || []; // Получаем точки из localStorage.
    points.forEach(point => {
        point.x = point.x * (oldR / newR); // Масштабируем координаты X.
        point.y = point.y * (oldR / newR); // Масштабируем координаты Y.
        point.r = newR; // Обновляем значение R.
    });

    localStorage.setItem('points', JSON.stringify(points)); // Сохраняем обновлённые точки.
    redraw(); // Перерисовываем.
});

document.getElementById("clear-button").addEventListener("click", function () {
    localStorage.removeItem('points'); // Удаляем точки из localStorage.
    fetch('controller?clear=true', { method: 'DELETE' }) // Отправляем запрос на сервер для очистки данных.
        .then(() => window.location.reload()) // Перезагружаем страницу.
        .catch(error => console.error('Error:', error)); // Логируем ошибку.
});

function getCookie(name) {
    const cookies = document.cookie.split('; '); // Получаем все куки.
    for (let cookie of cookies) {
        const [key, value] = cookie.split('='); // Разбиваем куки на ключ и значение.
        if (key === name) {
            return value; // Возвращаем значение куки, если ключ совпадает.
        }
    }
    return null; // Возвращаем null, если куки не найдены.
}
const canvas_h = document.getElementById('example').height;
shapes(); // Рисуем фигуры.
base(); // Рисуем оси.
redraw(); // Перерисовываем холст.

function last_r() {
    const rInput = document.getElementById('r'); // Получаем поле ввода R.
    const lastR = parseFloat(localStorage.getItem('lastR')) || 3; // Получаем последнее значение R или используем R = 3.
    rInput.value = lastR; // Устанавливаем это значение в поле.
    redraw(); // Перерисовываем.
}

last_r(); // Устанавливаем последнее значение R при загрузке страницы.
