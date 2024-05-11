import { Router } from "express";
import {upload} from "../middlewares/multer.middleware.js"
import { 
    changeCurrentPassword, 
    getChannelProfile, 
    getCurrentUser, 
    getWatchHistory, 
    loginUser, 
    logoutUser, 
    refreshAccessToken, 
    registerUser, 
    updateAccountDetails, 
    updateUserAvatar, 
    updateUserCoverImage 
} from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1,
        },
        {
            name: "coverImage",
            maxCount: 1,
        }
    ]),
    registerUser
)

router.route("/login").post(loginUser)


// Secured routes
router.route("/logout").post(
    verifyJWT,logoutUser
);
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account").patch(upload.none() , verifyJWT, updateAccountDetails)
router.route("/update-avatar").patch(verifyJWT, upload.single("avatar") ,updateUserAvatar)
router.route("/update-cover").patch(verifyJWT, upload.single("coverImage") ,updateUserCoverImage)
router.route("/channel/:channelId").get(getChannelProfile)
router.route("/history").get(verifyJWT, getWatchHistory)

export default router

