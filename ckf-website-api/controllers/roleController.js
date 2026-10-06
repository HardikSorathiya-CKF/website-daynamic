import Role from "../models/Role.js";

const ALL_PERMISSIONS = [
    "user.view",
    "user.create",
    "user.update",
    "user.delete",
    "user.status",
    "role.view",
    "role.create",
    "role.update",
    "role.delete",
    "role.assign",
    "page.view",
    "page.create",
    "page.update",
    "page.delete",
    "page.status",
    "casestudy.view",
    "casestudy.create",
    "casestudy.update",
    "casestudy.delete",
    "casestudy.status",
];

const makeKey = (name) => {
    return name.trim().toLowerCase().replace(/\s+/g, "");
};

const cleanPermissions = (permissions) => {
    if (!permissions) return [];

    const list = Array.isArray(permissions) ? permissions : [permissions];

    return list.filter((item) => ALL_PERMISSIONS.includes(item));
};


// Get all permissions
export const getPermissions = async (req, res) => {
    try {
        return res.status(200).json({
            success: true,
            permissions: ALL_PERMISSIONS
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Get all roles
export const getRoles = async (req, res) => {
    try {
        const roles = await Role.find({ isDeleted: false });

        return res.status(200).json({
            success: true,
            roles
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Get role by id
export const getRole = async (req, res) => {
    try {
        const role = await Role.findOne({
            _id: req.params.id,
            isDeleted: false
        });

        if (!role) {
            return res.status(404).json({
                success: false,
                message: "Role not found."
            });
        }

        return res.status(200).json({
            success: true,
            role
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Create role
export const createRole = async (req, res) => {
    try {
        const { name, key, permissions, isActive } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Role name is required."
            });
        }

        const roleKey = (key || makeKey(name)).toLowerCase();

        const exists = await Role.findOne({
            key: roleKey,
            isDeleted: false
        });

        if (exists) {
            return res.status(400).json({
                success: false,
                message: "Role already exists."
            });
        }

        const role = await Role.create({
            name: name.trim(),
            key: roleKey,
            permissions: cleanPermissions(permissions),
            isActive: typeof isActive === "boolean" ? isActive : true
        });

        return res.status(201).json({
            success: true,
            message: "Role created successfully.",
            role
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Update role
export const updateRole = async (req, res) => {
    try {
        const { name, key, permissions, isActive } = req.body;

        const role = await Role.findOne({
            _id: req.params.id,
            isDeleted: false
        });

        if (!role) {
            return res.status(404).json({
                success: false,
                message: "Role not found."
            });
        }

        if (name) role.name = name.trim();

        if (key || name) {
            const roleKey = (key || makeKey(name || role.name)).toLowerCase();

            const exists = await Role.findOne({
                key: roleKey,
                isDeleted: false,
                _id: { $ne: role._id }
            });

            if (exists) {
                return res.status(400).json({
                    success: false,
                    message: "Role already exists."
                });
            }

            role.key = roleKey;
        }

        if (typeof isActive === "boolean") role.isActive = isActive;
        if (permissions !== undefined) role.permissions = cleanPermissions(permissions);

        await role.save();

        return res.status(200).json({
            success: true,
            message: "Role updated successfully.",
            role
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Assign permissions to role
export const assignPermissions = async (req, res) => {
    try {
        const { permissions } = req.body;

        if (!Array.isArray(permissions)) {
            return res.status(400).json({
                success: false,
                message: "Permissions must be an array."
            });
        }

        const role = await Role.findOne({
            _id: req.params.id,
            isDeleted: false
        });

        if (!role) {
            return res.status(404).json({
                success: false,
                message: "Role not found."
            });
        }

        role.permissions = cleanPermissions(permissions);
        await role.save();

        return res.status(200).json({
            success: true,
            message: "Permissions assigned successfully.",
            role
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Update role status
export const updateRoleStatus = async (req, res) => {
    try {
        const { isActive } = req.body;

        if (typeof isActive !== "boolean") {
            return res.status(400).json({
                success: false,
                message: "isActive must be true or false."
            });
        }

        const role = await Role.findOne({
            _id: req.params.id,
            isDeleted: false
        });

        if (!role) {
            return res.status(404).json({
                success: false,
                message: "Role not found."
            });
        }

        role.isActive = isActive;
        await role.save();

        return res.status(200).json({
            success: true,
            message: `Role ${isActive ? "activated" : "deactivated"} successfully.`,
            role
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Delete role
export const deleteRole = async (req, res) => {
    try {
        const role = await Role.findOne({
            _id: req.params.id,
            isDeleted: false
        });

        if (!role) {
            return res.status(404).json({
                success: false,
                message: "Role not found."
            });
        }

        if (role.key === "superadmin") {
            return res.status(400).json({
                success: false,
                message: "Superadmin role cannot be deleted."
            });
        }

        await Role.deleteOne({ _id: role._id });

        return res.status(200).json({
            success: true,
            message: "Role deleted successfully."
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
