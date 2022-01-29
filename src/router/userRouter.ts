import express from 'express';
import handler from '../handler/userHandler';

//importing middlewares
import isAuthTokenExist from '../middleware/isAuthTokenExist';
import isAuthTokenValid from '../middleware/isAuthTokenValid';
import authorizeUser from '../middleware/authorizeUser';
import authenticatUser from '../middleware/authenticatUser';
import validateNewUserProperties from '../middleware/validateNewUserProperties';

const router = express.Router();

const checkAuthToken = [isAuthTokenExist, isAuthTokenValid, authenticatUser]; //user exist, credientials correct
const checkAuthorizedToken = [isAuthTokenExist, isAuthTokenValid, authenticatUser, authorizeUser]; //user exist, credientials correct, permission correct

router.route('/').get(checkAuthToken, handler.index).post(validateNewUserProperties, handler.create);

router.route('/:id').get(checkAuthorizedToken, handler.show).delete(checkAuthorizedToken, handler.destroy);

export default router;