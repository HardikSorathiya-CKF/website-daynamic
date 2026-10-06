import bcrypt from "bcryptjs";
import User from "../models/User.js";
import Role from "../models/Role.js";


// Get all users
export const getUsers = async (req, res) => {
    try {
        const users = await User.find({ isDeleted: false }).select("-password");

        return res.status(200).json({
            success: true,
            users
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Get user by id
export const getUser = async (req, res) => {
    try {
        const user = await User.findOne({
            _id: req.params.id,
            isDeleted: false
        }).select("-password");

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        return res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Create user
export const createUser = async (req, res) => {
    try {
        const { name, email, password, role, phone, avatar, isActive } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({
                success: false,
                message: "Name, email, password and role are required."
            });
        }

        const exists = await User.findOne({ email: email.toLowerCase() });

        if (exists) {
            return res.status(400).json({
                success: false,
                message: "Email already in use."
            });
        }

        const roleExists = await Role.findOne({
            key: role.toLowerCase(),
            isDeleted: false,
            isActive: true
        });

        if (!roleExists) {
            return res.status(400).json({
                success: false,
                message: "Role not found."
            });
        }

        const user = await User.create({
            name: name.trim(),
            email: email.toLowerCase(),
            password: await bcrypt.hash(password, 10),
            role,
            phone: phone || "",
            avatar: avatar || "",
            isActive: typeof isActive === "boolean" ? isActive : true
        });

        return res.status(201).json({
            success: true,
            message: "User created successfully.",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                avatar: user.avatar,
                isActive: user.isActive
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Update user
export const updateUser = async (req, res) => {
    try {
        const { name, email, role, phone, avatar, isActive } = req.body;

        const user = await User.findOne({
            _id: req.params.id,
            isDeleted: false
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        if (email && email.toLowerCase() !== user.email) {
            const exists = await User.findOne({ email: email.toLowerCase() });
            if (exists) {
                return res.status(400).json({
                    success: false,
                    message: "Email already in use."
                });
            }
            user.email = email.toLowerCase();
        }

        if (name) user.name = name.trim();
        if (role) {
            const roleExists = await Role.findOne({
                key: role.toLowerCase(),
                isDeleted: false,
                isActive: true
            });

            if (!roleExists) {
                return res.status(400).json({
                    success: false,
                    message: "Role not found."
                });
            }

            user.role = role.toLowerCase();
        }
        if (phone !== undefined) user.phone = phone;
        if (avatar !== undefined) user.avatar = avatar;
        if (typeof isActive === "boolean") user.isActive = isActive;

        await user.save();

        return res.status(200).json({
            success: true,
            message: "User updated successfully.",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                phone: user.phone,
                avatar: user.avatar,
                isActive: user.isActive
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Update user status
export const updateUserStatus = async (req, res) => {
    try {
        const { isActive } = req.body;

        if (typeof isActive !== "boolean") {
            return res.status(400).json({
                success: false,
                message: "isActive must be true or false."
            });
        }

        const user = await User.findOne({
            _id: req.params.id,
            isDeleted: false
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        user.isActive = isActive;
        await user.save();

        return res.status(200).json({
            success: true,
            message: `User ${isActive ? "activated" : "deactivated"} successfully.`,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isActive: user.isActive
            }
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// Delete user (soft delete)
export const deleteUser = async (req, res) => {
    try {
        const user = await User.findOne({
            _id: req.params.id,
            isDeleted: false
        });

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        user.isDeleted = true;
        user.isActive = false;
        await user.save();

        return res.status(200).json({
            success: true,
            message: "User deleted successfully."
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
