import { Request, Response } from 'express';
import { User, ProfileResponse } from '@/utils/interface';
import { getUserByEmail, getUserByName } from '@/database/search/getUser';
import { createUser } from '@/database/update/updateUser';
import { followArtist } from '@/database/update/updateFollows';
import { getFollowedArtists } from '@/database/search/getFollows';
import jwt from 'jsonwebtoken'; // Import for creating JWT tokens

const SECRET_KEY = 'your-secret-key'; // Replace with actual secret key

class UserController {
  /**
   * Controller for register a user
   * @param req - Request object, contains username, email, and password in body
   * @param res - Response object, used to send a response back to the client
   * @returns void
   * @throws Error - If the register fails
   */
  register = async (req: Request, res: Response): Promise<void> => {
    try {
      // Access data from the request body
      const { username, email, password } = req.body; // Ensure these are in the request body

      // Validate username
      if (!username || username.length === 0) {
        res.status(400).json({ error: 'Username cannot be empty' });
        return;
      }

      // Fetch the user to check if id exist
      const userById: User | null = await getUserByName(username); // Using user_id instead of username
      if (userById) {
        res.status(409).send({ error: 'Username already exist' });
        return;
      }

      // Fetch the user to check if email exist
      const userByEmail: User | null = await getUserByEmail(email); // Using user_id instead of username
      if (userByEmail) {
        res.status(409).send({ error: 'Email already exist' });
        return;
      }

      const userId: number | null = await createUser(
        username,
        email,
        password,
        1
      ); // Using user_id instead of username
      res.status(200).json({
        message: 'Registration successful',
        user_id: userId
      });
    } catch (error) {
      console.error('Error while registering the user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  /**
   * Handles user login
   */
  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;

      // Validate request fields
      if (!email || !password) {
        res.status(400).json({ error: 'Email and password are required' });
        return;
      }

      const user = await getUserByEmail(email);

      // Check if user exists and password matches
      if (!user || user.password !== password) {
        res.status(401).json({ error: 'Invalid email or password' });
        return;
      }

      // Generate a JWT token for session management
      const token = jwt.sign(
        { userId: user.userId, email: user.email },
        SECRET_KEY,
        { expiresIn: '1h' } // Token expires in 1 hour
      );

      res.status(200).json({
        message: 'Login successful',
        token,
        user_id: user.userId, // Include user_id here
      });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  /**
   * Controller for following an artist
   * @param req - Request object, contains userId in params and artistId in body
   * @param res - Response object, used to send a response back to the client
   * @returns void
   * @throws Error - If following the artist fails
   */
  followArtist = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = parseInt(req.params.userId, 10);
      const { artistId } = req.body;

      if (isNaN(userId) || !artistId) {
        res.status(400).json({ error: 'Invalid user ID or artist ID' });
        return;
      }

      await followArtist(userId, artistId);
      res.status(200).json({ message: 'Successfully followed the artist' });
    } catch (error) {
      console.error('Error while following artist:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

  /**
   * Controller for fetching all followed artists of a user
   * @param req - Request object, contains userId in params
   * @param res - Response object, used to send a response back to the client
   * @returns void
   * @throws Error - If fetching the followed artists fails
   */
  getFollowedArtists = async (req: Request, res: Response): Promise<void> => {
    try {
      const userId = parseInt(req.params.userId, 10);

      if (isNaN(userId)) {
        res.status(400).json({ error: 'Invalid user ID' });
        return;
      }

      const artists = await getFollowedArtists(userId);
      res.status(200).json({ following: artists });
    } catch (error) {
      console.error('Error fetching followed artists:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}

export default UserController;
