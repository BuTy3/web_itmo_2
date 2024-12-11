let tempPoint = null; // Переменная для хранения временной точки, которую пользователь может добавить

// Основная функция для рисования графика
function drawGraph() {
    const canvas = document.getElementById('example'); // Получаем элемент canvas
    if (!canvas) { // Проверяем, существует ли элемент canvas
        console.error('Элемент canvas не найден'); // Выводим сообщение об ошибке, если элемент не найден
        return; // Завершаем выполнение функции, если canvas отсутствует
    }

    const ctx = canvas.getContext('2d'); // Получаем 2D-контекст для рисования
    const width = canvas.width; // Ширина canvas
    const height = canvas.height; // Высота canvas
    const centerX = width / 2; // Центр canvas по оси X
    const centerY = height / 2; // Центр canvas по оси Y

    ctx.clearRect(0, 0, width, height); // Очищаем canvas перед рисованием

    const scale = Math.min(width, height) / 6; // Рассчитываем масштаб для графика

    ctx.strokeStyle = flag_theme ? 'white' : 'black'; // Устанавливаем цвет линий
    ctx.fillStyle = ctx.strokeStyle; // Устанавливаем цвет заливки
    ctx.lineWidth = 2; // Устанавливаем толщину линий

    // Рисуем оси координат
    ctx.beginPath(); // Начинаем новый путь
    ctx.moveTo(0, centerY); // Двигаем карандаш к началу оси Y
    ctx.lineTo(width, centerY); // Рисуем ось X
    ctx.moveTo(centerX, 0); // Двигаем карандаш к началу оси X
    ctx.lineTo(centerX, height); // Рисуем ось Y
    ctx.stroke(); // Заканчиваем рисование линий

    // Рисуем стрелки на осях
    ctx.beginPath(); // Начинаем новый путь
    ctx.moveTo(width - 10, centerY - 5); // Линия для стрелки на оси X (правая часть)
    ctx.lineTo(width, centerY);
    ctx.lineTo(width - 10, centerY + 5);
    ctx.moveTo(centerX - 5, 10); // Линия для стрелки на оси Y (верхняя часть)
    ctx.lineTo(centerX, 0);
    ctx.lineTo(centerX + 5, 10);
    ctx.stroke(); // Заканчиваем рисование стрелок

    ctx.fillStyle = 'blue'; // Устанавливаем цвет для заливки фигур

    // Рисуем прямоугольник во второй четверти
    ctx.beginPath(); // Начинаем новый путь
    ctx.moveTo(centerX - scale, centerY); // Первая точка прямоугольника
    ctx.lineTo(centerX, centerY); // Вторая точка прямоугольника
    ctx.lineTo(centerX, centerY - (2 * scale)); // Третья точка прямоугольника
    ctx.lineTo(centerX - scale, centerY - (2 * scale)); // Четвёртая точка прямоугольника
    ctx.closePath(); // Замыкаем путь
    ctx.fill(); // Заливаем фигуру

    // Рисуем треугольник в первой четверти
    ctx.beginPath(); // Начинаем новый путь
    ctx.moveTo(centerX, centerY); // Первая точка треугольника
    ctx.lineTo(centerX + scale, centerY); // Вторая точка треугольника
    ctx.lineTo(centerX, centerY - (2 * scale)); // Третья точка треугольника
    ctx.closePath(); // Замыкаем путь
    ctx.fill(); // Заливаем фигуру

    // Рисуем четверть круга в третьей четверти
    ctx.beginPath(); // Начинаем новый путь
    ctx.arc(centerX, centerY, scale, Math.PI / 2, Math.PI, false); // Рисуем дугу (четверть круга)
    ctx.lineTo(centerX, centerY); // Замыкаем путь к центру
    ctx.closePath(); // Замыкаем путь
    ctx.fill(); // Заливаем фигуру

    // Устанавливаем цвет и шрифт для подписей
    ctx.font = '12px Arial';
    ctx.fillStyle = flag_theme ? 'white' : 'black'; // Шрифт текста
    ctx.textAlign = 'center'; // Выравнивание текста по центру
    ctx.textBaseline = 'middle'; // Вертикальное выравнивание текста

    // Добавляем подписи на ось X
    ctx.fillText('R', centerX + (2 * scale), centerY + 20); // Подпись "R" справа
    ctx.fillText('R/2', centerX + scale, centerY + 20); // Подпись "R/2"
    ctx.fillText('-R/2', centerX - scale, centerY + 20); // Подпись "-R/2"
    ctx.fillText('-R', centerX - (2 * scale), centerY + 20); // Подпись "-R"

    // Добавляем подписи на ось Y
    ctx.fillText('R', centerX - 20, centerY - (2 * scale)); // Подпись "R" сверху
    ctx.fillText('R/2', centerX - 20, centerY - scale); // Подпись "R/2"
    ctx.fillText('-R/2', centerX - 20, centerY + scale); // Подпись "-R/2"
    ctx.fillText('-R', centerX - 20, centerY + (2 * scale)); // Подпись "-R"

    const rSelect = document.querySelector('[id$=":r"]'); // Получаем элемент выбора значения R
    const RSelected = rSelect && !isNaN(parseFloat(rSelect.value)) ? parseFloat(rSelect.value) : 0; // Проверяем и получаем выбранное значение R

    drawAllPoints(ctx, centerX, centerY, scale, RSelected); // Рисуем все точки из таблицы

    if (tempPoint) { // Если временная точка существует
        drawPoint(ctx, tempPoint.x, tempPoint.y, 'rgba(52, 152, 219, 0.8)'); // Рисуем временную точку
    }
}

