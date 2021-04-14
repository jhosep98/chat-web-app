import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
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

  async getOne(id: number) {
    const user = await this.userRepository.findOne(id);
    if (!user) throw new NotFoundException('User does not exists');
    return user;
  }

  async createOne(createUserDto: CreateUserDto) {
    const userExist = await this.userRepository.findOne({
      email: createUserDto.email,
    });
    if (userExist) {
      throw new BadRequestException('User already registered with email');
    }
    const newUser = this.userRepository.create(createUserDto);
    const user = await this.userRepository.save(newUser);

    delete user.password;
    return user;
  }

  async editOne(id: number, createUserDto: EditUserDto) {
    const user = await this.getOne(id);
    const updateUser = Object.assign(user, createUserDto);

    const deletedUser = await this.userRepository.save(updateUser);
    delete deletedUser.password;
    return deletedUser;
  }

  async deleteOne(id: number) {
    const deleteUser = await this.getOne(id);
    return await this.userRepository.remove(deleteUser);
  }

  async findByEmail(data: UserFindOne) {
    return await this.userRepository
      .createQueryBuilder('user')
      .where(data)
      .addSelect('user.password')
      .getOne();
  }
}
