import { Body, Controller, Get, Post } from '@nestjs/common';
import { SeedService } from './seed.service';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';

@Controller('seed')
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get()
  findAll() {
    return this.seedService.executeSeed();
  }

  // @Post()
  // create(@Body() createPokemon:CreatePokemonDto){
  //   return this.seedService.executeSeed(createPokemon);
  // }
}
