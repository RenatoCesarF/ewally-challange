type StatusCode = 100 | 200 | 300 | 400 | 404 | 405 | 500 | 503


/*
Criei essa abstração de erro pra normalizar e generalizar o "lançamento" de erros
de forma que fica mais simples e "fácil de decidir" como enviar os erros. 
Além de facilitar no uso dos parâmetros
*/

export default class ServerError {
  public message: string
  public statusCode: number
  public name: string

  /**
   * @param message a message to be shown in the API response
   * @param statusCode can be 100 | 200 | 300 | 400 | 404 | 405 | 500 | 503
   */
  constructor(message: string, statusCode: StatusCode, name: string) {
    this.name = name
    this.message = message
    this.statusCode = statusCode
  }
}
