import { Controller, Get, Body, Patch, Param, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { ErrorHelper, HttpResponse } from 'src/utils';
import { AuthGuard } from 'src/guards/auth.guard';
import { IUser, User } from 'src/decorators';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('profile')
  async findOne(@User() user: IUser) {
    const userData = await this.userService.findOne(user.id);

    return HttpResponse.success({
      data: userData,
      message: 'User record retrieved successfully',
    });
  }
}
