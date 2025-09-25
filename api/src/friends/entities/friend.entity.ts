import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Friend {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('uuid')
  userId!: string;

  @Column()
  name!: string;

  @Column()
  streak: number = 0;

  @Column({ type: 'timestamptz' })
  lastContacted!: Date;

  @Column()
  contactFrequency!: number;

  @Column('uuid', { nullable: true })
  groupId?: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;
}
