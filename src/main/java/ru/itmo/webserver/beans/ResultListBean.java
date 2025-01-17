package ru.itmo.webserver.beans;

import jakarta.enterprise.context.SessionScoped;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import lombok.Getter;
import ru.itmo.webserver.res.Result;
import ru.itmo.webserver.services.ResultService;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Named("resultListBean")
@SessionScoped
public class ResultListBean implements Serializable {

    @Inject
    private ResultService resultService;

    /**
     * -- GETTER --
     * Возвращает список результатов из базы данных для отображения.
     */
    @Getter
    private List<Result> results = new ArrayList<>(); // Локальный список для хранения результатов

    /**
     * Добавляет новый результат и сохраняет его в базе данных.
     *
     * @param result объект Result, который нужно добавить.
     */
    public void addResult(Result result) {
        // Сохраняем результат в базе данных
        resultService.save(result);

        // Добавляем результат в локальный список
        results.add(result);
    }

    /**
     * Очищает все результаты из базы данных и локального списка.
     */
    public void clearResults() {
        // Удаляем все результаты из базы данных
        resultService.deleteAll();

        // Очищаем локальный список
        results.clear();
    }

    /**
     * Обновляет локальный список результатов из базы данных.
     */
    public void refreshResults() {
        results = resultService.findAll();
    }
}
