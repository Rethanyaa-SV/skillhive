import jwt from 'jsonwebtoken';

const authenticateJWT = (req, res, next) => {
    const token = req.cookies.jwt || req.header('Authorization')?.split(' ')[1];
    if (!token) {
      return res.status(403).json({ message: 'Access denied' });
    }
  
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({ message: 'Invalid token' });
      }
      req.user = user;
      next();
    });
  };
  
  export default authenticateJWT;
  