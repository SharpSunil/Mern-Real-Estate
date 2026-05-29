import Wishlist from "../models/wishlist.model.js";


//add to perticular property in wishlish

export const addWishlist = async (req, res) => {
    try {
        const propertyId = req.params.propertyId;
        const existing = await Wishlist.findOne({
            user: req.user._id,
            property: propertyId
        });

        if (existing) {
            return res.status(200)({
                success: true,
                message: "Already in the Wishlist"
            })
        }
        await Wishlist.create({
            user: req.user._id,
            property: propertyId
        });
        res.status(201).json({
            success: true,
            Message: "Add it to the Wishlist"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

//to get the property that is in wishlisht

export const getWishlist = async (req, res) => {
    try {
        const data = await Wishlist.find({
            user: req.user._id,
        }).populate("property");

        res.status(200).json({
            success: true,
            data
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

//to remove a perticular property form the wishlist 

export const removeWishlist = async (req, res) => {
    try {
        const propertyId = req.params.propertyId;
        const result = await Wishlist.findOneAndDelete({
            user: req.user._id,
            property: propertyId
        });

        if (!result) {
            return res.status(404).json({
                success: false,
                message: "Wishlist item not found"
            });
        }
            return res.status(200).json({
                success: true,
                message: "Removed from Wishlist"
            })
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message

        })
    }
}