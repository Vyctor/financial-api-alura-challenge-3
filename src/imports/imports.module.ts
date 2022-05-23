import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Import } from './import.entity';
import { ImportService } from './import.service';
import { ImportController } from './import.controller';

@Module({
  controllers: [ImportController],
  providers: [ImportService],
  imports: [SequelizeModule.forFeature([Import])],
  exports: [ImportService],
})
export class ImportModule {}
