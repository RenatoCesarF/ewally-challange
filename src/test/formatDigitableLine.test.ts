import formatDigitableLine from "../util/formatDigitableLine"

describe("Format Digitable Line tests", ()=>{
    const spacedDigitableLine = formatDigitableLine(" 0000000000000 0000000000000 00000000000 00000000000 ")
    const tracedDigitableLine = formatDigitableLine("0000000000000-0000000000000-00000000000-00000000000")

    const correctFormatedDigitableLine = "000000000000000000000000000000000000000000000000"

    test('Spaced digitable line should return normal digitable line', () =>{
        expect(spacedDigitableLine).toBe(correctFormatedDigitableLine)
    })
    
    test('Traced Digitable Line should return normal digitable line', () =>{
        expect(tracedDigitableLine).toBe(correctFormatedDigitableLine)
    })
})
