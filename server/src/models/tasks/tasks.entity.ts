import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { AcademicSubject } from '../subjects/subjects.entity';
import { TaskType } from '../task-type/task-type.entity';
import { Faculty } from "../faculty/faculty.entity";

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => User, (user) => user.id)
  customer: User;

  @ManyToOne(() => User, (user) => user.id)
  executor: User;

  @Column({
    nullable: true,
  })
  customerVkId: number;

  @ManyToOne(() => Faculty, (faculty) => faculty.id)
  faculty: Faculty;

  @ManyToOne(() => Faculty, (faculty) => faculty.id)
  faculty: Faculty;

  @ManyToOne(() => TaskType, (taskType) => taskType.id)
  taskType: TaskType;

  @ManyToOne(() => AcademicSubject, (academicSubject) => academicSubject.id)
  subject: AcademicSubject;

  // @Column()
  // title: string;

  @Column()
  description: string;

  @Column({ default: () => 'now()' })
  creationDate: Date;

  @Column()
  dueDate: Date;

  @Column()
  status: number;

  @Column({
    nullable: true,
  })
  link: string;
}
