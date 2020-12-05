import express from 'express';
import httpStatus from 'http-status';
import config from '../../../config';

const loginCallback: express.Handler = (req, res) => {
    return res.status(httpStatus.PERMANENT_REDIRECT).redirect(config.SERVER.website);
};

const currentUser: express.Handler = (req, res) => {
    return res.status(httpStatus.OK).send(req.user);
};

const logout: express.Handler = (req, res) => {
    req.logout();
    return res.status(httpStatus.PERMANENT_REDIRECT).redirect(config.SERVER.website);
};

export default {
    loginCallback,
    currentUser,
    logout,
};
