import express from 'express';

export const loginRouter = express.Router();

function login(req, res) {

    if (req.isAuthenticated() ) {
        if(req.user.admin == true) {
            return res.redirect('/admin');
        }
        else {
            return res.redirect('/');
        }
    }

    let message = '';

    // Athugum hvort einhver skilaboð séu til í session, ef svo er birtum þau
    // og hreinsum skilaboð
    if (req.session.messages && req.session.messages.length > 0) {
        message = req.session.messages.join(', ');
        req.session.messages = [];
    }

    return res.render('login', { message, title: 'Innskráning' });
}
loginRouter.get('/', login);
