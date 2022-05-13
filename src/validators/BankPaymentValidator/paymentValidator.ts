import Validator from 'validatorjs'

type Validation = {
  digitableLine: string
}

type Rules = Record<keyof Validation, string>


// Começei a montar essa parte mas não consegui usar o potencial total disso
// Ainda não cheguei a mexer o bastante pra entender 
export const validatePayment = (data: Validation) => {
  const rules: Rules = {
    digitableLine: 'required|string',
  }

  const validation = new Validator(data, rules)

  return {
    isValid: validation.passes(),
    errors: validation.errors.all(),
  }
}
