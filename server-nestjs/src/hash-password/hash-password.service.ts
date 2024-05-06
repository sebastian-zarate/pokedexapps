import { Injectable } from '@nestjs/common';
import crypto from 'crypto';

@Injectable()
export class HashPasswordService {
  getSalt() {
    return crypto.randomBytes(16).toString('hex');
  }

  hashPassword(password: string) {
    return crypto.createHash('sha256').update(password).digest('hex');
  }
}