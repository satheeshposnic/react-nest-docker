import { ApiProperty } from '@nestjs/swagger';

export class SaleDto {
  @ApiProperty({
    description: 'Timestamp of the sale',
    example: '2025-02-17T10:00:00.000Z',
  })
  readonly time: Date;

  @ApiProperty({
    description: 'Description of the sale',
    example: 'Sale of office supplies',
  })
  readonly description: string;

  @ApiProperty({
    description: 'List of items in the sale',
    type: [Object],
    example: [
      {
        name: 'Pen',
        quantity: 5,
        total: 15.5,
      },
      {
        name: 'Notebook',
        quantity: 3,
        total: 30.0,
      },
    ],
  })
  readonly items: {
    name: string;
    quantity: number;
    total: number;
  }[];

  @ApiProperty({
    description: 'Total sale amount',
    example: 45.5,
  })
  readonly total: number;
}
