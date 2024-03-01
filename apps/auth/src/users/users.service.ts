import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';

import { CreateUserDto, UpdateUserDto, User, Users } from '@app/common';
import { randomUUID } from 'crypto';

@Injectable()
export class UsersService implements OnModuleInit {
  private readonly user: User[] = [];

  onModuleInit() {
    for (let i = 0; i <= 100; i++) {
      this.create({
        username: randomUUID(),
        password: randomUUID(),
        age: 0,
      });
    }
  }

  create(createUserDto: CreateUserDto): User {
    const user: User = {
      ...createUserDto,
      subscribed: false,
      socialMedia: {},
      id: randomUUID(),
    };

    this.user.push(user);
    return user;
  }

  findAll(): Users {
    return {
      users: this.user,
    };
  }

  findOne(id: string): User {
    return this.user.find((user) => user.id === id);
  }

  update(id: string, updateUserDto: UpdateUserDto): User {
    const userIndex = this.user.findIndex((user) => user.id === id);
    if (userIndex !== -1) {
      this.user[userIndex] = {
        ...this.user[userIndex],
        ...updateUserDto,
      };
      return this.user[userIndex];
    }
    throw new NotFoundException(`User not found by id: ${id}`);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
