import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { FriendDto } from './dto/friend.dto';
import { Friend } from './entities/friend.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(Friend)
    private readonly friendRepository: Repository<Friend>,
  ) {}

  async create(
    userId: string,
    createFriendDto: CreateFriendDto,
  ): Promise<FriendDto> {
    const friend = this.friendRepository.create(createFriendDto);
    friend.userId = userId;
    const newFriend = await this.friendRepository.save(friend);

    return plainToInstance(FriendDto, newFriend);
  }

  async findAll(userId: string): Promise<FriendDto[]> {
    const friends = await this.friendRepository.findBy({ userId });
    return plainToInstance(FriendDto, friends);
  }

  async findOne(id: number): Promise<FriendDto> {
    const friend = await this.friendRepository.findOneBy({ id });

    if (!friend) {
      throw new NotFoundException(`Friend with ID "${id}" not found.`);
    }

    return plainToInstance(FriendDto, friend);
  }

  async update(id: number, updateFriendDto: UpdateFriendDto) {
    const friendToUpdate = await this.friendRepository.findOneBy({ id });

    if (!friendToUpdate) {
      throw new NotFoundException(`Friend with ID "${id}" not found.`);
    }

    const friend = Object.assign(friendToUpdate, updateFriendDto);
    const saved = await this.friendRepository.save(friend);

    return plainToInstance(FriendDto, saved);
  }

  async remove(id: number) {
    const friendToDelete = await this.friendRepository.findOneBy({ id });

    if (!friendToDelete) {
      throw new NotFoundException(`Friend with ID "${id}" not found.`);
    }

    await this.friendRepository.delete(friendToDelete);
  }
}
