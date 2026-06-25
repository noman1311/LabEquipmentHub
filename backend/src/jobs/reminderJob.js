import cron from "node-cron";
import prisma from "../prisma/client.js";
import transporter from "../config/mailer.js";

cron.schedule(
  "0 0 * * *",
  async () => {

    console.log(
      "Running reminder job..."
    );

    try {

      const equipment =
        await prisma.equipment.findMany({
          where: {
            status: "issued"
          },

          include: {
            assignedTo: true
          }
        });

      const today =
        new Date();

      for (const item of equipment) {
        

        if (!item.dueDate)
          continue;

        const remainingDays =
          Math.ceil(
            (
              new Date(item.dueDate)
              -
              today
            )
            /
            (1000 * 60 * 60 * 24)
          );

          console.log("Equipment:", item.name);
          console.log("Due Date:", item.dueDate);
          console.log("Remaining Days:", remainingDays);
          console.log(item.assignedTo);

        if (
          remainingDays === 1
        ) {

          await transporter.sendMail({

            from:
              process.env.EMAIL_USER,

            to:
              item.assignedTo.email,

            subject:
              "Equipment Return Reminder",

            html: `
              <h2>Equipment Return Reminder</h2>

              <p>
                Dear
                ${item.assignedTo.name},
              </p>

              <p>
                Your borrowed equipment:
              </p>

              <b>
                ${item.name}
              </b>

              <p>
                must be returned tomorrow.
              </p>

              <p>
                Late return fine:
                10 Taka per day.
              </p>
            `
          });

          console.log(
            `Reminder sent to ${item.assignedTo.email}`
          );
        }
      }

    } catch (err) {

      console.error(
        "Reminder Job Error:",
        err
      );
    }
  }
);