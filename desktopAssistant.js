import FigletText from "./Components/figletText.js";
import BatteryChecker from "./Components/batteryChecker.js";
import Notifier from "./Components/Notifications/notifier.js";
import StatusPrinter from "./Components/statusPrinter.js";
import input from "input";
import child_process from "child_process";
import chalk from "chalk";

var runCount = 0;

export async function BatteryAssistant() {
    runCount++;
    if (runCount % 5 == 0) {
        console.clear();
        await FigletText(`Jarvis`);
    }

    // Checking the battery level
    const batteryStatus = await BatteryChecker();
    // If battery is low, send a desktop notification
    if (!batteryStatus.status) {
        Notifier(batteryStatus);
    }
    await StatusPrinter(batteryStatus, runCount);
    console.log(`Starting set interval`);
}

export async function processUserInput() {
    console.clear();
    await FigletText(`Jarvis`);
    let taskSelected = await input.checkboxes(`Select the task: `, [
        `Initialize programs + battery checker`,
        `Initialize programs`,
        `Battery checker`,
        `Shutdown machine`,
        `Restart machine`,
        `Execute powershell commands`,
        `Execute python commands`,
        `Execute node js commands`,
    ]);
    switch (taskSelected[0]) {
        case `Initialize programs + battery checker`:
            InitializeBatteryChecker();
            break;
        case `Initialize programs`:
            Initialize();
            break;
        case `Battery checker`:
            setInterval(BatteryAssistant, 60000);
            break;
        case `Shutdown machine`:
            child_process.exec("shutdown /s");
            break;
        case `Restart machine`:
            child_process.exec("shutdown /r");
            break;
        case `Execute powershell commands`:
            const powershellCommand = await input.text(
                `Enter the command you wanna execute: `
            );
            child_process.exec(
                powershellCommand,
                { shell: "powershell.exe" },
                (error, stdout, stderr) => {
                    if (error) {
                        console.log(stderr);
                    } else {
                        console.log(stdout);
                    }
                }
            );
            break;
        case `Execute python commands`:
            const pythonCommand = await input.text(
                `Enter the command you wanna execute: `
            );
            child_process.exec(
                pythonCommand,
                { shell: "python.exe" },
                (error, stdout, stderr) => {
                    if (error) {
                        console.log(stderr);
                    } else {
                        console.log(stdout);
                    }
                }
            );
            break;
        case `Execute node js commands`:
            const nodeCommand = await input.text(
                `Enter the command you wanna execute: `
            );
            child_process.exec(
                nodeCommand,
                { shell: "node" },
                (error, stdout, stderr) => {
                    if (error) {
                        throw error;
                        console.log(stderr);
                    } else {
                        console.log(stdout);
                    }
                }
            );
            break;
        default:
            console.log(chalk.red("Option does not exists...."));
            console.log(chalk.yellow("Kindly select again...."));
            await input.confirm(`Press enter to continue`);
            processUserInput();
    }
}

export async function Initialize() {
    // Opening the web browser
    child_process.exec("open -a https://www.wired.com/");
    // Opening VSCode
    child_process.exec("code");
}

export async function InitializeBatteryChecker() {
    Initialize();
    setInterval(BatteryAssistant, 60000);
}

processUserInput();