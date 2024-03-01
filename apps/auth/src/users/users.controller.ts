import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';

import {
  CreateUserDto,
  Empty,
  FindOneUserDto,
  PaginationDto,
  UpdateUserDto,
  User,
  UserServiceController,
  Users,
} from '@app/common';
import { Observable } from 'rxjs';

@Controller()
export class UsersController implements UserServiceController {
  constructor(private readonly usersService: UsersService) {}
  createUser(
    createUserDto: CreateUserDto,
  ): User | Observable<User> | Promise<User> {
    return this.usersService.create(createUserDto);
  }
  findAllUser(empty: Empty): Users | Observable<Users> | Promise<Users> {
    return this.usersService.findAll();
  }
  findOneUser(
    findOneUserDto: FindOneUserDto,
  ): User | Observable<User> | Promise<User> {
    return this.usersService.findOne(findOneUserDto.id);
  }
  updateUser(
    updateUserDto: UpdateUserDto,
  ): User | Observable<User> | Promise<User> {
    return this.usersService.update(updateUserDto.id, updateUserDto);
  }
  removeUser(
    findOneUserDto: FindOneUserDto,
  ): User | Observable<User> | Promise<User> {
    this.usersService.findOne(findOneUserDto.id);
  }
  queryUsers(
    paginationDtoStream: Observable<PaginationDto>,
  ): Observable<Users> {
    return this.usersService.queryUsers(paginationDtoStream);
  }
}
