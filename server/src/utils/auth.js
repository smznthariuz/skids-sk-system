import jwt from 'jsonwebtoken';

export const signAuthToken = (user) => {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is required');
  }

  return jwt.sign(
    {
      sub: user._id.toString(),
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    }
  );
};

export const publicUser = (user) => ({
  id: user._id.toString(),
  name: user.name,
  email: user.email,
  avatar: user.avatar,
  avatarPublicId: user.avatarPublicId,
  avatarMetadata: user.avatarMetadata || {},
  role: user.role,
  barangay: user.barangay,
  profile: user.profile || {},
});

export const getAdminEmails = () =>
  new Set(
    (process.env.ADMIN_EMAILS || '')
      .split(',')
      .map((email) => email.trim().toLowerCase())
      .filter(Boolean)
  );
