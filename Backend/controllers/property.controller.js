import Property from "../models/property.model.js";
import Inquiry from "../models/inquiry.model.js";



//Add a Property
export const addProperty = async (req, res) => {
    try {
        let imageUrls = [];
        if (req.files && req.files.length > 0) {
            for (let file of req.files) {
                const result = await uploadToCloudinary(file.buffer);
                imageUrls.push(result.secure_url);
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
            seller: req.user._id, //as seller can only create the property
            amenities: req.body.amenities ? Array.isArray(req.body.amenities) ? req.body.amenities : (() => {
                try {
                    return JSON.parse(req.body.amenities);
                } catch (e) {
                    return req.body.amenities.split(",");

                }
            })() : [],

        });
        res.json({
            success: true,
            property,
            message: "Property added successfully",
        })

    } catch (error) {
        console.error("Error adding property: ", error);
        res.status(500).json({
            success: false,
            message: error.message || "Internal server error while adding property",


        })
    }
}

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
                newImages.push(result.secure_url);
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
        for (let imageUrl of property.images) {
            const publicId = imageUrl.split("/").pop().split(".")[0];
            await cloudinary.uploader.destroy("properties/" + publicId);
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
            status: "sale",
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
try{
    const property = await 

}catch(error){
    console.error("Error fetching property details: ", error);
    res.status(500).json({
        success: false,
        message: "Internal server error while fetching property details",
        error: error.message,
    })

}
}
