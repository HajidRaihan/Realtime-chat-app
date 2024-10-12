import { Controller, Get, Post, UseGuards, Req } from '@nestjs/common';
import { Request } from 'express';
import { GoogleAuthGuard } from './utils/Guard';
@Controller('auth')
export class AuthController {
  @Get('google/login')
  @UseGuards(GoogleAuthGuard)
  handleLogin() {
    return { msg: 'google auth' };
  }

  @Get('google/redirect')
  @UseGuards(GoogleAuthGuard)
  handleRedirect() {
    return { msg: 'ok' };
  }

  @Get('status')
  user(@Req() request: Request) {
    console.log("ini status")
    console.log("user auth", request.user)
    if(request.user){
      return {msg: 'Authenticated'}
    } else{
      return {msg: "Not Authenticated"}
    }
  }
}
