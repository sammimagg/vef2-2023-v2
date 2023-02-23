import express from "express";
import passport, { ensureLoggedIn } from "../lib/login.js";

export const loginRouter = express.Router();

function login(req, res) {
  if (req.isAuthenticated()) {
    if (req.user.admin === true) {
      return res.redirect("/admin");
    } else {
      return res.redirect("/");
    }
  }

  let message = "";

  // Athugum hvort einhver skilaboð séu til í session, ef svo er birtum þau
  // og hreinsum skilaboð
  if (req.session.messages && req.session.messages.length > 0) {
    message = req.session.messages.join(", ");
    req.session.messages = [];
  }

  return res.render("login", { message, title: "Innskráning" });
}
function userRedirecter(req, res) {
  if (req.isAuthenticated()) {
    if (req.user.admin === true) {
      return res.redirect("/admin");
    } else {
      return res.redirect("/");
    }
  }
}
loginRouter.get("/", login);
loginRouter.post(
  "/",

  // Þetta notar strat að ofan til að skrá notanda inn
  passport.authenticate("local", {
    failureMessage: "Notandanafn eða lykilorð vitlaust.",
    failureRedirect: "/login",
  }),
  userRedirecter
);
