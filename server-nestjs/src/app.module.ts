import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PokemonModule } from './pokemon/pokemon.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { HashPasswordModule } from './hash-password/hash-password.module';
import { JwtServiceModule } from './jwt/jwt.module';
import { CookiesService  } from './redirect-with-cookies/redirect-with-cookies.service';

@Module({
  imports: [PokemonModule, UserModule, AuthModule, HashPasswordModule, JwtServiceModule],
  controllers: [AppController],
  providers: [AppService,  CookiesService ],
})
export class AppModule {}
