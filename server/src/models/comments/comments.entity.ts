import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Animal } from '../animals/animal.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Animal, (animal) => animal.id)
  animal: Animal;

  @Column()
  text: string;

  @Column()
  email: string;
}
