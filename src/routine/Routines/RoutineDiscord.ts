import { Client, VoiceState } from "discord.js";
import { Routine } from "../Routine";

export default class RoutineDiscord extends Routine {

    constructor() {
        super("Discord", "Handles the Discord connection", true);
    }
    
    onPreSetup() {
        return new Promise((resolve, reject) => {
            global.client = new Client();

            global.client.on("disconnect", this.onDisconnect);
            global.client.on("ready", this.onReady);
            resolve(() => {});
        })
    }

    onSetup() {
        return new Promise((resolve, reject) => {
            global.client.login(global.configs.Discord.data.token).then(result => {
                resolve(result);
            })
            .catch(err => {
                reject(err);
                this.fail();
            });
        })
    }

    onCriticalRoutineFail(r: Routine) {
        return new Promise((resolve) => {
            global.client.destroy();
            resolve(() => {});
        }) 
    }

    onReady() {
        console.log(`${global.configs.Icons.data.status_success} Bot ready.`);
    }

    onDisconnect(code: number) {
        console.log(`${global.configs.Icons.data.status_fail} Bot disconnected. Code=${code}`);
        this.fail();
    }
    
}