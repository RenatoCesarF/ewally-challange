import containsAnyLetter from "../util/containLetters"


describe("Testing the containAnyLetter function", ()=>{

    test("Contain any letter should return true",() =>{
        const string = "123 abc"
        expect(containsAnyLetter(string)).toBe(true) 
    })

    test("Contain any letter should return false",() =>{
        const string = "123"
        expect(containsAnyLetter(string)).toBe(false) 
    })
})