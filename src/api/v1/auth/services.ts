import passport from 'passport';
import passportGoogle from 'passport-google-oauth20';
import User from './model';
import Palette from '../palette/model';
import config from '../../../config';
import { palettesSeed } from '../../../config/constants';

const GoogleStrategy = passportGoogle.Strategy;

passport.serializeUser((user: { id: string }, done) => {
    done(undefined, user.id);
});
passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await User.findByPk(id);
        done(undefined, user);
    } catch (err) {
        done(err);
    }
});
passport.use(
    new GoogleStrategy(
        {
            clientID: config.GOOGLE.GOOGLE_CLIENT_ID,
            clientSecret: config.GOOGLE.GOOGLE_CLIENT_SECRET,
            callbackURL: '/api/v1/auth/google/callback',
            proxy: true,
        },
        async (
            accessToken,
            refreshToken,
            profile: { id: string; displayName: string; photos?: { value: string }[] },
            done,
        ) => {
            try {
                const existingUser = await User.findByPk(profile.id);
                if (existingUser) {
                    return done(undefined, existingUser);
                }
                const { id, displayName } = profile;
                let photo = null;
                if (profile.photos && profile.photos.length && profile.photos[0].value) {
                    photo = profile.photos[0].value;
                }
                const user = await User.create({ id, displayName, photo });
                const defaultPalettes = palettesSeed.map((p) => {
                    const paletteId = p.paletteName.toLowerCase().replace(/ /g, '-');
                    const palette: { id: string; userId: string } & typeof p = {
                        ...p,
                        id: paletteId,
                        userId: id,
                    };
                    return palette;
                });
                await Palette.bulkCreate(defaultPalettes);
                return done(undefined, user);
            } catch (err) {
                return done(err);
            }
        },
    ),
);
