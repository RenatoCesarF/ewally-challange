export default function useModuleTen(currencyCode: number, module: number): boolean {
    return [6, 7].includes(currencyCode) || module === 10
}