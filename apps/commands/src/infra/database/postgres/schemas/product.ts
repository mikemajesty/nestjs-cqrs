import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  Relation,
  UpdateDateColumn
} from 'typeorm';
import { ReviewSchema } from './review';

@Entity({ name: 'products' })
export class ProductSchema extends BaseEntity {
  @Column({ type: 'uuid', primary: true })
  id!: string;

  @Column('text')
  imageUrl!: string;

  @Column('text')
  name!: string;

  @Column('text')
  description!: string;

  @Column('decimal')
  value!: number

  @OneToMany(() => ReviewSchema, (review) => review.product, { cascade: true, onDelete: 'CASCADE' })
  reviews!: Relation<ReviewSchema[]>;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn({ nullable: true })
  deletedAt!: Date;
}
