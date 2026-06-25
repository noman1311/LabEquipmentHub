import prisma from "../prisma/client.js";

export const getActiveSessions = async (req, res) => {

  try {

    const sessions =
      await prisma.session.findMany({
        where: {
          active: true
        }
      });

    res.json({
      success: true,
      sessions
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const getSessionHistory = async (req, res) => {

  try {

    const sessions =
      await prisma.session.findMany({
        orderBy: {
          startTime: "desc"
        }
      });

    res.json({
      success: true,
      sessions
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};