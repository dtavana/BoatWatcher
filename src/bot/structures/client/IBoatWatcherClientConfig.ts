interface IBoatWatcherClientConfig {
    DEFAULT_PREFIX: string;
    BOT_TOKEN: string;
    PG_CONNECTION: string;
    OWNERS: string[];
    FOOTER_TEXT: string;
    DBL_GUILD_ID: string;
    DBL_MOD_LOG_ID: string;
    DBL_LOG_ID: string;
    DBL_MOD_ROLE_ID: string;
    DBL_VC_GUILD_ID: string;
    DBL_VC_LOG_ID: string;
}

export { IBoatWatcherClientConfig };
