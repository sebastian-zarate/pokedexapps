import { Injectable } from '@nestjs/common';
import jwt from 'jsonwebtoken';
@Injectable()
export class JwtService {
  secret = 'mysecret';

  signJWT = (payload: any) => {
    return jwt.sign(payload, this.secret);
  };

  verifyJWT = (token: string) => {
    return jwt.verify(token, this.secret);
  };
}