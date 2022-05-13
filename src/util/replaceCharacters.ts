
// Por questão de responsividade com servidores não é possível sar replaceAll,
// logo passa a ser necessário usar esse metodo
export default function replaceCharacters(baseString: string, searchValue: string, replaceValue){
    return baseString.split(searchValue).join(replaceValue)
}
