import {Model, Table, Column, IsEmail, AllowNull} from "sequelize-typescript";

@Table
class User extends Model<User>{

    @Column
    username: string;
    
    @Column
    password: string;

    @IsEmail
    @AllowNull
    @Column
    email: string;

    @AllowNull
    @Column
    roles: string
}

export default User