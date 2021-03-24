import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  text: string;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  reviewer: User;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn()
  object: User;
}
