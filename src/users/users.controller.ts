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
import {
  ACGuard,
  InjectRolesBuilder,
  RolesBuilder,
  UseRoles,
} from 'nest-access-control';
import { AppResource, AppRoles } from 'src/app.roles';
import { User } from 'src/decorators';
import { UserEntity } from './entity/user.entity';
import { UserRegistrationDto } from './dto/user-registration.dto';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService,
    @InjectRolesBuilder()
    private readonly rolesBuilder: RolesBuilder,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllUsers(@Res() res: Response) {
    const users = await this.userService.getAll();
    res.status(HttpStatus.OK).json({ data: users });
  }

  @Post('register')
  async publicRegistration(
    @Body() userDto: UserRegistrationDto,
    @Res() res: Response,
  ) {
    const data = await this.userService.createOne({
      ...userDto,
      roles: [AppRoles.CONTACT],
    });
    res.status(HttpStatus.CREATED).json({
      message: 'User registered',
      data,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getOneUser(@Param('id') id: number, @Res() res: Response) {
    const user = await this.userService.getOne(id);
    res.status(HttpStatus.OK).json({ user });
  }

  @UseGuards(ACGuard)
  @UseRoles({
    possession: 'any',
    action: 'create',
    resource: AppResource.USER,
  })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createUser(@Body() userDto: CreateUserDto, @Res() res: Response) {
    const newUser = await this.userService.createOne(userDto);
    res.status(HttpStatus.CREATED).json({
      message: USER_CREATED,
      user: newUser,
    });
  }

  @UseGuards(ACGuard)
  @UseRoles({
    possession: 'own',
    action: 'update',
    resource: AppResource.USER,
  })
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updateUser(
    @Body() userDto: EditUserDto,
    @User() user: UserEntity,
    @Res() res: Response,
    @Param('id') id: number,
  ) {
    let updatedUser;
    if (this.rolesBuilder.can(user.roles).updateAny(AppResource.USER).granted) {
      // Admin
      updatedUser = await this.userService.editOne(id, userDto);
    } else {
      // Contact
      const { roles, ...rest } = userDto;
      updatedUser = await this.userService.editOne(id, rest, user);
    }
    res.status(HttpStatus.OK).json({
      message: USER_UPDATED,
      user: updatedUser,
    });
  }

  @UseGuards(ACGuard)
  @UseRoles({
    possession: 'own',
    action: 'delete',
    resource: AppResource.USER,
  })
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteUser(
    @Param('id') id: number,
    @User() user: UserEntity,
    @Res() res: Response,
  ) {
    let deletedUser;
    if (this.rolesBuilder.can(user.roles).updateAny(AppResource.USER).granted) {
      // Admin
      deletedUser = await this.userService.deleteOne(id);
    } else {
      // Contact
      deletedUser = await this.userService.deleteOne(id, user);
    }
    res.status(HttpStatus.OK).json({
      message: USER_DELETED,
      user: deletedUser,
    });
  }
}
