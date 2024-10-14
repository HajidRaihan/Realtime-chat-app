import { Body, Controller, Get, Param, Patch, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { updateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  getllUser() {
    return this.userService.findAll();
  }

  @Get(":id")
  getUserById(@Req() req: Request) {
    return this.userService.findById(req.params.id);
  }

  @Patch("bio/:id")
  updateBio(@Req() req: Request) {
    return this.userService.updateBioUser(req.params.id, req.body.bio);
  }

  
}
