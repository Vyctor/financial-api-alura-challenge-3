import { HttpException, HttpStatus } from '@nestjs/common';
import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'transactions',
})
class Transaction extends Model<Transaction> {
  @Column({ primaryKey: true, type: 'uuid', defaultValue: DataType.UUIDV4 })
  id: string;

  @Column({ type: DataType.STRING, allowNull: false })
  source_bank: string;

  @Column({ type: DataType.STRING, allowNull: false })
  source_bank_agency: string;

  @Column({ type: DataType.STRING, allowNull: false })
  source_bank_account: string;

  @Column({ type: DataType.STRING, allowNull: false })
  destination_bank: string;

  @Column({ type: DataType.STRING, allowNull: false })
  destination_bank_agency: string;

  @Column({ type: DataType.STRING, allowNull: false })
  destination_bank_account: string;

  @Column({ type: DataType.DECIMAL(12, 2), allowNull: false })
  transaction_value: number;

  @Column({ type: DataType.DATE(), allowNull: false })
  transaction_date: Date;

  public static bufferToTransactions(data: Express.Multer.File): Transaction[] {
    const dataToString = data.buffer.toString();

    if (!dataToString || dataToString.length <= 0) {
      throw new HttpException('File is empty', HttpStatus.BAD_REQUEST);
    }

    return dataToString.split('\n').map((line) => {
      const splittedLine = line.split(',');

      const transaction = new Transaction();

      transaction.set({
        source_bank: splittedLine[0],
        source_bank_agency: splittedLine[1],
        source_bank_account: splittedLine[2],
        destination_bank: splittedLine[3],
        destination_bank_agency: splittedLine[4],
        destination_bank_account: splittedLine[5],
        transaction_value: parseFloat(splittedLine[6]),
        transaction_date: new Date(splittedLine[7]),
      });

      return transaction;
    });
  }
}

export { Transaction };
