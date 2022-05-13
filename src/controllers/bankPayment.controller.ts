import { Request, Response } from 'express'
import BankPaymentValidator, {
  Validation,
} from '../models/BankPaymentValidator'
import BankPayment, { PaymentType } from '../models/BankPayment'
import ServerError from '../models/serverError'
import { validateBankSlipFields } from '../util/validateBankSlipFields'
import { validateDealershipFields } from '../util/validateDealershipFields'
import BaseController, { HttpResponse } from './baseController'
import { validatePayment } from '../validators/BankPaymentValidator/paymentValidator'
import BarCodeValidatorUseCase from '../useCases/BankPayment/validateBarCodeUseCase'
import DigitableLineValidatorUseCase from '../useCases/BankPayment/validateDigitableLineUseCase'


/*
Essa é a classe do controlador pedido no projeto, com apenas um metodo implementado

Coloquei dentro de um try/catch, mesmo que não seja uma boa pratica de código limpo,
pra evitar a aplicação inteira cair por causa de um erro qualquer.

Meu objetivo foi simplificar o bastante a validação para que o controller não ficasse
muito longo, mas ao mesmo tempo demonstrar as etapas e recolher as informações necessárias
para o retorno do erro (caso um ocorra).
*/
export default class BankPaymentController implements BaseController {
  public read(req: Request, res: Response): HttpResponse {
    try {
      const digitableLine = req.params.digitableLine

      const { isValid, errors } = validatePayment({ digitableLine })

      if (!isValid) {
        throw new ServerError(errors.toString(), 400, 'ValidationError')
      }

      const paymentValidation: Validation = DigitableLineValidatorUseCase.exec(digitableLine)

      if (!paymentValidation.isValid) {
        throw new ServerError(
          paymentValidation.message,
          400,
          'Invalid Digitable Line'
        )
      }

      const payment = new BankPayment(digitableLine)

      payment.type === PaymentType.Bankslip
        // mudar o jeito que é chamado esses validadores para dentro do bankPaymentValidadtor
        ? validateBankSlipFields(payment.digitableLine) 
        : validateDealershipFields(payment.digitableLine)

      BarCodeValidatorUseCase.exec(payment.barCode, payment.type)

      const data = payment.getData()

      return res.status(200).json(data)
    } catch (error) {
      console.log(error)
      return res.status(500).json(error)
    }
  }

  public update(req: Request, res: Response): HttpResponse {
    throw new Error('Method not implemented.')
  }
  public delete(req: Request, res: Response): HttpResponse {
    throw new Error('Method not implemented.')
  }
  public create(req: Request, res: Response): HttpResponse {
    throw new Error('Method not implemented.')
  }
}
