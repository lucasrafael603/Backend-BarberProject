import express, { NextFunction, Request, Response } from 'express';
import uploadConfig from './config/upload'
import routes from './Routes'
//import 'express-async-errors' caso quiser ativar tratativa de erros global

import './database'
import  'reflect-metadata'
import upload from './config/upload';
import AppError from './errors/AppError';

const app = express();

app.use(express.json());
app.use('/files', express.static(uploadConfig.directory)) /// Cria rota estatica de de arquivos
app.use(routes);

// Tratativa de erros global - atraves de um middleware
// app.use((err: Error, request: Request, response: Response, next: NextFunction)=>{
//   if(err instanceof AppError){
//     return response.status(err.statusCode).json({
//       status: 'error',
//       message: err.message,
//     })
//   }

//   console.error(err)

//     return response.status(500).json({
//       status: 'error',
//       message: 'Internal server error',
//     })

// })

app.listen(3333, () => { console.log('🤖 Iniciou o servidor'); });
