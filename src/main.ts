//this file is where application is being booted
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';//root module
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(//we have to enable global pipes for dtos to work on body validation
new ValidationPipe({
  whitelist:true,//allows only vlid entities,source,amount to enter, no extra entities allowed
  //looks at dtos and any additional  property is removed
  transform:true,
  transformOptions:{
    enableImplicitConversion:true,  
  }
})
  )
  await app.listen(3000);
}
bootstrap();
