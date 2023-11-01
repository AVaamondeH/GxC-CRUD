// src/domain/user/user.entity.ts
export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: {
        street: string;
        city: string;
        zipcode: string;
    };
    phone: string;
}


