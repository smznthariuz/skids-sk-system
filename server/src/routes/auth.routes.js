import { OAuth2Client } from 'google-auth-library';
import express from 'express';
import User from '../models/User.js';
import asyncHandler from '../utils/asyncHandler.js';
import { requireAuth } from '../middleware/auth.js';
import { getAdminEmails, publicUser, signAuthToken } from '../utils/auth.js';

const router = express.Router();
const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post(
  '/google',
  asyncHandler(async (req, res) => {
    const { credential } = req.body;

    if (!credential) {
      res.status(400);
      throw new Error('Google credential is required');
    }

    if (!process.env.GOOGLE_CLIENT_ID) {
      res.status(500);
      throw new Error('GOOGLE_CLIENT_ID is not configured');
    }

    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload?.email || !payload.email_verified) {
      res.status(401);
      throw new Error('Google account email must be verified');
    }

    const email = payload.email.toLowerCase();
    const adminEmails = getAdminEmails();
    const existingUser = await User.findOne({
      $or: [{ googleId: payload.sub }, { email }],
    });

    const role =
      existingUser?.role === 'admin' || adminEmails.has(email) ? 'admin' : 'user';

    const user = await User.findOneAndUpdate(
      { $or: [{ googleId: payload.sub }, { email }] },
      {
        $set: {
          googleId: payload.sub,
          email,
          name: payload.name || email,
          avatar: existingUser?.avatar || payload.picture || '',
          role,
          lastLoginAt: new Date(),
          isActive: true,
        },
        $setOnInsert: {
          barangay: 'Masagui',
        },
      },
      {
        new: true,
        upsert: true,
        runValidators: true,
      }
    );

    res.json({
      token: signAuthToken(user),
      user: publicUser(user),
    });
  })
);

router.get(
  '/me',
  requireAuth,
  asyncHandler(async (req, res) => {
    res.json({ user: publicUser(req.user) });
  })
);

router.post('/logout', requireAuth, (req, res) => {
  res.json({ message: 'Logged out' });
});

export default router;
