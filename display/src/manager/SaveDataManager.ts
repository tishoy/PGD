class SaveDataManager {

    private static instance: SaveDataManager = null;

    private _currentGame: number = 0;
    private saves = {};


    constructor() {
        if (SaveDataManager.instance !== null) {
            throw new Error("single instance error");
        }
        this.init();
    }

    public init(): void {

        this.loadFromLocalStorage();
        if (!this.saves) {
            this.saves = {};
        }
        if (this._currentGame != GameManager.getInstance().game) {
            this._currentGame = GameManager.getInstance().game;

            var save = new SaveVO({
                id: GameManager.getInstance().game,
                select: 1,
                stages: [null, 12],
                collections: [],
                guide: -1,
                newPlayer: true,
                cg: !GameManager.getInstance().getGameConfig().cg,
                keyTimes: 0,
                hintTimes: 0
            })
            this.saves[this._currentGame] = save;
            this.saveToLocalStorage();
            for (let i = 0; i < StageController.getInstance().stageAmount - 1; i++) {
                save.stages.push(0);
            }

            this.saveToLocalStorage();

            // this.saves[this._currentGame] = save;
            // console.log(this.saves);
            // this.saveToLocalStorage();

            // this.cardSave = [null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

        }

    }

    public static getInstance(): SaveDataManager {
        if (this.instance === null) {
            this.instance = new SaveDataManager();
        }
        return this.instance;
    }

    private saveToLocalStorage() {
        egret.localStorage.setItem("currentGame", String(this._currentGame));
        egret.localStorage.setItem("saves", this.genSaves());
    }

    genSaves() {
        var obj = {}
        for (var key in this.saves) {
            obj[key] = {};
            obj[key] = this.saves[key].toObj();
        }
        return JSON.stringify(obj);

    }

    private loadFromLocalStorage() {
        this._currentGame = Number(egret.localStorage.getItem("currentGame"));
        let tempSave = egret.localStorage.getItem("saves");
        if (tempSave === "" || tempSave === null || tempSave === undefined) {
            return;
        }
        var temp = JSON.parse(tempSave);
        for (var i = 0; i < ConfigManager.getInstance().gameConfigData.games.length; i++) {
            if (temp[i]) {
                for (var key in temp[i]) {
                    this.saves[i] = new SaveVO(temp[i]);
                }
            }
        }

    }



    /***
     * 获取开启的关卡
     */
    public getStageOpen(id): boolean {
        return this.currentGame.getStageStatus(id).open;
    }

    openStage(stageId) {
        if (this.currentGame.getStageStatus(stageId).open) {
            return false;
        } else {
            this.currentGame.openNewStage(stageId);
            this.currentGame.toBeCanUnlockNext(stageId);
            this.saveToLocalStorage();
            return true;
        }
    }

    /**
     * 存储关卡过关
     * @param stageId 
     */
    public saveStagePass(stageId): boolean {
        if (this.currentGame.stages.length < stageId) {
            this.currentGame.stages.length = stageId + 1;
        }
        let status = this.currentGame.getStageStatus(stageId);

        /** 
        // 增加设置 能否解锁下一关
        if (status.unlockNext) {
            this.currentGame.passAndUnlcokStage(stageId);
        } else {
            this.currentGame.passStage(stageId);
        }
         */

         //修改为 直接解锁
        this.currentGame.passAndUnlcokStage(stageId);

        this.saveToLocalStorage();
        return true;
    }

    public getStageStatus(stageId) {
        return this.currentGame.getStageStatus(stageId);
    }

    public showCG() {
        return !this.currentGame.cgHasShow;
    }









    /**
     * 声音存储
     * status: "1" playing "0" silence
     */
    public saveSoundStatus(status) {
        egret.localStorage.setItem("soundPlaying", status);
    }

    public getSoundStatus() {
        return egret.localStorage.getItem("soundPlaying");
    }

    /**
     * 语言设置
     */
    public getLang() {
        return egret.localStorage.getItem("lang")
    }

    public setLang(lang) {
        egret.localStorage.setItem("lang", lang);
    }

    public passGuide(stageId) {

    }

    /**
     * 上一次玩的关卡
     */
    public getLastPlay() {
        return this.currentGame.select;
    }

    public saveLastPlay(stageId) {
        this.currentGame.select = stageId;
        this.saveToLocalStorage();
    }

    public saveStageHintRead(stageId) {
        this.currentGame.saveStageHintRead(stageId);
        this.saveToLocalStorage();
    }

    public saveGotItem(item) {
        this.currentGame.saveGotItem(item);
        this.saveToLocalStorage();
    }

    public isNewPlayer() {
        return this.currentGame.isNewPlayer;
    }

    public beOldPlayer() {
        this.currentGame.beOldPlayer();
        this.saveToLocalStorage();
    }

    public saveCGShow() {
        this.currentGame.saveCG();
        this.saveToLocalStorage();
    }

    public getCollections() {
        return this.currentGame.getCollections();
    }

    public addKeyTimes(value) {
        this.currentGame.setKeyTimes(this.currentGame.getKeyTimes() + value);
        this.saveToLocalStorage();
    }

    public addHintTimes(value) {
        this.currentGame.setHintTimes(this.currentGame.getHintTimes() + value);
        this.saveToLocalStorage();
    }

    public useKey() {
        if (this.currentGame.getKeyTimes() > 0) {
            this.currentGame.setKeyTimes(this.currentGame.getKeyTimes() - 1);
            this.saveToLocalStorage();
            return true;
        }
        return false;
    }

    public useHint() {
        if (this.currentGame.getHintTimes() > 0) {
            this.currentGame.setHintTimes(this.currentGame.getHintTimes() - 1);
            this.saveToLocalStorage();
            return true;
        }
        return false;
    }

    public getKeyTimes() {
        return this.currentGame.getKeyTimes();
    }

    public getHintTimes() {
        return this.currentGame.getHintTimes();
    }

    private get currentGame(): SaveVO {
        return this.saves[this._currentGame]
    }

}