// Функция для обеспечения выбора только одного чекбокса
function checkOnlyOne(checkbox) {
    // Получаем все чекбоксы с именем 'y'
    var checkboxes = document.getElementsByName('y');
    // Перебираем чекбоксы и снимаем отметку с других
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false; // Если чекбокс не текущий, снять его отметку
    });
}

// Получаем кнопку переключения темы
const themeToggleButton = document.getElementById('thema-button');
// Переменная-флаг, указывающая, используется ли темная тема
var flag_theme = document.documentElement.classList.contains('dark-theme');

// Функция переключения темы
function toggleTheme() {
    // Переключаем класс 'dark-theme' на элементе html
    document.documentElement.classList.toggle('dark-theme');
    // Обновляем флаг темы
    flag_theme = document.documentElement.classList.contains('dark-theme');

    // Сохраняем текущую тему в локальное хранилище
    if (flag_theme) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
    // Перерисовываем график для соответствия теме
    redraw();
}

// Добавляем обработчик клика на кнопку переключения темы
themeToggleButton.addEventListener('click', toggleTheme);

// Получаем canvas элемент и его контекст рисования
var example = document.getElementById("example"),
    ctx = example.getContext('2d');

// Перемещаем начало координат в центр canvas
ctx.translate(example.width / 2, example.height / 2);

// Функция сохранения точки в локальное хранилище
function savePointLocally(x, y, r, isHit) {
    // Получаем список точек из локального хранилища или создаём пустой массив
    const points = JSON.parse(localStorage.getItem('points')) || [];
    // Добавляем новую точку в массив
    points.push({ x, y, r, isHit });
    // Сохраняем обновленный массив обратно в локальное хранилище
    localStorage.setItem('points', JSON.stringify(points));
}

// Функция загрузки точек из локального хранилища
function loadPoints() {
    return JSON.parse(localStorage.getItem('points')) || []; // Возвращаем массив точек или пустой массив
}

// Асинхронная функция отправки точки на сервер
async function sendPoint(x, y, r) {
    try {
        // Выполняем GET-запрос с координатами точки и радиусом
        const response = await fetch(`controller?x=${x}&y=${y}&r=${r}`, { method: 'GET' });

        // Если запрос успешен
        if (response.ok) {
            const html = await response.text(); // Читаем текст ответа
            // console.log("HTML response received:", html);

            // Проверяем, содержит ли ответ текст "Попадание" для определения isHit
            // const isHit = html.includes("Попадание");

            const isHit = getCookie('isInside');
            console.log(`Hit status: ${isHit}`);

            // Сохраняем точку с результатом попадания
            drawPoint(x, y, r, isHit);
            savePointLocally(x, y, r, isHit);
        } else {
            console.error("Server error:", response.status, response.statusText);
            alert("Ошибка обработки данных на сервере.");
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Произошла ошибка при отправке данных.');
    }
}

// Обработчик события отправки формы
document.getElementById('pointForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Отменяем стандартное поведение отправки формы

    // Получаем значения X и R из формы
    const x = parseFloat(document.getElementById("x").value);
    const r = parseFloat(document.getElementById("r").value);
    // Получаем выбранный чекбокс для Y
    const yElements = document.querySelectorAll('input[name="y"]:checked');

    // Проверяем корректность X
    if (!/^-?\d+(\.\d+)?$/.test(x) || x < -3 || x > 3) {
        alert("Пожалуйста, введите X от -3 до 3");
        return;
    }

    // Проверяем корректность R
    if (!/^-?\d+(\.\d+)?$/.test(r) || r < 2 || r > 4) {
        alert("Пожалуйста, введите R от 2 до 4");
        return;
    }

    // Проверяем, выбран ли Y
    if (yElements.length === 0) {
        alert("Пожалуйста, выберите Y");
        return;
    }

    // Извлекаем значение Y
    const y = parseFloat(yElements[0].value);
    if (y < -3 || y > 5) {
        alert('Некорректное значение Y');
        return;
    }

    // Отправляем точку на сервер
    sendPoint(x, y, r);
});

// Обработчик клика на canvas
document.getElementById("example").addEventListener("click", function(event) {
    const rInput = document.getElementById('r'); // Получаем поле ввода R
    const rValue = parseFloat(rInput.value); // Читаем значение R

    // Проверяем корректность R
    if (!/^-?\d+(\.\d+)?$/.test(rValue) || rValue < 2 || rValue > 5) {
        alert("Введите корректное значение R в диапазоне от 2 до 5");
        return;
    }

    const canvas = event.target; // Получаем объект canvas
    const rect = canvas.getBoundingClientRect(); // Получаем координаты canvas
    const scale = 260 / 3; // Масштаб canvas

    // Вычисляем координаты точки относительно R
    const x = rValue * (event.clientX - rect.left - canvas.width / 2) / scale;
    const y = -rValue * (event.clientY - rect.top - canvas.height / 2) / scale;

    // Отправляем координаты на сервер
    sendPoint(x, y, rValue);
});

