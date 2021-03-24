/**
 * This namespace contains all config interfaces that belong to the Config eco system.
 * @author Morten Renner
 */
declare namespace ConfigTypes {
    /**
     * Discord configuration
     */
    interface Discord {
        token: string
    }

    interface Icons {
        status_pending: string
        status_success: string
        status_fail: string
    }
}