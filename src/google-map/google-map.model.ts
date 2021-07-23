import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Store {
  @PrimaryGeneratedColumn()
  public id!: string;

  @Column()
  public name!: string;

  @Column()
  public lan!: string;

  @Column()
  public log!: string;

  @Column()
  public businessType!: 'mfg' | 'sales' | 'dealership';
}
