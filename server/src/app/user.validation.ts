import Joi from 'joi';
import { User } from '../domain/user.entity';

export const userValidation = Joi.object({
    id: Joi.number(),
    name: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().email().required(),
    address: Joi.object({
        street: Joi.string().required(),
        city: Joi.string().required(),
        zipcode: Joi.string().required(),
    }),
    phone: Joi.string().required(),
});

export const updateUserValidation = Joi.object({
    id: Joi.number(),
    name: Joi.string(),
    username: Joi.string(),
    email: Joi.string().email(),
    address: Joi.object({
        street: Joi.string(),
        city: Joi.string(),
        zipcode: Joi.string(),
    }),
    phone: Joi.string(),
});

export const validateSortBy = (sortBy: string): keyof User => {
    switch (sortBy) {
        case 'name':
            return 'name';
        case 'username':
            return 'username';
        case 'email':
            return 'email';
        case 'address':
            return 'address';
        case 'phone':
            return 'phone';
        default:
            return 'name';
    }
};