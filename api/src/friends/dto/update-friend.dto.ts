import { PartialType } from '@nestjs/mapped-types';
import { CreateFriendDto } from './create-friend.dto';

export class UpdateFriendDto extends PartialType(CreateFriendDto) {
  readonly name!: string;

  readonly contactFrequency!: number;

  readonly groupId!: string;
}
