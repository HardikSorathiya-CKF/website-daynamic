import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import connectDB from "../config/db.js";
import User from "../models/User.js";

const seedUser = async () => {
    try {
        await connectDB();

        const email = "admin@cloudkodeform.com";

        const userExists = await User.findOne({ email });

        if (userExists) {
            console.log("⚠️ User already exists");
            process.exit();
        }

        const hashedPassword = await bcrypt.hash("Admin@123", 10);

        await User.create({
            name: "Super Admin",
            email,
            password: hashedPassword,
            role: "superadmin",
            isActive: true,
        });

        console.log("✅ User created successfully");
        process.exit();

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedUser();
