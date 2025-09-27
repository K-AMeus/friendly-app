import { Group } from '../groups/entities/group.entity';
import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {}

  async onApplicationBootstrap() {
    await this.seedGroups();
  }

  private async seedGroups() {
    const defaultGroups = [
      { name: '🧑‍🧑‍🧒‍🧒 Family', userId: undefined },
      { name: '👫 Friends', userId: undefined },
      { name: '🎓 School', userId: undefined },
      { name: '💼 Work', userId: undefined },
    ];

    for (const groupData of defaultGroups) {
      const existingGroup = await this.groupRepository.findOne({
        where: { name: groupData.name, userId: undefined },
      });

      if (!existingGroup) {
        const group = this.groupRepository.create(groupData);
        await this.groupRepository.save(group);
      }
    }
  }

  async run() {
    await this.seedGroups();
  }
}
