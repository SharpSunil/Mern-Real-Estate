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
            bhk: req.body.bhk,
            bathrooms: req.body.bathrooms,
        })

    } catch (error) {
        console.error("Error adding property: ", error);
        res.status(500).json({
            success: false,
            message: "Failed to add Propery",
            error: error.message

        })
    }
}