import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'username' })
  name: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'password_hash' })
  password: string;
}
