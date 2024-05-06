import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { User } from '../user/user.interface';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  registerUser(@Body() body: User) {
    return this.authService.register(body);
  }

  @Post('login')
  async logout(@Res() res: Response) {
    res.clearCookie('jwt');
    res.json({ message: 'Logged out' });
  }
}