import { IsNotEmpty } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  @IsNotEmpty()
  sbn: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  author: string;

  @Column()
  stock: number;
}
