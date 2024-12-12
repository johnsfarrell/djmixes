/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the search routes for the application.
 */

import express from 'express';
import SearchController from '@/controllers/searchController';

const router = express.Router();
const searchController = new SearchController();

// Route for get search result
router.get('/:keyword', searchController.getSearchResult);

export default router;
