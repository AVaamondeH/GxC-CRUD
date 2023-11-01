import axios from 'axios';
import { User } from '../domain/user.entity';

const users: User[] = [];

export const getUsers = async (): Promise<User[]> => {
    try {
        if (!users.length) {
            const { data } = await axios('https://jsonplaceholder.typicode.com/users');
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

export const getUsersPaginated = async (page: number = 1, pageSize: number = 5, sortBy: keyof User = 'name', order: 'asc' | 'desc' = 'asc'): Promise<{ users: User[], totalPages: number }> => {
    // Calcula el índice inicial y final para la paginación
    
    if(!users.length) await getUsers()

    
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    console.log(page, pageSize, sortBy, order);
    

    // Copia y ordena el array de usuarios según la columna y el orden
    const sortedUsers = [...users].sort((a, b) => {
        if (sortBy === 'address') {
            // Ordenar por la propiedad 'city' en la columna 'address'
            const valA = a.address.city;
            const valB = b.address.city;
            return (order === 'asc') ? String(valA).localeCompare(String(valB)) : String(valB).localeCompare(String(valA));
        } else {
            // Para otras columnas, ordenar de manera estándar
            const valA = a[sortBy];
            const valB = b[sortBy];
            return (order === 'asc') ? String(valA).localeCompare(String(valB)) : String(valB).localeCompare(String(valA));
        }
    });

    // Obtiene los usuarios en el rango calculado
    const paginatedUsers = sortedUsers.slice(startIndex, endIndex);

    const totalUsers = sortedUsers.length;
    const totalPages = Math.ceil(totalUsers / pageSize);

    return { users: paginatedUsers, totalPages };
};
