//creating a custom interceptor
import { NestInterceptor, ExecutionContext,CallHandler   } from "@nestjs/common";
import {map} from 'rxjs'
export class customInterceptor implements NestInterceptor{

    intercept(
        
        context:ExecutionContext,handler:CallHandler
    ){
        console.log(" intercepting req")
return handler.handle().pipe(
    map((data)=>{
       const response={
        ...data,
        createdAt:data.created_at
       }
       delete response.created_at
        return response; 
    })
)
    }
}