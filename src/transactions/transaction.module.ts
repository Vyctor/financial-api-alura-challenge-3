import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Transaction } from './transaction.entity';
import { ImportModule } from '../imports/imports.module';

@Module({
  controllers: [TransactionController],
  providers: [TransactionService],
  imports: [SequelizeModule.forFeature([Transaction]), ImportModule],
})
export class TransactionModule {}
