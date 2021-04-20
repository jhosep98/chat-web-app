import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Response } from 'express';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { USER_CREATED, USER_DELETED, USER_UPDATED } from 'src/config/constants';
import { JwtAuthGuard } from 'src/auth/guards';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers(@Res() res: Response) {
    const users = await this.userService.getAll();
    res.status(HttpStatus.OK).json({ data: users });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOneUser(@Param('id') id: number, @Res() res: Response) {
    const user = await this.userService.getOne(id);
    res.status(HttpStatus.OK).json({ user });
  }

  @Post()
  async createUser(@Body() userDto: CreateUserDto, @Res() res: Response) {
    const newUser = await this.userService.createOne(userDto);
    res.status(HttpStatus.CREATED).json({
      message: USER_CREATED,
      user: newUser,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUser(
    @Body() userDto: EditUserDto,
    @Res() res: Response,
    @Param('id') id: number,
  ) {
    const updatedUser = await this.userService.editOne(id, userDto);
    res.status(HttpStatus.OK).json({
      message: USER_UPDATED,
      user: updatedUser,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(@Param('id') id: number, @Res() res: Response) {
    const deletedUser = await this.userService.deleteOne(id);
    res.status(HttpStatus.OK).json({
      message: USER_DELETED,
      user: deletedUser,
    });
  }
}
