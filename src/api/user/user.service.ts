import { HttpException, Injectable } from '@nestjs/common';
import { UserDbService } from '../../db/services/user-db.service';
import { CreateUserDto } from '../../common/dto';
import { UserEntity } from '../../common/entities';
import { SecurityService } from '../../shared/services/security.service';

@Injectable()
export class UserService {
  constructor(private readonly userDbService: UserDbService,
              private readonly securityService: SecurityService) {
  }

  async register(createUserDto: CreateUserDto): Promise<UserEntity> {
    const userWithSameEmail: UserEntity | null = await this.userDbService.findByEmail(createUserDto.email);

    if (userWithSameEmail) {
      throw new HttpException('User with the same email has already exist', 409);
    }

    const passwordHash: string = await this.securityService.hash(createUserDto.password);

    return this.userDbService.create({ ...createUserDto, password: passwordHash });
  }
}
