import Appointment from '../models/Appointment'
import {startOfHour} from 'date-fns'
import AppointmentsRepository from '../repositories/AppointmentsRepository'
import {getCustomRepository} from 'typeorm'
import AppError from '../errors/AppError'

interface RequestDto{
  provider_id: string,
  date: Date

}




      /*appointmentsRepository : AppointmentsRepository

      constructor(AppointmentsRepository : AppointmentsRepository){

        this.appointmentsRepository = AppointmentsRepository


      }*/

      class CreateAppointmentService{
  public async execute({provider_id,date}: RequestDto): Promise < Appointment | null> {

    const appointmentsRepository = getCustomRepository(AppointmentsRepository)

    const appointmentDate = startOfHour(date)

    /*const findAppointment = appointments.find(appointments => {
          isEqual(parseDate, appointments.date)
    })*/

      const findAppointment = await appointmentsRepository.findByDate(appointmentDate)

    if (findAppointment){
      throw Error('This appointment is already booked')

       //return response.status(400).json({ message: 'This appointment is already booked'})
    }
    //console.log(findAppointment)

    //const newAppoiment = new appointmentObject('Lucas',18, parseDate)

    const newAppoiment = appointmentsRepository.create({provider_id,date: appointmentDate})

    await appointmentsRepository.save(newAppoiment)

      return newAppoiment
  }
}


export default CreateAppointmentService
