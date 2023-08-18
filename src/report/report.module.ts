import { Module } from '@nestjs/common';
import { ReportController } from './report.controller';
import { ReportService } from './report.service';

@Module({
  controllers: [ReportController],
  providers: [ReportService],
  //exports is used to export module to other module
  exports:[ReportService]
})
export class ReportModule {}
