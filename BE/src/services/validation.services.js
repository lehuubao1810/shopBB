import Joi from 'joi';

export default function categoryValidation() {
    const categorySchema = Joi.object({
        name: Joi.string().required(),
        slug: Joi.string().required(),
        image: Joi.string().required(),
        description: Joi.string().required(),
    });

    return categorySchema;
}