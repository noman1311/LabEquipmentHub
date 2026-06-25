import prisma from "../prisma/client.js";

export const getAllTransactions = async (req, res) => {

  try {

    const transactions =
  await prisma.transaction.findMany({
    where: {
      userId: req.params.id
    },
    include: {
  user: {
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      department: true,
      phone: true,
      rfidCardId: true
    }
  },
  equipment: true
},
    orderBy: {
      createdAt: "desc"
    }
      });

    res.json({
      success: true,
      transactions
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const getUserTransactions = async (req, res) => {

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

    const transactions =
  await prisma.transaction.findMany({
    where: {
      userId: req.params.id
    },
    include: {
  user: {
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      department: true,
      phone: true,
      rfidCardId: true
    }
  },
  equipment: true
},
    orderBy: {
      createdAt: "desc"
    }
      });

    res.json({
      success: true,
      transactions
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};