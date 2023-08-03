import { Router } from 'express';
import * as channelController from '../controllers/channel.controller';
const router = Router();

router.post('/', channelController.joinChannel);
router.post('/details', channelController.viewUserChannel);
router.get('/:token', channelController.displayChannels);
router.put('/leave/:label', channelController.leaveChannel);
router.delete('/:label', channelController.archiveChannel);

export default router;
