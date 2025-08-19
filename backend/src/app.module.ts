import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductionOrdersModule } from './production-orders/production-orders.module';

@Module({
  imports: [ProductionOrdersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
