export default (req, res, next) => {
    const {AUTH_TOKEN} = req.app.locals.config;
    const {token} = req.body;
    if (!token) {
        return res.status(401).send({
            success: false,
            data: 'No auth token provided',
        });
    } else if (token !== AUTH_TOKEN) {
        return res.status(401).send({
            success: false,
            data: 'Incorrect auth token specified',
        });
    } else {
        next();
    }
};
