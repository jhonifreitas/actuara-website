import { AbstractControl, ValidatorFn } from '@angular/forms';

export class CustomValidator {

  static CPF(control: AbstractControl): ValidatorFn {
    const value = control.value;
    let result: any = null;
    if (control.value && !CustomValidator.checkCPF(value)) result = {invalid: true};
    return result;
  }

  static CNPJ(control: AbstractControl): ValidatorFn {
    const value = control.value;
    let result: any = null;
    if (control.value && !CustomValidator.checkCNPJ(value)) result = {invalid: true};
    return result;
  }

  static cleanCPF(value: string): string {
    return value.replace(/\./gi, '').replace('-', '');
  }

  static checkCPF(cpf: string): boolean {
    let digit1 = 0;
    let digit2 = 0;
    let valid = false;

    const regex = new RegExp('[0-9]{11}');

    if (
      cpf === '00000000000' ||
      cpf === '11111111111' ||
      cpf === '22222222222' ||
      cpf === '33333333333' ||
      cpf === '44444444444' ||
      cpf === '55555555555' ||
      cpf === '66666666666' ||
      cpf === '77777777777' ||
      cpf === '88888888888' ||
      cpf === '99999999999' ||
      !regex.test(cpf)
    ) valid = false;
    else {
      for (let i = 0; i < 10; i++) {
        digit1 = i < 9 ? (digit1 + (parseInt(cpf[i], 0) * (11 - i - 1))) % 11 : digit1;
        digit2 = (digit2 + (parseInt(cpf[i], 0) * (11 - i))) % 11;
      }

      valid = ((parseInt(cpf[9], 0) === (digit1 > 1 ? 11 - digit1 : 0)) &&
                (parseInt(cpf[10], 0) === (digit2 > 1 ? 11 - digit2 : 0)));
    }

    return valid;
  }

  static checkCNPJ(value: string) {
    if (!value) return false;
    const cnpj = String(value).replace(/\D/g, '');

    if (!cnpj || cnpj.length !== 14
      || cnpj === '00000000000000'
      || cnpj === '11111111111111'
      || cnpj === '22222222222222'
      || cnpj === '33333333333333'
      || cnpj === '44444444444444'
      || cnpj === '55555555555555'
      || cnpj === '66666666666666'
      || cnpj === '77777777777777'
      || cnpj === '88888888888888'
      || cnpj === '99999999999999')
      return false;
    let tamanho = cnpj.length - 2;
    let numeros = cnpj.substring(0, tamanho);
    const digitos = cnpj.substring(tamanho);
    let soma = 0;
    let pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += Number.parseInt(numeros.charAt(tamanho - i), 0) * pos--;
      if (pos < 2) pos = 9;
    }
    let resultado = (soma % 11 < 2 ? 0 : 11 - soma % 11).toString();
    if (resultado !== digitos.charAt(0)) return false;
    tamanho = tamanho + 1;
    numeros = cnpj.substring(0, tamanho);
    soma = 0;
    pos = tamanho - 7;
    for (let i = tamanho; i >= 1; i--) {
      soma += Number.parseInt(numeros.charAt(tamanho - i), 0) * pos--;
      if (pos < 2) pos = 9;
    }
    resultado = (soma % 11 < 2 ? 0 : 11 - soma % 11).toString();
    if (resultado !== digitos.charAt(1)) return false;
    return true;
  }
}
