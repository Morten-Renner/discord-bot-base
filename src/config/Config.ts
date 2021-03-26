import fs from 'fs';

/**
 * A class to easily load and save configuration files
 * @author Morten Renner
 */
export default class Config<TConfig> {
    configName: string;
    data: TConfig;

    constructor(configName: string, data: TConfig = {} as any) {
        this.configName = configName;
        this.data = data;
    }

    /**
     * Loads the data according to the specified configName
     */
    public load() {
        return new Promise<void>(async (resolve, reject) => {
            try {
                let buffer = await fs.promises.readFile(this.getFileName());
                this.data = JSON.parse(buffer.toString());
                resolve();
            } catch (error) {
                if(error.code === "ENOENT"){
                    reject(new Error(`ENOENT config file "${this.configName}" not found at ${this.getFileName()}`))
                } else {
                    reject(error)
                }
            }
        });
    }

    /**
     * Saves the data according to the specified configName in the current working directory
     */
    public save() {
        return fs.promises.writeFile(this.getFileName(), JSON.stringify(this.data, undefined, 4));
    }

    /**
     * @returns an absolut path to the config file
     */
    private getFileName() {
        return `${process.cwd()}/config/${this.configName}.json`;
    }
}