import Config from "../config/Config";
import RoutineConfig from "../routine/Routines/RoutineConfigs";

let rconfigs = new RoutineConfig();

async function generate() {
    try {
        await new Config<ConfigTypes.Icons>("Icons", {
            status_pending: "⏰",
            status_fail: "❌",
            status_success: "✅"
        }).save();

        await new Config<ConfigTypes.Discord>("Discord", {
            token: "YOUR_TOKEN"
        }).save();
    } catch (error) {
        console.error("Generation failed", error);
    } finally {
        console.log("Generated default files.");
    }
}

generate();