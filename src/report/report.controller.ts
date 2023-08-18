import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
} from '@nestjs/common/decorators';
import { ParseEnumPipe, ParseUUIDPipe } from '@nestjs/common';
//pipes are netities used to validate incoming data in nest js
//controllers are classes that help us create different end points

import { ReportType, data } from 'src/data';
import {
  CreateReportDto,
  ReportResponse,
  UpdateReportDto,
} from 'src/dtos/report.dto';

import { ReportService } from './report.service';

@Controller('report/:type')
export class ReportController {
  constructor(private readonly reportService: ReportService) {}
  @Get()
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): ReportResponse[] {
    //to extract something from  request we use Pram decorator
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportService.getAllReports(reportType);
  }

  @Get(':id')
  getReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;

    return this.reportService.getReportById(reportType, id);
  }

  @Post()
  createReport(
    @Body()
    { amount, source }: CreateReportDto,
    @Param('type', new ParseEnumPipe(ReportType)) type: ReportType,
  ) {
    return this.reportService.createReport(type, { amount, source });
  }

  @Put(':id')
  updateReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateReportDto,
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportService.updateReport(reportType, id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id', ParseUUIDPipe) id: string) {
    return this.reportService.deleteReport(id);
  }
}
