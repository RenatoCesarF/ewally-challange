import { moduleEleven, moduleTen } from "../models/ModulesValidators"
import ServerError from "../models/serverError"

describe('ModuleTen test suite', () => {
    test('ModuleTen test, it should return true', () => {
      expect(moduleTen([2, 0, 0, 0, 0, 0, 0, 2, 6, 3, 8], 1, 1)).toBe(true)
    })
  
    test('ModuleTen test, it should return an error informing verification digit is incorret', () => {
      let testError = new ServerError(
        `Invalid verification digit of field: 1`,
        400,
        'Verification digit error',
      )
  
      expect(() => moduleTen([1, 1, 0, 0, 0, 9, 2, 1, 2], 2, 1)).toThrowError(
        testError as ServerError,
      )
    })
  })
  

describe('moduleEleven test suite', () => {
  test('moduleEleven test, it should return 9', () => {
    expect(
      moduleEleven([
        0, 4, 7, 1, 6, 5, 7, 4, 4, 0, 0, 1, 2, 1, 0, 0, 0, 1, 1, 2, 1, 1, 0, 0,
        0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 7, 8, 5, 7, 9, 2, 1, 2,
      ]),
    ).toBe(9)
  })

  
  test('moduleEleven test, it should return an error informing verification digit is incorret', () => {
    let testError = new ServerError(
      `Invalid verification digit of field: 2`,
      400,
      'Verification digit error',
    )

    expect(() => moduleEleven([84670010002], 7, 2)).toThrowError(
      testError as Error,
    )
  })
})
