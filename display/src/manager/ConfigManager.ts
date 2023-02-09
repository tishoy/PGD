
/**
 * 配置管理器
 * create by tishoy
 * 2020.7.6
 */
class ConfigManager {
    private gameConfig;
    private localConfig;
    private selectConfig;
    private loadingConfig;
    private uiConfig;
    private stageConfig;
    private collectionConfig;
    private rewardConfig;

    private static instance: ConfigManager = null;

    constructor() {
        this.init();
    }

    private init(): void {
        if (ConfigManager.instance !== null) {
            throw new Error("single instance error");
        }
    }

    public static getInstance(): ConfigManager {
        if (this.instance === null) {
            this.instance = new ConfigManager();
        }
        return this.instance;
    }

    async loadConfig() {
        await ResourceManager.getInstance().loadingLocalConfig();
        this.localConfig = await RES.getRes("local_config_json");

        // 获取puzzle_game_res中的game config
        await ResourceManager.getInstance().loadingPuzzleGameRes();
        await RES.loadGroup("cdn_game_config", 0);
        this.gameConfig = await RES.getRes("game_config_json");
        GameManager.getInstance().setGames(this.localConfig.default_game);
    }

    async initGameConfig() {
        this.selectConfig = RES.getRes("select_config_json");
        this.uiConfig = RES.getRes("ui_config_json");
        this.rewardConfig = RES.getRes("reward_config_json");
        this.collectionConfig = RES.getRes("collection_config_json");

    }

    public get collectionConfigData() {
        return this.collectionConfig;
    }

    public get loadingConfigData() {
        return this.loadingConfig;
    }

    public get gameConfigData() {
        return this.gameConfig;
    }

    public get selectConfigData() {
        return this.selectConfig;
    }

    public get uiConfigData() {
        return this.uiConfig;
    }

    public get stageConfigData() {
        return this.stageConfig;
    }

    public get rewardConfigData() {
        return this.rewardConfig;
    }
}