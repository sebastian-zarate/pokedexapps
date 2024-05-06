import { Controller, Get, Post, Delete, Param, Body } from '@nestjs/common';
import { Pokemon } from './pokemon.interface';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  @Post()
  create(@Body() pokemon: Pokemon) {
    this.pokemonService.create(pokemon);
  }

 @Get()
async findAll(): Promise<Pokemon[]> {
  return await this.pokemonService.findAll();
}

@Get(':id')
async findOne(@Param('id') id: string): Promise<Pokemon> {
  return await this.pokemonService.findOne(id);
}


@Delete(':id')
async remove(@Param('id') id: string) {
    console.log('Pokemon eliminado controller:', id);
    await this.pokemonService.remove(id); // Asegúrate de que el método remove sea async
    return { message: 'Pokemon eliminado correctamente' };
}

}
