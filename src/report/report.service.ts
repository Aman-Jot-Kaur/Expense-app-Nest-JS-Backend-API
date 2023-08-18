//we write our business logic here
import { Injectable } from '@nestjs/common/decorators';
import { ReportType, data } from 'src/data';
import { v4 as uuid } from 'uuid';
import { ReportResponse } from 'src/dtos/report.dto';
interface ReportData {
  amount: number;
  source: string;
}

interface UpdateReportData {
  amount?: number; // ? means they are optional
  source?: string;
}
@Injectable()
export class ReportService {
  getAllReports(type: ReportType): ReportResponse[] {
    return data.report
      .filter((item) => item.type === type)
      .map((itemrep) => new ReportResponse(itemrep));
  }

  getReportById(type: ReportType, id: string): ReportResponse {
    const report = data.report
      .filter((item) => item.type === type)
      .find((item) => item.id === id);
    if (!report) return;

    return new ReportResponse(report);
  }

  createReport(
    type: ReportType,
    { amount, source }: ReportData,
  ): ReportResponse {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    };
    data.report.push(newReport);
    return new ReportResponse(newReport);
  }

  updateReport(
    type: ReportType,
    id: string,
    body: UpdateReportData,
  ): ReportResponse {
    const reportReturned = data.report
      .filter((item) => item.type === type)
      .find((item) => item.id === id);
    if (!reportReturned) return;
    const index = data.report.findIndex(
      (report) => report.id === reportReturned.id,
    );

    data.report[index] = {
      ...data.report[index],
      ...body,
    };
    return new ReportResponse(reportReturned);
  }
  deleteReport(id: string) {
    const index = data.report.findIndex((report) => report.id === id);
    if (index === -1) return;
    data.report.splice(index, 1);
  }
}
