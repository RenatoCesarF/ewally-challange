import { addDays, formatDate } from "../util/dateFunctions"
import formatDigitableLine from "../util/formatDigitableLine"

const baseExpirationDate =  new Date(1997, 10, 7)

/**
 * @description Bankslip = 47 | Dealership = 48
*/
export enum PaymentType{
    Bankslip= 47,
    Dealership = 48
}


/*
Classe base para a criação de objetos do tipo bankPayment
(tanto boleto quanto pagamento de concessionaria).
Optei por issar 'ifs' para separar entre os tipos,
poderia ter usado herança mas acho que seria over-engenering

Toda a criação e obtenção das informações acontece aqui,
apenas algumas validações que são feitas separadamente, e são
independentes dessa classe
*/
class BankPayment {
    expirationDate: string
    amount: number
    barCode:string
    readonly digitableLine: string
    readonly type: PaymentType

    constructor(digitableLine: string) {
        this.digitableLine = formatDigitableLine(digitableLine)
        this.type = this.digitableLine.length

        this.barCode = this.getBarCode()
        this.expirationDate = this.getExpirationDate()
        this.amount = this.getAmountValue()

        return this
    }

    getExpirationDate(): string{
        if(this.type === PaymentType.Dealership){
            return undefined
        }

        let expirationCode =  Number(this.barCode.slice(5, 9))
        const tempDate = addDays(baseExpirationDate, expirationCode)

        return formatDate(tempDate)
    }

    getAmountValue(): number{
        let value: string

        // caso novos tipos de pagamentos aparecessem seria melhor trocar isso por um switch
        if(this.type === PaymentType.Bankslip)  
            value = this.digitableLine.substring(this.digitableLine.length - 10)
        else{
            value = this.barCode.slice(4, 15)
        }

        return Number(value) / 100
    }

    getBarCode(): string{
        const barCode = []

        if(this.type === PaymentType.Bankslip){
            barCode.push(this.digitableLine.slice(0, 3)) // 01-03 Identificação do banco (001 = Banco do Brasil)
            barCode.push(this.digitableLine.slice(3, 4)) // 04 Código de moeda (9 = Real)
            barCode.push(this.digitableLine.slice(32, 35)) // Fator de vencimento
            barCode.push(this.digitableLine.substring(35)) // Valor nominal do título
            barCode.push(this.digitableLine.slice(4, 9)) // 5 primeiras posições do campo livre
            barCode.push(this.digitableLine.slice(10, 20)) // 6ª a 15ª posições do campo livre
            barCode.push(this.digitableLine.slice(21, 30)) // 16ª a 25ª posições do campo livre
            barCode.push(this.digitableLine.slice(30, 31)) // Dígito verificador geral
        }
        else{
            barCode.push(this.digitableLine.slice(0, 11))
            barCode.push(this.digitableLine.slice(12, 23))
            barCode.push(this.digitableLine.slice(24, 35))
            barCode.push(this.digitableLine.slice(36, 47))
        }
        
        return barCode.join('')
    }

    getTypeName(): string{return PaymentType[this.type]}

    // adicionei esse if na função getData mais por precaução, mas não é super necessário nesse caso
    getData(){
        const data = {
            "expirationDate": this.expirationDate,
            "amount":this.amount,
            "barCode":this.barCode
        }
        if(this.type === PaymentType.Dealership){
            delete data.expirationDate
        }
        return data
    }
}

export default BankPayment
