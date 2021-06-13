import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import jwt from 'jsonwebtoken';

import { validateResult } from '../middlewares/validate-request';
import { User } from '../models/user';
import { BadRequestError } from '../errors/bad-request-error';
import { Error } from 'mongoose';

const router = express.Router();

router.post('/api/users/signup', [
    body('email')
      .isEmail()
      .withMessage('Email must be valid'),
    body('password')
      .trim()
      .isLength({ min: 4, max: 20})
      .withMessage('Password must be 4 and 20 characters')
],
validateResult,
async (req: Request, res: Response) => {
   
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // console.log('Email already exists');
      // return res.send({});
      throw new BadRequestError('Email in use');
    }

    const user = User.build({ email, password });
    await user.save();

    // Generate JWT
    const userJwt = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_KEY!);

    // Store it on session object
    req.session = {
      jwt: userJwt
    };

    res.status(201).send(user);
   
  });

export { router as signupRouter };
