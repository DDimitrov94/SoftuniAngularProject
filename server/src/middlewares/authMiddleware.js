const jwt = require('../utils/jwt')
const {secret} = require('../config')

exports.authMiddleware = async (req, res, next) => {
    const token = req.cookies['token']

    if (!token) {
        return next();
    }

    try{
        const decodedToken = await jwt.verify(token, secret);
        req.user = decodedToken;
        res.locals.isAuth = true;
        res.locals.user = decodedToken;

        next();
    } catch(err) {
        res.clearCookie('token');
        res.redirect('/auth/login')
    }
}

exports.isAuth = (req, res, next) => {
    //checks for authenticated user
    if (!req.user) {
        return res.status(401).end();
    }
    next();
};
  
exports.isGuest = (req, res, next) => {
    //checks for unauthenticated user
    if (req.user) {
        return res.redirect("/");
    }
    next();
}