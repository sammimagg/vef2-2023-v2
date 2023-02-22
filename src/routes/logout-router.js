import express from 'express'
export const logoutRouter = express.Router();

logoutRouter.get('/', (req, res, next) => {
    // logout hendir session cookie og session
    req.logout(); // Log out the user
    res.redirect('/'); // Redirect to home page
});
