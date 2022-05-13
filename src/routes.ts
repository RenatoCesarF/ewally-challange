
import express from "express"
import bankPaymentController from './controllers/bankPayment.controller'

//Creating the routes to be exported with all the controllers and etc
const router  = express.Router()


//Declaring the route and attaching the appropriate controller
const bankController = new bankPaymentController()
router.get('/boleto/:digitableLine', bankController.read)
// router.put('/boleto/:digitableLine', bankController.put)
// router.delete('/boleto/:digitableLine', bankController.delete)
//...


export default router