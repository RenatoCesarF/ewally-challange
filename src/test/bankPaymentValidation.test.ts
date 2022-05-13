import DigitableLineValidatorUseCase from "../useCases/BankPayment/validateDigitableLineUseCase"

describe('Bankpayment Digitable Line validation', () =>{
    const digitableLineWithLetters = "0000000000000000000000000a000000000000000000000"
    const digitableLineWithLettersValidation = DigitableLineValidatorUseCase.exec(digitableLineWithLetters)
    
    const tooLongDigitableLine = "0000000000000000000000000000000000000000000000000"
    const tooLongDigitableLineValidation = DigitableLineValidatorUseCase.exec(tooLongDigitableLine)
    
    const tooShortDigitableLine = "0000000000000000000000000000000000000000000000"
    const tooShortDigitableLineValidation = DigitableLineValidatorUseCase.exec(tooShortDigitableLine)
    
    const correctDitigableLine = "000000000000000000000000000000000000000000000000"
    const correctDitigableLineValidation = DigitableLineValidatorUseCase.exec(correctDitigableLine)

    test('Digitable line with letters Validation expect to be false', () =>{
        expect(digitableLineWithLettersValidation.isValid).toBe(false)
    })
    test('Too long Digitable Line Validation expect to be false', () =>{
        expect(tooLongDigitableLineValidation.isValid).toBe(false)
    })
    test('Too short Digitable Line Validation expect to be false', () =>{
        expect(tooShortDigitableLineValidation.isValid).toBe(false)
    })
    test('Correct Digitable Line Validation expect to be true', () =>{
        expect(correctDitigableLineValidation.isValid).toBe(true)
    })

})