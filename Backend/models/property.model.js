import mangoose from "mongoose";

const propertySchema = new mangoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    area: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
    propertyType: {
        type: String,
        enum: ["flat", "appartment", "villa", "house", "studio", "penthouse", "penthouse", "bungalow", "duplex", "loft", "cottage", "farmhouse", "ranch", "townhouse", "condo", "land", "commercial", "industrial", "mixed-use", "other"],
        required: true,
    },
    bhk: {
        type: String,
    },
    bathrooms: {
        type: Number,
    },
    areaSize: {
        type: Number,
    },
    furnishing: {
        type: String,
        enum: ["furnished", "semi-furnished", "unfurnished"],
    },
    amenities: [{
        type: String,
    }],
    status: {
        type: String,
        enum: ["available", "sold"],

    },
    images: [{ type: String }],
    seller: {
        type: mangoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },//seller id get from user model
    isVerified: {
        type: Boolean,
        default: false,
    },
    views: {
        type: Number,
        default: 0,
    },
    viewdBy: [{ type: String }],
},{
    timestamps: true
}

);

const Property = mongoose.model("Property", propertySchema);
export default Property;