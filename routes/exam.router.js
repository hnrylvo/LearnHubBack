const express = require("express");
const router = express.Router();

const ROLES = require("../data/roles.constants.json");

const examController = require("../controllers/exam.controller");
const { authentication, authorization,  } = require("../middlewares/auth.middlewares");

router.post(["/", "/:identifier"],
authentication,
authorization(ROLES.INSTRUCTOR),
examController.create,
);

router.get("/",
examController.findAll,
);

router.get("/:identifier",
examController.findOneById,
);

module.exports = router;