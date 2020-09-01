import {Router} from 'express'
import appoimentsRouter from './appoiments.routes'
import  usersRouter from './users.router'
import sessionsRouter from './sessions.routes'
//import JogosRouter from './jogos.routes'

const routes = Router()

routes.use('/appoiments', appoimentsRouter)
routes.use('/users', usersRouter)
routes.use('/sessions', sessionsRouter)

//routes.use('/Jogos', JogosRouter)

export default routes
