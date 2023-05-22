/* 
    Rutas de usuarios / Auth
    host + /api/auth
*/
const { Router } = require("express");
const {
  createUser,
  loginUser,
  revalidationToken,
} = require("../controllers/auth");
const { check } = require("express-validator");
const { fieldValidators } = require("../middlewares/field-validators");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.post(
  "/",
  [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe contener 6 caracteres o mas").isLength({
      min: 6,
    }),
    fieldValidators,
  ],
  loginUser
);

router.post(
  "/new",
  [
    //Middelware
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password debe contener 6 caracteres o mas").isLength({
      min: 6,
    }),
    fieldValidators,
  ],
  createUser
);

router.get("/renew", validateJWT, revalidationToken);

module.exports = router;
