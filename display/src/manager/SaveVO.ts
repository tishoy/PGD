class SaveVO {

    public OFFSET_ISOPEN = 2;
    public OFFSET_ISUNLOCKNEXT = 3;
    public OFFSET_ISPASSED = 4;

    private _id: number;
    private _select: number;
    private _stages = [];
    private _collections = [];
    private _guide: number;
    private _newPlayer: boolean;
    private _cg: boolean;
    private _keyTimes: number;  // 解锁关卡拥有个数
    private _hintTimes: number; // 免费提示个数
    constructor(data) {
        for (var key in data) {
            this["_" + key] = data[key];
        }
    }

    public toObj() {
        return {
            id: this._id,
            select: this._select,
            stages: this._stages,
            collections: this._collections,
            guide: this._guide,
            newPlayer: this._newPlayer,
            cg: this._cg,
            hintTimes: this._hintTimes,
            keyTimes: this._keyTimes
        }
    }



    public get id() {
        return this._id;
    }

    public get stages() {
        return this._stages;
    }

    public get select() {
        return this._select;
    }

    public set select(value) {
        this._select = value;
    }

    public get collections() {
        return this._collections;
    }

    /**
     * 是否观看过CG动画
     */
    public get cgHasShow() {
        return this._cg;
    }

    /**
     * guide状态
     * -1 本游戏没有引导
     * 0  引导没有开始
     * n >0 引导已经开始  并且完成到第n关引导
     */
    public get guide() {
        return this._guide;
    }

    public get isNewPlayer() {
        return this._newPlayer;
    }

    public beOldPlayer() {
        this._newPlayer = false;
    }

    /***
     * 获取开启的关卡
     */
    public getStageOpen(stageId): boolean {
        return this.getStageStatus(stageId).open;
    }

    public openNewStage(stageId) {
        this._stages[stageId] = (this._stages[stageId] | (1 << this.OFFSET_ISOPEN));
    }

    public toBeCanUnlockNext(stageId) {
        this._stages[stageId] = (this._stages[stageId] | (1 << this.OFFSET_ISUNLOCKNEXT));
    }

    public passStage(stageId) {
        this._stages[stageId] = (this._stages[stageId] | (1 << this.OFFSET_ISPASSED));
    }

    public passAndUnlcokStage(stageId) {
        this.passStage(stageId);
        if (this.getStageStatus(stageId).unlockNext) {
            this._stages[stageId + 1] = (this._stages[stageId + 1] | (1 << this.OFFSET_ISOPEN));
            this._stages[stageId + 1] = (this._stages[stageId + 1] | (1 << this.OFFSET_ISUNLOCKNEXT));
        }
    }

    public getStageStatus(stageId) {
        let status = { open: false, pass: false, hint: 0, unlockNext: false }
        let temp = this.stages[stageId] % 4;
        status.open = ((this.stages[stageId] >> 2) & 1) === 1;
        status.unlockNext = ((this.stages[stageId] >> 3) & 1) === 1;
        status.pass = ((this.stages[stageId] >> 4) & 1) === 1;
        status.hint = temp;
        return status;
    }

    public saveStageHintRead(stageId) {
        if (this.stages[stageId] % 4 === 3) {
            return;
        }
        this.stages[stageId] += 1;
    }

    public saveCG() {
        this._cg = true;
    }

    public saveGotItem(res) {
        if (this.collections.indexOf(res) === -1) {
            this.collections.push(res);
        }
    }

    public getSaveedItem() {
        return this.collections;
    }

    public getKeyTimes() {
        return this._keyTimes;
    }

    public getHintTimes() {
        return this._hintTimes;
    }

    public setKeyTimes(value) {
        this._keyTimes = value;
    }

    public setHintTimes(value) {
        this._hintTimes = value;
    }

    public getCollections() {
        return this.collections;
    }
}