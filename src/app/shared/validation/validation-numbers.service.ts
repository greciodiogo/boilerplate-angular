import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationNumbersService {

  errorMessages: any;
  regexNumeroSemZero = /^[1-9]+$/
  regexNumero = /^[0-9]+$/
  regexNumeroVirgulaEPonto = /^[0-9.,]+$/;

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

  public validarValorDinheiroRegexKeyPress(evt) {

    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var codigoTeclaPressionado = (evt.which) ? evt.which : theEvent.keyCode
    const codigoTeclaPonto = 46;
    const codigoTeclaVirgula = 44;

    //não aceita Ponto ou vírgula Na Primeira Posição
    if (evt.target.value.length == 0 && !this.regexNumero.test(key)) {
      return false;
    }

    //aceita apenas Número, Ponto Ou Virgula
    if (!this.regexNumeroVirgulaEPonto.test(key)) {
      return false
    }

    //Não aceita , ou . após .  ou ,
    if (
      (
        (evt.target.value.lastIndexOf(".") == (evt.target.value.length - 1))
        ||
        (evt.target.value.lastIndexOf(",") == (evt.target.value.length - 1))
      )
      && ((codigoTeclaPressionado == codigoTeclaPonto) || (codigoTeclaPressionado == codigoTeclaVirgula))
    ) {
      return false;
    }

    // Apenas 3 números após a vírgula
    if ((evt.target.value.split(",").length > 1) && (evt.target.value.split(",")[1].length == 3)) {
      return false
    }

    // Apenas uma vírgula
    if ((evt.target.value.indexOf(",") > -1) && (codigoTeclaPressionado == codigoTeclaVirgula)) {
      return false
    }

    // Já não aceita ponto se encontrar vírgula 
    if ((evt.target.value.indexOf(",") > -1) && (codigoTeclaPressionado == codigoTeclaPonto)) {
      return false
    }

    // Verifica sequencia de 3 números depois do ponto
    const partesInteira = evt.target.value.split(",")
    const posicaoUltimoPonto = evt.target.value.lastIndexOf(".")
    const ultimaParteMilhar = evt.target.value.substring((posicaoUltimoPonto + 1), partesInteira ? partesInteira[0].length : evt.target.value.length)
    if (posicaoUltimoPonto > -1) {
      if (ultimaParteMilhar.length == 3 && evt.target.value.indexOf(",") == -1 && codigoTeclaPressionado != codigoTeclaPonto && codigoTeclaPressionado != codigoTeclaVirgula) {
        return false;
      } else {
        if (ultimaParteMilhar.length < 3 && (codigoTeclaPressionado == codigoTeclaPonto || codigoTeclaPressionado == codigoTeclaVirgula)) {
          return false;
        }
      }
    }

    // Verifica insercão de ponto(.), mas não está a dividir o valor com milhares 
    if (codigoTeclaPressionado == codigoTeclaPonto && evt.target.value.indexOf(".") == -1 && evt.target.value.length > 3) {
      return false;
    }

    // Verifica inserção de ponto(.), depois do zero(0) 
    if (codigoTeclaPressionado == codigoTeclaPonto && evt.target.value == 0) {
      return false;
    }


    return true;

  }

  public validarNumeroRegexKeyPress(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    if (!this.regexNumero.test(key)) {
      return false
    }
    return true;
  }

  public validarNumeroSemZeroRegexKeyPress(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    if (!this.regexNumeroSemZero.test(key)) {
      return false
    }
    return true;
  }

  validarNumeroTelefoneMovicel(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    var codigoTeclaPressionado = (evt.which) ? evt.which : theEvent.keyCode
    key = String.fromCharCode(key);
    const tamanho=evt.target.value.replace(/ /g, '').split("_")[0].length
    if (!this.regexNumero.test(key)) {
      return false
    }
    
    //não aceita numero diferente de 9 Na Primeira Posição
    if ( tamanho == 0 && Number(key) != 9) {
      return false;
    }
    
    //não aceita numero diferente de 1 e 9 Na segunda posicao Posição
    if (tamanho == 1 && Number(key) != 9 && Number(key) != 1 ) {
      return false;
    }

    return true;
  }

  validarNumeroTelefone(evt) {
    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    var codigoTeclaPressionado = (evt.which) ? evt.which : theEvent.keyCode
    key = String.fromCharCode(key);
    const tamanho=evt.target.value.replace(/ /g, '').split("_")[0].length
    if (!this.regexNumero.test(key)) {
      return false
    }
    
    //não aceita numero diferente de 9 ou 2 Na Primeira Posição
    if ( tamanho == 0 && Number(key) != 9 && Number(key) != 2) {
      return false;
    }
     
    return true;
  }

  public validarValorDinheiroRegexKeyPressSemDecimal(evt) {

    var theEvent = evt || window.event;
    var key = theEvent.keyCode || theEvent.which;
    key = String.fromCharCode(key);
    var codigoTeclaPressionado = (evt.which) ? evt.which : theEvent.keyCode
    const codigoTeclaPonto = 46;
    const codigoTeclaVirgula = 44;

    //não aceita Ponto ou vírgula Na Primeira Posição
    if (evt.target.value.length == 0 && !this.regexNumero.test(key)) {
      return false;
    }

    //aceita apenas Número, Ponto Ou Virgula
    if (!this.regexNumeroVirgulaEPonto.test(key)) {
      return false
    }

    //Não aceita , ou . após .  ou ,
    if (
      (
        (evt.target.value.lastIndexOf(".") == (evt.target.value.length - 1))
        ||
        (evt.target.value.lastIndexOf(",") == (evt.target.value.length - 1))
      )
      && ((codigoTeclaPressionado == codigoTeclaPonto) || (codigoTeclaPressionado == codigoTeclaVirgula))
    ) {
      return false;
    }

    // Apenas 3 números após a vírgula
    // if ((evt.target.value.split(",").length > 1) && (evt.target.value.split(",")[1].length == 3)) {
    //   return false
    // }

    // Apenas uma vírgula
    if ((evt.target.value.indexOf(",") > -1) && (codigoTeclaPressionado == codigoTeclaVirgula)) {
      return false
    }

    // Já não aceita ponto se encontrar vírgula 
    if ((evt.target.value.indexOf(",") > -1) && (codigoTeclaPressionado == codigoTeclaPonto)) {
      return false
    }

    // Verifica sequencia de 3 números depois do ponto
    const partesInteira = evt.target.value.split(",")
    const posicaoUltimoPonto = evt.target.value.lastIndexOf(".")
    const ultimaParteMilhar = evt.target.value.substring((posicaoUltimoPonto + 1), partesInteira ? partesInteira[0].length : evt.target.value.length)
    if (posicaoUltimoPonto > -1) {
      if (ultimaParteMilhar.length == 3 && evt.target.value.indexOf(",") == -1 && codigoTeclaPressionado != codigoTeclaPonto && codigoTeclaPressionado != codigoTeclaVirgula) {
        return false;
      } else {
        if (ultimaParteMilhar.length < 3 && (codigoTeclaPressionado == codigoTeclaPonto || codigoTeclaPressionado == codigoTeclaVirgula)) {
          return false;
        }
      }
    }

    // Verifica insercão de ponto(.), mas não está a dividir o valor com milhares 
    if (codigoTeclaPressionado == codigoTeclaPonto && evt.target.value.indexOf(".") == -1 && evt.target.value.length > 3) {
      return false;
    }

    // Verifica inserção de ponto(.), depois do zero(0) 
    if (codigoTeclaPressionado == codigoTeclaPonto && evt.target.value == 0) {
      return false;
    }


    return true;

  }
}
