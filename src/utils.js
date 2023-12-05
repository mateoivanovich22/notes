import bcrypt from "bcrypt";
import passport from "passport";

export const notFoundURL = (req, res) => {
  return res.status(404).render("error");
};

export const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (err, user, info) {
      if (err) return next(err);
      if (!user) {


        return res.render("logReg", {message: info.message});
      }else{
        req.user = user;
        next();
      }
      
    })(req, res, next);
  };
};

export const createHash = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));

export const isValidPassword = (user, password) =>
  bcrypt.compareSync(password, user.password);
