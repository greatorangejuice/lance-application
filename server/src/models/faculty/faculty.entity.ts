import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { University } from "../university/university.entity";

@Entity()
export class Faculty {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @ManyToOne(() => University, (university) => university.id)
    university: University;
}
