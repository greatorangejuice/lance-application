import {
  Column,
  Entity,
  Index,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNotEmpty, IsEmail } from 'class-validator';
import { Role } from '../roles/user-roles.entity';
import { Review } from '../reviews/review.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ fulltext: true })
  @Column('varchar', {
    nullable: false,
  })
  @IsNotEmpty()
  firstname: string;

  @Index({ fulltext: true })
  @Column('varchar', {
    nullable: false,
  })
  @IsNotEmpty()
  lastname: string;

  @Column({
    nullable: true,
    select: false,
  })
  password: string;

  @Index({ fulltext: true })
  @Column('varchar', {
    nullable: false,
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ManyToMany(() => Role, (role) => role.members)
  roles: Role[];
}
