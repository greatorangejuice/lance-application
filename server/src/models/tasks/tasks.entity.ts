import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.id)
  customer: User;

  @ManyToOne(() => User, (user) => user.id)
  executor: User;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: () => 'now()' })
  creationDate: Date;

  @Column()
  dueDate: Date;

  @Column({ default: false })
  status: boolean;

  @Column({
    nullable: true,
  })
  link: string;
}
