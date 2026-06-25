import prisma from "../prisma/client.js";

export const scanRFID = async (req, res) => {

  try {

    const { uid } = req.body;

    if (!uid) {
      return res.status(400).json({
        success: false,
        message: "RFID UID required"
      });
    }

    const user =
      await prisma.user.findFirst({
        where: {
          rfidCardId: uid
        }
      });

    if (user) {

      return res.json({
        success: true,
        type: "user",
        user: {
          id: user.id,
          name: user.name,
          role: user.role
        }
      });

    }

    const equipment =
      await prisma.equipment.findFirst({
        where: {
          rfidTag: uid
        }
      });

    if (equipment) {

      return res.json({
        success: true,
        type: "equipment",
        equipment: {
          id: equipment.id,
          name: equipment.name,
          status: equipment.status
        }
      });

    }

    return res.status(404).json({
      success: false,
      message: "RFID not registered"
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });

  }
};