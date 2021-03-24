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
}