import Joi from 'joi';

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