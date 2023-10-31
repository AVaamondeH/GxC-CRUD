import axios from 'axios';
import { User } from '../domain/user.entity';

const users: User[]  = [];

export const getUsers = async (): Promise<User[]> => {
    try {
        if (!users.length) {
            const {data} = await axios('https://jsonplaceholder.typicode.com/users');
            data.map((user: User) => {                
                const newUser: User = {
                    id: user.id,
                    name: user.name,
                    username: user.username,
                    email: user.email,
                    address: {
                        street: user.address.street,
                        city: user.address.city,
                        zipcode: user.address.zipcode,
                    },
                    phone: user.phone,
                };
                users.push(newUser)
            })
            return users;    
        }

        return users;
    } catch (error) {
        throw new Error(`Error fetching the users, error type: ${error}`);
    }
};

export const postUser = async (user: User): Promise<User> => {
    user.id = users.length + 1;
    users.push(user)
    return user
}

export const updateUser = async (id: number, updatedData: Partial<User>): Promise<User | undefined> => {
    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex === -1) {
        throw new Error(`User with id ${id} not found`);
    }

    const currentUser = users[userIndex];
    const updatedUser: User = {
        ...currentUser,
        ...updatedData,
    };

    users[userIndex] = updatedUser;

    return updatedUser;
};

export const deleteUser = async (id: number): Promise<number> => {
    const userIndex = users.findIndex(user => user.id === id);

    if (userIndex === -1) {
        throw new Error(`User with id ${id} not found`);
    }

    users.splice(userIndex, 1);

    return id
};