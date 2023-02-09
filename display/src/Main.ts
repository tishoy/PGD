/**
 * 神回避3版本
 * create by tishoy
 * 2018.8.14
 */
class Main extends egret.DisplayObjectContainer {

    public constructor() {
        super();
        this.addEventListener(egret.Event.ADDED_TO_STAGE, this.onAddToStage, this);
    }

    private onAddToStage(event: egret.Event) {
        platform.setLifeCycleCallBack(() => {
            SoundManager.getInstance().stopBGM();
            if (platform.name !== "oppo") {
                egret.ticker.pause();
            }
        }, () => {
            SoundManager.getInstance().playBGM();
            egret.ticker.resume();
        });

        egret.lifecycle.addLifecycleListener((context) => {
            // custom lifecycle plugin
            context.onUpdate = () => {

            }
        })

        // 开始游戏
        this.runGame().catch(e => {
        })
    }

    private uiManager: UIManager;
    private sceneManager: SceneManager;

    private async runGame() {
        // 读取配置文件
        await ConfigManager.getInstance().loadConfig();
        // 读取进度存档
        SaveDataManager.getInstance();
        ScreenAdaptManager.getInstance().init(this.stage);




        this.uiManager = UIManager.getInstance();
        this.uiManager.init(this.stage);

        await ResourceManager.getInstance().setDisplayRes();
        await ResourceManager.getInstance().loadingLoadingRes();
        this.sceneManager = SceneManager.getInstance();
        this.sceneManager.init(this.stage);
        this.sceneManager.showLoading();



        // 加载系统资源 加载选关界面资源 并初始化游戏内部配置
        await ResourceManager.getInstance().loadingSystem();
        await ResourceManager.getInstance().loadingSelect();
        await ResourceManager.getInstance().loadingNew();
        await ResourceManager.getInstance().loadingReward();
        await ResourceManager.getInstance().loadingCollection();
        ConfigManager.getInstance().initGameConfig();

        this.uiManager.initUI();

        SoundManager.getInstance().playBGM();

        // 渠道代码
        platform.initSDK();
        platform.initAnalytics();
        await AdvertiseManager.getInstance().fetchBanner();
        await AdvertiseManager.getInstance().fetchVedio();

        this.addEventListener(egret.Event.ENTER_FRAME, AdvertiseManager.getInstance().addBannerShowListener, AdvertiseManager.getInstance());
        // if (platform.name === "tt") {
        //     await RES.loadConfig("puzzle_game.res.json", "https://cdn.joypac.cn/skipschool/resource");
        //     // await platform.login();

        //     // await RES.loadConfig("resource/default.res.json", "resource/");
        //     platform.initSDK();
        // } else if (platform.name === "baidu") {
        //     await RES.loadConfig("puzzle_game.res.json", "https://cdn.joypac.cn/skipschool/resource");
        //     // await platform.login();
        //     // await AdManager.getInstance().fetchBanner();
        //     await AdvertiseManager.getInstance().fetchVedio();
        //     // await RES.loadConfig("resource/default.res.json", "resource/");
        //     platform.initSDK();
        // } else if (platform.name === "qqgame") {
        //     // await RES.loadConfig("qq.res.json", "https://cdn.joypac.cn/kaihi_h5_res/");
        //     // await RES.loadConfig("resource/qq.res.json", "resource/");
        //     await AdvertiseManager.getInstance().fetchBanner();
        //     await AdvertiseManager.getInstance().fetchVedio();
        //     await AdvertiseManager.getInstance().fetchAppBox();
        //     platform.initSDK();
        // } else {
        //     await RES.loadConfig("resource/puzzle_game.res.json", "resource/");
        // }


        // await RES.loadGroup('title');
        // await RES.loadGroup('select');
        // await RES.loadGroup('game');
        // await RES.loadGroup('pop');
        // await RES.loadGroup('hint');
        // await RES.loadGroup("sound");
        // await RES.loadGroup("config");
        // await RES.loadGroup("item_scene");

        if (SaveDataManager.getInstance().showCG()) {
            await ResourceManager.getInstance().loadingCG();
            this.sceneManager.toCGScene();
        } else {
            if (SaveDataManager.getInstance().isNewPlayer()) {
                this.sceneManager.toSelectScene();
                SaveDataManager.getInstance().beOldPlayer();
            } else {
                this.sceneManager.toSelectScene();
                UIManager.getInstance().openLotteryPop();
            }

            // UIManager.getInstance().openMysteryStagePop();
        }

        platform.loadingComplete();

    }

}