import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Import } from './import.entity';

@Injectable()
export class ImportService {
  constructor(
    @InjectModel(Import)
    private readonly importModel: typeof Import,
  ) {}

  async create(data: {
    transactions_date: Date;
    transactions_imported: number;
  }): Promise<Import> {
    return this.importModel.create({
      transactions_date: data.transactions_date,
      import_date: new Date(),
      transactions_imported: data.transactions_imported,
    });
  }

  async getAll(): Promise<Import[]> {
    return this.importModel.findAll();
  }
}
