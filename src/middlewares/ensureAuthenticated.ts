import {Request, Response, NextFunction} from 'express'
import { verify } from 'jsonwebtoken'

import AuthConfig from '../config/auth'
import AppError from '../errors/AppError'

interface TokenPayload{
  iat: number
  exp: number
  sub: string

}

export default function ensureAuthenticated(request :Request, response :Response, next: NextFunction): void {

  const authHeader = request.headers.authorization

  if(!authHeader){//Verifica se o token não existe

    throw new AppError('JWT token is missing', 401)

  }

  const [, token] = authHeader.split(' ') //Separa os itens do header em array, sendo que neste caso só vamos ter 2 index no array
                                   // os 2 posições do array é a ([bear], [tokenJWT])


  try{

  //const {secret} = AuthConfig.jwt

  const decoded = verify(token , AuthConfig.jwt.secret )

  //console.log(decoded)
  /*Adicionando propriedade user no request, com isso teremos salvo em todas
   as rotas que utilizarem este middleware os IdUsuarios*/
  const { sub } = decoded as TokenPayload

  request.user = {

    id: sub,

  }

  return next()

  }catch {

    throw new AppError('Invalid JWT Token', 401)

  }



}
