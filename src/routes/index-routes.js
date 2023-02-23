import express from 'express';
import { validationResult } from 'express-validator';
import { catchErrors } from '../lib/catch-errors.js';
import { listEvent, listEvents, listRegistered, register, getEvents,getTotalPages} from '../lib/db.js';
import {
  registrationValidationMiddleware,
  sanitizationMiddleware,
  xssSanitizationMiddleware,
} from '../lib/validation.js';
export const indexRouter = express.Router();

async function indexRoute(req, res) {
  const page = parseInt(req.params.page) || 1;
  let perpage = 10;
  const events = await getEvents(page, perpage);
  const totalPages = await getTotalPages(perpage);

  const username = []
  let isAdmin = false
  if (req.isAuthenticated() ) {
    username.push(req.user.username);
    isAdmin = req.user.admin;
  }
  
  res.render('index', {
    title: 'Viðburðasíðan',
    admin: isAdmin,
    events,
    username: username,
    page,
    perpage,
    totalPages,
    isLoggedIn: req.isAuthenticated(),
  });
}

async function eventRoute(req, res, next) {
  const { slug } = req.params;
  const event = await listEvent(slug);
  const name = [];
  if (req.isAuthenticated() ) {
    name.push(req.user.username)
  }


  if (!event) {
    return next();
  }
  const registered = await listRegistered(event.id);

  return res.render('event', {
    title: `${event.name} — Viðburðasíðan`,
    event,
    registered,
    errors: [],
    data: {},
    name,
    isLoggedIn: req.isAuthenticated(),
  });
}

async function eventRegisteredRoute(req, res) {
  const events = await listEvents();
  const name = [];
  name.push(req.user.username)
  res.render('registered', {
    title: 'Viðburðasíðan',
    events,
    name,
  });
}

async function validationCheck(req, res, next) {
  const { comment } = req.body;
  const userObject = JSON.parse(JSON.stringify(req.user));
  const name = userObject.username;


  const { slug } = req.params;
  const event = await listEvent(slug);
  const registered = await listRegistered(event.id);

  const data = {
    name,
    comment,
  };
  const validation = validationResult(req);

  if (!validation.isEmpty()) {
    return res.render('event', {
      title: `${event.name} — Viðburðasíðan`,
      data,
      event,
      registered,
      isLoggedIn,
      name,
      errors: validation.errors,
    });
  }

  return next();
}

async function registerRoute(req, res) {
  const { comment } = req.body;
  const { slug } = req.params;
  const userObject = JSON.parse(JSON.stringify(req.user));
  const name = userObject.username;
  const event = await listEvent(slug);

  const registered = await register({
    name,
    comment,
    event: event.id,
  });

  if (registered) {
    return res.redirect(`/event/${event.slug}`);
  }

  return res.render('error');
}


indexRouter.get('/:page?', catchErrors(indexRoute));
indexRouter.get('/event/:slug', catchErrors(eventRoute));
indexRouter.post(
  '/event/:slug',
  registrationValidationMiddleware('comment'),
  xssSanitizationMiddleware('comment'),
  catchErrors(validationCheck),
  sanitizationMiddleware('comment'),
  catchErrors(registerRoute)
);
indexRouter.get('/event/:slug/thanks', catchErrors(eventRegisteredRoute));
