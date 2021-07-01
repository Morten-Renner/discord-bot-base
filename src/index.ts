import { Routine } from "./routine/Routine";
import RoutineHandler from "./routine/RoutineHandler";

global.routineHandler = new RoutineHandler();

export function registerRoutine(constructor: Function) {
    console.log("constructor" + constructor);

    global.routineHandler.routines.push(<Routine><any> constructor);
}

global.routineHandler.onPreSetup()!
    .then(() => {
        return global.routineHandler.onSetup()!
    })
    .then(() => {
        return global.routineHandler.onPostSetup()!
    }).then(() => {
        console.log(`${global.configs.Icons.data.status_success} Setup complete!`);
    }).catch(err => {
        console.error(`${global.configs.Icons.data.status_fail} Setup failed: ${err}`);
    });