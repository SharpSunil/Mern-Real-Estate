import express from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { addWishlist, getWishlist, removeWishlist } from "../controllers/wishlish.controllers.js";

const WishlistRouter = express.Router();


WishlistRouter.post("/:propertyId", protect, addWishlist);
WishlistRouter.get("/",protect, getWishlist);
WishlistRouter.delete("/:propertyId", protect, removeWishlist);

export default WishlistRouter;