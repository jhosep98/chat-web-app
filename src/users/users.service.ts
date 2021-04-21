import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  USER,
  USER_ALREADY_REGISTERED,
  USER_NOT_EXISTS,
  USER_PASSWORD,
} from 'src/config/constants';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { EditUserDto } from './dto/edit-user.dto';
import { UserEntity } from './entity/user.entity';

export interface UserFindOne {
  id?: number;
  email?: string;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getAll() {
    return await this.userRepository.find();
  }

  async getOne(id: number, userEntity?: UserEntity) {
    const user = await this.userRepository
      .findOne(id)
      .then((u) =>
        !userEntity ? u : !!u && userEntity.userId === u.userId ? u : null,
      );
    if (!user) throw new NotFoundException(USER_NOT_EXISTS);
    return user;
  }

  async createOne(createUserDto: CreateUserDto) {
    const userExist = await this.userRepository.findOne({
      email: createUserDto.email,
    });
    if (userExist) {
      throw new BadRequestException(USER_ALREADY_REGISTERED);
    }
    const newUser = this.userRepository.create(createUserDto);
    const user = await this.userRepository.save(newUser);

    delete user.password;
    return user;
  }

  async editOne(
    id: number,
    createUserDto: EditUserDto,
    userEntity?: UserEntity,
  ) {
    const user = await this.getOne(id, userEntity);
    const updateUser = Object.assign(user, createUserDto);

    const deletedUser = await this.userRepository.save(updateUser);
    delete deletedUser.password;
    return deletedUser;
  }

  async deleteOne(id: number, userEntity?: UserEntity) {
    const deleteUser = await this.getOne(id, userEntity);
    return await this.userRepository.remove(deleteUser);
  }

  async findByEmail(data: UserFindOne) {
    return await this.userRepository
      .createQueryBuilder(USER)
      .where(data)
      .addSelect(USER_PASSWORD)
      .getOne();
  }
}
