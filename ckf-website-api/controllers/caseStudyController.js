import CaseStudy from "../models/CaseStudy.js";

const makeSlug = (value) => {
    return value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
};


// Get all case studies
export const getCaseStudies = async (req, res) => {
    try {
        const caseStudies = await CaseStudy.find({ isDeleted: false });

        return res.status(200).json({
            success: true,
            caseStudies
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Public: get active case studies
export const getPublicCaseStudies = async (req, res) => {
    try {
        const caseStudies = await CaseStudy.find({
            isActive: true,
            isDeleted: false
        })
            .select("title subtitle slug expertContent featureImage")
            .sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            caseStudies
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Public: get active case study by slug
export const getCaseStudyBySlug = async (req, res) => {
    try {
        const caseStudy = await CaseStudy.findOne({
            slug: String(req.params.slug || "").trim().toLowerCase(),
            isActive: true,
            isDeleted: false
        });

        if (!caseStudy) {
            return res.status(404).json({
                success: false,
                message: "Case study not found."
            });
        }

        return res.status(200).json({
            success: true,
            caseStudy
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Get case study by id
export const getCaseStudy = async (req, res) => {
    try {
        const caseStudy = await CaseStudy.findOne({
            _id: req.params.id,
            isDeleted: false
        });

        if (!caseStudy) {
            return res.status(404).json({
                success: false,
                message: "Case study not found."
            });
        }

        return res.status(200).json({
            success: true,
            caseStudy
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Create case study
export const createCaseStudy = async (req, res) => {
    try {
        const {
            title,
            subtitle,
            slug,
            expertContent,
            description,
            featureImage,
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
                message: "Case study title is required."
            });
        }

        const caseStudySlug = makeSlug(slug || title);

        if (!caseStudySlug) {
            return res.status(400).json({
                success: false,
                message: "Valid case study slug is required."
            });
        }

        const exists = await CaseStudy.findOne({
            slug: caseStudySlug,
            isDeleted: false
        });

        if (exists) {
            return res.status(400).json({
                success: false,
                message: "Case study slug already in use."
            });
        }

        const caseStudy = await CaseStudy.create({
            title: title.trim(),
            subtitle: subtitle || "",
            slug: caseStudySlug,
            expertContent: expertContent || "",
            description: description || "",
            featureImage: featureImage || "",
            breadcrumbImage: breadcrumbImage || "",
            seoTitle: seoTitle || "",
            seoDescription: seoDescription || "",
            seoKeywords: seoKeywords || "",
            seoSchema: seoSchema || null,
            isActive: typeof isActive === "boolean" ? isActive : true
        });

        return res.status(201).json({
            success: true,
            message: "Case study created successfully.",
            caseStudy
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Update case study
export const updateCaseStudy = async (req, res) => {
    try {
        const {
            title,
            subtitle,
            slug,
            expertContent,
            description,
            featureImage,
            breadcrumbImage,
            seoTitle,
            seoDescription,
            seoKeywords,
            seoSchema,
            isActive
        } = req.body;

        const caseStudy = await CaseStudy.findOne({
            _id: req.params.id,
            isDeleted: false
        });

        if (!caseStudy) {
            return res.status(404).json({
                success: false,
                message: "Case study not found."
            });
        }

        if (title) caseStudy.title = title.trim();

        if (slug || title) {
            const caseStudySlug = makeSlug(slug || title || caseStudy.title);

            const exists = await CaseStudy.findOne({
                slug: caseStudySlug,
                isDeleted: false,
                _id: { $ne: caseStudy._id }
            });

            if (exists) {
                return res.status(400).json({
                    success: false,
                    message: "Case study slug already in use."
                });
            }

            caseStudy.slug = caseStudySlug;
        }

        if (subtitle !== undefined) caseStudy.subtitle = subtitle;
        if (expertContent !== undefined) caseStudy.expertContent = expertContent;
        if (description !== undefined) caseStudy.description = description;
        if (featureImage !== undefined) caseStudy.featureImage = featureImage;
        if (breadcrumbImage !== undefined) caseStudy.breadcrumbImage = breadcrumbImage;
        if (seoTitle !== undefined) caseStudy.seoTitle = seoTitle;
        if (seoDescription !== undefined) caseStudy.seoDescription = seoDescription;
        if (seoKeywords !== undefined) caseStudy.seoKeywords = seoKeywords;
        if (seoSchema !== undefined) caseStudy.seoSchema = seoSchema;
        if (typeof isActive === "boolean") caseStudy.isActive = isActive;

        await caseStudy.save();

        return res.status(200).json({
            success: true,
            message: "Case study updated successfully.",
            caseStudy
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Update case study status
export const updateCaseStudyStatus = async (req, res) => {
    try {
        const { isActive } = req.body;

        if (typeof isActive !== "boolean") {
            return res.status(400).json({
                success: false,
                message: "isActive must be true or false."
            });
        }

        const caseStudy = await CaseStudy.findOne({
            _id: req.params.id,
            isDeleted: false
        });

        if (!caseStudy) {
            return res.status(404).json({
                success: false,
                message: "Case study not found."
            });
        }

        caseStudy.isActive = isActive;
        await caseStudy.save();

        return res.status(200).json({
            success: true,
            message: `Case study ${isActive ? "activated" : "deactivated"} successfully.`,
            caseStudy
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Delete case study
export const deleteCaseStudy = async (req, res) => {
    try {
        const caseStudy = await CaseStudy.findOne({
            _id: req.params.id,
            isDeleted: false
        });

        if (!caseStudy) {
            return res.status(404).json({
                success: false,
                message: "Case study not found."
            });
        }

        await CaseStudy.deleteOne({ _id: caseStudy._id });

        return res.status(200).json({
            success: true,
            message: "Case study deleted successfully."
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
