import {
  Column,
  CreateDateColumn,
  PrimaryColumn,
  JoinColumn,
  ManyToOne,
  Entity,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

import { Category } from './Category';
import { Specification } from './Specification';

@Entity('cars')
class Car {
  @PrimaryColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  daily_rate: number;

  @Column()
  available: boolean;

  @Column()
  license_plate: string;

  @Column()
  fine_amount: number;

  @Column()
  brand: string;

  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  category_id: string;

  @ManyToMany(() => Specification)
  @JoinTable({
    name: 'specifications_cars',
    joinColumns: [{ name: 'car_id' }], // Column of the table 'specifications_car' that belongs the this class 'cars'. [exemple: What's the column of the table specification_cars that belongs the column of the cars? Is car_id of the table specifications_id]
    inverseJoinColumns: [{ name: 'specification_id' }], // Column of the 'specifications_cars' that belongs the class 'specifications',
  })
  specifications: Specification[];

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
      this.available = true;
    }
  }
}

export { Car };
