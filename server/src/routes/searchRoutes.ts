import express from 'express';
import SearchController from '@/controllers/searchController';

const router = express.Router();
const searchController = new SearchController();

// Route for get search result
router.get('/:keyword', searchController.getSearchResult);

export default router;