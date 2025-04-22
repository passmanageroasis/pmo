import { User } from '@/types/userTypes.ts';

export interface ApiResponse {
    message: string;
    error: {
        code: string;
        message: string;
        description: string;
    };
    data: {
        user: User;
        token: string;
    };
}
