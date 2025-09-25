import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { plainToInstance } from 'class-transformer';
import { GroupDto } from './dto/group.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  async create(
    userId: string,
    createGroupDto: CreateGroupDto,
  ): Promise<GroupDto> {
    const group = this.groupRepository.create(createGroupDto);
    group.userId = userId;
    const newGroup = await this.groupRepository.save(group);

    return plainToInstance(GroupDto, newGroup);
  }

  async findAll(userId: string): Promise<GroupDto[]> {
    const groups = await this.groupRepository
      .createQueryBuilder('group')
      .where('group.userId = :userId OR group.userId IS NULL', { userId })
      .orderBy('group.name', 'ASC')
      .getMany();
    return plainToInstance(GroupDto, groups);
  }

  async findOne(userId: string, id: string): Promise<GroupDto> {
    const group = await this.groupRepository.findOneBy({ id, userId });
    return plainToInstance(GroupDto, group);
  }

  async update(userId: string, id: string, updateGroupDto: UpdateGroupDto) {
    const groupToUpdate = await this.groupRepository.findOneBy({ id, userId });

    if (!groupToUpdate) {
      throw new NotFoundException(`Group with ID "${id}" not found.`);
    }

    const group = Object.assign(groupToUpdate, updateGroupDto);
    const saved = await this.groupRepository.save(group);

    return plainToInstance(GroupDto, saved);
  }

  async remove(userId: string, id: string) {
    const groupToRemove = await this.groupRepository.findOneBy({ id, userId });

    if (!groupToRemove) {
      throw new NotFoundException(`Group with ID "${id}" not found.`);
    }

    await this.groupRepository.delete(groupToRemove);
    return plainToInstance(GroupDto, groupToRemove);
  }
}
