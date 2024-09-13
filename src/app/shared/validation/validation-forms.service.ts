import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationFormsService {

  errorMessages: any;

  formRules = {
    nonEmpty: '^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$',
    usernameMin: 5,
    passwordMin: 8,
    passwordPattern: '(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,}'
  };

  formErrors = {
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    accept: false,
  };

  constructor() {
    this.errorMessages = {
      firstName: {
        required: 'Primeiro nome é obrigatório',
      },
      lastName: {
        required: 'Ultimo nome é obrigatório',
      },
      username: {
        required: 'Nome de utilizador é obrigatório',
        minLength: `'Nome de utilizador dever ter ${this.formRules.usernameMin} caracteres ou mais`
      },
      email: {
        required: 'Email é obrigatório',
        email: 'Email inválido',
      },
      password: {
        required: 'Senha é obrigatório',
        pattern: 'Senha deve conter: número, letra maiúscula e minuscula',
        minLength: `Senha dever conter no mínimo ${this.formRules.passwordMin} caracteres`
      },
      confirmPassword: {
        required: 'Senha de confirmação é obrigatório',
        passwordMismatch: 'As senhas devem ser iguais'
      },
      accept: {
        requiredTrue: 'Você tem de aceitar os termos e as condições'
      },
    };
  }
}
