import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Animal {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  age: number;

  @Column()
  type: string;

  @Column()
  livingCountry: string;
}
