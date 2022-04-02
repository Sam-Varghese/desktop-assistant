import batteryLevel from "battery-level";
import isCharging from "is-charging";

/*
Program to get the current status of battery

This program resolves a promise with false as the status if the battery level (battery is <= 35% & the machine is not getting charged) or (battery >= 90% & the machine is still getting charged)

Else it will resolve the promise with a status of true
*/
export default async function BatteryChecker() {
    let batteryCharging = await isCharging();
    return new Promise(async (resolve, reject) => {
        const batteryLeft = await batteryLevel();
        if (batteryLeft <= 0.35 && !batteryCharging) {
            console.log(`Battery low`);
            resolve({
                status: false,
                batteryLeft: batteryLeft * 100,
                message: `Only ${
                    batteryLeft * 100
                    }% battery is left in the laptop. Kindly insert the charger to maintain the laptop's health.`,
                title: "Battery low",
                icon: "Components/Notifications/icons/batteryLow.png"
            });
        } else if (batteryLeft >= 0.9 && batteryCharging) {
            resolve({
                status: false,
                batteryLeft: batteryLeft * 100,
                message: `${
                    batteryLeft * 100
                    }% is the charge left in the laptop. Kindly unplug the charger to maintain the health of the machine.`,
                title: "Battery charged",
                icon: "Components/Notifications/icons/batteryCharged.png"
            });
        } else {
            resolve({
                status: true,
                batteryLeft: batteryLeft * 100,
                message: "Battery level is normal. Awesome work sir!",
                title: "Normal battery"
            });
        }
    });
}