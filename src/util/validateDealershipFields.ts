import SingleFieldValidatorUseCase from '../useCases/BankPayment/validateSingleFieldUseCase'

export interface PaymentField {
  value: string
  validationDigit: string
}

//validação dos 4 campos do pagamento de Concessionaria 
//separadamente usando o SingleFieldValidatorUseCase
export const validateDealershipFields = (digitableLine: string) => {
  const module = 11

  const fieldOne: PaymentField = {
    value: digitableLine.slice(0, 11),
    validationDigit: digitableLine[11],
  }
  const fieldTwo: PaymentField = {
    value: digitableLine.slice(12, 23),
    validationDigit: digitableLine[23],
  }
  const fieldThree: PaymentField = {
    value: digitableLine.slice(24, 35),
    validationDigit: digitableLine[35],
  }
  const fieldFour: PaymentField = {
    value: digitableLine.slice(36, 47),
    validationDigit: digitableLine[47],
  }

  const currencyCode = Number(digitableLine[2])

  const fields = [fieldOne, fieldTwo, fieldThree, fieldFour]

  fields.every((field: PaymentField, index: number) => {
    SingleFieldValidatorUseCase.exec(field, index, module, currencyCode)
  })
}
