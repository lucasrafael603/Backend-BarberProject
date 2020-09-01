import JogosRepository from '../repositories/JogosRepository'
import Jogos from '../models/Jogos'

interface RequestDto{


  nickGame: string

  category: string,

  year: number,


  value: number

}

class CriarJogosService{

    jogosRepository : JogosRepository

    constructor(jogosrepository : JogosRepository){

      this.jogosRepository = jogosrepository


    }

    public execute({nickGame,category,year,value} : RequestDto) : Jogos | null {

      const name = nickGame

      const variavel = this.jogosRepository.All()

      const variavel2 = variavel.filter((nick) => {

        if(nick.nickGame = name){

          throw Error('This appointment is already booked')


        }

      })

       //console.log({message: variavel2})

        const criarJogos = this.jogosRepository.Create({nickGame,category,value,year})

      return criarJogos


    }

}


export default CriarJogosService
