import { CustomRepository } from 'src/custom-repository/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { UserEntity } from './entities/user.entity';

@CustomRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {}
