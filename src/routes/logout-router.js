import express from "express";
export const logoutRouter = express.Router();

logoutRouter.get("/", (req, res, next) => {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});
