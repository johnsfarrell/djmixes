import { Request, Response } from 'express';
import { User, ProfileResponse } from '@/utils/interface';
import { getUserByEmail, getUserByName } from '@/database/search/getUser';
import { createUser } from '@/database/update/updateUser';
import jwt from 'jsonwebtoken'; // Import for creating JWT tokens

const SECRET_KEY = 'your-secret-key'; // Replace with actual secret key

class UserController {
  /**
   * Handles user registration
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
        res.status(409).send({ error: 'Username already exist'});
        return;
      }

      // Fetch the user to check if email exist
      const userByEmail: User | null = await getUserByEmail(email); // Using user_id instead of username
      if (userByEmail) {
        res.status(409).send({ error: 'Email already exist'});
        return;
      }

      const userID: number | null = await createUser(username, email, password, 1); // Using user_id instead of username
      res.status(200).json({
        message: "Registration successful",
        user_id: userID
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
      });
    } catch (error) {
      console.error('Error during login:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
}

export default UserController;
