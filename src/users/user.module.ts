import {
    Table,
    Column,
    Model,
    DataType,
  } from 'sequelize-typescript';
  
  interface UserCreationAttr {
    email: string,
    password: string
  }

  @Table({tableName: 'users'})
  export class User extends Model<User, UserCreationAttr > {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
  
    @Column( {type: DataType.STRING, unique: true, allowNull: false} )
    email: string;
  
    @Column( {type: DataType.STRING, allowNull: false} )
    password: string;

    @Column( {type: DataType.STRING, defaultValue: 'user' } )
    role: string;
  }