import { PartialType } from '@nestjs/mapped-types';
import { CreateFriendDto } from './create-friend.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateFriendDto extends PartialType(CreateFriendDto) {
  @IsNotEmpty()
  @IsString()
  readonly name!: string;
}
