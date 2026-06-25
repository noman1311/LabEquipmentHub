import prisma from "../prisma/client.js";

export const processRFID = async (req, res) => {

  try {

    const { uid } = req.body;

    if (!uid) {
      return res.status(400).json({
        success: false,
        message: "UID required"
      });
    }

    const user =
      await prisma.user.findFirst({
        where: {
          rfidCardId: uid
        }
      });

    if (user) {

      const activeSession =
        await prisma.session.findFirst({
          where: {
            userId: user.id,
            active: true
          }
        });

      if (!activeSession) {

        const session =
          await prisma.session.create({
            data: {
              userId: user.id,
              active: true
            }
          });

        return res.json({
          success: true,
          action: "session_started",
          user: user.name,
          sessionId: session.id
        });
      }

      await prisma.session.update({
        where: {
          id: activeSession.id
        },
        data: {
          active: false,
          endTime: new Date()
        }
      });

      return res.json({
        success: true,
        action: "session_ended",
        user: user.name
      });
    }

    const equipment =
      await prisma.equipment.findFirst({
        where: {
          rfidTag: uid
        }
      });

    if (equipment) {

      const activeSession =
        await prisma.session.findFirst({
          where: {
            active: true
          },
          orderBy: {
            startTime: "desc"
          }
        });

      if (!activeSession) {
        return res.status(400).json({
          success: false,
          message: "No active user session"
        });
      }

      if (equipment.status === "available") {

        // Block borrow if user has unpaid fine
        const borrowingUser = await prisma.user.findUnique({
          where: { id: activeSession.userId }
        });

        if (borrowingUser.pendingFine > 0) {
          return res.status(403).json({
            success: false,
            message: `Cannot borrow. You have a pending fine of ৳${borrowingUser.pendingFine}. Please contact admin to clear it.`
          });
        }

        const borrowDate = new Date();
        const dueDate = new Date(
          borrowDate.getTime() + 7 * 24 * 60 * 60 * 1000
        );

        await prisma.equipment.update({
          where: {
            id: equipment.id
          },
          data: {
            status: "issued",
            assignedToId: activeSession.userId,
            assignedAt: borrowDate,
            dueDate: dueDate
          }
        });

        await prisma.transaction.create({
          data: {
            userId: activeSession.userId,
            equipmentId: equipment.id,
            sessionId: activeSession.id,
            action: "borrow"
          }
        });

        return res.json({
          success: true,
          action: "equipment_issued",
          equipment: equipment.name
        });
      }

     // Calculate fine at return time and add to user's pendingFine
      let fineToAdd = 0;
      if (equipment.dueDate && new Date() > new Date(equipment.dueDate)) {
        const overdueDays = Math.ceil(
          (new Date() - new Date(equipment.dueDate)) / (1000 * 60 * 60 * 24)
        );
        fineToAdd = overdueDays * 10;
      }

      // Add fine to user's pendingFine (never reset on return)
      if (fineToAdd > 0) {
        await prisma.user.update({
          where: { id: activeSession.userId },
          data: { pendingFine: { increment: fineToAdd } }
        });
      }

      await prisma.equipment.update({
        where: { id: equipment.id },
        data: {
          status: "available",
          assignedToId: null,
          assignedAt: null,
          dueDate: null
        }
      });

      await prisma.transaction.create({
        data: {
          userId: activeSession.userId,
          equipmentId: equipment.id,
          sessionId: activeSession.id,
          action: "return"
        }
      });

      return res.json({
        success: true,
        action: "equipment_returned",
        equipment: equipment.name,
        fineAdded: fineToAdd
      });
    }

    return res.status(404).json({
      success: false,
      message: "Unknown RFID"
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};