function checkOnlyOne(checkbox) {
    var checkboxes = document.getElementsByName('y');
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false;
    });
}

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
    redraw();
}

themeToggleButton.addEventListener('click', toggleTheme);

var example = document.getElementById("example"),
    ctx = example.getContext('2d');

ctx.translate(example.width / 2, example.height / 2);

function savePointLocally(x, y, r, isHit) {
    const points = JSON.parse(localStorage.getItem('points')) || [];
    points.push({ x, y, r, isHit });
    localStorage.setItem('points', JSON.stringify(points));
}


function loadPoints() {
    return JSON.parse(localStorage.getItem('points')) || [];
}

async function sendPoint(x, y, r) {
    try {
        const response = await fetch(`controller?x=${x}&y=${y}&r=${r}`, { method: 'GET' });

        if (response.redirected) {
            window.location.href = response.url;
            return;
        }

        if (response.ok) {
            const html = await response.text();
            console.log("HTML response received:", html);

            // Проверка наличия текста "Попадание" для определения isHit
            const isHit = html.includes("Попадание");
            console.log(`Hit status: ${isHit}`);

            savePointLocally(x, y, r, isHit); // Передаём реальное значение попадания
            redraw();
        } else {
            console.error("Server error:", response.status, response.statusText);
            alert("Ошибка обработки данных на сервере.");
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Произошла ошибка при отправке данных.');
    }
}

document.getElementById('pointForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const x = parseFloat(document.getElementById("x").value);
    const r = parseFloat(document.getElementById("r").value);
    const yElements = document.querySelectorAll('input[name="y"]:checked');

    if (!/^-?\d+(\.\d+)?$/.test(x) || x < -3 || x > 3) {
        alert("Пожалуйста, введите X от -3 до 3");
        return;
    }

    if (!/^-?\d+(\.\d+)?$/.test(r) || r < 2 || r > 5) {
        alert("Пожалуйста, введите R от 2 до 5");
        return;
    }

    if (yElements.length === 0) {
        alert("Пожалуйста, выберите Y");
        return;
    }

    const y = parseFloat(yElements[0].value);
    if (y < -3 || y > 5) {
        alert('Некорректное значение Y');
        return;
    }

    sendPoint(x, y, r);
});

// Обработка на графике
document.getElementById("example").addEventListener("click", function(event) {
    const rInput = document.getElementById('r');
    const rValue = parseFloat(rInput.value);

    if (!/^-?\d+(\.\d+)?$/.test(rValue) || rValue < 2 || rValue > 5) {
        alert("Введите корректное значение R в диапазоне от 2 до 5");
        return;
    }

    const canvas = event.target;
    const rect = canvas.getBoundingClientRect();
    const scale = 260 / 3;

    const x = rValue * (event.clientX - rect.left - canvas.width / 2) / scale;
    const y = -rValue * (event.clientY - rect.top - canvas.height / 2) / scale;

    sendPoint(x, y, rValue);
});

function drawPoint(x, y, r, isHit) {
    const scale = 260 / 3;
    const canvasX = (x / r) * scale;
    const canvasY = -(y / r) * scale;

    console.log('Drawing point at:', canvasX, canvasY);

    ctx.beginPath();
    ctx.arc(canvasX, canvasY, 3, 0, 2 * Math.PI);
    ctx.fillStyle = isHit ? 'green' : 'red';
    ctx.fill();
    ctx.closePath();
}

function base() {
    ctx.beginPath();
    ctx.strokeStyle = flag_theme ? 'white' : 'black';

    // Оси
    ctx.moveTo(-130, 0);
    ctx.lineTo(130, 0);
    ctx.lineTo(125, -5);
    ctx.moveTo(130, 0);
    ctx.lineTo(125, 5);

    ctx.moveTo(0, 130);
    ctx.lineTo(0, -130);
    ctx.lineTo(5, -125);
    ctx.moveTo(0, -130);
    ctx.lineTo(-5, -125);

    // Метки на осях
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

    ctx.stroke();

    // Подписи
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

function shapes() {
    ctx.beginPath();

    // Треугольник
    ctx.moveTo(0, 260 / 3);
    ctx.lineTo(260 / 3, 0);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fillStyle = 'blue';
    ctx.fill();

    // Прямоугольник
    ctx.fillStyle = 'blue';
    ctx.fillRect(0, -130 / 3, 260 / 3, 130 / 3);

    // Четверть круга
    ctx.beginPath();
    ctx.arc(0, 0, 260 / 3, Math.PI, 3 * Math.PI / 2);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fillStyle = 'blue';
    ctx.fill();
}

function redraw() {
    ctx.clearRect(-example.width / 2, -example.height / 2, example.width, example.height);
    shapes();
    base();

    // Получаем сохраненные точки из локального хранилища
    const points = JSON.parse(localStorage.getItem('points')) || [];
    points.forEach(({ x, y, r, isHit }) => {
        drawPoint(x, y, r, isHit);
    });
}

document.getElementById("clear-button").addEventListener("click", function () {
    localStorage.removeItem('points'); // Удаляем данные из локального хранилища
    fetch('controller?clear=true', { method: 'GET' })
        .then(() => window.location.reload())
        .catch(error => console.error('Error:', error));
});

// Инициализация графика
shapes();
base();
redraw();