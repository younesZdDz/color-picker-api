import express from 'express';
import httpStatus from 'http-status';
import { ApiError } from '../../../utils/ApiError';
import Palette from './model';

const getPalettes: express.Handler = async (req, res, next) => {
    try {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { id } = req.user;
        const palettes = await Palette.findAll({
            where: {
                userId: id,
            },
        });
        return res.status(httpStatus.OK).send(palettes);
    } catch (error) {
        return next(error);
    }
};

const addPalette: express.Handler = async (req, res, next) => {
    try {
        const p = { ...req.body };
        const existingPaletteName = await Palette.findOne({
            where: {
                paletteName: p.paletteName,
            },
        });
        if (existingPaletteName) {
            throw new ApiError({
                message: 'Palette name already exists',
                status: httpStatus.CONFLICT,
            });
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { id: userId } = req.user;
        const id = p.paletteName.toLowerCase().replace(/ /g, '-');
        const palette = await Palette.create({
            ...p,
            userId,
            id,
        });
        return res.status(httpStatus.CREATED).send(palette);
    } catch (error) {
        return next(error);
    }
};

const deletePalette: express.Handler = async (req, res, next) => {
    try {
        const { id } = req.params;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        const { id: userId } = req.user;
        await Palette.destroy({
            where: {
                userId,
                id,
            },
        });
        return res.status(httpStatus.NO_CONTENT).end();
    } catch (error) {
        return next(error);
    }
};
export default {
    getPalettes,
    addPalette,
    deletePalette,
};
