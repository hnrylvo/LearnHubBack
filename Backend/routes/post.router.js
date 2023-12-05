const express = require("express");
const router = express.Router();

const ROLES = require("../data/roles.constants.json");

const { createPostValidator, IdInParamsValidator, saveCommentValidator } = require("../validators/post.validator");
const validateFields = require("../validators/index.middleware");

const { authentication, authorization } = require("../middlewares/auth.middlewares");

const postController = require("../controllers/post.controller");

router.get ("/", postController.findAll);

router.get("/:identifier", IdInParamsValidator, validateFields, saveCommentValidator ,postController.findOneById);

router.post (["/", "/:identifier"], 
authentication,
authorization(ROLES.USER),
createPostValidator, 
IdInParamsValidator,
validateFields, 
postController.save);

router.patch("/visibility/:identifier", 
authentication,
authorization(ROLES.USER),
IdInParamsValidator, 
validateFields,
postController.ToggleHidden)

router.patch("/review/:identifier",
authentication,
authorization(ROLES.USER),
IdInParamsValidator,
saveCommentValidator,
validateFields,
postController.saveComment
);

router.delete("/identifier", 
IdInParamsValidator, 
validateFields, 
postController.deleteById);


module.exports = router;