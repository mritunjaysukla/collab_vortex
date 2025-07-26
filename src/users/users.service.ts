import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserRole } from '../common/enums';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly dataSource: DataSource,
  ) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findAll(): Promise<User[]> {
    return await this.userRepository.find({
      relations: ['creatorProfile', 'brandProfile'],
    });
  }

  async findOne(id: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['creatorProfile', 'brandProfile'],
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { email },
      relations: ['creatorProfile', 'brandProfile'],
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.findOne(id);
    Object.assign(user, updateUserDto);
    return await this.userRepository.save(user);
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await this.userRepository.remove(user);
  }

  async deactivate(id: string): Promise<User> {
    return await this.update(id, { isActive: false, isProfileComplete: false });
  }

  async activate(userId: string): Promise<void> {
    await this.userRepository.update(userId, {
      isActive: true,
      isProfileComplete: true
    });
  }

  async updateRefreshToken(userId: string, refreshToken: string): Promise<void> {
    await this.userRepository.update(userId, { refreshToken });
  }

  async checkProfileCompletion(userId: string): Promise<boolean> {
    const user = await this.findOne(userId);
    if (!user) return false;

    // Check if user has completed profile based on role
    if (user.role === UserRole.BRAND) {
      const brandProfile = await this.dataSource
        .getRepository('BrandProfile')
        .findOne({ where: { user: { id: userId } } });
      return !!brandProfile;
    } else if (user.role === UserRole.CREATOR) {
      const creatorProfile = await this.dataSource
        .getRepository('CreatorProfile')
        .findOne({ where: { user: { id: userId } } });
      return !!creatorProfile;
    }

    return false;
  }

  async updateProfileStatus(userId: string): Promise<void> {
    const hasProfile = await this.checkProfileCompletion(userId);
    if (hasProfile) {
      await this.userRepository.update(userId, {
        isActive: true,
        isProfileComplete: true
      });
    }
  }
}
