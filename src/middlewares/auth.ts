import httpStatus from 'http-status';
import express from 'express';
import { ApiError } from '../utils/ApiError';

export const authorize: express.Handler = (req, res, next) => {
    if (!req.user) {
        const apiError = new ApiError({
            message: 'Unauthorized',
            status: httpStatus.UNAUTHORIZED,
        });
        return next(apiError);
    }
    return next();
};
