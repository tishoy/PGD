/**
 * 
 */
class BaseParse extends egret.DisplayObjectContainer implements DisplayerInterface {
    protected stageScript;
    public items = [];
    private key_list = [];
    protected animates_list = [];
    private isWaiting = false;

    public endActionList = [];

    // 用于处理结束事件所做标记
    protected finishing = false;

    constructor(script) {
        super();
        // this.gameid = gameid;
        // this.stageid = stageid;
        // 获取stage 资源 与 json
        this.stageScript = script;
        this._init();
    }

    public _scene: egret.Sprite;
    public get scene() {
        return this._scene
    }

    async _init() {
        this._scene = new egret.Sprite();

        var data = this.stageScript.init;
        for (var i = 0; i < data.length; i++) {
            if (data[i].type === "Sprite") {
                let props = data[i].props;
                var actor = new egret.Bitmap();
                let splitTexture = props.texture.split("/");
                actor.texture = RES.getRes(splitTexture[splitTexture.length - 1].replace(".", "_"));
                actor.x = Number(props.x);
                actor.y = Number(props.y);
                actor.width = Number(props.width);
                actor.height = Number(props.height);
                actor.scaleX = props.scaleX === undefined ? 1 : Number(props.scaleX);
                actor.scaleY = props.scaleY === undefined ? 1 : Number(props.scaleY);
                actor.alpha = props.alpha === undefined ? 1 : Number(props.alpha);
                actor.rotation = props.rotation === undefined ? 0 : Number(props.rotation);
                actor.visible = props.visible === undefined ? true : props.visible;
                if (props['var'] !== undefined) {
                    if (props['var'].indexOf("mA") === 0) {
                        this[props.var] = actor;
                        this.addChild(actor)
                    } else {
                        this[props.var] = actor;
                        this._scene.addChild(this[props.var]);
                    }
                } else {
                    this._scene.addChild(actor);
                }
            } else if (data[i].type === "Animation") {
                let props = data[i].props;
                let mcFactory = new egret.MovieClipDataFactory(RES.getRes(props.runtime), RES.getRes(props.texture));
                var mcactor = new egret.MovieClip(mcFactory.generateMovieClipData(props.name));
                mcactor.x = Number(props.x);
                mcactor.y = Number(props.y);
                mcactor.width = Number(props.width);
                mcactor.height = Number(props.height);
                mcactor.scaleX = props.scaleX === undefined ? 1 : Number(props.scaleX);
                mcactor.scaleY = props.scaleY === undefined ? 1 : Number(props.scaleY);
                mcactor.alpha = props.alpha === undefined ? 1 : Number(props.alpha);
                mcactor.rotation = props.rotation === undefined ? 0 : Number(props.rotation);
                mcactor.visible = props.visible === undefined ? true : props.visible;
                mcactor["bindEvents"] = [];
                mcactor["status"] = {};
                if (props.autoPlay) {
                    mcactor["status"].isPlaying = true;
                    if (mcactor.movieClipData.labels === null) {
                        mcactor["status"].start = 1;
                        mcactor["status"].end = mcactor.movieClipData.numFrames;
                    } else {
                        for (var j = 0; j < mcactor.movieClipData.labels.length; j++) {
                            if (mcactor.movieClipData.labels[j].name === props.autoAnimation) {
                                mcactor["status"].start = mcactor.movieClipData.labels[j].frame;
                                mcactor["status"].end = mcactor.movieClipData.labels[j].end;
                            }
                        }
                        mcactor["status"].label = props.autoAnimation;
                    }
                    mcactor.gotoAndStop(mcactor["status"].start);
                } else {
                    mcactor["status"].isPlaying = false;

                }
                if (props.loop !== undefined) {
                    mcactor["status"].isLoop = props.loop;
                } else {
                    mcactor["status"].isLoop = false;
                }



                if (props['var'] !== undefined) {
                    if (props['var'].indexOf("mA") === 0) {
                        this[props.var] = mcactor;
                        this.addChild(mcactor)
                    } else {
                        this[props.var] = mcactor;
                        this._scene.addChild(this[props.var]);
                    }
                } else {
                    this._scene.addChild(mcactor);
                }

                this.animates_list.push(mcactor);
            }
        }
        this.registAnimate();
        this.initKey();
        this.initItem();
        this.initHint();

        this.addChildAt(this._scene, 0);


        this.registEvents();

    }


