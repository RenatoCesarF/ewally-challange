import { moduleEleven, moduleTen } from '../../models/ModulesValidators'
import shouldUseModuleTen from '../../util/shouldUseModuleTen'
import { PaymentField } from '../../util/validateDealershipFields'

export interface Validation {
  isValid: boolean
  message: string
}

//Tentei alterar a estrutra/pattern do projeto pra esses "useCases", de forma que
//fique mais completo e fácil de expandir, porem acabei não usando todos os criados
export default class SingleFieldValidatorUseCase {
  static exec(
    field: PaymentField,
    fieldNumber: number,
    moduleNumber: number,
    currencyCode?: number
  ) {
    const fieldArray = Array.from(field.value).map(Number).reverse()

    // Seria possível receber esse metodo de uma classe pai atravez de herança, mas optei por usar assim mesmo
    if (shouldUseModuleTen( currencyCode, moduleNumber)) {
      return moduleTen(fieldArray, Number(field.validationDigit), fieldNumber)
    }

    return moduleEleven(fieldArray, Number(field.validationDigit), fieldNumber)
  }
}
