import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true,
        },

        slug: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
        },

        heading: {
            type: String,
            default: "",
            trim: true,
        },

        breadcrumbImage: {
            type: String,
            default: "",
            trim: true,
        },

        seoTitle: {
            type: String,
            default: "",
            trim: true,
        },

        seoDescription: {
            type: String,
            default: "",
            trim: true,
        },

        seoKeywords: {
            type: String,
            default: "",
            trim: true,
        },

        seoSchema: {
            type: mongoose.Schema.Types.Mixed,
            default: null,
        },

        content: {
            type: String,
            default: "",
        },

        isActive: {
            type: Boolean,
            default: true,
        },

        isDeleted: {
            type: Boolean,
            default: false,
        },
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Service", serviceSchema);
