import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { Model } from "./Mode";

@Entity()
export class User extends Model {
  @Column()
  email: string;

  @Column()
  password: string;
}
