import { IRoutineEvents } from "./IRoutineEvents";

export class Routine implements IRoutineEvents {

    /**
     * Describes wether the routine failed or not.
     */
    private _failed: boolean = false;

    get failed () {
        return this._failed;
    }

    /**
     * Critical routines force the bot to shutdown on failure.
     */
    critical: boolean;

    name:string;
    description:string;
    interval: NodeJS.Timeout | undefined;

    /**
     * Performs a lot of tasks asynchronously.
     *
     * Almost all of the logic will be executed as or as part of a Routine, in order to keep everything tidy.
     * @param name Name of the Routine
     * @param description A short description of the Routine
     * @param critical Critical routines force the bot to shutdown on failure.
     */
    constructor(name:string = "no name", description:string = "This module does not have a description.", critical: boolean = false) {
        this.name = name;
        this.description = description;
        this.critical = critical;
    }

    /**
     * Registers an interval wich triggers onIntervall every x ms.
     * @param interval in ms
     * @throws if already registered
     */
    registerInterval(interval:number) {
        if(this.interval == null) {
            this.interval = setInterval(this.onInterval.bind(this), interval);
        } else {
            throw new Error("Failed attempt to register an second intervall in routine: " + this.name);
        }
    }

    /**
     * Clears the intervall
     */
    unregisterInterval() {
        if(this != undefined)
            clearInterval(this.interval!);
    }

    /**
     * Executes on intervall tick
     */
    private onInterval() {

    }

    /**
     * Do everything the setup needs.
     *
     * You got 30 Seconds it or will timeout.
     *
     * All onSetup functions will be executed parallel.
     */
     async onSetup() {
        this._failed = true;
    }

    /**
     * Do everything that is required for the setup.
     *
     * You got 10 Seconds it will timeout.
     *
     * All onSetup functions will be executed parallel.
     */
    async onPreSetup() {

    }

    /**
     * Runs after the setup is complete.
     */
    async onPostSetup() {

    }

    /**
     * Enters fail state.
     *
     * Causes a shutdown if the Routine is critical.
     */
    public fail () {
        this._failed = true;

        if(this.critical) {
            // TODO: contact RoutineHandler to shut down
        }
    }

}