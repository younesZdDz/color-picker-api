import express from 'express';
import passport from 'passport';
import controller from './controller';

require('./services');

const routes = express.Router();

routes.route('/google').get(
    passport.authenticate('google', {
        scope: ['profile', 'email'],
    }),
);
routes.route('/google/callback').get(passport.authenticate('google'), controller.loginCallback);

routes.route('/current_user').get(controller.currentUser);

routes.route('/logout').get(controller.logout);

export default routes;
