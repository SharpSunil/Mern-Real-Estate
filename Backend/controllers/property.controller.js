import Property from "../models/property.model.js";
import Inquiry from "../models/inquiry.model.js";
import jwt from "jsonwebtoken";
import User from "../models/usermodel.js";
import Chat from "../models/chat.model.js";
import cloudinary from "../config/cloudinary.js";
import { uploadToCloudinary } from "../utils/uploadToCloudinary.js";
//Add a Property


export const addProperty = async (req, res) => {
    try {

        const seller = await User.findById(req.user._id);

        if (!seller) {
            return res.status(404).json({
                success: false,
                message: "Seller not found"
            });
        }

        if (!seller.isApproved) {
            return res.status(403).json({
                success: false,
                message: "Your seller account is pending admin approval."
            });
        }

        let imageUrls = [];

        if (req.files && req.files.length > 0) {
            for (const file of req.files) {
                const result = await uploadToCloudinary(
                    file.buffer,
                    "properties"
                );
                imageUrls.push({
                    url: result.secure_url,
                    public_id: result.public_id,
                });
            }
        }

        const property = await Property.create({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            city: req.body.city,
            area: req.body.area,
            pincode: req.body.pincode,
            propertyType: req.body.propertyType,
            bhk: req.body.bhk ? String(req.body.bhk) : undefined,
            bathrooms: req.body.bathrooms ? Number(req.body.bathrooms) : undefined,
            areaSize: req.body.areaSize ? Number(req.body.areaSize) : undefined,
            furnishing: req.body.furnishing,
            status: req.body.status,
            images: imageUrls,
            seller: req.user._id,
            amenities: req.body.amenities
                ? Array.isArray(req.body.amenities)
                    ? req.body.amenities
                    : (() => {
                        try {
                            return JSON.parse(req.body.amenities);
                        } catch {
                            return req.body.amenities.split(",");
                        }
                    })()
                : [],
        });

        res.json({
            success: true,
            property,
            message: "Property added successfully",
        });

    } catch (error) {
        console.error("Error adding property:", error);

        res.status(500).json({
            success: false,
            message: error.message || "Internal server error while adding property",
        });
    }
};

//Get all properties
export const getMyProperties = async (req, res) => {
    try {
        const properties = await Property.find({
            seller: req.user._id,
        });
        res.json({
            sucess: true,
            properties
        })
    } catch (error) {
        console.error("Error fetching properties: ", error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error while fetching properties",
        })
    }
}

//update a perticular property
export const updateProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found",
            })
        }
        if (property.seller.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized to update this property",
            })
        }
        const fileds = [
            "title",
            "description",
            "price",
            "city",
            "area",
            "pincode",
            "propertyType",
            "bhk",
            "bathrooms",
            "areaSize",
            "furnishing",
            "status",
            "amenities",

        ];
        fileds.forEach((field) => {
            if (req.body[field] !== undefined) {
                if (field === "amenities" && typeof req.body[field] === "string") {
                    try {
                        property[field] = JSON.parse(req.body[field]);
                    } catch (e) {
                        property[field] = req.body[field].split(",");
                    }
                } else {
                    property[field] = req.body[field];
                }
            }
        });
        //image handeling
        if (req.body.existingImages) {
            try {
                const existing = JSON.parse(req.body.existingImages);
                property.images = Array.isArray(existing) ? existing : property.images;

            } catch (e) {
                console.error("Error parsing existing images: ", e);
            }
        }//delete existing images

        //upload new images of exis the old one 
        if (req.files && req.files.length > 0) {
            let newImages = [];
            for (let file of req.files) {
                const result = await uploadToCloudinary(file.buffer, "properties");
                newImages.push(
                    {
                        url: result.secure_url,
                        public_id: result.public_id,
                    }
                );
            }
            property.images = [...property.images, ...newImages];
        }
        await property.save();
        res.json({
            success: true,
            property,//updated property
            message: "Property updated successfully",
        })

    } catch (error) {
        console.error("Error updating property: ", error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error while updating property",
        })
    }
}

