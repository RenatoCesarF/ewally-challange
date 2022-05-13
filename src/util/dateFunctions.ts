
export const addDays = (date: Date, days:number) => {
    var result = new Date(date)
    result.setDate(date.getDate() + days)
    return result
}

// metodo para formatas a data para  maneira que foi pedido na resposta
export const formatDate = (date: Date): string =>{
    const result = new Date(date)
    result.setMonth(result.getMonth() - 1)
    return result.toISOString().slice(0,10)
}