import containsAnyLetter from '../../util/containLetters'
import formatDigitableLine from '../../util/formatDigitableLine'

export interface Validation {
  isValid: boolean
  message: string
}

//Tentei alterar a estrutra/pattern do projeto pra esses "useCases", de forma que
//fique mais completo e fácil de expandir, porem acabei não usando todos os criados
export default class DigitableLineValidatorUseCase {
  static exec(
    digitableLine: string
  ) {
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
