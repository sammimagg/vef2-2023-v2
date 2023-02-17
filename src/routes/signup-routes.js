import express from 'express';
import { validationResult } from 'express-validator';
import { catchErrors } from '../lib/catch-errors.js';
import {
  createEvent,
  listEvent,
  listEventByName,
  listEvents,
  updateEvent,
} from '../lib/db.js';
import passport, { ensureLoggedIn } from '../lib/login.js';
import { slugify } from '../lib/slugify.js';
import {
  registrationValidationMiddleware,
  sanitizationMiddleware,
  xssSanitizationMiddleware,
} from '../lib/validation.js';
import { findByUsername } from '../lib/users.js';
import { createUser } from '../lib/users.js';

export const signupRouter = express.Router();

async function signup(req, res) {
  let message = '';
  if(req.session.message && req.session.message.length > 0) {

    message = req.session.message
    req.session.message = [];
  }
  return res.render('signup', { message, title: 'Nýskráning' });
}
async function signupPost(req,res) {
  const {username, password } = req.body;
  if(username.length === 0) {
    req.session.message = 'Notenda nafn má ekki vera tómt'
    res.redirect('/signup')
  }
  if(password.length === 0) {
    req.session.message = 'Lykilorð má ekki vera tómt'
    res.redirect('/signup')
  }
  const isUser = await findByUsername(username)
  if(isUser !== false) {
    req.session.message = 'Nodandi er nú þegar til'
    res.redirect('/signup')
  }
  else {
    await createUser(username, password);
    res.redirect('/admin/login')
  }

}
signupRouter.get('/',signup);
signupRouter.post('/',signupPost);