    keyFactory(key) {
        var newKey = {
            id: Number(key.id),
            isOn: key.isOn
        };
        return newKey;
    }


    initKey() {
        this.key_list = [];
        for (var i = 0; i < this.stageScript.keys.length; i++) {

            this.key_list.push(this.keyFactory(this.stageScript.keys[i]));
        }
    }

    initItem() {
        this.items = [];
        for (var i = 0; i < this.stageScript.items.length; i++) {
            this.items.push(this.stageScript.items[i])
        }
    }

    initHint() {
        if (typeof this.stageScript.hints === "string") {
            if (this.stageScript.hints.length > 0) {
                HintController.getInstance().Hints = this.stageScript.hints.split(";")
            } else {
                HintController.getInstance().Hints = [];
            }
        } else {
            HintController.getInstance().Hints = this.stageScript.hints;
        }

    }

    registEvents() {
        var data = this.stageScript.events;
        for (let i = 0; i < data.length; i++) {
            let event = data[i];
            switch (event.type) {
                case "orign":
                    this.doActionList(event.on);
                    break;

                case "end":
                    this.endActionList = event.on;
                    break;

                case "guide":
                    break;

                case "touch":
                    this[data[i].bind].touchEnabled = true;
                    if (this[data[i].bind].hasEvent === undefined) {
                        this[data[i].bind].hasEvent = true;
                        this[data[i].bind].event = [];
                        this[data[i].bind].eventLocks = [];
                        this[data[i].bind].eventOnce = [];
                        this[data[i].bind].eventAnimate = [];
                        this[data[i].bind].eventActions = [];
                        this[data[i].bind].addEventListener(egret.TouchEvent.TOUCH_TAP, (e) => {
                            if (this.isDoing) {
                                return;
                            }

                            // TODO 先判断执行的event
                            let onEvents = [];
                            let lockResult;
                            let animateResult;
                            for (var a = 0; a < this[data[i].bind].eventLocks.length; a++) {
                                lockResult = true;
                                animateResult = false
                                if (this[data[i].bind].eventLocks[a] === undefined || this[data[i].bind].eventLocks[a] === null || this[data[i].bind].eventLocks[a] === []) {
                                    lockResult = true;
                                } else {
                                    for (var j = 0; j < this[data[i].bind].eventLocks[a].length; j++) {
                                        if (this.checkLock(this[data[i].bind].eventLocks[a][j].id) !== this[data[i].bind].eventLocks[a][j].isOn) {
                                            lockResult = false;
                                        }
                                    }
                                }

                                if (this[data[i].bind].eventAnimate[a] !== "" && this[data[i].bind].eventAnimate[a] !== undefined && this[data[i].bind].eventAnimate[a] !== null) {
                                    let frameSlices = this[data[i].bind].eventAnimate[a].frame.split("|");
                                    for (let aa = 0; aa < frameSlices.length; aa++) {
                                        let fromTo = frameSlices[aa].split(",");
                                        if (fromTo.length === 1) {
                                            if (Number(fromTo) === this[this[data[i].bind].eventAnimate[a].name].currentFrame) {
                                                animateResult = true;
                                            }
                                        } else if (fromTo.length === 2) {
                                            if (this[this[data[i].bind].eventAnimate[a].name].visible) {
                                                if (Number(fromTo[0]) <= this[this[data[i].bind].eventAnimate[a].name].currentFrame && Number(fromTo[1]) >= this[this[data[i].bind].eventAnimate[a].name].currentFrame) {
                                                    animateResult = true;
                                                }
                                            }

                                        } else {
                                            animateResult = true;
                                        }
                                    }
                                } else {
                                    animateResult = true;
                                }
                                onEvents.push(lockResult && animateResult);
                            }


                            for (var b = 0; b < onEvents.length; b++) {
                                if (onEvents[b]) {
                                    this.doActionList(this[data[i].bind].eventActions[b]);
                                }

                            }

                            for (var c = 0; c < onEvents.length; c++) {
                                if (this[data[i].bind].eventOnce[c]) {
                                    this[data[i].bind].event.splice(c, 1);
                                    this[data[i].bind].eventLocks.splice(c, 1);
                                    this[data[i].bind].eventOnce.splice(c, 1);
                                    this[data[i].bind].eventAnimate.splice(c, 1);
                                    this[data[i].bind].eventActions.splice(c, 1);
                                }
                            }
                            // 再执行event
                        }, this);
                    }
                    this[data[i].bind].event.push(event.id);
                    this[data[i].bind].eventLocks.push(event.lock);
                    this[data[i].bind].eventOnce.push(event.once);
                    this[data[i].bind].eventAnimate.push(event.animate);
                    this[data[i].bind].eventActions.push(event.on);

                    break;

                case "use_item":
                    if (this.items[data[i].item].useTarget !== undefined && this.items[data[i].item].useTarget.length !== 0) {

                    } else {
                        this.items[data[i].item].useTarget = [];
                    }
                    this.items[data[i].item].useTarget.push(data[i]);
                    break;
            }
        }

        // SceneManager.getInstance().hideLoading();
    }


