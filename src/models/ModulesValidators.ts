import { isEven } from '../util/isEven'
import ServerError from '../models/serverError'

const unfitValues = [0,10,11]

/*
Optei por deixar os dois validadores (modulo 10 e modulo 11) no mesmo arquivo,
já que a função de ambos é quase a mesma.

Pensei em usar algum tipo de abstração mas achei desnecessário nesse caso.
*/

export function moduleTen(array: number[], verificationDigit: number, fieldNumber?: number){
  const reducedValue = reduceEven(array)

  const modulus = reducedValue % 10

  let selfConferenceDigit = 10 - modulus

  if (selfConferenceDigit === 10) {
    selfConferenceDigit = 0
  }

  if(!fieldNumber && selfConferenceDigit === verificationDigit) {
      return selfConferenceDigit
  }

  if (selfConferenceDigit !== verificationDigit) {
    throw new ServerError(
      `Invalid verification digit of field: ${fieldNumber}`,
      400,
      'Field number validation error',
      )
  }

  return true
}

function reduceEven(array: number[]): number{
  const reducedValue: number = array.reduce(
    (prev: number, current: number, index: number) => {
      const isIndexEven = isEven(index)

      let result = null

      result = isIndexEven ? current * 2 : current * 1

      if (result > 9) {
        const resultArr = result.toString().split('')

        result = Number(resultArr[0]) + Number(resultArr[1])
      }

      return prev + result
    }, 0
  )
  return reducedValue
}

export function moduleEleven(barCode: number[], verificationDigit?: number, fieldNumber?: number){
  let counter = 1

  const reducedValue = barCode.reduce((prev: number, current: number) => {
    counter++
    const multipliedAmount = current * counter

    if (counter === 9) {
      counter = 1
    }

    return multipliedAmount + prev
  }, 0)

  const modulus = reducedValue % 11

  let selfConferenceDigit = 11 - modulus
  
  if(selfConferenceDigit in unfitValues){
    selfConferenceDigit = 1
  }

  const isDigitValid = !verificationDigit || selfConferenceDigit === verificationDigit
  if (!isDigitValid) {
    throw new ServerError(
      `Invalid verification digit of field: ${fieldNumber}`,
      400,
      'Verification digit error',
    )
  } 
  return selfConferenceDigit
}
