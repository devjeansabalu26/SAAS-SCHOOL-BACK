import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Permission } from './permission.entity';

@Entity('roles')
@Index(['tenantId'])
export class Role {

  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  nombre!: string;

  @Column()
  tenantId!: number;

  @ManyToMany(
    () => Permission,
    permission => permission.roles,
  )
  @JoinTable({
    name: 'role_permissions',
  })
  permissions!: Permission[];
}