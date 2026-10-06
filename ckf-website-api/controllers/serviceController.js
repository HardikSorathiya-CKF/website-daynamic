import Service from "../models/Service.js";

const makeSlug = (value) => {
    return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
};


// Get all services
export const getServices = async (req, res) => {
    try {
        const services = await Service.find({ isDeleted: false }).sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            services
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Public: get active services
export const getPublicServices = async (req, res) => {
    try {
        const services = await Service.find({
            isActive: true,
            isDeleted: false
        })
            .select("title slug heading breadcrumbImage")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            services
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Public: get active service by slug
export const getServiceBySlug = async (req, res) => {
    try {
        const service = await Service.findOne({
            slug: String(req.params.slug || "").trim().toLowerCase(),
            isActive: true,
            isDeleted: false
        });

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found."
            });
        }

        return res.status(200).json({
            success: true,
            service
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Get service by id
export const getService = async (req, res) => {
    try {
        const service = await Service.findOne({
            _id: req.params.id,
            isDeleted: false
        });

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found."
            });
        }

        return res.status(200).json({
            success: true,
            service
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Create service
export const createService = async (req, res) => {
    try {
        const {
            title,
            slug,
            heading,
            breadcrumbImage,
            seoTitle,
            seoDescription,
            seoKeywords,
            seoSchema,
            content,
            isActive
        } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Service title is required."
            });
        }

        const serviceSlug = makeSlug(slug || title);

        if (!serviceSlug) {
            return res.status(400).json({
                success: false,
                message: "Valid service slug is required."
            });
        }

        const exists = await Service.findOne({
            slug: serviceSlug,
            isDeleted: false
        });

        if (exists) {
            return res.status(400).json({
                success: false,
                message: "Service slug already in use."
            });
        }

        const service = await Service.create({
            title: title.trim(),
            slug: serviceSlug,
            heading: heading || "",
            breadcrumbImage: breadcrumbImage || "",
            seoTitle: seoTitle || "",
            seoDescription: seoDescription || "",
            seoKeywords: seoKeywords || "",
            seoSchema: seoSchema || null,
            content: content || "",
            isActive: typeof isActive === "boolean" ? isActive : true
        });

        return res.status(201).json({
            success: true,
            message: "Service created successfully.",
            service
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Update service
export const updateService = async (req, res) => {
    try {
        const {
            title,
            slug,
            heading,
            breadcrumbImage,
            seoTitle,
            seoDescription,
            seoKeywords,
            seoSchema,
            content,
            isActive
        } = req.body;

        const service = await Service.findOne({
            _id: req.params.id,
            isDeleted: false
        });

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found."
            });
        }

        if (title) service.title = title.trim();

        if (slug || title) {
            const serviceSlug = makeSlug(slug || title || service.title);

            const exists = await Service.findOne({
                slug: serviceSlug,
                isDeleted: false,
                _id: { $ne: service._id }
            });

            if (exists) {
                return res.status(400).json({
                    success: false,
                    message: "Service slug already in use."
                });
            }

            service.slug = serviceSlug;
        }

        if (heading !== undefined) service.heading = heading;
        if (breadcrumbImage !== undefined) service.breadcrumbImage = breadcrumbImage;
        if (seoTitle !== undefined) service.seoTitle = seoTitle;
        if (seoDescription !== undefined) service.seoDescription = seoDescription;
        if (seoKeywords !== undefined) service.seoKeywords = seoKeywords;
        if (seoSchema !== undefined) service.seoSchema = seoSchema;
        if (content !== undefined) service.content = content;
        if (typeof isActive === "boolean") service.isActive = isActive;

        await service.save();

        return res.status(200).json({
            success: true,
            message: "Service updated successfully.",
            service
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Update service status
export const updateServiceStatus = async (req, res) => {
    try {
        const { isActive } = req.body;

        if (typeof isActive !== "boolean") {
            return res.status(400).json({
                success: false,
                message: "isActive must be true or false."
            });
        }

        const service = await Service.findOne({
            _id: req.params.id,
            isDeleted: false
        });

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found."
            });
        }

        service.isActive = isActive;
        await service.save();

        return res.status(200).json({
            success: true,
            message: `Service ${isActive ? "activated" : "deactivated"} successfully.`,
            service
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Delete service
export const deleteService = async (req, res) => {
    try {
        const service = await Service.findOne({
            _id: req.params.id,
            isDeleted: false
        });

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found."
            });
        }

        await Service.deleteOne({ _id: service._id });

        return res.status(200).json({
            success: true,
            message: "Service deleted successfully."
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
