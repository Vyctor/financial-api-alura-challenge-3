import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { endOfDay, format, startOfDay } from 'date-fns';
import { Transaction } from './transaction.entity';
import { Op } from 'sequelize';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel(Transaction)
    private readonly transactionModel: typeof Transaction,
  ) {}

  async createMany(transactions: Transaction[]) {
    const firstTransactionDate = transactions[0].transaction_date;

    const alreadyExistsTransactionsInThisDate =
      await this.findTransactionByDate(firstTransactionDate);

    if (alreadyExistsTransactionsInThisDate) {
      throw new HttpException(
        'Transactions already exists in this date',
        HttpStatus.FORBIDDEN,
      );
    }

    const formattedFirstTransactionDate = format(
      firstTransactionDate,
      'yyyy-MM-dd',
    );

    const sameDateTransactions = transactions.filter((transaction) => {
      return (
        formattedFirstTransactionDate ===
        format(transaction.transaction_date, 'yyyy-MM-dd')
      );
    });

    await Promise.all(
      sameDateTransactions.map((transaction) => transaction.save()),
    );
    return sameDateTransactions;
  }

  async findTransactionByDate(date: Date) {
    const startDate = startOfDay(date);
    const endDate = endOfDay(date);
    const alreadyExistsTransactionsInThisDate =
      await this.transactionModel.findOne({
        where: { transaction_date: { [Op.between]: [startDate, endDate] } },
      });

    return !!alreadyExistsTransactionsInThisDate;
  }
}
