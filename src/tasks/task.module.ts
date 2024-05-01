import {
    Table,
    Column,
    Model,
    DataType,
  } from 'sequelize-typescript';
  
  interface TaskCreateAttr {
    name: string,
    text: string,
    photo?: string
  }

  @Table({tableName: 'Tasks'})
  export class Task extends Model<Task, TaskCreateAttr > {
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
  
    @Column( {type: DataType.STRING, allowNull: false} )
    name: string;
  
    @Column( {type: DataType.STRING, allowNull: false} )
    text: string;

    @Column( {type: DataType.STRING, allowNull: true } )
    photo: string;
  }