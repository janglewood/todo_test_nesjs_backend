import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { IsEmail, Length } from 'class-validator';

@Entity()
export class Users {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @IsEmail()
  @Column()
  email: string;

  @Column()
  description: string;

  @Column()
  username: string;

  @Length(8, 8)
  @Column()
  password: string;

  @Column()
  role: string;
};
