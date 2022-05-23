import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Transaction } from './transaction.entity';
import { TransactionService } from './transaction.service';
import { ImportService } from '../imports/import.service';

@Controller('transactions')
export class TransactionController {
  constructor(
    private readonly transactionService: TransactionService,
    private readonly importService: ImportService,
  ) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  public async import(@UploadedFile() file: Express.Multer.File) {
    const transactions = Transaction.bufferToTransactions(file);

    return this.transactionService
      .createMany(transactions)
      .then(async (response) => {
        const importRegister = await this.importService.create({
          transactions_date: transactions[0].transaction_date,
          transactions_imported: transactions.length,
        });

        return {
          transactions: response,
          importRegister,
        };
      });
  }
}
