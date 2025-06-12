package ru.itmo.webserver.beans;

import jakarta.annotation.PostConstruct;
import jakarta.faces.view.ViewScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import ru.itmo.webserver.res.Result;

import java.io.Serializable;

@Named("resultBean")
@ViewScoped
public class ResultBean implements Serializable {

    @Inject
    private ResultListBean resultListBean;

    @Inject
    private PointStat pointStat;

    @Inject
    private ClickInterval clickInterval;

    @PostConstruct
    public void init() {
        for (Result r : resultListBean.getResults()) {
            pointStat.registerPoint(r.isHit());
            clickInterval.registerClick(r.getTimestamp());
        }
    }

    /**
     * Обрабатывает попадание точки и сохраняет результат.
     *
     * @param result объект Result
     */
    public void checkHit(Result result) {
        boolean hit = checkPoint(result);
        result.setHit(hit);

        if (result.getTimestamp() == 0) {
            result.setTimestamp(System.currentTimeMillis());
        }

        pointStat.registerPoint(hit);
        clickInterval.registerClick(result.getTimestamp());

        saveResult(result);
    }

    /**
     * Сохраняет результат, добавляя его в ResultListBean.
     *
     * @param result объект Result, который нужно сохранить.
     */
    private void saveResult(Result result) {
        resultListBean.addResult(result);
    }

    /**
     * Проверяет, попадает ли точка в область.
     *
     * @param result объект Result с параметрами для проверки попадания.
     * @return true, если точка попадает в область, иначе false.
     */
    public boolean checkPoint(Result result) {
        System.out.println("TIME FROM CLIENT: " + result.getTimestamp());
        double x = result.getX();
        double y = result.getY();
        double r = result.getR();
        long time = result.getTimestamp();
        System.out.print("x: " + x + ", y: " + y + ", r: " + r + "time: " + time + "\n");

        if (x >= -5 && x <= 5 && y >= -3 && y <= 3 && r >= 0.1 && r <= 3) {
            if (x <= 0 && y <= 0) {
                return x >= -r/2 && y >= -r;
            } else if (x <= 0 && y >= 0) {
                return y <= x + r/2 && x >= -r / 2 && y <= r / 2;
            } else if (x >= 0 && y <= 0) {
                return x * x + y * y <= Math.pow(r, 2);
            }
        }
        return false;
    }

    /**
     * Очищает все результаты.
     */
    public void clearResults() {
        resultListBean.clearResults();
    }
}
