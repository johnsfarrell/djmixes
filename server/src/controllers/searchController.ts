/**
 * Copyright (c) 2024 DJMixes. All rights reserved.
 * Licensed under the MIT License.
 * Description: This file contains the search controller for handling search requests.
 */

import { Request, Response } from "express";
import { searchUserByName } from "@/database/search/getUser";
import { searchMixesByTitle } from "@/database/search/getMixes";
import { searchEventsByTitle } from "@/database/search/getEvents";

class SearchController {
  /**
   * Controller for get search result
   * @param req - Request object, containing the search keyword
   * @param res - Response object, used to send a response back to the client
   * @returns void
   * @throws Error - If the retrieve fails
   */
  getSearchResult = async (req: Request, res: Response): Promise<void> => {
    try {
      // Accessing userId from the request param
      const keyword = req.params.keyword;

      // username
      const userResult = await searchUserByName(keyword);
      const mixesResult = await searchMixesByTitle(keyword);
      const eventResult = await searchEventsByTitle(keyword);

      res
        .status(200)
        .json({ users: userResult, mixes: mixesResult, events: eventResult });
    } catch (error) {
      console.error("Error fetching user profile:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
}

export default SearchController;
