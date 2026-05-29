import Inquiry from "../models/inquiry.model.js";
import Property from "../models/property.model.js";


//buyer send inquiry
export const sendInquiry = async(req, res) =>{
    try{
        const {PropertyId, message} = req.body;
        const property = await Property.findById(PropertyId).populate("seller");
        
        if(!property){
            return res.status(404).json({
             success:false,
             message:"Property not Found",
             

            })
        }
        const inquiry = await Inquiry.create({
            property
        })

    }catch(error){
        
    }
}