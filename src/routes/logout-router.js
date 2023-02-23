import express from 'express'
export const logoutRouter = express.Router();

logoutRouter.get('/', (req, res, next) => {
    // Log out the user
    req.logout();
  
    // Destroy the session
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
  
      // Redirect to the home page
      res.redirect('/');
    });
  });
  