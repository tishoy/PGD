
/**
 * 游戏控制器材
 * create by tishoy
 * 2020.7.1
 */
class ResourceManager {

    private cdn_url = "https://cdn.joypac.cn/puzzle_games/resource/"
    private game_url;

    constructor() {
        this.init();
    }

    private static instance: ResourceManager = null;

    private init(): void {
        if (ResourceManager.instance !== null) {
            throw new Error("single instance error");
        }
    }

    public static getInstance(): ResourceManager {
        if (this.instance === null) {
            this.instance = new ResourceManager();
        }
        return this.instance;
    }

    async loadingLocalConfig() {
        await RES.loadConfig("resource/local.res.json", "resource/");
        await RES.loadGroup("local_config", 0);
    }

    /**
     * 解谜游戏通用资源
     * 包含游戏配置，默认通用图片
     */
    async loadingPuzzleGameRes() {
        if (platform.name === "web") {
            await RES.loadConfig("resource/cdn.res.json", "resource/");
        } else {
            await RES.loadConfig("cdn.res.json", this.cdn_url);
        }
    }

    async setDisplayRes() {
        if (platform.name === "web") {
            console.log(this.game_url);
            await RES.loadConfig("resource/" + this.game_url + "display.res.json", "resource/" + this.game_url);
        } else {
            console.log(this.cdn_url + this.game_url);
            await RES.loadConfig("display.res.json", this.cdn_url + this.game_url);
        }
    }

    async loadingLoadingRes() {
        await RES.loadGroup("loading");
    }

    async loadingSelect() {
        await RES.loadGroup("select", 0);
    }

    async loadingSystem() {
        await RES.loadGroup("system", 0);
    }

    async loadingNew() {
        await RES.loadGroup("new", 0);
    }

    async loadingCG() {
        await RES.loadGroup("cg", 0);
    }

    async loadingReward() {
        await RES.loadGroup("reward", 0);
    }

    async loadingCollection() {
        await RES.loadGroup("collection", 0);
    }

    public async loadingStage(stage) {
        if (platform.name === "web" || platform.name === "oppo") {
            console.log("load res from local");
            await RES.loadConfig("resource/" + this.game_url + "stage/stage" + stage + ".res.json", "resource/" + this.game_url + "stage/");
        } else {
            if (stage <= 30) {
                console.log("load res from " + this.cdn_url);
                await RES.loadConfig("stage" + stage + ".res.json", this.cdn_url + this.game_url + "stage/");
            }
        }
        await RES.loadGroup("stage" + stage + "_mp3", 0);
        await RES.loadGroup("stage" + stage + "_png", 0);
        await RES.loadGroup("stage" + stage + "_json", 0);
    }

    public setGameResURL() {
        this.game_url = GameManager.getInstance().getGameConfig().res_url;
    }

}