import containsAnyLetter from '../util/containLetters'
import formatDigitableLine from '../util/formatDigitableLine'

export interface Validation {
  isValid: boolean
  message: string
}

/*

Dead Code

Na primeira versão eu havia usado essa classe para validar os digitos,
linha digitave e etc. Porem depois optei pelo uso dos useCases. Porem vou deixar
essa classe ainda no projeto caso seja necessário rever algum conceito
*/

export default class BankPaymentValidator {
  static validateDigitableLine(digitableLine: string): Validation {
    const formatedDigitableLine = formatDigitableLine(digitableLine)
    const digitableLineLenght = formatedDigitableLine.length
    let isValid = true
    let message = 'Success'

    if (containsAnyLetter(formatedDigitableLine)) {
      isValid = false
      message = 'Bar digitable line contain letters'
      return { isValid, message }
    }

    if (digitableLineLenght > 48) {
      isValid = false
      message = `digitable Line is too long. it Should have 48 or 47 digits`
      return { isValid, message }
    }
    if (digitableLineLenght < 47) {
      isValid = false
      message = 'digitable Line is too short. it Should have 48 or 47 digits'
      return { isValid, message }
    }

    return { isValid, message }
  }

}
