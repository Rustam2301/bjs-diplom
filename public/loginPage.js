'use strict'

let thisUser = new UserForm;
let err = new Error('Неверное имя пользователя или пароль');

 thisUser.loginFormCallback = (data) => ApiConnector.login(data, (response)=>{
    console.log(response);
    if (response.success === true) location.reload()
    else return err
   });
thisUser.registerFormCallback = (data) => ApiConnector.register(data, (response) =>
location.reload());