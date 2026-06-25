import prisma from "../prisma/client.js";

function calculateFine(dueDate) {
  const now = new Date();
  const overdueDays = Math.floor((now - dueDate) / (1000 * 60 * 60 * 24));
  if (overdueDays <= 0) return 0;
  return overdueDays * 10;
}

export const getAllEquipment = async (req, res) => {
  try {
    const equipment = await prisma.equipment.findMany({
      include: {
        assignedTo: {
          select: {
            id: true,
            name: true,
            email: true
          }
        }
      }
    });

    const enhancedEquipment = equipment.map(item => {
      let remainingDays = null;
      let overdueDays = 0;
      let fine = 0;
      let isOverdue = false;

      if (item.dueDate) {
        remainingDays = Math.ceil(
          (new Date(item.dueDate) - new Date()) /
            (1000 * 60 * 60 * 24)
        );

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
        isOverdue
      };
    });

    res.json({
      success: true,
      equipment: enhancedEquipment
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const createEquipment = async (req, res) => {
  try {

    const {
      name,
      category,
      location,
      description,
      rfidTag
    } = req.body;

    const equipment =
      await prisma.equipment.create({
        data: {
          name,
          category,
          location,
          description,
          rfidTag
        }
      });

    const enhancedEquipment = {
      ...equipment,
      fine: calculateFine(new Date(equipment.dueDate)),
      isOverdue: new Date() > new Date(equipment.dueDate)
    };

    res.status(201).json({
      success: true,
      equipment: enhancedEquipment
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
export const getEquipmentById = async (req, res) => {
  try {

    const equipment =
      await prisma.equipment.findUnique({
        where: {
          id: req.params.id
        },
        include: {
          assignedTo: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      });

    if (!equipment) {
      return res.status(404).json({
        success: false,
        message: "Equipment not found"
      });
    }

    const enhancedEquipment = {
      ...equipment,
      fine: calculateFine(new Date(equipment.dueDate)),
      isOverdue: new Date() > new Date(equipment.dueDate)
    };

    res.json({
      success: true,
      equipment: enhancedEquipment
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const updateEquipment = async (req, res) => {

  try {

    const {
      name,
      category,
      location,
      description,
      rfidTag,
      status
    } = req.body;

    const equipment =
      await prisma.equipment.update({
        where: {
          id: req.params.id
        },
        data: {
          name,
          category,
          location,
          description,
          rfidTag,
          status
        }
      });

    const enhancedEquipment = {
      ...equipment,
      fine: calculateFine(new Date(equipment.dueDate)),
      isOverdue: new Date() > new Date(equipment.dueDate)
    };

    res.json({
      success: true,
      equipment: enhancedEquipment
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const deleteEquipment = async (req, res) => {
  try {

    await prisma.equipment.delete({
      where: {
        id: req.params.id
      }
    });

    res.json({
      success: true,
      message: "Equipment deleted"
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const getIssuedEquipment = async (req, res) => {

  try {

    const equipment =
      await prisma.equipment.findMany({
        where: {
          status: "issued"
        },
        include: {
          assignedTo: {
            select: {
              id: true,
              name: true,
              email: true
            }
          }
        }
      });

    const enhancedEquipment = equipment.map(item => {
      const today = new Date();
      let remainingDays = null;
      let overdueDays = 0;
      let fine = 0;
      let isOverdue = false;

      if (item.dueDate) {
        remainingDays = Math.ceil(
          (new Date(item.dueDate) - today) / (1000 * 60 * 60 * 24)
        );

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
        isOverdue
      };
    });

    res.json({
      success: true,
      equipment: enhancedEquipment
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const getAvailableEquipment = async (req, res) => {

  try {

    const equipment =
      await prisma.equipment.findMany({
        where: {
          status: "available"
        }
      });

    const enhancedEquipment = equipment.map(item => ({
      ...item,
      fine: calculateFine(new Date(item.dueDate)),
      isOverdue: new Date() > new Date(item.dueDate)
    }));

    res.json({
      success: true,
      equipment: enhancedEquipment
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export const getOverdueEquipment = async (req, res) => {
  try {
    const equipment = await prisma.equipment.findMany({
      where: {
        status: "issued",
        dueDate: {
          lt: new Date()
        }
      },
      include: {
        assignedTo: true
      }
    });

    res.json({
      success: true,
      equipment
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};