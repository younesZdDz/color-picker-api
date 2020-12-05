import Joi from '@hapi/joi';

const headers = {
    headers: Joi.object({
        cookie: Joi.string().trim().required().label('Auth cookie'),
    }).options({ allowUnknown: true }),
};

export default {
    // GET /api/v1/palettes/
    getPalettes: {
        ...headers,
    },
    addPalette: {
        ...headers,
        body: Joi.object({
            paletteName: Joi.string().trim().required().label('Palette name'),
            emoji: Joi.string().trim().required().label('Palette emoji'),
            colors: Joi.array()
                .unique((a, b) => a.name === b.name)
                .items(
                    Joi.object({
                        name: Joi.string().trim().required().label('Color name'),
                        color: Joi.string().trim().required().label('Color color'),
                    }),
                )
                .required()
                .label('Color list'),
        }),
    },
    deletePalette: {
        ...headers,
        params: Joi.object({
            id: Joi.string().trim().required().label('Palette Id'),
        }),
    },
};
