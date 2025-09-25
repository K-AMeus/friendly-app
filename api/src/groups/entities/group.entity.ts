import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('uuid', { nullable: true })
  userId?: string;

  @Column()
  name!: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt!: Date;
}
