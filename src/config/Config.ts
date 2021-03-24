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
        return new Promise<void>((resolve, reject) => {
            fs.promises.readFile(this.getFileName()).then(buffer => {
                this.data = JSON.parse(buffer.toString());
                resolve();
            }).catch(err => {
                reject(err);
            });
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