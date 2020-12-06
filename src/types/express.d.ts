import User from '../api/v1/auth/model';

declare global {
    namespace Express {
        interface Request {
            user?: User;
        }
    }
}
