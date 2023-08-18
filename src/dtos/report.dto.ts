//dtos are used to validate body coming and going out in nest js
import {IsNumber,IsPositive,IsNotEmpty,IsString,IsOptional} from 'class-validator'
import { ReportType } from 'src/data';
import { Exclude,Expose } from 'class-transformer';
export class CreateReportDto{
  @IsNumber()
  @IsPositive()
    amount:number;
 @IsString()
 @IsNotEmpty()
    source:string;
}

export class UpdateReportDto{
    @IsNumber()
    @IsPositive()
    @IsOptional()
      amount:number;
   @IsString()
   @IsNotEmpty()
   @IsOptional()
      source:string;
  }

  export class ReportResponse{
    id:string;
    source:string;
    amount:number;
    @Exclude()
    created_at:Date;

    @Exclude()
    updated_at:Date;
    type:ReportType
   
    @Expose({name:"datecrated"})
         getdate(){
            return this.created_at
         }
    
   
    constructor(partial: Partial<ReportResponse>){
Object.assign(this,partial)
    }
  }