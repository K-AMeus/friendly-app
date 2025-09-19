import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Friend {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column('uuid')
  userId!: string;

  @Column()
  firstName!: string;

  @Column()
  lastName!: string;

  @Column('uuid')
  reminderId!: string;
}
