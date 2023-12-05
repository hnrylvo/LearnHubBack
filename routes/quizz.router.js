const express = require("express");
const router = express.Router();

const ROLES = require("../data/roles.constants.json");

const { createQuizzValidator } = require("../validators/quizz.validator");
const quizzController = require("../controllers/quizz.controller");
const { authentication, authorization,  } = require("../middlewares/auth.middlewares");

router.post(["/", "/:identifier"],
authentication,
authorization(ROLES.INSTRUCTOR),
quizzController.create,
createQuizzValidator,
);

router.get("/",
quizzController.findAll,
);

router.get("/:identifier",
quizzController.findOneById,
);

module.exports = router;