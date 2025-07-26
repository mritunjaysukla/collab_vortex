import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/users.service';
import { ConfigService } from '@nestjs/config';
import { IS_PUBLIC_KEY } from '../../common/decorators/public.decorator';

@Injectable()
export class ProfileCompletionGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
    private configService: ConfigService,
    private usersService: UsersService,
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Check if the route is marked as public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true; // Skip all checks for public routes
    }

    // Get the route metadata to check if this is a profile creation route
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

      // For other routes that require a complete profile
      const user = await this.usersService.findOne(payload.sub);
      if (!user.isActive) {
        throw new UnauthorizedException('Please complete your profile to access this resource');
      }

      return true;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromHeader(request: any): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
