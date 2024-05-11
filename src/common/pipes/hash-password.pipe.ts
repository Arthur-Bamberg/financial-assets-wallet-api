import { Injectable, PipeTransform } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { ENV } from '../env.config';

@Injectable()
export class HashPasswordPipe implements PipeTransform {
  async transform(password: string): Promise<string> {
    return await bcrypt.hash(password, ENV.SALT);
  }
}
