import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductEntity } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(ProductEntity)
    private productModel: Repository<ProductEntity>,
  ) {}

  async create(payload: CreateProductDto): Promise<{ description: string }> {
    const product: ProductEntity = new ProductEntity();
    product.name = payload?.name;
    product.description = payload?.description;
    product.category = payload?.category;
    product.price = payload?.price;
    product.updatedAt = payload?.updatedAt;
    product.createdAt = payload?.createdAt;

    const productCreated = await this.productModel.save(product);

    return { description: productCreated?.description };
  }

  findAll() {
    return this.productModel.find();
  }

  findOne(id: number) {
    return this.productModel.findOneBy({ id });
  }

  async update(id: number, payload: UpdateProductDto) {
    const product = await this.productModel.findOneBy({ id });
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return this.productModel.update(id, payload);
  }

  async remove(id: number) {
    const res = await this.productModel.delete(id);

    if (res.affected === 0) {
      throw new NotFoundException('User not found');
    } else {
      return { message: 'Product deleted successfully!' };
    }
  }
}
