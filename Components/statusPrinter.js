import chalk from "chalk";
import os from "os";

export default async function StatusPrinter(batteryStatus, runCount) {
    return new Promise((resolve, reject) => {
        console.log(chalk.cyan(`${runCount}) System status:\n`));
        console.log(`Time stamp: `, chalk.green(new Date().toString()))
        console.log(`Charge left: `, chalk.green(batteryStatus.batteryLeft));
        console.log(`Notification sent: `, chalk.green(!batteryStatus.status));
        console.log(`OS platform: `, chalk.green(os.platform()));
        console.log(`System uptime: `, chalk.green(`${os.uptime()/60*60} hours\n`));
    })
}

// StatusPrinter({ batteryLeft: 99, status: true})