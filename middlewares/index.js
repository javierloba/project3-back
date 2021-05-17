module.exports = {
    isLoggedIn: (req, res, next) => {
        if(req.isAuthenticated()) {
            next();
        } else {
            res.status(418).json();
        }
    },
    isLoggedOut: (req, res, next) => {
        if(!req.isAuthenticated()) {
            next();
        }
    },
    checkRole: (role) => (req, res, next) => {
        if(req.isAuthenticated() && req.user.role === role){
          next()
        } else {
            res.status(418).json();
        }
      }

}