import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { Model } from 'mongoose';
import { UserEntity, UserDocument } from './entities/user.entity';
import { SignUpDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserEntity.name)
    private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  /**
   * Signup api
   * @param payload signup payload
   * @returns
   */
  async signUp(payload: SignUpDto): Promise<{ token: string }> {
    const { name, email, password } = payload;
    const hashedPass = await bcrypt.hash(password, 10);

    // if user exist with the given email
    const isUserExist = await this.userModel.findOne({ email });

    if (isUserExist) {
      throw new BadRequestException(
        'This Email Already Used try with another email!',
      );
    }

    // create new user
    const user = await this.userModel.create({
      name,
      email,
      password: hashedPass,
    });

    // make token with and return
    const token = this.jwtService.sign({
      id: user._id,
      email: user?.email,
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
    const isUserExist = await this.userModel.findOne({ email });

    // if user is not exist
    if (!isUserExist) {
      throw new UnauthorizedException('Email is not correct!');
    }

    // check is password matched
    const isMatchedPass = bcrypt.compare(password, isUserExist.password);

    // if password is incorrect
    if (!isMatchedPass) {
      throw new UnauthorizedException('You entered wrong password!');
    }

    // make token and return
    const token = this.jwtService.sign({
      id: isUserExist._id,
      email: isUserExist?.email,
    });

    return { token };
  }
}