// Функция для рисования отдельной точки на canvas
function drawPoint(ctx, x, y, color) {
    ctx.fillStyle = color; // Устанавливаем цвет для точки
    ctx.beginPath(); // Начинаем новый путь
    ctx.arc(x, y, 3, 0, 2 * Math.PI); // Рисуем окружность с радиусом 4
    ctx.fill(); // Заливаем точку выбранным цветом
}

// Функция для рисования всех точек, загруженных из таблицы
function drawAllPoints(ctx, centerX, centerY, scale, currentR) {
    const table = document.querySelector('.data-table'); // Находим таблицу с точками
    if (!table || !currentR) return; // Выходим из функции, если таблица или R не заданы

    const rows = table.getElementsByTagName('tr'); // Получаем строки таблицы
    console.log(`Найдено ${rows.length} строк`); // Логируем количество строк
    for (let i = 1; i < rows.length; i++) { // Пропускаем первую строку (заголовки)
        const cells = rows[i].getElementsByTagName('td'); // Получаем ячейки строки
        console.log(`Строка ${i} содержит:`, cells); // Логируем содержимое строки
        if (cells.length >= 4) { // Проверяем, что строка содержит минимум 4 ячейки
            const x = parseFloat(cells[0].textContent); // Считываем X
            const y = parseFloat(cells[1].textContent); // Считываем Y
            const r = parseFloat(cells[2].textContent); // Считываем R
            console.log(`Распознанные значения - x: ${x}, y: ${y}, r: ${r}`); // Логируем значения

            if (r !== currentR) continue; // Пропускаем точки с другим R

            const hit = cells[3].textContent.trim().toLowerCase() === 'yes'; // Проверяем, является ли точка попаданием
            const scaledX = centerX + (x * scale * 2 / currentR); // Масштабируем X для отображения
            const scaledY = centerY - (y * scale * 2 / currentR); // Масштабируем Y для отображения

            console.log(`Рисуем точку - scaledX: ${scaledX}, scaledY: ${scaledY}, hit: ${hit}`); // Логируем координаты точки
            drawPoint(ctx, scaledX, scaledY, hit ? '#2ecc71' : '#e74c3c'); // Рисуем точку зелёным (попадание) или красным (промах)
        }
    }
}

// Инициализация графика при загрузке страницы
window.onload = () => {
    try {
        drawGraph(); // Пытаемся нарисовать график
    } catch (error) {
        console.error('Ошибка при начальной отрисовке графика:', error); // Логируем ошибку, если что-то пошло не так
    }
};

// Обработка кликов по canvas
document.getElementById('graph')?.addEventListener('click', function (event) {
    try {
        const canvas = event.target; // Получаем элемент canvas, по которому кликнули
        const rect = canvas.getBoundingClientRect(); // Получаем размер и позицию canvas
        const x = event.clientX - rect.left; // Рассчитываем координату X клика относительно canvas
        const y = event.clientY - rect.top; // Рассчитываем координату Y клика относительно canvas
        const centerX = canvas.width / 2; // Центр canvas по оси X
        const centerY = canvas.height / 2; // Центр canvas по оси Y

        const rSelect = document.querySelector('[id$=":r"]'); // Находим элемент выбора R
        if (!rSelect || !rSelect.value) { // Если R не задан
            alert('Пожалуйста, выберите значение R'); // Показываем предупреждение
            return; // Прерываем обработку клика
        }
        const R = parseFloat(rSelect.value); // Получаем значение R

        const scale = Math.min(canvas.width, canvas.height) / 6; // Рассчитываем масштаб

        // Преобразуем координаты клика в логические координаты
        let xCoordinate = ((x - centerX) / scale * (R / 2)); // Преобразуем X
        let yCoordinate = ((centerY - y) / scale * (R / 2)); // Преобразуем Y

        const validXValues = [-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5]; // Допустимые значения X
        const closestX = validXValues.reduce((prev, curr) => { // Находим ближайшее допустимое значение X
            return (Math.abs(curr - xCoordinate) < Math.abs(prev - xCoordinate) ? curr : prev);
        });

        yCoordinate = Math.round(yCoordinate * 100) / 100; // Округляем Y до двух знаков после запятой

        tempPoint = { // Сохраняем временную точку для отображения на графике
            x: centerX + (closestX * scale / R * 2), // Переводим X в масштабированные координаты
            y: centerY - (yCoordinate * scale / R * 2) // Переводим Y в масштабированные координаты
        };

        const xSelect = document.querySelector('[id$=":x"]'); // Находим элемент выбора X
        const yInput = document.querySelector('[id$=":y"]'); // Находим поле ввода Y

        if (xSelect && yInput) { // Если элементы формы найдены
            xSelect.value = closestX; // Устанавливаем ближайшее допустимое значение X
            yInput.value = yCoordinate; // Устанавливаем значение Y
        }

        drawGraph(); // Перерисовываем график с временной точкой
    } catch (error) {
        console.error('Ошибка обработки клика по canvas:', error); // Логируем ошибку
    }
});

// Сброс временной точки после отправки формы
document.querySelector('form')?.addEventListener('submit', function (event) {
    if (!validateForm()) { // Проверяем, прошла ли форма валидацию
        event.preventDefault(); // Если нет, предотвращаем отправку формы
    } else {
        tempPoint = null; // Сбрасываем временную точку
    }
});

// Перерисовка графика при изменении значения R
document.querySelector('[id$=":r"]')?.addEventListener('change', function () {
    tempPoint = null; // Сбрасываем временную точку
    drawGraph(); // Перерисовываем график с новым R
});
