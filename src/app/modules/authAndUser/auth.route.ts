import  express  from 'express';
import { AuthController } from './auth.controlller';

const router = express.Router();

router.post('/signIn', AuthController.signIn)

router.post('/create-user',AuthController.createUser)

export const AuthRoutes = router;