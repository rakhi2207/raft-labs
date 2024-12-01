import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'username' })
  userName: string;

  @Column({ name: 'password' })
  password: string;

  @Column({ name: 'is_active' })
  isActive: boolean;

  @Column({
    name: 'created_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @Column({ name: 'created_by', length: 255, default: 'SYSTEM' })
  createdBy: string;
}
