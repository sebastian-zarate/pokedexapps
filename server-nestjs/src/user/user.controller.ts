import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateUserDto} from '../dto/create-user.dto';
import { UserService } from './user.service';


@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async registerUser(@Body() userDto: CreateUserDto) {
    console.log('funciona');
    return await this.userService.create(userDto);
  }
  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

}