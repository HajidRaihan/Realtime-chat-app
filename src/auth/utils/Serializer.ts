/* eslint-disable @typescript-eslint/ban-types */
import { Inject, Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { AuthService } from '../auth.service';

@Injectable()
export class SessionSerializer extends PassportSerializer {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super();
  }

  serializeUser(user: any, done: Function) {
    console.log('Serialize User');
    done(null, user);
  }

  async deserializeUser(payload: any, done: Function) {
    console.log('Deserialize User payload:', payload);
    const user = await this.authService.findUser(payload.id);
    if (user) {
      done(null, user);
    } else {
      done(null, null);
    }
  }
}