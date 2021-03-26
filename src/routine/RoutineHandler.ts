import { IRoutineEvents } from "./IRoutineEvents";
import { Routine } from "./Routine";
import RoutineConfig from "./Routines/RoutineConfigs";
import RoutineDiscord from "./Routines/RoutineDiscord";

export default class RoutineHandler implements IRoutineEvents {

    routines: Array<Routine>;

    constructor() {
        this.routines = new Array<Routine>();
        this.routines.push(new RoutineConfig());
        this.routines.push(new RoutineDiscord());
    }

    onSetup(): Promise<void[]> {
        return Promise.all(this.routines.map(r => {
            return r.onSetup();
        }));
    }

    onPreSetup(): Promise<void[]> {
        return Promise.all(this.routines.map(r => {
            return r.onPreSetup();
        }));
    }

    onPostSetup(): Promise<void[]> {
        return Promise.all(this.routines.map(r => {
            return r.onPostSetup();
        }));
    }
    
    onCriticalRoutineFail(routine: Routine): Promise<any> | null {
        console.log(`Routine ${routine.name} reported an ${routine.critical ? "critical" : "noncritical"} fail.`);
        
        return Promise.all(this.routines.map(r => {
            return r.onCriticalRoutineFail(routine);
        })).finally(() => {
            setTimeout(() => {
                process.exit(5); // FATAL_ERROR 
            }, 500);
        });
    }

}