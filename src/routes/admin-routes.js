import express from 'express';
import { validationResult } from 'express-validator';
import { catchErrors } from '../lib/catch-errors.js';
import {
  createEvent,
  listEvent,
  listEventByName,
  listEvents,
  updateEvent,
  deleteEvent,
  getEvents,
  getTotalPages
} from '../lib/db.js';
import passport, { ensureLoggedIn } from '../lib/login.js';
import { slugify } from '../lib/slugify.js';
import {
  registrationValidationMiddleware,
  sanitizationMiddleware,
  xssSanitizationMiddleware,
} from '../lib/validation.js';

export const adminRouter = express.Router();

async function index(req, res) {
  const page = parseInt(req.params.page) || 1;
  let perpage = 10;
  const events = await getEvents(page, perpage);
  const totalPages = await getTotalPages(perpage);
  const { user: { username } = {} } = req || {};

  return res.render('admin', {
    username,
    events,
    errors: [],
    page,
    perpage,
    totalPages,
    data: {},
    title: 'Viðburðir — umsjón',
    admin: true,
  });
}
function isAdmin(req, res, next) {
  if (req.user && req.user.admin) {
    // User is an administrator, continue to the next middleware
    next();
  } else {
    // User is not an administrator, redirect to the home page or show an error message
    res.redirect('/');
  }
}
async function validationCheck(req, res, next) {
  const { name, description } = req.body;

  const events = await listEvents();
  const { user: { username } = {} } = req;
  console.log(data)
  const data = {
    name,
    description,
  };

  const validation = validationResult(req);

  const customValidations = [];

  const eventNameExists = await listEventByName(name);

  if (eventNameExists !== null) {
    customValidations.push({
      param: 'name',
      msg: 'Viðburður með þessu nafni er til',
    });
  }

  if (!validation.isEmpty() || customValidations.length > 0) {

    return res.render('admin', {
      events,
      username,
      title: 'Viðburðir — umsjón',
      data,
      errors: validation.errors.concat(customValidations),
      admin: true,
    });
  }

  return next();
}
async function validationCheckUpdate(req, res, next) {
  const { name, description } = req.body;
  const { slug } = req.params;
  const { user: { username } = {} } = req;

  const event = await listEvent(slug);

  const data = {
    name,
    description,
  };

  const validation = validationResult(req);

  const customValidations = [];

  const eventNameExists = await listEventByName(name);

  if (eventNameExists !== null && eventNameExists.id !== event.id) {
    customValidations.push({
      param: 'name',
      msg: 'Viðburður með þessu nafni er til',
    });
  }

  if (!validation.isEmpty() || customValidations.length > 0) {
    return res.render('admin-event', {
      username,
      event,
      title: 'Viðburðir — umsjón',
      data,
      errors: validation.errors.concat(customValidations),
      admin: true,
    });
  }

  return next();
}
async function registerRoute(req, res) {
  const { name, description } = req.body;
  const slug = slugify(name);

  const created = await createEvent({ name, slug, description });

  if (created) {
    return res.redirect('/admin');
  }

  return res.render('error');
}
async function updateRoute(req, res) {
  const { name, description, location, url } = req.body;
  console.log(name, description, location, url)
  const { slug } = req.params;

  const event = await listEvent(slug);

  const newSlug = slugify(name);

  const updated = await updateEvent(event.id, {
    name,
    slug: newSlug,
    description,
    url,
    location,
  });

  if (updated) {
    return res.redirect('/admin');
  }

  return res.render('error');
}
async function eventRoute(req, res, next) {
  const { slug } = req.params;
  const { user: { username } = {} } = req;

  const event = await listEvent(slug);

  if (!event) {
    return next();
  }
  
  return res.render('admin-event', {
    username,
    title: `${event.name} — Viðburðir — umsjón`,
    event,
    errors: [],
    data: { name: event.name,
            description: event.description,
            url: event.url,
            location: event.location,
      },
  });
}

adminRouter.get('/', ensureLoggedIn, isAdmin, catchErrors(index));
adminRouter.post(
  '/',
  ensureLoggedIn,
  registrationValidationMiddleware('description'),
  xssSanitizationMiddleware('description'),
  catchErrors(validationCheck),
  sanitizationMiddleware('description'),
  catchErrors(registerRoute)
);



adminRouter.get('/logout', (req, res, next) => {
  // logout hendir session cookie og session
  req.logout(); // Log out the user
  res.redirect('/'); // Redirect to home page
});

adminRouter.get('/delete/:slug', async (req, res) => {
  const { slug } = req.params;
  const event = await listEvent(slug);

  if (!event) {
    return res.status(404).send('Event not found');
  }

  await deleteEvent(event.id);

  return res.send('Event deleted');
});

// Verður að vera seinast svo það taki ekki yfir önnur route
adminRouter.get('/:slug', ensureLoggedIn, catchErrors(eventRoute));
adminRouter.post(
  '/:slug',
  ensureLoggedIn,
  registrationValidationMiddleware('description'),
  xssSanitizationMiddleware('description'),
  catchErrors(validationCheckUpdate),
  sanitizationMiddleware('description'),
  catchErrors(updateRoute)
);
