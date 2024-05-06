import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
//import { JwtPayload } from './jwt-payload.interface';
import { User } from '../user/user.interface';
import { hash } from 'crypto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,

  ) {}

  async register(userObj: User) {
  const {password} = userObj;
  const  plainToHash = await hash(password, '10');
  userObj = {...userObj, password: plainToHash};
  return this.userService.create(userObj);
  }
}
