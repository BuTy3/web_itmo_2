<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/functions" prefix="fn" %>
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
                <input class="input_n" type="number" id="r" name="r" min="2" max="4" step="0.01" placeholder="от 2 до 4">
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
        <tr>
            <table class="res_table" id="res_table4main" border="1">
                <jsp:useBean id="resultBean" scope="session" class="ru.itmo.web.ResultBean" />
                <c:if test="${not empty resultBean.results}">
                    <thead>
                    <tr>
                        <th>X</th>
                        <th>Y</th>
                        <th>R</th>
                        <th>Результат</th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:set var="size" value="${fn:length(resultBean.results)}" />
                    <c:set var="startIndex" value="${size > 5 ? size - 5 : 0}" />

                    <c:forEach var="result" items="${resultBean.results}" begin="${startIndex}">
                        <tr>
                            <td>${result.x}</td>
                            <td>${result.y}</td>
                            <td>${result.r}</td>
                            <td>
                                <c:choose>
                                    <c:when test="${result.isInside}">
                                        Попадание
                                    </c:when>
                                    <c:otherwise>
                                        Пенсия - false
                                    </c:otherwise>
                                </c:choose>
                            </td>
                        </tr>
                    </c:forEach>
                    </tbody>
                </c:if>
                <c:if test="${empty resultBean.results}">
                    <p id="no_res">${resultBean.message}</p>
                </c:if>
            </table>

        </tr>
    </table>
</form>

<script src="main.js"></script>
</body>
</html>