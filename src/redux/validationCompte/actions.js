const validationAction = {
    VALIDATION : 'VALIDATION',
    VALIDATION_SUCCESS : 'VALIDATION_SUCCESS',
    VALIDATION_ERROR : 'VALIDATION_ERROR',

    validation: payload =>({
        type: validationAction.VALIDATION,
        payload
    })
}

export default validationAction;

