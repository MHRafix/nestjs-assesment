import { CustomRepository } from 'src/custom-repository/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { ProductEntity } from './entities/product.entity';

@CustomRepository(ProductEntity)
export class ProductRepository extends Repository<ProductEntity> {}
