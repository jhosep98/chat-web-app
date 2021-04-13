import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAllUsers(@Res() res: Response) {
    const users = await this.userService.getAll();
    res.status(HttpStatus.OK).json({ data: users });
  }

  @Get(':id')
  async getOneUser(@Param('id') id: number, @Res() res: Response) {
    const user = await this.userService.getOne(id);
    res.status(HttpStatus.OK).json({ user });
  }

  @Post()
  async createUser(@Body() userDto: CreateUserDto, @Res() res: Response) {
    const newUser = await this.userService.createOne(userDto);
    res.status(HttpStatus.CREATED).json({
      message: 'User created successfully',
      user: newUser,
    });
  }
}
