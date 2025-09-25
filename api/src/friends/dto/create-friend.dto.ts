import { IsNotEmpty, IsString, IsOptional, IsNumber } from 'class-validator';

export class CreateFriendDto {
  @IsNotEmpty()
  @IsString()
  readonly name!: string;

  @IsNotEmpty()
  @IsNumber()
  readonly contactFrequency!: number;

  @IsOptional()
  @IsString()
  readonly groupId?: string;
}