    registAnimate() {
        var data = this.stageScript.animates;

        for (let i = 0; i < data.length; i++) {
            let mcFactory = new egret.MovieClipDataFactory(RES.getRes(data[i].res + "_json"), RES.getRes(data[i].res + "_png"));
            this[data[i].name] = new egret.MovieClip(mcFactory.generateMovieClipData(data[i].label));
            this[data[i].name].visible = false;
            this[data[i].name].gotoAndStop(1);
            this[data[i].name].bindEvents = [];
            this[data[i].name].status = {};
            this[data[i].name].status.isPlaying = false;
            this[data[i].name].status.isLoop = false;
            this._scene.addChild(this[data[i].name]);
            this.animates_list.push(this[data[i].name]);
        }
    }

    actionNowDo = 0;
    doingList = [];
    isDoing = false;
    getItemPause = false;
    pauseAction = -1;

    doActionList(list) {
        if (this.isWaiting) {
            return;
        }
        this.actionNowDo = 0;
        this.doingList = list;
        this.isDoing = true;
        UIManager.getInstance().canMoveScene = false;
        this.executeDo();
    }

    executeDo() {
        if (UIManager.getInstance().isPopUp) {
            return;
        }
        if (this.actionNowDo < this.doingList.length) {
            this.doAction(this.doingList[this.actionNowDo]);
        } else {
            this.actionNowDo = 0;
            this.doingList = [];
            this.isDoing = false;
            UIManager.getInstance().canMoveScene = true;
            // 完成整个parse;
            if (this.finishing) {
                this.finishAll();
                this.finishing = false;
                
            }
        }
    }

    finishAction(actionId) {
        this.actionNowDo++;
        this.executeDo();
    }

