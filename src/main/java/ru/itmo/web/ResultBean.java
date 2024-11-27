package ru.itmo.web;

import lombok.Setter;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import lombok.Getter;

import java.util.ArrayList;
import java.util.List;

public class ResultBean {
    private static final Logger logger = LogManager.getLogger(ResultBean.class);

    @Getter
    private List<AreaResult> results = new ArrayList<>();
    @Getter
    private String message = "Нет результата";

    public void addResult(AreaResult result) {
        logger.info("Adding new AreaResult: x={}, y={}, r={}, isInside={}", result.getX(), result.getY(), result.getR(), result.getIsInside());
        results.add(result);
    }

    public boolean hasResults() {
        logger.info("Checking if results exist: {}", !results.isEmpty());
        return !results.isEmpty();
    }

    public void clear(){
        results.clear();
        message = "Данные были удалены";
    }
}
