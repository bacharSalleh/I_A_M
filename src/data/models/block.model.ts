import { Model, Table, Column, PrimaryKey, AllowNull } from "sequelize-typescript";

@Table({ timestamps: true })
class Block extends Model<Block> {
  @PrimaryKey
  @Column
  jti: string;

  @AllowNull
  @Column
  from: Date;

  @AllowNull
  @Column
  to: Date;

  
  @Column
  forEver: boolean;
}

export default Block;
