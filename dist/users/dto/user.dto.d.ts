import { UserRole } from '../../common/enums';
export declare class CreateUserDto {
    email: string;
    password: string;
    role: UserRole;
}
export declare class UpdateUserDto {
    email?: string;
    isActive?: boolean;
}
export declare class UserResponseDto {
    id: string;
    email: string;
    role: UserRole;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}
