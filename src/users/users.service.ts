import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entity/user.entity';

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
}
