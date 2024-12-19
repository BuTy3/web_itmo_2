package ru.itmo.webserver.validation;

import jakarta.faces.application.FacesMessage;
import jakarta.faces.component.UIComponent;
import jakarta.faces.context.FacesContext;
import jakarta.faces.validator.FacesValidator;
import jakarta.faces.validator.Validator;
import jakarta.faces.validator.ValidatorException;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

/**
 * Валидатор для проверки допустимых значений радиуса R.
 */
@FacesValidator("validRValidation")
public class ValidRValidator implements ConstraintValidator<ValidR, Double>, Validator<Object> {

    @Override
    public boolean isValid(Double value, ConstraintValidatorContext context) {
        return value != null && 0.1 <= value && value <= 3.0;
    }

    @Override
    public void validate(FacesContext context, UIComponent component, Object value) throws ValidatorException {
        if (!(value instanceof Double doubleValue)) {
            throw new ValidatorException(new FacesMessage(FacesMessage.SEVERITY_ERROR,
                    "Validation Error", "Invalid input: value must be a number."));
        }


        if (!(0.1 <= doubleValue && doubleValue <= 3.0)) {
            throw new ValidatorException(new FacesMessage(FacesMessage.SEVERITY_ERROR,
                    "Validation Error", "Invalid input: " + doubleValue));
        }
    }
}
