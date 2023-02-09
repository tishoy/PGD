/**
 * create by tishoy
 * 2018.8.20
 */

class StageController {
    static instance: StageController = null;

    public resURL = "https://cdn.joypac.cn/skipschool/resource/";

    private stageData;

    private newOpenList = [];
    private newClearList = [];


    public IS_OPENED_NEW_STAGE;

    private dispather;
    private currentSelected;

    constructor() {
        this.init();
    }

    init() {



        // TODO
        this.currentSelected = SaveDataManager.getInstance().getLastPlay();


        this.dispather = new StageDispather();
    }

    public static getInstance(): StageController {
        if (this.instance === null) {
            this.instance = new StageController();
        }
        return this.instance;
    }

    public unlockStage(stage) {
        return SaveDataManager.getInstance().openStage(stage);
    }

    public canUnlock(stage) {
        return SaveDataManager.getInstance().getStageStatus(stage).unlockNext;
    }

    public async clearStage(card: Array<number> = [], popViewRes) {
        platform.stopRecord();
        let stage = this.currentSelected;
        let isShowMystery = false;
        if (stage === 15 && !StageController.getInstance().isStageOpen(16)) {
            isShowMystery = true;
        }
        ItemController.getInstance().resetList();
        let newCard = card.filter((cardId) => {
            // return CollectionController.getInstance().newCardGod(cardId);
        })
        SaveDataManager.getInstance().saveStagePass(stage);

        GameAnalyticsController.getInstance().stageClearAnalytics(stage);
        GameAnalyticsController.getInstance().cardGotAnalytics(newCard);
        /**
         * 平台是否存在排行榜
         */
        if (false) {
            platform.uploadRank("card_num", CollectionController.getInstance().getCollectionedCardsNumber());
        }
        UIManager.getInstance().openClearPop(stage, newCard, popViewRes);
        if (isShowMystery) {
            UIManager.getInstance().openMysteryStagePop();
        }
    }

    public gameOverStage(card: Array<number> = [], popViewRes) {
        let stage: number = this.currentSelected;
        platform.stopRecord();
        ItemController.getInstance().resetList();
        let newCard = card.filter((cardId) => {
            // return CollectionController.getInstance().newCardGod(cardId);
        });
        /**
         * 平台是否存在排行榜
         */
        if (platform.existRank) {
            platform.uploadRank("card_num", CollectionController.getInstance().getCollectionedCardsNumber());
        }
        GameAnalyticsController.getInstance().stageGameOverAnalytics(stage);
        GameAnalyticsController.getInstance().cardGotAnalytics(newCard);
        UIManager.getInstance().openGameOverPop(stage, newCard, popViewRes);
    }

    public resetStage() {
        ItemController.getInstance().resetList();
    }


    public getNewOpenList() {
        return this.newOpenList;
    }

    public removeClearFromList(id) {
        this.newClearList.splice(id, 1);
    }

    public getNewClearList() {
        return this.newClearList;
    }

    public isStageOpen(stage: number): boolean {
        return SaveDataManager.getInstance().getStageOpen(stage);
    }

    public isStageClear(stage: number) {
        return SaveDataManager.getInstance().getStageStatus(stage)["pass"];
    }

    public isStageNew(stage: number) {
        if (this.newOpenList.indexOf(stage) !== -1) {
            return true
        }
        return false;
    }

    public getCurrentSelectedName() {

    }

    public getCurrentSelected() {
        return this.currentSelected;
    }

    public getDispather() {
        return this.dispather;
    }

    public startStage(id) {
        GameAnalyticsController.getInstance().stageStartAnalytics(id);
        this.currentSelected = id;
        SceneManager.getInstance().toGameScene();

    }

    /**
     * 
     * @param id 
     */
    public setSelect(id) {
        if (this.isStageOpen(id)) {
            // 修改为一次进入游戏,
            this.currentSelected = id;
            SaveDataManager.getInstance().saveLastPlay(id);
        } else {
            if (this.isStageOpen(id - 1)) {
                // UIManager.getInstance().openJumpStagePop();
            }
        }
    }

    public setSelectAndStart(id) {
        if (this.isStageOpen(id)) {
            // 修改为一次进入游戏,
            this.currentSelected = id;
            this.startStage(id);
            SaveDataManager.getInstance().saveLastPlay(id);
        }
    }

    public clearNewOpenList(page) {
        for (var i = 0; i < this.newOpenList.length;) {
            if (this.newOpenList[i] <= page * 6) {
                this.newOpenList.shift();
            } else {
                break;
            }
        }
    }

    public setNewClearList() {

    }

    public async loadStage(stage) {
        if (platform.name === "web" || platform.name === "oppo") {
            console.log("load res from local");
            await RES.loadConfig("resource/stage" + stage + ".res.json", "resource/");
        } else {
            if (stage <= 30) {
                console.log("load res from " + this.resURL);
                await RES.loadConfig("stage" + stage + ".res.json", this.resURL);
            }
        }
        await RES.loadGroup("stage" + stage + "_mp3", 0);
        await RES.loadGroup("stage" + stage + "_png", 0);
        await RES.loadGroup("stage" + stage + "_json", 0);
    }

    public async loadNextStage(newLoadStage) {
        if (newLoadStage <= 30) {
            platform.print("load new stage" + newLoadStage);
            await RES.loadConfig("stage" + newLoadStage + ".res.json", StageController.getInstance().resURL);
            await RES.loadGroup("stage" + newLoadStage + "_mp3", 0);
            await RES.loadGroup("stage" + newLoadStage + "_png", 0);
            await RES.loadGroup("stage" + newLoadStage + "_json", 0);
            // 'RES.loadConfig("stage21.res.json", "https://games.tishoy.com/kaihi3_h5/resource/")'
        }
    }

    public _parse: StageParse;

    public set parse(value) {
        this._parse = value;
    }

    public get parse() {
        return this._parse;
    }

    public get stageAmount() {
        return GameManager.getInstance().getGameConfig().stageAmount;
    }
}