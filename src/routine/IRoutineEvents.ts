import { Routine } from "./Routine";

export interface IRoutineEvents {
    /**
     * Setup logic
     */
    onSetup():Promise<any> | null;

    /**
     * Supposed to be executed before the setup runs.
     */
    onPreSetup():Promise<any> | null;

    /**
     * Supposed to be executed after the setup.
     */
    onPostSetup():Promise<any> | null;

    /**
     * Executed when a critical Routine fails.
     * 
     * The process will exit with code 1 after all returned promises are settled.
     * 
     * @param routine the routine that failed 
     */
    onCriticalRoutineFail(routine: Routine):Promise<any> | null;
}