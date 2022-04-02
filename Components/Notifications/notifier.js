import notifier from "node-notifier";
export default async function Notifier(batteryStatus) {
    return new Promise(async (resolve, reject) => {
        notifier.notify(
            {
                title: batteryStatus.title,
                message: batteryStatus.message,
                icon: batteryStatus.icon
            },
            () => {
                resolve(`Notification sent`);
            }
        );
    });
}
