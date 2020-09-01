import {getRepository} from 'typeorm'
import path from 'path'
import User from '../models/User'
import uploadConfig from '../config/upload'
import fs from 'fs' ///Importa configurações fo File System do Node
import AppError from '../errors/AppError'


interface Request{
  user_id: string
  avatarFilename: string

}


class UpdateUserAvatarService {

  public async execute({user_id, avatarFilename} : Request) : Promise<User>{
    const usersRepository = getRepository(User)

    const user = await usersRepository.findOne(user_id)

    if(!user){

      throw new AppError('Only authenticated users can change avatar.',401)

    }

    if(user.avatar){
        //deletar avatar anterior

        const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar) ///Fazendo a união para completar o caminho e verificar se existe
        const userAvatarExists = await fs.promises.stat(userAvatarFilePath) // Verifica se o arquivo existe caso tiver retorno

        if (userAvatarExists){

          await fs.promises.unlink(userAvatarFilePath)
        }
   }

   user.avatar = avatarFilename

   await usersRepository.save(user)

   return user
  }

}

export default UpdateUserAvatarService
