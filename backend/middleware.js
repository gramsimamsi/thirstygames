/*
In general I guess we can summarize a lot of logic in this file

First I will use it only for JWT as explained in this tutorial -> https://medium.com/dev-bits/a-guide-for-adding-jwt-token-based-authentication-to-your-single-page-nodejs-applications-c403f7cf04f4
 */


/*
ToDo -> move this enum to a far more better fitting location
 */

const userRoles =
    {
      ADMIN: 0,
      BARKEEPER: 1,
      VIEWER: 2,
      SEB_SPRINGER: 3,
      DENIED: 4,
    };

const jwt = require('jsonwebtoken');
const config = require('./jwtConfig');

const checkToken = (req, res, next) => {
  // ToDo remove unnecessary token delivery methods
  //  (whould prefer  req.headers['x-access-token'])
  let token = req.headers['x-access-token']
    || req.headers['authorization']
    || req.body.token
    || req.params.token
    || req.query.token; // token can be passed in multiple ways
  if (token) {
    // ToDo currently necessary because frontend sends token
    //  with " "  -> g means replace all ""
    token = token.replace(/"/g, '');
    jwt.verify(token, config.secret, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          success: false,
          // ToDo remove message
          message: 'Token invalid',
        });
      } else {
        // check if time of expiration is near -> refresh token

        res.locals.user_role = jwt.decode(token).userRole;
        req.decoded = decoded;
        next();
      }
    }
    );
  } else {
    // no token was provided
    return res.status(401).json({
      success: false,
      // ToDo remove message
      message: 'Token not provided',
    });
  }
};


const isAdmin = (req, res, next) => {
  if (res.locals.user_role === userRoles.ADMIN ) {
    next();
  } else {
    return res.status(403).json(
        {
          success: false,
          message: 'Cum backk if u r admin bruuu',
        });
  }
};


// ToDo add check to routes
//  -> currently you need admin-privileges for everything
const isBarkeeper = (req, res, next) => {
  if (res.locals.user_role === userRoles.BARKEEPER
    || res.locals.user_role === userRoles.ADMIN) {
    next();
  } else {
    return res.status(403).json(
        {
          success: false,
          message: 'Cum backk if u r barkeppha bruuu',
        });
  }
};

// export so other modules can use it
module.exports =
    {
      checkToken: checkToken,
      isAdmin: isAdmin,
      isBarkeeper: isBarkeeper,
    };

