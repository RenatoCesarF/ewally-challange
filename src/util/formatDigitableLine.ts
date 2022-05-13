import replaceCharacters from './replaceCharacters'

export default function formatDigitableLine(digitableLine): string {
  let result = replaceCharacters(digitableLine, ' ', '')
  result = replaceCharacters(result, '-', '')
  return result
}