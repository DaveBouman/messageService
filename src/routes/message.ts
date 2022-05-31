import { Router } from 'express';
import MessageController from '../controllers/messageController';
import { validateUser } from '../middleware/authMiddelware';

const router = Router();
const messageController = new MessageController();

router.post("/", messageController.create);
router.get("/", messageController.getList);
router.get("/mentions", messageController.getMentions);
router.get("/test", messageController.test);
router.get('/search', messageController.search);
router.get('/following', messageController.getFollowing);
router.get('/trends', messageController.getTrendskweet);
router.get('/trends/latest', messageController.getLatestTrends)
router.get('/latestkweets', messageController.getLatestTweets);

export default router;
