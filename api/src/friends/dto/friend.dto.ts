export class FriendDto {
  id!: number;
  name!: string;
  streak!: number;
  lastContacted!: Date;
  contactFrequency!: number;
  groupId?: string;
  createdAt!: Date;
}
