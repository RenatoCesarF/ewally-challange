import BankPayment from "../models/BankPayment"

describe('BankPayment type Bankslip  creation Tests', () => {
    const bankPaymentExample = new BankPayment("21290001192110001210904475617405975870000002000")

    test("(Bankslip) Bar code from digitable Line should return 21299758700000020000001121100012100447561740", ()=>{
        expect(bankPaymentExample.barCode).toBe("21299758700000020000001121100012100447561740")
    })
    test("(Bankslip) BankPayment Value from digitable Line should return 20", () => {
        expect(bankPaymentExample.amount).toBe(20.00)
    })
    test("(Bankslip) BankPayment Expiration date from digitable Line should return 2018-07-16", ()=>{
        expect(bankPaymentExample.expirationDate).toBe("2018-07-16")
    })
})

describe('BankPayment type Dealership  creation Tests', () => {
    const bankPaymentExample = new BankPayment("836200000021292600481009143530930013001904210760")
    const expectedAmountReturn = 229.26
    const expectedBarCodeReturn = "83620000002292600481001435309300100190421076"

    test(`(Dealership) Bar code from digitable Line should return ${expectedBarCodeReturn}`, ()=>{
        expect(bankPaymentExample.barCode).toBe(expectedBarCodeReturn)
    })
    test(`(Dealership) BankPayment Value from digitable Line should return ${expectedAmountReturn}`, () => {
        expect(bankPaymentExample.amount).toBe(expectedAmountReturn)
    })

})


describe("Type Validation", () =>{
    const slip       = new BankPayment("00000000000000000000000000000000000000000000000")
    const dealership = new BankPayment("000000000000000000000000000000000000000000000000")

    test("Expect 47 digits digitable line to be the type Slip", () => expect(slip.getTypeName()).toBe("Bankslip"))
    test("Expect 48 digits digitable line to be the type Dealership", () => expect(dealership.getTypeName()).toBe("Dealership"))
})

