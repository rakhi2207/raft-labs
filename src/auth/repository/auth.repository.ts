import { BadRequestException, Injectable } from '@nestjs/common';
import { User } from 'src/typeorm/entities/user.entity';
import { DataSource, Repository } from 'typeorm';
import { AuthDto } from '../dto/auth.dto';

@Injectable()
export class AuthRepo extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async creatEntity(req: AuthDto) {
    const entity = new User();
    entity.userName = req.userName;
    entity.password = req.password;
    return await this.save(entity);
  }

  async validateUser(req: AuthDto) {
    const data = await this.findOne({
      where: {
        userName: req.userName,
      },
    });
    if (!data) {
      throw new BadRequestException('Invalid Username');
    }
    return data;
  }

  async validateUserById(id: number) {
    const data = await this.findOne({
      where: {
        id,
      },
    });
    if (!data) {
      throw new BadRequestException('Invalid Username');
    }
    return data;
  }
}
