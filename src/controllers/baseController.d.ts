import { Request, Response, NextFunction } from 'express'
import ServerError from '../models/serverError'

export type HttpResponse = Response | ServerError

/*
Criei essa classe abstrada de BaseController caso fosse necessário
(em um futuro hipotético) a criação de novos controladores, ter uma classe
abstrata que já traz a informação dos métodos necessário para serem implementados,
os parâmetros que essas recebem e o tipo de retorno agiliza na hora de expandir 
e adicionar rotas. Também ajuda caso uma nova pessoa seja introduzida ao projeto
*/
export default abstract class BaseController {
  abstract read(
    req: Request,
    res: Response,
    next?: NextFunction
  ): Response | ServerError

  abstract create(
    req: Request,
    res: Response,
    next?: NextFunction
  ): Response | ServerError

  abstract update(
    req: Request,
    res: Response,
    next?: NextFunction
  ): Response | ServerError

  abstract delete(
    req: Request,
    res: Response,
    next?: NextFunction
  ): Response | ServerError
}
