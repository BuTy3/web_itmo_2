package ru.itmo.webserver.validation;

import jakarta.faces.application.FacesMessage;
import jakarta.faces.component.UIComponent;
import jakarta.faces.context.FacesContext;
import jakarta.faces.validator.FacesValidator;
import jakarta.faces.validator.Validator;
import jakarta.faces.validator.ValidatorException;
import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

@FacesValidator("validXValidation")
public class ValidXValidator implements ConstraintValidator<ValidX, Double>, Validator<Object> {

    // Bean Validation
    @Override
    public boolean isValid(Double value, ConstraintValidatorContext context) {
        return value != null && -5 <= value && value <= 5;
    }

    // JSF Validation
    @Override
    public void validate(FacesContext context, UIComponent component, Object value) throws ValidatorException {
        if (!(value instanceof Double doubleValue)) {
            throw new ValidatorException(new FacesMessage(FacesMessage.SEVERITY_ERROR,
                    "Validation Error", "Invalid input: value must be a number."));
        }

        if (!( -5 <= doubleValue && doubleValue <= 5)) {
            throw new ValidatorException(new FacesMessage(FacesMessage.SEVERITY_ERROR,
                    "Validation Error", "Invalid input: " + doubleValue));
        }
    }


}
