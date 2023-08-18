import { Module } from '@nestjs/common';
import { SummaryController } from './summary.controller';
import { SummaryService } from './summary.service';
import { ReportService } from 'src/report/report.service';
import { ReportModule } from 'src/report/report.module';
@Module({
  imports:[ReportModule],//we get controller,services everything og report module in this module
  controllers: [SummaryController],
  providers: [SummaryService]
})
export class SummaryModule {}
