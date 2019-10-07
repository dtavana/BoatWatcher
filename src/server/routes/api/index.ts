import express from 'express';
import getDeleted from './getDeleted';

const router = express.Router();
router.use('/getDeleted', getDeleted);

export default router;
