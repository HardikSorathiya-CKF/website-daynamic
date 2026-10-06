import Page from "../models/Page.js";

const makeSlug = (value) => {
    return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
};


// Get all pages
export const getPages = async (req, res) => {
    try {
        const pages = await Page.find({ isDeleted: false });

        return res.status(200).json({
            success: true,
            pages
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Public: get active page SEO by slug
export const getPageBySlug = async (req, res) => {
    try {
        const page = await Page.findOne({
            slug: String(req.params.slug || "").trim().toLowerCase(),
            isActive: true,
            isDeleted: false
        }).select("title slug heading breadcrumbImage seoTitle seoDescription seoKeywords seoSchema");

        if (!page) {
            return res.status(404).json({
                success: false,
                message: "Page not found."
            });
        }

        return res.status(200).json({
            success: true,
            page
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Get page by id
export const getPage = async (req, res) => {
    try {
        const page = await Page.findOne({
            _id: req.params.id,
            isDeleted: false
        });

        if (!page) {
            return res.status(404).json({
                success: false,
                message: "Page not found."
            });
        }

        return res.status(200).json({
            success: true,
            page
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Create page
export const createPage = async (req, res) => {
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
            isActive
        } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Page title is required."
            });
        }

        const pageSlug = makeSlug(slug || title);

        if (!pageSlug) {
            return res.status(400).json({
                success: false,
                message: "Valid page slug is required."
            });
        }

        const exists = await Page.findOne({
            slug: pageSlug,
            isDeleted: false
        });

        if (exists) {
            return res.status(400).json({
                success: false,
                message: "Page slug already in use."
            });
        }

        const page = await Page.create({
            title: title.trim(),
            slug: pageSlug,
            heading: heading || "",
            breadcrumbImage: breadcrumbImage || "",
            seoTitle: seoTitle || "",
            seoDescription: seoDescription || "",
            seoKeywords: seoKeywords || "",
            seoSchema: seoSchema || null,
            isActive: typeof isActive === "boolean" ? isActive : true
        });

        return res.status(201).json({
            success: true,
            message: "Page created successfully.",
            page
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Update page
export const updatePage = async (req, res) => {
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
            isActive
        } = req.body;

        const page = await Page.findOne({
            _id: req.params.id,
            isDeleted: false
        });

        if (!page) {
            return res.status(404).json({
                success: false,
                message: "Page not found."
            });
        }

        if (title) page.title = title.trim();

        if (slug || title) {
            const pageSlug = makeSlug(slug || title || page.title);

            const exists = await Page.findOne({
                slug: pageSlug,
                isDeleted: false,
                _id: { $ne: page._id }
            });

            if (exists) {
                return res.status(400).json({
                    success: false,
                    message: "Page slug already in use."
                });
            }

            page.slug = pageSlug;
        }

        if (heading !== undefined) page.heading = heading;
        if (breadcrumbImage !== undefined) page.breadcrumbImage = breadcrumbImage;
        if (seoTitle !== undefined) page.seoTitle = seoTitle;
        if (seoDescription !== undefined) page.seoDescription = seoDescription;
        if (seoKeywords !== undefined) page.seoKeywords = seoKeywords;
        if (seoSchema !== undefined) page.seoSchema = seoSchema;
        if (typeof isActive === "boolean") page.isActive = isActive;

        await page.save();

        return res.status(200).json({
            success: true,
            message: "Page updated successfully.",
            page
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Update page status
export const updatePageStatus = async (req, res) => {
    try {
        const { isActive } = req.body;

        if (typeof isActive !== "boolean") {
            return res.status(400).json({
                success: false,
                message: "isActive must be true or false."
            });
        }

        const page = await Page.findOne({
            _id: req.params.id,
            isDeleted: false
        });

        if (!page) {
            return res.status(404).json({
                success: false,
                message: "Page not found."
            });
        }

        page.isActive = isActive;
        await page.save();

        return res.status(200).json({
            success: true,
            message: `Page ${isActive ? "activated" : "deactivated"} successfully.`,
            page
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Delete page
export const deletePage = async (req, res) => {
    try {
        const page = await Page.findOne({
            _id: req.params.id,
            isDeleted: false
        });

        if (!page) {
            return res.status(404).json({
                success: false,
                message: "Page not found."
            });
        }

        await Page.deleteOne({ _id: page._id });

        return res.status(200).json({
            success: true,
            message: "Page deleted successfully."
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
