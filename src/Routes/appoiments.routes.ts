import {Router, request, response} from 'express'
import {uuid} from 'uuidv4'
import {startOfHour, parseISO, isEqual} from 'date-fns'
import appointmentObject from '../models/Appointment'
import { id } from 'date-fns/locale'
import AppointmentRepository from '../repositories/AppointmentsRepository'
import CreateAppointmentService from '../services/CreateAppointmentService'
import app from '../models/Appointment'
import { getCustomRepository } from 'typeorm'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'


const appoimentsRouter = Router()

/*interface Appointment{
  id: string
  name: string
  age: number
  date: Date

}*/

appoimentsRouter.use(ensureAuthenticated)


//const appointmentRepository = new AppointmentRepository()

appoimentsRouter.get('/', async (request,response) => {
  console.log(request.user)
  const appointmentRepository = getCustomRepository(AppointmentRepository)
  const allAppointments = await appointmentRepository.find()

  return response.json({allAppointments})

})

//const appointments: appointmentObject[] = []

appoimentsRouter.post('/', async (request,response) => {
try{
  const {provider_id, date} = request.body

  const parsedDate = parseISO(date)

 //const appointmentRepository = getCustomRepository(AppointmentRepository)

  const createAppointment = new CreateAppointmentService()

  const appointment = await createAppointment.execute({provider_id,date: parsedDate})

  //const app1 = new app({name,age,date})
  //console.log(app1)

  return response.json({ appointment })}

  catch(err){

    return response.status(400).json({ error: err.message })

  }


})


export default appoimentsRouter
