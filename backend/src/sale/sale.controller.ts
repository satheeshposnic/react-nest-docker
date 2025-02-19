import { Controller, Get, Post, Body, Param, Delete, Put, Patch, Query, UseGuards } from '@nestjs/common';
import { SaleService } from './sale.service';
import { SaleDto } from './dto/sale.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery, ApiBearerAuth } from '@nestjs/swagger';
import { Sale } from './schema/sale.schema';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Sales') // Grouping all sale-related routes under 'Sales' in Swagger UI
@Controller('sales')
export class SaleController {
  constructor(private readonly saleService: SaleService) { }

  @Get()
  @UseGuards(JwtAuthGuard) // Protect all routes
  @ApiOperation({ summary: 'Get all sales with pagination and search' })
  @ApiQuery({ name: 'page', required: false, type: Number, description: 'Page number for pagination', example: 1 })
  @ApiQuery({ name: 'perPage', required: false, type: Number, description: 'Number of records per page', example: 10 })
  @ApiQuery({ name: 'search', required: false, type: String, description: 'Search term to filter results' })
  @ApiResponse({ status: 200, description: 'Successfully fetched sales' })
  @ApiBearerAuth()  // Add @ApiBearerAuth to this route as well
  async getSales(
    @Query('page') page = 1,
    @Query('perPage') perPage = 10,
    @Query('search') search = '',
  ) {
    try {
      return await this.saleService.getAllSales(page, perPage, search);
    } catch (error) {
      throw new Error(`Error fetching sales: ${error.message}`);
    }
  }

  @Post()
  @UseGuards(JwtAuthGuard) // Protect all routes
  @ApiOperation({ summary: 'Create a new sale' })
  @ApiResponse({ status: 201, description: 'Sale created successfully', type: SaleDto })  // Use SaleDto here instead of Sale
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiBearerAuth()  // Add @ApiBearerAuth to this route as well
  async createSale(@Body() saleData: SaleDto) {
    try {
      return await this.saleService.createSale(saleData);
    } catch (error) {
      throw new Error(`Error creating sale: ${error.message}`);
    }
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard) // Protect all routes
  @ApiOperation({ summary: 'Get a single sale by ID' })
  @ApiResponse({ status: 200, description: 'Successfully fetched the sale', type: SaleDto })  // Use SaleDto here instead of Sale
  @ApiResponse({ status: 404, description: 'Sale not found' })
  @ApiBearerAuth()  // Add @ApiBearerAuth to this route as well
  async getOneSale(@Param('id') id: string) {
    try {
      return await this.saleService.getOneSale(id);
    } catch (error) {
      throw new Error(`Error fetching sale with ID ${id}: ${error.message}`);
    }
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard) // Protect all routes
  @ApiOperation({ summary: 'Update a sale by ID' })
  @ApiResponse({ status: 200, description: 'Sale updated successfully', type: SaleDto })  // Use SaleDto here instead of Sale
  @ApiResponse({ status: 404, description: 'Sale not found' })
  @ApiBearerAuth()  // Add @ApiBearerAuth to this route as well
  async updateSale(@Param('id') id: string, @Body() saleData: SaleDto) {
    try {
      return await this.saleService.updateSale(id, saleData);
    } catch (error) {
      throw new Error(`Error updating sale with ID ${id}: ${error.message}`);
    }
  }

  // @Patch(':id')
  // @UseGuards(JwtAuthGuard) // Protect route with authentication
  // @ApiOperation({ summary: 'Partially update a sale by ID' })
  // @ApiResponse({ status: 200, description: 'Sale updated successfully', type: SaleDto })
  // @ApiResponse({ status: 404, description: 'Sale not found' })
  // @ApiBearerAuth()
  // async updatePartialSale(@Param('id') id: string, @Body() saleData: SaleDto) {
  //   try {
  //     return await this.saleService.updatePartialSale(id, saleData);
  //   } catch (error) {
  //     throw new Error(`Error partially updating sale with ID ${id}: ${error.message}`);
  //   }
  // }


  @Delete(':id')
  @UseGuards(JwtAuthGuard) // Protect all routes
  @ApiOperation({ summary: 'Delete a sale by ID' })
  @ApiResponse({ status: 200, description: 'Sale deleted successfully' })
  @ApiResponse({ status: 404, description: 'Sale not found' })
  @ApiBearerAuth()  // Add @ApiBearerAuth to this route as well
  async deleteSale(@Param('id') id: string) {
    try {
      return await this.saleService.deleteSale(id);
    } catch (error) {
      throw new Error(`Error deleting sale with ID ${id}: ${error.message}`);
    }
  }
}