// Функция рисования точки
function drawPoint(x, y, r, isHit) {
    const scale = 260 / 3; // Масштаб canvas
    // Вычисляем координаты точки на canvas
    const canvasX = (x / r) * scale;
    const canvasY = -(y / r) * scale;

    console.log('Drawing point at:', canvasX, canvasY, isHit);

    ctx.beginPath(); // Начинаем новый путь
    ctx.arc(canvasX, canvasY, 3, 0, 2 * Math.PI); // Рисуем точку как круг
    ctx.fillStyle = isHit === "true" ? 'green' : 'red'; // Устанавливаем цвет в зависимости от попадания
    ctx.fill(); // Заполняем круг
    ctx.closePath(); // Закрываем путь
}

// Функция рисования осей и меток
function base() {
    ctx.beginPath(); // Начинаем новый путь
    ctx.strokeStyle = flag_theme ? 'white' : 'black'; // Устанавливаем цвет осей в зависимости от темы

    // Рисуем ось X
    ctx.moveTo(-130, 0);
    ctx.lineTo(130, 0);
    ctx.lineTo(125, -5);
    ctx.moveTo(130, 0);
    ctx.lineTo(125, 5);

    // Рисуем ось Y
    ctx.moveTo(0, 130);
    ctx.lineTo(0, -130);
    ctx.lineTo(5, -125);
    ctx.moveTo(0, -130);
    ctx.lineTo(-5, -125);

    // Рисуем метки на осях
    ctx.moveTo(130 / 3, -5);
    ctx.lineTo(130 / 3, 5);
    ctx.moveTo(260 / 3, -5);
    ctx.lineTo(260 / 3, 5);
    ctx.moveTo(-130 / 3, -5);
    ctx.lineTo(-130 / 3, 5);
    ctx.moveTo(-260 / 3, -5);
    ctx.lineTo(-260 / 3, 5);

    ctx.moveTo(5, -130 / 3);
    ctx.lineTo(-5, -130 / 3);
    ctx.moveTo(5, -260 / 3);
    ctx.lineTo(-5, -260 / 3);
    ctx.moveTo(5, 130 / 3);
    ctx.lineTo(-5, 130 / 3);
    ctx.moveTo(5, 260 / 3);
    ctx.lineTo(-5, 260 / 3);

    ctx.stroke(); // Рисуем линии

    // Подписываем оси и метки
    ctx.font = '12px Arial';
    ctx.fillStyle = flag_theme ? 'white' : 'black';
    ctx.fillText('X', 125, -15);
    ctx.fillText('Y', 15, -125);

    ctx.fillText('R', 10, -260 / 3 + 3);
    ctx.fillText('R/2', 10, -130 / 3 + 3);
    ctx.fillText('- R/2', 10, 130 / 3 + 3);
    ctx.fillText('- R', 10, 260 / 3 + 3);

    ctx.fillText('- R', -260 / 3 - 10, -10);
    ctx.fillText('- R/2', -130 / 3 - 12, -10);
    ctx.fillText('R/2', 130 / 3 - 5, -10);
    ctx.fillText('R', 260 / 3 - 5, -10);
}

// Функция рисования фигур (треугольник, прямоугольник, четверть круга)
function shapes() {
    ctx.beginPath();

    // Рисуем треугольник
    ctx.moveTo(0, 260 / 3);
    ctx.lineTo(260 / 3, 0);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fillStyle = 'blue';
    ctx.fill();

    // Рисуем прямоугольник
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, -130 / 3, 260 / 3, 130 / 3);

    // Рисуем четверть круга
    ctx.beginPath();
    ctx.arc(0, 0, 260 / 3, Math.PI, 3 * Math.PI / 2);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fillStyle = 'blue';
    ctx.fill();
}

// Функция перерисовки canvas
function redraw() {
    // Очищаем canvas
    ctx.clearRect(-example.width / 2, -example.height / 2, example.width, example.height);
    shapes(); // Рисуем фигуры
    base(); // Рисуем оси

    // Получаем сохраненные точки из локального хранилища
    const points = JSON.parse(localStorage.getItem('points')) || [];
    points.forEach(({ x, y, r, isHit }) => {
        drawPoint(x, y, r, isHit); // Рисуем каждую точку
    });
}

// Добавляем обработчик клика на кнопку очистки
document.getElementById("clear-button").addEventListener("click", function () {
    localStorage.removeItem('points'); // Удаляем точки из локального хранилища
    fetch('controller?clear=true', { method: 'GET' }) // Отправляем запрос на сервер
        .then(() => window.location.reload()) // Перезагружаем страницу после успешного запроса
        .catch(error => console.error('Error:', error));
});

function getCookie(name) {
    const cookies = document.cookie.split('; ');
    for (let cookie of cookies) {
        const [key, value] = cookie.split('=');
        if (key === name) {
            return value;
        }
    }
    return null; // Если cookie не найдено
}

// Инициализация графика
shapes(); // Рисуем фигуры
base(); // Рисуем оси
redraw(); // Перерисовываем график с сохранёнными точками
