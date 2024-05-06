import { Injectable } from '@nestjs/common';

@Injectable()
export class PokemonService {
  private pokemonList: any[] = [
    { id: 1, name: 'Bulbasaur' },
    { id: 2, name: 'Ivysaur' },
    { id: 3, name: 'Venusaur' },
    { id: 4, name: 'Charmander' },
    { id: 5, name: 'Charmeleon' },
    { id: 6, name: 'Charizard' },
    { id: 7, name: 'Squirtle' },
    { id: 8, name: 'Wartortle' },
    { id: 9, name: 'Bla2stoise' },
  ]; 
 /// constructor() {
    //console.log('Constructor de PokemonService llamado');
//this.db = Datastore.create({ filename: './data/pokemon.db', autoload: true });
  //}
  constructor() {
    console.log('Constructor de PokemonService llamado');
    // Podrías inicializar el array con algunos Pokémon aquí si lo deseas
  }

  async create(pokemon: any) {
    // Agregar un nuevo Pokémon al array
    this.pokemonList.push(pokemon);
    // Devolver el Pokémon recién creado
    return pokemon;
  }   

  async findAll(){
    // Devolver todos los Pokémon en el array
    return this.pokemonList;
  }

  async findOne(id: string) {
    // Buscar un Pokémon en el array por su ID
    return this.pokemonList.find(pokemon => pokemon.id === id);
  }

  async remove(id: string) {
    const numericId = parseInt(id, 10); // Convertir el ID a número
    this.pokemonList = this.pokemonList.filter(pokemon => pokemon.id !== numericId);
    console.log('Pokemon eliminado:', numericId);
    return numericId;
  }
  
}
/*
import { Injectable } from '@nestjs/common';

import Datastore from 'nedb-promises';

@Injectable()
export class PokemonService {
  private db;

  constructor() {
    console.log('Constructor de PokemonService llamado');
//this.db = Datastore.create({ filename: './data/pokemon.db', autoload: true });
  }

    async create(pokemon) {
        return await this.db.insert(pokemon);
    }   
    async findAll(){
        return await this.db.find({});
      }
    
      async findOne(id: string) {
        return await this.db.findOne({ _id: id });
      }
    
   
    
      async remove(id: string) {
        return await this.db.remove({ _id: id }, {});
      }

}*/