    doAction(actionId) {
        var action = this.stageScript.actions[actionId];
        if (action.todo.type === "simple") {
            for (var key in action.todo.props) {
                this[action["actor"]][key] = action.todo.props[key];
            }
            this.finishAction(actionId);
        } else if (action.todo.type === "tween") {
            egret.Tween.get(this[action["actor"]]).to(action.todo.props, Number(action.todo.time)).call(
                () => {
                    this.finishAction(actionId);
                });
        } else if (action.todo.type === "item") {
            this.registItem(action.todo.item);
            this.getItemPause = true;
            this.pauseAction = actionId;
        } else if (action.todo.type === "key") {
            // this.key_list.push(action.todo.key);
            this.getLockKey(action.todo.key);
            this.finishAction(actionId);
        } else if (action.todo.type === "wait") {
            this.isWaiting = true;
            egret.Tween.get(this).wait(Number(action.todo.time)).call(() => {
                this.isWaiting = false;
                this.finishAction(actionId);
            });
        } else if (action.todo.type === "clear") {
            PuzzleGameController.getInstance().clearStage([], action.todo.res);
            // this.resetStage();
        } else if (action.todo.type === "over") {
            PuzzleGameController.getInstance().gameOverStage([], action.todo.res);
            // this.resetStage();
        } else if (action.todo.type === "finish") {
            this.finishing = true;
            this.finishAction(actionId);
        } else if (action.todo.type === "sound") {
            SoundManager.getInstance().playSound(action.todo.res);
            this.finishAction(actionId);
        } else if (action.todo.type === "a_play") {
            for (var key in action.todo.props) {
                this[action["actor"]][key] = action.todo.props[key];
            }
            this[action["actor"]].status.isPlaying = true;
            this[action["actor"]].status.isLoop = action.todo.animate.isLoop;

            if (this[action["actor"]].movieClipData.labels === null) {
                this[action["actor"]]["status"].start = 1;
                this[action["actor"]]["status"].end = this[action["actor"]].movieClipData.numFrames;
            } else {
                for (var j = 0; j < this[action["actor"]].movieClipData.labels.length; j++) {
                    if (this[action["actor"]].movieClipData.labels[j].name === action.todo.animate.label) {
                        this[action["actor"]]["status"].start = this[action["actor"]].movieClipData.labels[j].frame;
                        this[action["actor"]]["status"].end = this[action["actor"]].movieClipData.labels[j].end;
                    }
                }
                this[action["actor"]]["status"].label = action.todo.animate.label;
            }

            this[action["actor"]].gotoAndStop(this[action["actor"]]["status"].start);
            this.finishAction(actionId);
        } else if (action.todo.type === "a_stop") {
            for (var key in action.todo.props) {
                this[action["actor"]][key] = action.todo.props[key];
            }
            this[action["actor"]].status.isPlaying = false;
            if (action.todo.animate.frame !== undefined) {
                this[action["actor"]].gotoAndStop(Number(action.todo.animate.frame));
            } else {
                this[action["actor"]].stop();
            }
            this.finishAction(actionId);
        }
    }

    checkLock(id) {
        for (let i = 0; i < this.key_list.length; i++) {
            if (Number(this.key_list[i].id) === Number(id)) {
                return (this.key_list[i].isOn);
            }
        }
        return null;
    }


    getLockKey(key) {
        for (let i = 0; i < this.key_list.length; i++) {
            if (Number(this.key_list[i].id) === Number(key.id)) {
                this.key_list[i].isOn = key.isOn;
            }
        }
    }

    _start(): void { }

    play_loop(): void {
        if (UIManager.getInstance().isPopUp === false && this.getItemPause === true) {
            this.getItemPause = false;
            this.finishAction(this.pauseAction);
        }
        if (this.animates_list === undefined) {
            return;
        }
        for (let i = 0; i < this.animates_list.length; i++) {
            if (this.animates_list[i].status.isPlaying) {
                if (this.animates_list[i].currentFrame === this.animates_list[i].status.end) {
                    if (this.animates_list[i].status.isLoop) {
                        this.animates_list[i].gotoAndStop(this.animates_list[i].status.start);
                    }
                } else {
                    this.animates_list[i].gotoAndStop(this.animates_list[i].currentFrame + 1);
                }
            }
        }

    }


    _remove(): void { egret.Tween.removeAllTweens(); }

    registItem(itemNo: number): void {
        ItemController.getInstance().addItem(this.items[itemNo]);
    }

    useItem(itemNo: number, posX: number, posY: number): boolean {
        if (this.isDoing) {
            return false;
        }
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].id === itemNo && this.items[i].useTarget !== undefined) {
                for (let j = 0; j < this.items[i].useTarget.length; j++) {
                    if (this[this.items[i].useTarget[j].bind].hitTestPoint(posX, posY) && this[this.items[i].useTarget[j].bind].visible === true) {

                        let locked = false;
                        if (this.items[i].useTarget[j].lock === undefined || this.items[i].useTarget[j].lock === null || this.items[i].useTarget[j].lock === []) {
                        } else {
                            for (var k = 0; k < this.items[i].useTarget[j].lock.length; k++) {
                                if (this.checkLock(this.items[i].useTarget[j].lock[k].id) !== this.items[i].useTarget[j].lock[k].isOn) {
                                    locked = true;
                                }
                            }
                        }
                        if (locked) {
                            continue;
                        }

                        this.doActionList(this.items[i].useTarget[j].on);
                        return true;
                    }
                }
            }
        }
        return false;
    }

    public finishAll() {

    }

}