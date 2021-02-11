'use strict';

const thisUser = new UserForm;

 thisUser.loginFormCallback = data => {
    ApiConnector.login(data, response => {
        if (response.success) {
            location.reload();
        } else {
            thisUser.setLoginErrorMessage(response.error);
        }
    })
};
thisUser.registerFormCallback = data => {
    ApiConnector.register(data, response => {
        if (response.success) {
            location.reload();
        } else {
            thisUser.setRegisterErrorMessage(response.error);
        }
    })
}