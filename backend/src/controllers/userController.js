import prisma from "../prisma/client.js";

export const getAllUsers = async (req, res) => {
  try {

    const users = await prisma.user.findMany({
  include: {
    borrowedEquipment: {
      select: {
        id: true,
        name: true,
        status: true
      }
    }
  }
});

    res.json({
      success: true,
      users
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const getUserById = async (req, res) => {

  try {

    const user = await prisma.user.findUnique({
      where: {
        id: req.params.id
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        rfidCardId: true,
        status: true,
        department: true,
        phone: true,
        createdAt: true
      }
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.json({
      success: true,
      user
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const updateUser = async (req, res) => {

  try {

    const {
      name,
      role,
      status,
      department,
      phone,
      rfidCardId
    } = req.body;

    const user = await prisma.user.update({
      where: {
        id: req.params.id
      },
      data: {
        name,
        role,
        status,
        department,
        phone,
        rfidCardId
      }
    });

    res.json({
      success: true,
      user
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const deleteUser = async (req, res) => {

  try {

    await prisma.user.delete({
      where: {
        id: req.params.id
      }
    });

    res.json({
      success: true,
      message: "User deleted"
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const getUserEquipment = async (req, res) => {

  try {

    if (
  req.user.role !== "admin" &&
  req.user.id !== req.params.id
) {
  return res.status(403).json({
    success: false,
    message: "Forbidden"
  });
}

    const user =
      await prisma.user.findUnique({
        where: {
          id: req.params.id
        }
      });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const equipment =
      await prisma.equipment.findMany({
        where: {
          assignedToId: user.id
        }
      });

    const enhancedEquipment = equipment.map(item => {
      let remainingDays = null;
      let fine = 0;
      let overdueDays = 0;
      let notifyTomorrow = false;
      let isOverdue = false;

      if (item.dueDate) {
        remainingDays = Math.ceil(
          (new Date(item.dueDate) - new Date()) / (1000 * 60 * 60 * 24)
        );

        if (remainingDays === 1) {
          notifyTomorrow = true;
        }

        if (remainingDays < 0) {
          isOverdue = true;
          overdueDays = Math.abs(remainingDays);
          fine = overdueDays * 10;
        }
      }

      return {
        ...item,
        remainingDays,
        overdueDays,
        fine,
        notifyTomorrow,
        isOverdue
      };
    });

    res.json({
      success: true,
      user: {
        id: user.id,
        name: user.name,
        pendingFine: user.pendingFine || 0
      },
      equipment: enhancedEquipment
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const clearUserFine = async (req, res) => {
  try {
    const user = await prisma.user.update({
      where: { id: req.params.id },
      data: { pendingFine: 0 }
    });

    res.json({
      success: true,
      message: "Fine cleared",
      user
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};