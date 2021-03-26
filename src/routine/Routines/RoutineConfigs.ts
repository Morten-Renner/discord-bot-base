import logUpdate from "log-update";
import Config from "../../config/Config";
import { Routine } from "../Routine";

export default class RoutineConfig extends Routine {

    constructor() {
        super("Config", "Loads all configuration files.", true);
    }

    onPreSetup() {
        return new Promise((resolve, reject) => {
            let log = logUpdate.create(process.stdout);

            log("Loading configuration files...");
    
            global.configs = {
                Icons: new Config<ConfigTypes.Icons>("Icons", {
                    status_pending: "⏰",
                    status_fail: "❌",
                    status_success: "✅"
                }),
                Discord: new Config<ConfigTypes.Discord>("Discord")
            };

            log(`${global.configs.Icons.data.status_pending} Loading configuration files...`);

            Promise.all([
                global.configs.Icons.load(),
                global.configs.Discord.load()
            ]).then(() => {
                log(`${global.configs.Icons.data.status_success} Loaded configuration files.`);
                resolve(null);
            }).catch(err => {
                this.fail();
                log(`${global.configs.Icons.data.status_fail} Loading configuration files failed`);
                reject(err);
            });
      
        })
    }
    

}