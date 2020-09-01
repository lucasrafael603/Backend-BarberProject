
import Jogos from '../models/Jogos'

interface CreateJogos{



  nickGame: string

  category: string,

  year: number,


  value: number


}


class JogosRepository {

   private jogos : Jogos[]

   constructor(){
    this.jogos = []

  }

  public All()  {


    return this.jogos

  }

  public Create({nickGame,category,year,value}: CreateJogos ) : Jogos {

    const newJogo = new Jogos({nickGame,category,year,value})

    this.jogos.push(newJogo)

    return newJogo

  }

}


export default JogosRepository
