import axios from 'axios';
import { User } from '../domain/user.entity';

const users: User[]  = [];

export const getUsers = async (): Promise<User[]> => {
    try {
        const {data} = await axios('https://jsonplaceholder.typicode.com/users');
        return data as User[];
    } catch (error) {
        throw new Error(`Error fetching the users, error type: ${error}`);
    }
};

export const postUser = async (user: User): Promise<User> => {
    const api = (await getUsers()).length;
    user.id = api + users.length + 1;
    users.push(user)
    return user
} 
