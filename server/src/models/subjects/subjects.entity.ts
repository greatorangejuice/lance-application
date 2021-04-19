import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AcademicSubject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  tag: string;
}
