import figlet from "figlet";
import chalk from "chalk";
export default async function FigletText(text) {
    return new Promise((resolve, reject) => {
        figlet(text, (error, data) => {
            if (error) {
                reject(`Failed to print figlet text`);
            } else {
                console.log(chalk.blue(data));
                resolve(`Successfully printed figlet text`);
            }
        })
    })
}