//delete a perticular property
export const deleteProperty = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found",
            })
        }

        //check if the user is the owner of the property
        if (property.seller.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Not Authorized",
            })
        }


        //delete the image from cloudinary
        for (const image of property.images) {
            await cloudinary.uploader.destroy(
                image.public_id
            );
        }
        await property.deleteOne();
        res.json({
            success: true,
            message: "property Image deleted successfully",
        })
    } catch (error) {
        console.error("Error deleting property: ", error);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}

//update property status
export const updatePropertyStatus = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id);
        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found",
            })
        }

        //check the Ownership
        if (property.seller.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                success: false,
                message: "Not Authorized",
            })
        }
        property.status = req.body.status;
        await property.save();
        res.json({
            success: true,

            message: "Property status updated successfully",
            property,
        })
    } catch (error) {
        console.error("Error updating property status: ", error);
        res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}


//to get all the properties 
export const getAllProperties = async (req, res) => {
    try {
        const { city, area, pincode, propertyType, bhk, furnishing, status, minPrice, maxPrice, amenities, sort, seller } = req.query;
        let query = {
            status: "available",
        }

        if (seller) {
            query.seller = seller;
        }
        if (city) {
            query.city = new RegExp(city, "i");
        }
        if (area) {
            query.area = new RegExp(area, "i");
        }
        if (pincode) {
            query.pincode = pincode;
        }
        if (propertyType) {
            query.propertyType = { $in: propertyType.toString().split(",") };
        }
        if (bhk) {
            if (bhk === "5+") {
                query.bhk = { $gte: 5 };
            } else {
                query.bhk = bhk;
            }
        }
        if (furnishing) {
            const furnishingArray = furnishing.split(",");
            query.furnishing = {
                $in: furnishingArray.map((f) => new RegExp(`^${f.trim()}$`, "i")),
            };
        }
        if (status) {
            query.status = status;
        }
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice && !isNaN(minPrice)) query.price.$gte = Number(minPrice);
            if (maxPrice && !isNaN(maxPrice)) query.price.$lte = Number(maxPrice);
            if (Object.keys(query.price).length === 0) delete query.price;
        }
        if (amenities) {
            query.amenities = {
                $in: amenities.split(",").map((a) => a.trim()),
            };

        }

        let sortOption = { createdAt: -1 };
        if (sort === "priceLow") sortOption = { price: 1 };
        if (sort === "priceHigh") sortOption = { price: -1 };
        if (sort === "latest") sortOption = { createdAt: -1 };

        const properties = await Property.find(query).populate("seller", "name phone profilePic").sort(sortOption);
        res.json({
            success: true,
            count: properties.length, //for number of properties
            properties,
        })
    } catch (error) {
        console.error("Error fetching all properties: ", error);
        res.status(500).json({
            success: false,
            message: "Internal server error while fetching properties",
            error: error.message,
        })
    }
}


//to get a properties details
export const getPropertyDetails = async (req, res) => {
    try {
        const property = await Property.findById(req.params.id).populate("seller", "name email phone profilePic isApproved isVerified");
        if (!property) {
            return res.status(404).json({
                success: false,
                message: "Property not found",
            })
        }
        //unique view tracking by id
        let visitorId = req.ip;
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith("Bearer ")) {
            try {
                const token = authHeader.split(" ")[1];
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
                visitorId = decoded.id;
            }
            catch (error) {
                console.error("Error verifying JWT token: ", error);
            }
        }
        console.log("Property Seller:", property.seller);

        const isSellerChecking =
            property.seller?._id?.toString() === visitorId;

        //only increment the view if not seller but if he edit then increase the view 
        if (!isSellerChecking && !property.viewedBy.includes(visitorId)) {
            property.views += 1;
            property.viewedBy.push(visitorId);
            await property.save();
        }
        const similarProperties = await Property.find({
            _id: { $ne: property._id },
            city: property.city,
            propertyType: property.propertyType,
            status: property.status,
        })
            .limit(4)
            .select("title price images city area propertyType bhk areaSize status");
        res.json({
            success: true,
            property,
            similarProperties,
        })

    } catch (error) {
        console.error("Error fetching property details: ", error);
        res.status(500).json({
            success: false,
            message: "Internal server error while fetching property details",
            error: error.message,
        })

    }
}



