import {
  Controller,
  Get,
  UseGuards,
  Put,
  Body,
  Req,
  Param,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  getProfile(@Req() req) {
    return { message: 'User Profile', user: req.user };
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  getUserById(@Param('id') id: string) {
    return this.userService.getUserById(id);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  updateUser(@Param('id') id: string, @Body() body: any) {
    return this.userService.updateUser(id, body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  deleteUser(@Param('id') id: string) {
    return this.userService.deleteUser(id);
  }
}
