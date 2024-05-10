import {
    Table,
    Column,
    Model,
    DataType,
  } from 'sequelize-typescript';
  
  interface TaskCreateAttr {
    name: string,
    text: string,
    photo: string,
    tag: string,
    level: string,
  }

  @Table({tableName: 'Tasks'})
  export class Task extends Model<Task, TaskCreateAttr > {
    static save(task: Promise<Task>): Task | PromiseLike<Task> {
        throw new Error('Method not implemented.');
    }
    @Column({ type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;
  
    @Column( {type: DataType.STRING, allowNull: false} )
    name: string;
  
    @Column( {type: DataType.STRING, allowNull: false} )
    text: string;

    @Column( {type: DataType.BLOB, allowNull: true } )
    photo: string;

    @Column( {type: DataType.STRING, allowNull: true } )
    tag: string;

    @Column( {type: DataType.STRING, allowNull: true } )
    level: 'easy' | 'medium' | 'hard';
  }