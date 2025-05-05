package ru.itmo.webserver.res;

import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ru.itmo.webserver.validation.ValidR;
import ru.itmo.webserver.validation.ValidX;

import java.beans.JavaBean;
import java.io.Serializable;
import java.util.Objects;

/**
 * Result - класс, представляющий результат проверки попадания точки в область.
 * Содержит данные о координатах точки (x, y), радиусе (r), идентификаторе результата,
 * а также информации о попадании точки в область.
 */
@Entity
@Table(name = "results")
@JavaBean
@Data
@Builder
public class Result implements Serializable {

    /**
     * Уникальный идентификатор результата (если сохраняется в базу данных).
     */
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    /**
     * /**
     * Координата X точки, проверяемая на попадание в область.
     * Значение должно удовлетворять валидации, заданной аннотацией @ValidX.
     */
    @ValidX
    private double x;

    /**
     * Координата Y точки, проверяемая на попадание в область.
     * Допустимое значение должно находиться в диапазоне от -3 до 3.
     */
    @Min(-3)
    @Max(3)
    private double y;

    /**
     * Радиус R, определяющий размер области проверки.
     * Значение должно удовлетворять валидации, заданной аннотацией @ValidR.
     */
    @ValidR
    private double r;

    /**
     * Флаг, показывающий, попала ли точка в заданную область.
     */
    private boolean hit;

    public Result() {
    }

    public Result(Long id, double x, double y, double r, boolean hit) {
        this.id = id;
        this.x = x;
        this.y = y;
        this.r = r;
        this.hit = hit;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getX() {
        return x;
    }

    public void setX(double x) {
        this.x = x;
    }

    public double getY() {
        return y;
    }

    public void setY(double y) {
        this.y = y;
    }

    public double getR() {
        return r;
    }

    public void setR(double r) {
        this.r = r;
    }

    public boolean isHit() {
        return hit;
    }

    public void setHit(boolean hit) {
        this.hit = hit;
    }

    @Override
    public String toString() {
        return "Result{" +
                "id=" + id +
                ", x=" + x +
                ", y=" + y +
                ", r=" + r +
                ", hit=" + hit +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof Result)) return false;
        Result result = (Result) o;
        return Double.compare(result.x, x) == 0 &&
                Double.compare(result.y, y) == 0 &&
                Double.compare(result.r, r) == 0 &&
                hit == result.hit &&
                Objects.equals(id, result.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, x, y, r, hit);
    }
}
