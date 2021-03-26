import RoutineHandler from "./routine/RoutineHandler";

global.routineHandler = new RoutineHandler();

let fail = false;

global.routineHandler.onPreSetup()!
    .catch(err => {
        fail = true;
        console.error(`PreSetup failed: ${err}`);
    })
    .then(() => {
        if(!fail)
            return global.routineHandler.onSetup()!
    }).catch(err => {
        fail = true;
        console.error(`${global.configs.Icons.data.status_fail} Setup failed: ${err}`);
    })
    .then(() => {
        if(!fail)
            return global.routineHandler.onPostSetup()!
    }).catch(err => {
        fail = true;
        console.error(`${global.configs.Icons.data.status_fail} PostSetup failed: ${err}`);
    }).then(() => {
        if(!fail)
            console.log(`${global.configs.Icons.data.status_success} Setup complete!`);
    });