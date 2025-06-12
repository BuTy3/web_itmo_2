const themeToggleButton = document.getElementById('thema-button');
var flag_theme = document.documentElement.classList.contains('dark-theme');
var r_inp = parseFloat(document.querySelector('[id$=":r_input"]').getAttribute('value'));

if (isNaN(r_inp) || r_inp == 0) {
    r_inp = 0.1;
}
console.log(r_inp)

// Функция для переключения темы
function toggleTheme() {
    document.documentElement.classList.toggle('dark-theme');
    flag_theme = document.documentElement.classList.contains('dark-theme');
    if (flag_theme) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
    redraw(r_inp);
}

themeToggleButton.addEventListener('click', toggleTheme);

var example = document.getElementById("example"),
    ctx = example.getContext('2d');
ctx.translate(example.width / 2, example.height / 2);
var canvas_h = example.height - 100;

document.querySelector('[id$=":r"]').addEventListener("click", (event) => {
    let rSelect;
    const rHiddenInput = document.querySelector('[id$=":r_input"]');
    if (rHiddenInput) {
        // Получаем значение атрибута aria-valuenow
        const ariaValueNow = rHiddenInput.getAttribute('aria-valuenow');
        if (ariaValueNow) {
            rSelect = parseFloat(ariaValueNow); // Преобразуем в число
        } else {
            rSelect = 0.1; // Значение по умолчанию
        }
        console.log("R value:", rSelect, "/nrH: ", ariaValueNow);
    } else {
        alert('Укажите R');
    }
    r_inp = parseFloat(rSelect);
    redraw(r_inp);
});


document.querySelector('[id$=":r_input"]').addEventListener("input", (event) => {
    let rSelect;
    const rHiddenInput = document.querySelector('[id$=":r_input"]');
    if (rHiddenInput) {
        // Заменяем запятую на точку, если она есть
        const rSelect_str = rHiddenInput.value.replace(",", ".");
        console.log('rSelect_str: ', rSelect_str);

        // Преобразуем строку в число с плавающей точкой
        rSelect = parseFloat(rSelect_str);

        // Если значение равно 0, то заменяем на 0.1
        if (rSelect === 0) {
            rSelect = 0.1;
        }

        console.log("R value:", rSelect, "/nrH: ", rHiddenInput);
    } else {
        alert('Укажите R');
    }
    r_inp = parseFloat(rSelect);
    redraw(r_inp);
});

// Функция для рисования базовой сетки
function base(r) {

    if (!/^-?\d+(\.\d+)?$/.test(r) || r < 0.1 || r > 3) {
        // alert("Пожалуйста, введите R от 0.1 до 3");
        r = 0.3;
        // return;
    }

    if (r < 0.3) {
        r = 0.3;
    }

    const scale = r / 3;

    ctx.beginPath();
    ctx.strokeStyle = flag_theme ? 'white' : 'black';

    if (r >= 0.7) {
        ctx.moveTo(canvas_h / 2 * scale / 3, -5);
        ctx.lineTo(canvas_h / 2 * scale / 3, 5);

        ctx.moveTo(-canvas_h / 2 * scale / 3, -5);
        ctx.lineTo(-canvas_h / 2 * scale / 3, 5);

        ctx.moveTo(5, -canvas_h / 2 * scale / 3);
        ctx.lineTo(-5, -canvas_h / 2 * scale / 3);

        ctx.moveTo(5, canvas_h / 2 * scale / 3);
        ctx.lineTo(-5, canvas_h / 2 * scale / 3);
    }

    ctx.moveTo(-canvas_h / 2, 0);
    ctx.lineTo(canvas_h / 2, 0);
    ctx.lineTo(canvas_h / 2 - 5, -5);
    ctx.moveTo(canvas_h / 2, 0);
    ctx.lineTo(canvas_h / 2 - 5, 5);
    ctx.moveTo(0, canvas_h / 2);
    ctx.lineTo(0, -canvas_h / 2);
    ctx.lineTo(5, -canvas_h / 2 + 5);
    ctx.moveTo(0, -canvas_h / 2);
    ctx.lineTo(-5, -canvas_h / 2 + 5);

    ctx.moveTo(canvas_h * scale / 3, -5);
    ctx.lineTo(canvas_h * scale / 3, 5);

    ctx.moveTo(-canvas_h * scale / 3, -5);
    ctx.lineTo(-canvas_h * scale / 3, 5);

    ctx.moveTo(5, -canvas_h * scale / 3);
    ctx.lineTo(-5, -canvas_h * scale / 3);

    ctx.moveTo(5, canvas_h * scale / 3);
    ctx.lineTo(-5, canvas_h * scale / 3);
    ctx.stroke();
    ctx.font = '12px Arial';
    ctx.fillStyle = flag_theme ? 'white' : 'black';

    if (r >= 0.7) {
        ctx.fillText('R/2', 10, -canvas_h / 2 * scale / 3 + 3);
        ctx.fillText('- R/2', 10, canvas_h / 2 * scale / 3 + 3);

        ctx.fillText('- R/2', -canvas_h / 2 * scale / 3 - 12, -10);
        ctx.fillText('R/2', canvas_h / 2 * scale / 3 - 5, -10);
    }
    ctx.fillText('X', canvas_h - 5, -15);
    ctx.fillText('Y', 15, -canvas_h + 5);
    ctx.fillText('R', 10, -canvas_h * scale / 3 + 3);

    ctx.fillText('- R', 10, canvas_h * scale / 3 + 3);
    ctx.fillText('- R', -canvas_h * scale / 3 - 10, -10);
    if (r >= 0.4) {
        ctx.fillText('R', canvas_h * scale / 3 - 5, -10);
    }
}

