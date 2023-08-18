import { Get, Injectable } from '@nestjs/common';
import { ReportType } from 'src/data';
import { ReportService } from 'src/report/report.service';

@Injectable()
export class SummaryService {
   constructor(private readonly reportService:ReportService){

   }
    calculateSummary(){
      const allExpense=this.reportService.getAllReports(ReportType.EXPENSE).reduce(
        (sum,report)=>sum+report.amount ,0)
      
      const allIncome=this.reportService.getAllReports(ReportType.INCOME).reduce(
        (sum,report)=>sum+report.amount,0)
      

  
        return {
            totalincome:allExpense,
            totalexpense:allIncome,
            netincome:allIncome-allExpense
        }
    }
}
