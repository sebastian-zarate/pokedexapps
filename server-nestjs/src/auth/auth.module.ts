import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { JwtService } from '../jwt/jwt.service'; // Importa JwtService aquí

@Module({
  providers: [AuthService, UserService, JwtService], // Incluye JwtService en los providers
  controllers: [AuthController]
})
export class AuthModule {}
