import { formatDate, addDays } from "../util/dateFunctions"

describe("Testing addDays Function", ()=>{
    const date = new Date(2022, 5, 4)
    const baseDate = new Date(1997, 10, 7)

    test('Date sum 20 days to 2022-05-04 should return 2022-05-24', () =>{
        let sumDate = date
        sumDate = addDays(sumDate, 20)
        expect(formatDate(sumDate)).toBe('2022-05-24')
    })

    test('Date Sum with base expiration date (1997-10-07) should return 2000-07-03 ', () => {
        const sumedDateWith1000 = addDays(baseDate, 1000)
        expect(formatDate(sumedDateWith1000)).toBe('2000-07-03')
    })

})

test('Date formating function', () =>{
    const date = new Date(2022, 5, 4)
    expect(formatDate(date)).toBe('2022-05-04')
})