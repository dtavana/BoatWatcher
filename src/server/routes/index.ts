import express from 'express';
import checkToken from '../middleware/checkToken';
import api from './api';

const router = express.Router();
router.use('/api', checkToken, api);

export default router;
