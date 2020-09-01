import {Router} from 'express'
import CreateUserService from '../services/CreateUserService'
import multer from 'multer'
import uploadConfig from '../config/upload'
import ensureAuthenticated from '../middlewares/ensureAuthenticated'
import UpdateUserAvatarService from '../services/UpdateUserAvatarService'


const usersRouter = Router()

const upload = multer(uploadConfig)

/*interface Appointment{
  id: string
  name: string
  age: number
  date: Date

}*/

usersRouter.post('/', async (request,response) => {
try{
  const {name, email, password} = request.body

  const createUser = new CreateUserService()

  const user = await createUser.execute({

    name,
    email,
    password

  })

  delete user.password
  console.log(user)
  return response.json(user)
///  return response.send('hello')

}
  catch(err){

    return response.status(400).json({ error: err.message })

  }


})

usersRouter.patch('/avatar', ensureAuthenticated , upload.single('avatar') ,async (request, response) => { //utilizado para atualizar somente 1 informação

  try{

    const updateUserAvatar = new UpdateUserAvatarService()

    const user = await updateUserAvatar.execute({user_id: request.user.id,
      avatarFilename: request.file.filename
    })

    //console.log(request.file)

    delete user.password

    return response.json(user)

  }

  catch (err){
    return response.status(400).json({ error: err.message})

  }


})


export default usersRouter
