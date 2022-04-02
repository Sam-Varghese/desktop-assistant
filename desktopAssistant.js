import FigletText from "./Components/figletText.js";
import BatteryChecker from "./Components/batteryChecker.js";
import Notifier from "./Components/Notifications/notifier.js";
import StatusPrinter from "./Components/statusPrinter.js";
import child_process from "child_process";
// Opening the web browser
child_process.exec("open -a https://www.wired.com/");
// Opening VSCode
child_process.exec("code");
console.clear();
FigletText(`Jarvis`);

var runCount = 0;

export default async function MasterFunction() {
    runCount++;
    if (runCount % 4 == 0) {
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
}

setInterval(MasterFunction, 60000);
