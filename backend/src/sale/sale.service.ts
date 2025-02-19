import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Sale } from './schema/sale.schema'; // Changed from Student to Sale
import { SaleDto } from './dto/sale.dto'; // Changed from StudentDto to SaleDto

@Injectable()
export class SaleService {
  constructor(@InjectModel('Sale') private saleModel: Model<Sale>) { }

  // Retrieve all sale details with pagination and search
  // Fetch all sales with pagination and search
  async getAllSales(page: number, perPage: number, search: string): Promise<{ sales: Sale[]; total: number }> {
    try {
      const skip = (page - 1) * perPage;  // Calculate skip value for pagination

      const query = search ? {
        $or: [
          { description: { $regex: search, $options: 'i' } }
        ]
      } : {}; // If no search term, just fetch all sales

      // Fetch sales data with pagination and dynamic perPage
      const sales = await this.saleModel.find(query).skip(skip).limit(perPage).exec();

      // Get total count of sales matching the search criteria
      const total = await this.saleModel.countDocuments(query);

      return { sales, total };
    } catch (error) {
      throw new Error('Error finding sales: ' + error.message);
    }
  }

  // Create a new sale record
  async createSale(saleData: SaleDto): Promise<Sale> {
    const sale = new this.saleModel(saleData);
    return sale.save();  // Save to the database
  }

  // Update sale record by their MongoDB ObjectId
  async updateSale(id: string, saleData: SaleDto): Promise<Sale | null> {
    try {
      const objectId = new Types.ObjectId(id);  // Convert id to ObjectId
      const updatedSale = await this.saleModel
        .findByIdAndUpdate(objectId, saleData, { new: true })  // Find by id and update
        .exec();
      return updatedSale;  // Return the updated sale record
    } catch (error) {
      throw new Error('Error updating sale: ' + error.message);
    }
  }

  // async updatePartialSale(id: string, saleData: SaleDto): Promise<Sale | null> {
  //   try {
  //     return await this.saleModel.findByIdAndUpdate(id, saleData, { new: true });
  //   } catch (error) {
  //     throw new Error(`Error updating sale partially: ${error.message}`);
  //   }
  // }


  // Retrieve a sale by their MongoDB ObjectId
  async getOneSale(id: string): Promise<Sale | null> {
    try {
      const objectId = new Types.ObjectId(id);  // Convert string id to ObjectId
      return await this.saleModel.findById(objectId).exec(); // Using ObjectId
    } catch (error) {
      throw new Error('Error finding sale: ' + error.message);
    }
  }

  // Delete sale by their MongoDB ObjectId
  async deleteSale(id: string): Promise<Sale | null> {
    try {
      const objectId = new Types.ObjectId(id);  // Convert string id to ObjectId
      return await this.saleModel.findByIdAndDelete(id).exec(); // Using ObjectId
    } catch (error) {
      throw new Error('Error deleting sale: ' + error.message);
    }
  }
}
