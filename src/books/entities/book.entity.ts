import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class Book {
  @PrimaryColumn()
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
