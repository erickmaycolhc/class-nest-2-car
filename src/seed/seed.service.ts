import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response-interface';
import { Model } from 'mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  constructor(
    @InjectModel(Pokemon.name)
      private readonly pokemonModule: Model<Pokemon>,
      private readonly http:AxiosAdapter  
  ){}

    async executeSeed() {
    await this.pokemonModule.deleteMany({}); //borramos la data que pueda llegar a ver


    const data  = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650');   //extraemos data de la web pokeapi
        const pokemonToInsert:{name:string, no:number}[] = [];  //creamos un array con sus tipos
        //forEach: Su propósito principal es realizar una acción en cada elemento del arreglo
        data.results.forEach(async ({ name,url }) => {  //en este forEach solo me extrae los parametros name y url de la data
        const segments = url.split('/');  // separar por (/)
        const no = +segments[segments.length - 2];  //extraer la ante penultima posición 

        pokemonToInsert.push({name,no});
      })

      await this.pokemonModule.insertMany(pokemonToInsert);  //mostrar todos los pokemones por su name y no(número)
      return 'Seed executed';
    }


}
