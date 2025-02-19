import { Module } from '@nestjs/common'; 
import { MongooseModule } from '@nestjs/mongoose';
import { SaleController } from './sale.controller'; // Changed to SaleController
import { SaleService } from './sale.service'; // Changed to SaleService
import { SaleSchema } from './schema/sale.schema'; // Changed to SaleSchema
import { AuthModule } from '../auth/auth.module'; // 👈 Import AuthModule

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Sale', schema: SaleSchema }]), AuthModule], // Changed to Sale model
  controllers: [SaleController], // Changed to SaleController
  providers: [SaleService], // Changed to SaleService
})
export class SaleModule {} // Changed to SaleModule
