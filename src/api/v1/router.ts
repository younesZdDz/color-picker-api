import express from 'express';
import httpStatus from 'http-status';
import authRoutes from './auth/routes';
import paletteRoutes from './palette/routes';

const router = express.Router();

router.get('/status', (req, res) => {
    return res.status(httpStatus.OK).send({ code: httpStatus.OK, message: 'OK' });
});

router.use('/auth', authRoutes);
router.use('/palettes', paletteRoutes);

export default router;
