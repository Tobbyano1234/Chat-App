import Joi from 'joi'
import jwt from 'jsonwebtoken'
export const createNoteSchema = Joi.object().keys({
    parent: Joi.string().required(),
    content: Joi.string().required().trim(),
    avatar: Joi.string(),
    author_name: Joi.string().required(),
    author_id: Joi.string().required(),
    category: Joi.string().required(),
    flagged: Joi.string(),
});

export const createChatSchema = Joi.object().keys({

    content: Joi.string().required(),
    sender_id: Joi.string().required(),
    recipient_id: Joi.string().required()
});

export const updateNoteSchema = Joi.object().keys({
    title: Joi.string(),
    content: Joi.string().trim(),
    author: Joi.string(),
    category: Joi.string()
});

export const registerSchema = Joi.object().keys({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().trim().lowercase().required(),
    gender: Joi.string().trim().lowercase().required(),
    avatar: Joi.string(),
    phonenumber: Joi.string().length(11).pattern(/^[0-9]+$/).required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    confirm_password: Joi.ref("password")
}).with('password', 'confirm_password')

export const loginSchema = Joi.object().keys({
    email: Joi.string().trim().lowercase().required(),
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),

})

export const updateUserSchema = Joi.object().keys({
    firstname: Joi.string().allow('').optional(),
    lastname: Joi.string().optional(),
    email: Joi.string().trim().lowercase().optional(),
    gender: Joi.string().trim().lowercase().optional(),
    phonenumber: Joi.string().optional().length(11).pattern(/^[0-9]+$/).optional(),

    id: Joi.string().guid(),
    avatar: Joi.string().trim().lowercase(),
    groups: Joi.string().trim().lowercase().required(),
    type: Joi.string().trim().lowercase().required(),
    update_route: Joi.string(),
    id_doc_type: Joi.string().trim().lowercase(),
    id_doc_number: Joi.string().trim().lowercase(),
    id_doc_path: Joi.string().trim(),
})

//Generate Token
export const generateToken = (user: { [key: string]: unknown }): unknown => {
    const pass = process.env.JWT_SECRET as string
    return jwt.sign({ user }, pass, { expiresIn: '7d' })
}


export const options = {
    abortEarly: false,
    errors: {
        wrap: {
            label: ''
        }
    }
}