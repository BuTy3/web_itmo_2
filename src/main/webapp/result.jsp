<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
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
        </tr>
    </table>
</header>
<button class="submit_button" id="home_button">На главную</button>
<table id="res_table" border="1">
    <jsp:useBean id="resultBean" scope="session" class="ru.itmo.web.ResultBean" />
    <c:if test="${not empty resultBean.results}">
    <thead>
    <tr>
        <th>X</th>
        <th>Y</th>
        <th>R</th>
        <th>Результат</th>
    <c:forEach var="result" items="${resultBean.results}">
    <tr>
        <td>${result.x}</td>
        <td>${result.y}</td>
        <td>${result.r}</td>
        <td><c:choose>
            <c:when test="${result.isInside}">
                Попадание
            </c:when>
            <c:otherwise>
                Пенсия - false
            </c:otherwise>
        </c:choose></td>
    </tr>
    </c:forEach>
        </table>
    </c:if>

    <c:if test="${empty resultBean.results}">
        <p id="no_res">Нет результата</p>
    </c:if>

<script src="main.js"></script>
</body>
</html>