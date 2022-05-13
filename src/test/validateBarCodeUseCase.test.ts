import { PaymentType } from "../models/BankPayment"
import ServerError from "../models/serverError"
import BarCodeValidatorUseCase from "../useCases/BankPayment/validateBarCodeUseCase"

describe("Testing barcode validator useCase", ()=>{
    const rightCodeBankslipValidation = BarCodeValidatorUseCase.exec("21299758700000020000001121100012100447561740", PaymentType.Bankslip)
    // const wrongCodeBankslipValidation = BarCodeValidatorUseCase.exec("21294758700000020000001121100012100447561740", PaymentType.Bankslip)

    test("Barcode validating bankslip should return true", ()=>{
        expect(rightCodeBankslipValidation).toBe(true)
    })
    
    // test("Barcode validating bankslip should throw error", ()=>{
    //     const wantedError = new ServerError(
    //             "Invalid barCode verification digit",
    //             400,
    //             "Bar code verification digit error"
    //         )
    //     expect(wrongCodeBankslipValidation).toThrow(wantedError)
    // })
})