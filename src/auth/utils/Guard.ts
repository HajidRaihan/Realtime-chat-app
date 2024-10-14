import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class GoogleAuthGuard extends AuthGuard('google') implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const activate = (await super.canActivate(context)) as boolean;

    // Start session if the user is authenticated
    const request = context.switchToHttp().getRequest();
    await super.logIn(request);


    return activate;
  }
}