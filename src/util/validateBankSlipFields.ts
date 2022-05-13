import SingleFieldValidatorUseCase from '../useCases/BankPayment/validateSingleFieldUseCase'
import { PaymentField } from './validateDealershipFields'


//validação dos 3 campos do pagamento de Boleto 
//separadamente usando o SingleFieldValidatorUseCase
export const validateBankSlipFields = (digitableLine: string) => {
  const module = 10

  const fieldOne: PaymentField = {
    value: digitableLine.slice(0, 9),
    validationDigit: digitableLine[9],
  }
  const fieldTwo: PaymentField = {
    value: digitableLine.slice(10, 20),
    validationDigit: digitableLine[20],
  }
  const fieldThree: PaymentField = {
    value: digitableLine.slice(21, 31),
    validationDigit: digitableLine[31],
  }

  const fields = [fieldOne, fieldTwo, fieldThree]

  fields.every((field: PaymentField, index: number) => {
    SingleFieldValidatorUseCase.exec(field, index, module)
  })
}
