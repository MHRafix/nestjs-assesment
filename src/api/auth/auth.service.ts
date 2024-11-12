import { JwtService } from '@nestjs/jwt';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { UserEntity } from './entities/user.entity';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userModel: Repository<UserEntity>, // private jwtService: JwtService,
    private jwtService: JwtService,
  ) {}

  /**
   * Signup api
   * @param payload signup payload
   * @returns
   */

  async signUp(payload: SignUpDto): Promise<{ token }> {
    const { email, password } = payload; // destructure payload
    const hashedPass = await bcrypt.hash(password, 10); // password hash by bcrypt

    // if user exist with the given email
    const isUserExist = await this.userModel.findOneBy({ email });

    // throw en exception
    if (isUserExist) {
      throw new BadRequestException(
        'This Email Already Used try with another email!',
      );
    }

    // user object
    const user: UserEntity = new UserEntity();
    user.name = payload.name;
    user.email = payload.email;
    user.password = hashedPass;

    // save to db
    const createdUser = await this.userModel.save(user);

    // create token and return
    const token = this.jwtService.sign({
      email: createdUser?.email,
    });

    return { token };
  }

  /**
   * Signin api
   * @param payload - signin payload
   * @returns
   */
  async signIn(payload: SignInDto): Promise<{ token: string }> {
    const { email, password } = payload;

    // check is user exist
    const isUserExist = await this.userModel.findOneBy({ email });

    // if user is not exist
    if (!isUserExist) {
      throw new UnauthorizedException('Incorrect credential!');
    }

    // check is password matched
    const isMatchedPass = bcrypt.compare(password, isUserExist?.password);

    // if password is incorrect
    if (!isMatchedPass) {
      throw new UnauthorizedException('Incorrect credential!');
    }

    // make token and return
    const token = this.jwtService.sign({
      email: isUserExist?.email,
    });

    return { token };
  }
}
