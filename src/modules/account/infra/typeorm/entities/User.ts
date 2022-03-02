import { Expose } from 'class-transformer';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';
import { v4 as uuidV4 } from 'uuid';

@Entity('users')
class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column()
  email: string;

  @Column()
  driver_license: string;

  @Column({
    default: false,
  })
  isAdmin: boolean;

  @Expose({ name: 'avatar_url' })
  avatar_url(): string {
    switch (process.env.DISK_STORAGE) {
      case 'local':
        return `${process.env.APP_API_URL}/avatar/${this.avatar}`;
      case 's3':
        return `${process.env.AWS_BUCKET_URL}/avatar/${this.avatar}`;
      default:
        null;
    }
  }

  @Column({
    nullable: true,
  })
  avatar: string;

  @CreateDateColumn()
  created_at: Date;
  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}
export { User };
