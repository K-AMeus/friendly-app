import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFriendDto {
  @IsNotEmpty()
  @IsString()
  readonly name!: string;

  @IsNotEmpty()
  readonly contactFrequency!: number;

  @IsNotEmpty()
  readonly groupId!: string;
}
