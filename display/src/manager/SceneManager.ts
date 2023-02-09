class SceneManager {

    // private static instance: SoundManager;
    static instance: SceneManager = null;

    private gameLayer: egret.DisplayObjectContainer;
    private loadingLayer: egret.DisplayObjectContainer;
    private uiLayer: egret.DisplayObjectContainer;
    private popLayer: egret.DisplayObjectContainer;
    private tipLayer: egret.DisplayObjectContainer;



    private loading: LoadingUI;
    private gameScene: GameScene = null;
    private cgScene: CGScene = null;
    private selectScene: SelectScene = null;
    private collectionScene: CollectionScene = null;

    public currentStage;

    public currentScene = null;

    public egretStage: egret.Stage;

    constructor() {

    }

    public init(egretStage: egret.Stage): void {
        this.egretStage = egretStage;
        this.loading = new LoadingUI();
        // this.initLayer(this.gameLayer);
        // this.initLayer(this.uiLayer);
        this.gameLayer = UIManager.getInstance().getGameLayer();
        this.uiLayer = UIManager.getInstance().getUILayer();
        this.popLayer = UIManager.getInstance().getPopLayer();
        this.loadingLayer = UIManager.getInstance().getLoadingLayer();
        this.tipLayer = UIManager.getInstance().getTipLayer();

    }

    public static getInstance(): SceneManager {
        if (this.instance === null) {
            this.instance = new SceneManager();
        }
        return this.instance;
    }

    // private initLayer(layer) {
    //     layer.x = (Util.curWidth() - Util.displayWidth()) / 2;
    //     layer.y = (Util.curHeight() - Util.displayHeight()) / 2;
    //     this.egretStage.addChild(layer);
    // }



    // 排行榜页面
    // async toRankScene() {
    //     this.showLoading();
    //     if (this.currentScene !== null) {
    //         if (this.currentScene.parent === this.gameLayer) {
    //             this.gameLayer.removeChild(this.currentScene);
    //         }
    //         if (this.currentScene !== this.rankScene) {
    //             this.uiLayer.removeChildren();
    //         }
    //         // this.gameScene = null;
    //         // this.dataScene = null;
    //         this.currentScene = null;
    //     }
    //     if (this.rankScene === null) {
    //         this.rankScene = new RankScene(this.egretStage)
    //     }
    //     this.currentScene = this.rankScene;
    //     this.gameLayer.addChild(this.currentScene);
    //     this.hideLoading(false);
    // }

    public toCGScene(): void {
        this.showLoading();
        if (this.currentScene !== null) {
            // if (this.currentScene.parent === this.gameLayer) {
            //     this.gameLayer.removeChild(this.currentScene);
            // }
            this.gameLayer.removeChildren();
            if (this.currentScene !== this.cgScene) {
                this.uiLayer.removeChildren();
            }
            // this.gameScene = null;
            // this.dataScene = null;
        }
        if (this.cgScene === null) {
            this.cgScene = new CGScene(this.egretStage)
        }
        this.currentScene = this.cgScene;
        this.gameLayer.addChild(this.currentScene);
        this.beforeHideLoading(false);
    }

    public toSelectScene(): void {
        this.showLoading();
        if (this.currentScene !== null) {
            // if (this.currentScene.parent === this.gameLayer) {
            //     this.gameLayer.removeChild(this.currentScene);
            // }
            this.gameLayer.removeChildren();
            if (this.currentScene !== this.selectScene) {
                this.uiLayer.removeChildren();
            }
            // this.gameScene = null;
            // this.dataScene = null;
        }
        if (this.selectScene === null) {
            this.selectScene = new SelectScene(this.egretStage)
        }
        this.currentScene = this.selectScene;
        this.gameLayer.addChild(this.currentScene);
        this.beforeHideLoading(false);
    }

    async toGameScene() {
        this.showLoading(true);
        if (this.currentScene !== null) {
            // if (this.currentScene.parent === this.gameLayer) {
            //     this.gameLayer.removeChild(this.currentScene);
            // }
            if (this.currentScene !== this.gameScene) {
                this.gameLayer.removeChildren();
                this.uiLayer.removeChildren();
            }
            // this.titleScene = null;
            // this.dataScene = null;
        }
        this.gameScene = await new GameScene(this.egretStage);
        this.currentScene = this.gameScene;
        this.currentScene.setGameStage();
        this.gameLayer.addChild(this.currentScene);
        this.beforeHideLoading(true);
    }

    async toCollectionScene() {
        this.showLoading();
        if (this.currentScene !== null) {
            // if (this.currentScene.parent === this.gameLayer) {
            //     this.gameLayer.removeChild(this.currentScene);
            // }
            this.gameLayer.removeChildren();
            if (this.currentScene !== this.collectionScene) {
                this.uiLayer.removeChildren();
            }
            // this.gameScene = null;
            // this.titleScene = null;
            this.currentScene = null;
        }
        if (this.collectionScene === null) {
            this.collectionScene = new CollectionScene(this.egretStage);
        }
        this.currentScene = null;
        // this.dataScene.setGameStage();
        this.currentScene = this.collectionScene;
        this.gameLayer.addChild(this.currentScene);
        this.beforeHideLoading(false);
    }

    public showLoading(showStage = false): void {
        // if (this.loading === null) {
        //     this.loading = new LoadingUI();
        // }
        // if (this.loadingLayer.contains(this.loading)) {
        //     // return;
        // } else {
        this.loading.showStage(showStage);

        this.loading.onShow();
        // }
    }

    public beforeHideLoading(toStage = false) {
        this.loading.beforeHide();
        if (toStage) {
            platform.startRecord();
        }
    }

    public hideLoading(): void {

        this.loading.onHide();

    }

    public get SelectScene() {
        return this.selectScene;
    }

    public isGameScene() {
        return this.currentScene === this.gameScene;
    }

}