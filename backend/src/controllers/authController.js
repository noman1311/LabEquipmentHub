// authController.js
import prisma from "../prisma/client.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {

    const { name, email, password, role } = req.body;

    const existingUser =
      await prisma.user.findUnique({
        where: { email }
      });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    const passwordHash =
      await bcrypt.hash(password, 10);

    const user =
      await prisma.user.create({
        data: {
          name,
          email,
          passwordHash,
          role: role || "student"
        }
      });

    res.status(201).json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        rfidCardId: user.rfidCardId,
        createdAt: user.createdAt
      }
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    const user =
      await prisma.user.findUnique({
        where: { email }
      });

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const valid =
      await bcrypt.compare(
        password,
        user.passwordHash
      );

    if (!valid) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const token =
      jwt.sign(
        {
          id: user.id,
          role: user.role
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "7d"
        }
      );

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });

  } catch (err) {

    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};