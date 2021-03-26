import { Client } from "discord.js";
import Config from "./config/Config";
import RoutineHandler from "./routine/RoutineHandler";

declare global {
    namespace NodeJS {
        interface Global {
            routineHandler: RoutineHandler,
            configs: {
                Discord: Config<ConfigTypes.Discord>,
                Icons: Config<ConfigTypes.Icons>
            },
            client: Client
        }
    }
}