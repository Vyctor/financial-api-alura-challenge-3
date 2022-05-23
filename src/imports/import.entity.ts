import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'imports',
})
class Import extends Model<Import> {
  @Column({ primaryKey: true, type: 'uuid', defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({ type: DataType.DATE(), allowNull: false })
  transactions_date: Date;

  @Column({ type: DataType.DATE(), allowNull: false })
  import_date: Date;

  @Column({ type: DataType.INTEGER, allowNull: false })
  transactions_imported: number;
}

export { Import };
