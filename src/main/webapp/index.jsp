<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Lab 2</title>
    <link rel="stylesheet" href="styles.css">
    <script>
        (function () {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                document.documentElement.classList.add('dark-theme');
            }
        })();
    </script>
</head>
<body>
<header>
    <table class="header_table">
        <tr>
            <td>Леонтьев Виктор Александрович</td>
            <td>Группа P3224</td>
            <td>Вариант 412991</td>
            <td><button class="head-button" id="thema-button">!</button></td>
            <td><button class="head-button" id="clear-button">Удалить точки</button></td>
        </tr>
    </table>
</header>

<form id="pointForm" method="GET" action="controller">
    <table class="main_table">
        <tr>
            <td id="main_left1_l">
                <label for="x">Введите координату Х:</label>
                <input class="input_n" type="number" id="x" name="x" min="-3" max="3" step="0.01" placeholder="от -3 до 3">
            </td>

            <td id="main_left1_r">
                <label for="r">Введите координату R:</label>
                <input class="input_n" type="number" id="r" name="r" min="2" max="5" step="0.01" placeholder="от 2 до 5">
            </td>

            <td rowspan="2" id="main_right">
                <div id="chart_block">
                    <canvas height="280" width="280" id="example"></canvas>
                </div>
            </td>
        </tr>
        <tr>
            <td colspan="2" id="main_left2">
                <p>Выберите координату Y</p>
                <div class="check">
                    <label><input type="checkbox" name="y" value="-3" onclick="checkOnlyOne(this)"> -3</label>
                    <label><input type="checkbox" name="y" value="-2" onclick="checkOnlyOne(this)"> -2</label>
                    <label><input type="checkbox" name="y" value="-1" onclick="checkOnlyOne(this)"> -1</label>
                    <label><input type="checkbox" name="y" value="0" onclick="checkOnlyOne(this)"> 0</label>
                    <label><input type="checkbox" name="y" value="1" onclick="checkOnlyOne(this)"> 1</label>
                    <label><input type="checkbox" name="y" value="2" onclick="checkOnlyOne(this)"> 2</label>
                    <label><input type="checkbox" name="y" value="3" onclick="checkOnlyOne(this)"> 3</label>
                    <label><input type="checkbox" name="y" value="4" onclick="checkOnlyOne(this)"> 4</label>
                    <label><input type="checkbox" name="y" value="5" onclick="checkOnlyOne(this)"> 5</label>
                </div>
            </td>
        </tr>
        <tr>
            <td colspan="3" id="main_4_button">
                <input type="submit" value="Проверить" class="submit_button">
            </td>
        </tr>
    </table>
</form>

<script src="main.js"></script>
</body>
</html>