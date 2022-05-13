import { PaymentType } from '../../models/BankPayment'
import { moduleEleven, moduleTen } from '../../models/ModulesValidators'
import ServerError from '../../models/serverError'

const bankslipValidationDigitPosition = 4
const dealershipValidationDigitPosition = 3

export interface Validation {
  isValid: boolean
  message: string
}

/*
Optei por essa arquitetura de useCases por questão da quantidade de validações necessárias
principalmente se a quantidade de casos de validação creça

Tentei alterar a estrutra/pattern do projeto pra esses "useCases", de forma que
fique mais completo e fácil de expandir, porem acabei não usando todos os criados

Outra escolha interessante seria ter uma classe ou um cabeçalho com a base de como
essas classes de validação devem ser montadas, assim como foi feito no controller e 
controllerBase
*/
export default class BarCodeValidatorUseCase {
  static exec(barCode: string, type: PaymentType) {
    const validationDigitPosition = 
        type === PaymentType.Bankslip 
          ? bankslipValidationDigitPosition 
          : dealershipValidationDigitPosition

    const barCodeVerification = Number(barCode[validationDigitPosition])
    const barCodeSliced = `${barCode.slice(0, validationDigitPosition)}${barCode.slice(validationDigitPosition + 1, 44)}`
    const reverseArray = this.getReversedCodeArray(barCodeSliced)

    const verificationDigit =
      validationDigitPosition === bankslipValidationDigitPosition
        ? moduleEleven(reverseArray)
        : moduleTen(reverseArray, barCodeVerification)

    if (verificationDigit !== barCodeVerification) {
      throw new ServerError(
        "Invalid barCode verification digit",
        400,
        "Bar code verification digit error"
      )
    }
    return true
  }


  private static getReversedCodeArray(barCode: string): number[] {
    return Array.from(barCode).map(Number).reverse()
  }
}
