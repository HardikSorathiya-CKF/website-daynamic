import dotenv from "dotenv";
dotenv.config();

import connectDB from "../config/db.js";
import Role from "../models/Role.js";

const defaultRoles = [
    {
        name: "Super Admin",
        key: "superadmin",
        permissions: [
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
        ],
    },
    {
        name: "Admin",
        key: "admin",
        permissions: [
            "user.view",
            "user.create",
            "user.update",
            "user.delete",
            "user.status",
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
        ],
    },
    {
        name: "Developer",
        key: "developer",
        permissions: ["user.view"],
    },
    {
        name: "Marketer",
        key: "marketer",
        permissions: ["user.view"],
    },
    {
        name: "Editor",
        key: "editor",
        permissions: ["user.view"],
    },
    {
        name: "Viewer",
        key: "viewer",
        permissions: ["user.view"],
    },
];

const seedRoles = async () => {
    try {
        await connectDB();

        for (const item of defaultRoles) {
            const exists = await Role.findOne({ key: item.key });

            if (exists) {
                console.log(`⚠️ Role already exists: ${item.key}`);
                continue;
            }

            await Role.create(item);
            console.log(`✅ Role created: ${item.key}`);
        }

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedRoles();