// Функция для рисования фигур
function shapes(r) {

    if (!/^-?\d+(\.\d+)?$/.test(r) || r < 0.1 || r > 3) {
        alert("Пожалуйста, введите R от 0.1 до 3");
        r = 0.3;
        // return;
    }

    if (r < 0.3) {
        r = 0.3;
    }

    const scale = r / 3;

    // Треугольник
    ctx.beginPath();
    ctx.moveTo(0, -canvas_h / 2 * scale / 3);
    ctx.lineTo(-canvas_h / 2 * scale / 3, 0);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fillStyle = 'blue';
    ctx.fill();

    // Прямоугольник
    ctx.fillRect(0, 0, -canvas_h / 2 * scale / 3, canvas_h * scale / 3);

    // Четверть круга
    ctx.beginPath();
    ctx.arc(0, 0, canvas_h * scale / 3, 0, -3 * Math.PI / 2);
    ctx.lineTo(0, 0);
    ctx.closePath();
    ctx.fillStyle = 'blue';
    ctx.fill();
}

// Функция для перерисовки графика
function redraw(r) {
    console.log("Перерисовывание со знач r: ", r)
    ctx.clearRect(-example.width / 2, -example.height / 2, example.width, example.height);
    shapes(r);
    base(r);
    drawPointsFromTable();
}

function drawPoint(x, y, r, isHit) {
    console.log("Начало рисования");
    const scale = canvas_h * (r / 3) / 3; // Масштаб: 300 пикселей на R
    const canvasX = x / r * scale; // Пересчитываем координату X
    const canvasY = -y / r * scale; // Пересчитываем координату Y (инверсия для Canvas)

    console.log('Drawing point at:', canvasX, canvasY, isHit, "\nr: ", r);
    ctx.beginPath();
    ctx.arc(canvasX, canvasY, 3, 0, 2 * Math.PI); // Рисуем точку радиусом 3 пикселя
    ctx.fillStyle = isHit === "Попадание" ? 'green' : 'red'; // Цвет точки в зависимости от попадания
    ctx.fill();
    ctx.closePath();
}

// Функция для рисования точек из таблицы
function drawPointsFromTable() {
    // console.log("старт перерисовывания")
    const table = document.querySelector('.res_table');
    if (!table) {
        console.error('Table res_table4main not found');
        return;
    }

    const rows = table.getElementsByTagName('tr');
    // console.log("rows: ", rows)
    for (let i = 1; i < rows.length; i++) { // Начинаем с 1, чтобы пропустить заголовок таблицы
        const cells = rows[i].getElementsByTagName('td');
        if (cells.length < 4) {
            console.warn('Invalid row structure in table, skipping row', i);
            continue;
        }

        const x = parseFloat(cells[0].innerText.trim());
        const y = parseFloat(cells[1].innerText.trim());
        const r = parseFloat(cells[2].innerText.trim());
        const hit = cells[3].innerText.trim();
        console.log("x, y, r, hit: ", x, y, r, hit);

        if (isNaN(x) || isNaN(y) || isNaN(r)) {
            console.warn('Invalid number format in table row', i);
            continue;
        }
        console.log("r_inp: ", r_inp);
        if (r === r_inp) {
            drawPoint(x, y, r, hit);
        }
    }
}


example.addEventListener('click', (event) => {
    if (isNaN(r_inp) || r_inp < 0.1 || r_inp > 3) {
        alert("Пожалуйста, введите корректное значение R (0.1 <= R <= 3)");
        return;
    }

    // Получение позиции клика относительно Canvas
    const rect = example.getBoundingClientRect();
    const clickX = event.clientX - rect.left - example.width / 2;
    const clickY = -(event.clientY - rect.top - example.height / 2);

    // Переводим координаты клика в значения относительно R
    const scale = canvas_h * (r_inp / 3) / 3; // Масштаб для текущего R
    let x = (clickX / scale) * r_inp;
    let y = (clickY / scale) * r_inp;

    x = Math.max(-5, Math.min(5, Math.round(x)));
    y = Math.max(-3, Math.min(3, y));

    let formattedX = x.toFixed(2);
    let formattedY = y.toFixed(2);

    // Логируем результаты для отладки
    console.log('Координаты клика:', { x: formattedX, y: formattedY, r: r_inp });

    // let form_ = document.querySelector('.form-grid');

    // console.log("Form: ", form_)

    x_input_place = document.querySelector('[id$=":x_input"]');
    console.log("x_input_place: ", x_input_place);
    y_input_place = document.querySelector('[id$=":y"]');
    console.log("y_input_place: ", y_input_place);
    x_input_place.value = formattedX;
    y_input_place.value = formattedY;
    let timestampField = document.querySelector('[id$="timestamp"]');
    if (timestampField) {
        timestampField.value = Date.now();
        console.log("timestamp записан: ", timestampField.value);
    } else {
        console.warn("Не найден timestampField!");
    }


    let sb_but = document.querySelector('[id$=":sb_but"]');
    sb_but.click();

    //aria-valuenow
});




function valid_y(){
    y_inp = parseFloat(document.querySelector('[id$=":y"]').getAttribute('value'));
    if (!/^-?\d+(\.\d+)?$/.test(y_inp) || y_inp < -3 || y_inp > 3) {
        alert("Пожалуйста, введите Y от -3 до 3");
        return;
    }
}



redraw(r_inp);
valid_y();