import { Controller, Get } from '@nestjs/common';
import { UseGuards } from '@nestjs/common/decorators/core';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { GoogleAuthGuard } from './auth/utils/Guard';
import { AuthenticatedGuard } from './common/AuthenticateGuard';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseGuards(AuthenticatedGuard)
  getHello(): string {
    return this.appService.getHello();
  }
}
