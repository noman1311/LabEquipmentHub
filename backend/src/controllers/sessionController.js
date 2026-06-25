import prisma from "../prisma/client.js";

export const startSession = async (req, res) => {

  try {

    const { userId } = req.body;

    const existingSession =
      await prisma.session.findFirst({
        where: {
          userId,
          active: true
        }
      });

    if (existingSession) {
      return res.status(400).json({
        success: false,
        message: "User already has an active session"
      });
    }

    const session =
      await prisma.session.create({
        data: {
          userId,
          active: true
        }
      });

    res.status(201).json({
      success: true,
      session
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const endSession = async (req, res) => {

  try {

    const { userId } = req.body;

    const session =
      await prisma.session.findFirst({
        where: {
          userId,
          active: true
        }
      });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "No active session found"
      });
    }

    const updatedSession =
      await prisma.session.update({
        where: {
          id: session.id
        },
        data: {
          active: false,
          endTime: new Date()
        }
      });

    res.json({
      success: true,
      session: updatedSession
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const getActiveSession = async (req, res) => {

  try {

    const { userId } = req.params;

    const session =
      await prisma.session.findFirst({
        where: {
          userId,
          active: true
        }
      });

    res.json({
      success: true,
      active: !!session,
      session
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};  