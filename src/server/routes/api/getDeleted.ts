import express from 'express';
import {getDeleted} from '../../controllers/deleted.controller';

const router = express.Router();
router.get('/', getDeleted);

export default router;
