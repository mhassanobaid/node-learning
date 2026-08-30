const express = require("express");

const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  updateUserPartially,
  deleteUser,
} = require("../controllers/user.controller");

const router = express.Router();

router
  .route("/")
  .get(getUsers)
  .post(createUser);

router
  .route("/:id")
  .get(getUserById)
  .put(updateUser)
  .patch(updateUserPartially)
  .delete(deleteUser);

module.exports = router;