// ==========================================
// Seller Dashboard
// ==========================================



export const getSellerDashboard = async (req, res) => {

    try {

        const sellerId = req.user._id;

        // ===============================
        // Property Counts
        // ===============================

        const totalProperties = await Property.countDocuments({
            seller: sellerId,
        });

        const activeListings = await Property.countDocuments({
            seller: sellerId,
            status: "available",
        });

        const soldProperties = await Property.countDocuments({
            seller: sellerId,
            status: "sold",
        });

        // ===============================
        // Inquiry Count
        // ===============================

        const totalInquiries = await Inquiry.countDocuments({
            seller: sellerId,
        });

        // ===============================
        // Unread Chats
        // ===============================

        const chats = await Chat.find({
            seller: sellerId,
        });

        let unreadChats = 0;

        chats.forEach((chat) => {

            unreadChats += chat.unreadForSeller;

        });

        // ===============================
        // Total Views
        // ===============================

        const views = await Property.aggregate([
            {
                $match: {
                    seller: sellerId,
                },
            },
            {
                $group: {
                    _id: null,
                    totalViews: {
                        $sum: "$views",
                    },
                },
            },
        ]);

        const totalViews =
            views.length > 0
                ? views[0].totalViews
                : 0;

        // ===============================
        // Recent Properties
        // ===============================

        const recentProperties = await Property.find({
            seller: sellerId,
        })
            .sort({ createdAt: -1 })
            .limit(5)
            .select("title createdAt");

        // ===============================
        // Response
        // ===============================

        res.json({

            success: true,

            stats: {

                totalProperties,

                activeListings,

                soldProperties,

                totalInquiries,

                unreadChats,

                totalViews,

                recentActivity: recentProperties,

            },

        });

    }

    catch (error) {

        console.error(error);

        res.status(500).json({

            success: false,

            message: error.message,

        });

    }

};



//get property counts by type
export const getPropertyCounts = async (req, res) => {
    try {
        const counts = await Property.aggregate([
            { $match: { status: "available" } },
            { $group: { _id: "$propertyType", count: { $sum: 1 } } }
        ]);
        const formattedCounts = counts.reduce((acc, curr) => {
            acc[curr._id] = curr.count;
            return acc;
        }, {});
        res.json({
            success: true,
            counts: formattedCounts
        })
    } catch (error) {
        console.error("Error fetching property counts: ", error);
        res.status(500).json({
            success: false,
            message: "Internal server error while fetching property counts",
            error: error.message,
        })
    }
}


// ==========================================
// Delete Single Property Image
// ==========================================

export const deletePropertyImage = async (req, res) => {

    try {

        const { propertyId, imageId } = req.params;

        const property = await Property.findById(propertyId);

        if (!property) {

            return res.status(404).json({
                success: false,
                message: "Property not found",
            });

        }

        // Check owner
        if (property.seller.toString() !== req.user._id.toString()) {

            return res.status(403).json({
                success: false,
                message: "Not Authorized",
            });

        }

        // Find image
        const image = property.images.id(imageId);

        if (!image) {

            return res.status(404).json({
                success: false,
                message: "Image not found",
            });

        }

        // Delete from Cloudinary
        await cloudinary.uploader.destroy(image.public_id);

        // Remove from MongoDB
        property.images.pull(imageId);

        await property.save();

        res.json({
            success: true,
            message: "Image deleted successfully",
            property,
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};