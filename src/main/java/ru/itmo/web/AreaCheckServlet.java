package ru.itmo.web;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

public class AreaCheckServlet extends HttpServlet {
    private static final Logger logger = LogManager.getLogger(AreaCheckServlet.class);
    // private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd.MM.yyyy HH:mm:ss");

    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        double x = Double.parseDouble(request.getParameter("x"));
        double y = Double.parseDouble(request.getParameter("y"));
        double r = Double.parseDouble(request.getParameter("r"));

        logger.info("Гет запрос: x={}, y={}, r={}", x, y, r);

        boolean isInside = checkArea(x, y, r);

        logger.info("Area результат: isInside={}", isInside);

        request.setAttribute("x", x);
        request.setAttribute("y", y);
        request.setAttribute("r", r);
        request.setAttribute("isInside", isInside);
        // request.setAttribute("currentTime", LocalDateTime.now().format(formatter));

        HttpSession session = request.getSession();
        ResultBean resultBean = (ResultBean) session.getAttribute("resultBean");

        if (resultBean == null) {
            logger.info("Создание нового бина");
            resultBean = new ResultBean();
            session.setAttribute("resultBean", resultBean);
        }

        logger.info("Запись результата в бин: x={}, y={}, r={}, isInside={}", x, y, r, isInside);
        resultBean.addResult(new AreaResult(x, y, r, isInside));

        logger.info("Forwarding to /result.jsp");
        getServletContext().getRequestDispatcher("/result.jsp").forward(request, response);
    }

    private boolean checkArea(double x, double y, double r) {
        if (x >= -3 && x <= 3 && y >= -3 && y <= 5 && r >= 2 && r <= 5) {
            if (x >= 0 && y >= 0) {
                return x <= r && y <= r / 2;
            } else if (x <= 0 && y >= 0) {
                return x * x + y * y <= Math.pow(r, 2);
            } else if (x >= 0 && y <= 0) {
                return x >= -r && !(-y >= (-x + r));
            }
        }
        return false;
    }
}
