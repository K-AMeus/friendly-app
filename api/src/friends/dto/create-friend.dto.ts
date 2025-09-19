import { IsNotEmpty, IsString } from 'class-validator';

export class CreateFriendDto {
  @IsNotEmpty()
  @IsString()
  readonly firstName!: string;
  readonly lastName!: string;
}
