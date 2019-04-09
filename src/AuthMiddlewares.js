class AuthMiddlewares {

    static get AUTH() {
        return "admin";
    }

    static hasValidAuthorizationToken(req, res, next) {
        if (!(req.headers.authorization && req.headers.authorization === AuthMiddlewares.AUTH)) {//gestion des tokens
            return next({
                status: 401,
                message: "Vous n'êtes pas connecté"
            });
        }
        next();
    }

    static isAdmin(req, res, next) {
        if (!(req.headers.authorization && req.headers.authorization === AuthMiddlewares.AUTH)) {
            res.send(false);
        }
        else {
            res.send(true);
        }
    }

}

module.exports = AuthMiddlewares;