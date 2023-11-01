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

export const getUsersPaginated = async (
    page: number = 1,
    pageSize: number = 5,
    sortBy: keyof User = 'id',
    order: 'asc' | 'desc' = 'asc',
    filterOptions?: {
        column: keyof User;
        filterType: 'Contains' | 'NotContains' | 'Equals' | 'NotEquals' | 'StartsWith' | 'EndsWith';
        searchValue: string;
    }): Promise<{ users: User[], totalPages: number }> => {
    if (!users.length) await getUsers();

    let filteredUsers = users;

    if (filterOptions) {
        filteredUsers = filterUsers(filterOptions);
    }

    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    console.log(sortBy);

    const sortedUsers = [...filteredUsers].sort((a, b) => {
        if (sortBy === 'id') {
            
            const numA = Number(a.id);
            const numB = Number(b.id);
            return (order === 'asc') ? numA - numB : numB - numA;
        } else {
            const valA = String(a[sortBy]);
            const valB = String(b[sortBy]);
            return (order === 'asc') ? valA.localeCompare(valB) : valB.localeCompare(valA);
        }
    });

    const paginatedUsers = sortedUsers.slice(startIndex, endIndex);

    const totalUsers = sortedUsers.length;
    const totalPages = Math.ceil(totalUsers / pageSize);

    return { users: paginatedUsers, totalPages };
};

export const filterUsers = (options: {
    column: keyof User;
    filterType: 'Contains' | 'NotContains' | 'Equals' | 'NotEquals' | 'StartsWith' | 'EndsWith';
    searchValue: string;
}): User[] => {
    return users.filter((user) => {
        const valueToFilter = user[options.column] as string;

        switch (options.filterType) {
            case 'Contains':
                return valueToFilter.includes(options.searchValue);
            case 'NotContains':
                return !valueToFilter.includes(options.searchValue);
            case 'Equals':
                return valueToFilter === options.searchValue;
            case 'NotEquals':
                return valueToFilter !== options.searchValue;
            case 'StartsWith':
                return valueToFilter.startsWith(options.searchValue);
            case 'EndsWith':
                return valueToFilter.endsWith(options.searchValue);
            default:
                return true;
        }
    });
};
