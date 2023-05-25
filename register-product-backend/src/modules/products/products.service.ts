import { Inject, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entity/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCTS_REPOSITORY')
    private productRepository: typeof Product,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return await this.productRepository.create({ ...createProductDto });
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.findAll<Product>();
  }

  async findOne(id: number): Promise<Product> {
    return await this.productRepository.findByPk<Product>(id);
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<[affectedCount: number]> {
    return await this.productRepository.update(updateProductDto, {
      where: {
        id,
      },
    });
  }

  async remove(id: number): Promise<number> {
    return await this.productRepository.destroy({
      where: {
        id,
      },
    });
  }
}
