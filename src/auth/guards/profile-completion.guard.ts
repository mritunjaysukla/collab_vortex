import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/users.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ProfileCompletionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private configService: ConfigService,
    private usersService: UsersService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Get the route metadata to check if this is a profile creation route
    // which should be accessible without a completed profile
    const isProfileCreationRoute = this.reflector.get<boolean>(
      'isProfileCreationRoute',
      context.getHandler()
    );

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const payload = this.jwtService.verify(token, {
        secret: this.configService.get('JWT_SECRET'),
      });

      // Assign the user to the request
      request['user'] = payload;

      // If this is a profile creation route, allow access regardless of isActive status
      if (isProfileCreationRoute) {
        return true;
      }

      // For other routes, check if the profile is completed (user is active)
      const user = await this.usersService.findOne(payload.sub);
      if (!user.isActive) {
        throw new UnauthorizedException('Please complete your profile to access this resource');
      }

      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token or profile not completed');
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
