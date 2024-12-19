package ru.itmo.webserver.beans;

import jakarta.enterprise.context.RequestScoped;
import jakarta.faces.application.FacesMessage;
import jakarta.faces.context.FacesContext;
import jakarta.inject.Inject;
import jakarta.inject.Named;
import lombok.Getter;
import lombok.Setter;
import ru.itmo.webserver.res.Result;

import java.io.Serializable;

@Named("inputBean")
@RequestScoped
public class InputBean implements Serializable {

    @Getter
    @Setter
    private Result result = new Result();

    @Inject
    private ValidationBean validationBean;

    @Inject
    private ResultBean resultBean;

    /**
     * Метод для обработки ввода пользователя.
     */
    public void processInput() {
        try {
            validationBean.validateInput(result);

            resultBean.checkHit(result);

        } catch (IllegalArgumentException e) {
            FacesContext.getCurrentInstance().addMessage(null,
                    new FacesMessage(FacesMessage.SEVERITY_ERROR, "Ошибка валидации", e.getMessage()));
        }
    }
}
