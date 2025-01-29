import fs from "fs";
import cron from "node-cron";

cron.schedule("* * * * *", () => {
  const message = `Hello, World! ${new Date().toISOString()}\n`;
  fs.appendFileSync("hello.log", message);
  console.log(message.trim());
});

console.log("Cron job started...");
