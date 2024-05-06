import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';

@Module({
  providers: [PokemonService], // Asegúrate de que las dependencias de PokemonService estén siendo inyectadas aquí si las tiene
  controllers: [PokemonController]
})
export class PokemonModule {}
