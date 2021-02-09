'use strict';

const thisUser = new UserForm;

 thisUser.loginFormCallback = data => {
    ApiConnector.login(data, response => {
        if (response.success) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage(response.error);
        }
    })
};
thisUser.registerFormCallback = data => {
    ApiConnector.register(data, response => {
        if (response.success) {
            location.reload();
        } else {
            userForm.setRegisterErrorMessage(response.error);
        }
    })
}