class UIManager {

    // private static instance: SoundManager;
    static instance: UIManager = null;

    private gameLayer: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
    private loadingLayer: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
    private uiLayer: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
    private popLayer: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();
    private tipLayer: egret.DisplayObjectContainer = new egret.DisplayObjectContainer();


    private itemFullTip: egret.Bitmap;

    private egretStage: egret.Stage;

    private stageNo: StageNo;
    private menuButton: MenuButton;
    // private soundButton:SoundButton;
    private hintButton: HintButton;
    private hintButtomButton: HintButtomButton;
    private retryButton: RetryButton;
    private itemCtrl: ItemCtrlView;
    private scrollCtrl: ScrollCtrlView;
    private leftArrow: LeftArrow;
    private rightArrow: RightArrow;


    private currentPop: PopBase;
    private clearPop: ClearPop;
    private gameOverPop: GameOverPop;
    private howToPlayPop: HowToPlayPop;
    private itemGetPop: ItemGetPop;
    private menuPop: MenuPop;
    private stageTitlePop: StageTitlePop;
    private hintPop: HintPop;
    private cardPop: CardPop;
    private noVedioPop: NoVedioPop;
    private collectionHintPop: CollectionHintPop;
    private jumpStagePop: JumpStagePop;
    private lotteryPop: LotteryPop;
    private mysteryStagePop: MysteryStagePop;

    public isPopUp: boolean = false;

    private uiConfig;
    private popConfig;

    public uiList = [];

    public canMoveScene = true;

    constructor() {
    }

    public init(egretStage: egret.Stage): void {
        this.egretStage = egretStage;
        this.egretStage.addChild(this.gameLayer);
        this.egretStage.addChild(this.uiLayer);
        this.egretStage.addChild(this.popLayer);
        this.egretStage.addChild(this.loadingLayer);
        this.egretStage.addChild(this.tipLayer);
    }


    public initUI() {
        // 通过UI配置表读取UI
        this.uiConfig = GameManager.getInstance().getGameConfig().game_ui;
        this.popConfig = GameManager.getInstance().getGameConfig().pops;
        if (this.needUI(UIEnum.UI_MENU_BTN)) {
            this.menuButton = new MenuButton(this["config_" + UIEnum.UI_MENU_BTN]);
            this.uiList.push(this.menuButton);
        }
        if (this.needUI(UIEnum.UI_LEFT_BTN)) {
            this.leftArrow = new LeftArrow(this["config_" + UIEnum.UI_LEFT_BTN]);
            this.uiList.push(this.leftArrow);
        }
        if (this.needUI(UIEnum.UI_RIGHT_BTN)) {
            this.rightArrow = new RightArrow(this["config_" + UIEnum.UI_RIGHT_BTN]);
            this.uiList.push(this.rightArrow);
        }
        if (this.needUI(UIEnum.UI_RETRY_BTN)) {
            this.retryButton = new RetryButton(this["config_" + UIEnum.UI_RETRY_BTN])
            this.uiList.push(this.retryButton);
        }

        if (this.needUI(UIEnum.UI_ITEMCTRLVIEW)) {
            this.itemCtrl = ItemCtrlView.getInstance(this.egretStage);
            this.itemCtrl.setConfig(this["config_" + UIEnum.UI_ITEMCTRLVIEW])
            this.uiList.push(this.itemCtrl);
        }
        if (this.needUI(UIEnum.UI_HINT_BTN)) {
            this.hintButton = new HintButton(this["config_" + UIEnum.UI_HINT_BTN])
            this.uiList.push(this.hintButton);
        }
        if (this.needUI(UIEnum.UI_BUTTOM_HINT_BTN)) {
            this.hintButtomButton = new HintButtomButton(this["config_" + UIEnum.UI_BUTTOM_HINT_BTN])
            this.uiList.push(this.hintButtomButton);
        }
        if (this.needUI(UIEnum.UI_SOUND_BTN)) {
            // this.uiList.push(this.hintButton);
        }

        if (this.needUI(UIEnum.UI_STAGE_NO)) {
            this.stageNo = new StageNo(this["config_" + UIEnum.UI_STAGE_NO]);
            this.uiList.push(this.stageNo);
        }

    }

    public static getInstance(): UIManager {
        if (this.instance === null) {
            this.instance = new UIManager();
        }
        return this.instance;
    }

    public show(ui) {
        this.uiLayer.addChild(ui);
    }

    public hide(ui) {
        if (this.uiLayer.contains(ui)) {
            this.uiLayer.removeChild(ui);
        }
    }

    public needUI(uiName): Boolean {
        for (let i = 0; i < this.uiConfig.length; i++) {
            if (this.uiConfig[i].ui === uiName) {
                this["config_" + uiName] = this.uiConfig[i];
                return true;
            }
        }
        return false
    }


    public resetUI() {
        this.canMoveScene = true;
        this.itemCtrl.touchEnabled = false;
        this.itemCtrl.updateItems();
    }





    setUIPosition(ui: egret.DisplayObject, posType: number, x = 0, y = 0) {
        switch (posType) {
            case PosTypeEnum.L_B:
                ui.x = x + ui.width / 2;
                ui.y = ScreenAdaptManager.getDisplayHeight() - ui.height / 2 - y - ScreenAdaptManager.getInstance().fixedHeight;
                break;

            case PosTypeEnum.B:
                ui.x = ScreenAdaptManager.getDisplayWidth() / 2;
                ui.y = ScreenAdaptManager.getDisplayHeight() - ui.height / 2 - y - ScreenAdaptManager.getInstance().fixedHeight;
                break;

            case PosTypeEnum.R_B:
                ui.x = ScreenAdaptManager.getDisplayWidth() - ui.width / 2 - x;
                ui.y = ScreenAdaptManager.getDisplayHeight() - ui.height / 2 - y - ScreenAdaptManager.getInstance().fixedHeight;
                break;

            case PosTypeEnum.L:
                ui.x = x + ui.width / 2;
                ui.y = ScreenAdaptManager.getDisplayHeight() / 2;
                break;

            case PosTypeEnum.M:
                ui.x = ScreenAdaptManager.getDisplayWidth() / 2;
                ui.y = ScreenAdaptManager.getDisplayHeight() / 2;
                break;

            case PosTypeEnum.R:
                ui.x = ScreenAdaptManager.getDisplayWidth() - x - ui.width / 2;
                ui.y = ScreenAdaptManager.getDisplayHeight() / 2;
                break;

            case PosTypeEnum.L_T:
                ui.x = x + ui.width / 2;
                ui.y = ui.height + y + ScreenAdaptManager.getInstance().fixedHeight;
                break;

            case PosTypeEnum.T:
                ui.x = ScreenAdaptManager.getDisplayWidth() / 2;
                ui.y = ui.height + y + ScreenAdaptManager.getInstance().fixedHeight;
                break;

            case PosTypeEnum.R_T:
                ui.x = ScreenAdaptManager.getDisplayWidth() - x - ui.width / 2;
                ui.y = ui.height + y + ScreenAdaptManager.getInstance().fixedHeight;
                break;
        }
    }

    setUIRelation(uiParent, uiChild, typeList, x = 0, y = 0) {
        let OorI = typeList[0];
        let posType = typeList[1];
        switch (posType) {
            case PosTypeEnum.L_B:
                if (OorI === PosTypeEnum.I) {
                    uiChild.x = uiParent.x + x - uiParent.width / 2;
                    uiChild.y = uiParent.y - y + uiParent.height / 2;
                } else if (OorI === PosTypeEnum.O) {
                    uiChild.x = uiParent.x - x - uiParent.width / 2;
                    uiChild.y = uiParent.y + y + uiParent.height / 2;
                }
                break;

            case PosTypeEnum.B:
                if (OorI === PosTypeEnum.I) {
                    uiChild.y = uiParent.y - y + uiParent.height / 2;
                } else if (OorI === PosTypeEnum.O) {
                    uiChild.y = uiParent.y + y + uiParent.height / 2;
                }
                break;

            case PosTypeEnum.R_B:
                if (OorI === PosTypeEnum.I) {
                    uiChild.x = uiParent.x - x + uiParent.width / 2;
                    uiChild.y = uiParent.y - y + uiParent.height / 2;
                } else if (OorI === PosTypeEnum.O) {
                    uiChild.x = uiParent.x + x + uiParent.width / 2;
                    uiChild.y = uiParent.y + y + uiParent.height / 2;
                }
                break;

            case PosTypeEnum.L:
                if (OorI === PosTypeEnum.I) {
                    uiChild.x = uiParent.x + x - uiParent.width / 2;
                } else if (OorI === PosTypeEnum.O) {
                    uiChild.x = uiParent.x - x - uiParent.width / 2;
                }
                break;

            case PosTypeEnum.M:
                if (OorI === PosTypeEnum.I) {
                    uiChild.x = uiParent.x + x;
                    uiChild.y = uiParent.y + y;
                }
                break;

            case PosTypeEnum.R:
                if (OorI === PosTypeEnum.I) {
                    uiChild.x = uiParent.x - x + uiParent.width / 2;
                    uiChild.y = uiParent.y + y;
                } else if (OorI === PosTypeEnum.O) {
                    uiChild.x = uiParent.x + x + uiParent.width / 2;
                    uiChild.y = uiParent.y + y;
                }
                break;

            case PosTypeEnum.L_T:
                if (OorI === PosTypeEnum.I) {
                    uiChild.x = uiParent.x + x - uiParent.width / 2;
                    uiChild.y = uiParent.y + y - uiParent.height / 2;
                } else if (OorI === PosTypeEnum.O) {
                    uiChild.x = uiParent.x - x - uiParent.width / 2;
                    uiChild.y = uiParent.y - y - uiParent.height / 2;
                }
                break;

            case PosTypeEnum.T:
                if (OorI === PosTypeEnum.I) {
                    uiChild.y = uiParent.y + y - uiParent.height / 2;
                } else if (OorI === PosTypeEnum.O) {
                    uiChild.y = uiParent.y - y - uiParent.height / 2;
                }
                break;

            case PosTypeEnum.R_T:
                if (OorI === PosTypeEnum.I) {
                    uiChild.x = uiParent.x - x + uiParent.width / 2;
                    uiChild.y = uiParent.y + y - uiParent.height / 2;
                } else if (OorI === PosTypeEnum.O) {
                    uiChild.x = uiParent.x + x + uiParent.width / 2;
                    uiChild.y = uiParent.y - y - uiParent.height / 2;
                }
                break;
        }
    }

    // ---------------------------ItemCtrl----------------------












    // -------------------------------Scroll-------------------

    uiScrollCtrlViewTouchTap() {

    }

    uiScrollCtrlViewTouchMoved() {

    }




    // -----------------------------Buttons---------------

    uiHintBtnTouched(e) {
        if (!UIManager.getInstance().canMoveScene) {
            return;
        }
        AdvertiseManager.getInstance().vedioPlay(
            () => {

            }, (end) => {
                if (end) {
                    let stageId = StageController.getInstance().getCurrentSelected();
                    SaveDataManager.getInstance().saveStageHintRead(stageId);
                    UIManager.getInstance().openHintPop(stageId);
                }
            }
        )
    }

    uiMenuBtnTouched(e) {
        if (!UIManager.getInstance().canMoveScene) {
            return;
        }
        UIManager.getInstance().openMenuPop();
    }

    uiRetryBtnTouched(e) {
        StageController.getInstance().resetStage();
    }

    getUILeftArrow() {
        return UIManager.getInstance().leftArrow;
    }

    getUIRightArrow() {
        return UIManager.getInstance().rightArrow;
    }

    uiLeftArrowTouched(e) {
        if (!UIManager.getInstance().canMoveScene) {
            return;
        }
        egret.Tween.get(StageController.getInstance()._parse.scene).to({ x: 0 }, 500).call(() => {
            UIManager.getInstance().rightArrow.visible = true;
        });
        UIManager.getInstance().leftArrow.visible = false;
    }

    uiRightArrowTouched(e) {
        if (!UIManager.getInstance().canMoveScene) {
            return;
        }
        egret.Tween.get(StageController.getInstance()._parse.scene).to({ x: -720 }, 500).call(() => {
            UIManager.getInstance().leftArrow.visible = true;
        }, this);
        UIManager.getInstance().rightArrow.visible = false;
    }


    //--------------------------Pops--------------------------
    public setCurrentPop(pop) {
        this.currentPop = pop;
    }

    public getCurrentPop() {
        return this.currentPop;
    }


    public openHowToPlayPop(): void {
        let howToPlayPop = new HowToPlayPop();
        this.popLayer.addChild(howToPlayPop);
        this.isPopUp = true;
        this.currentPop = howToPlayPop;
    }

    public closeHowToPlayPop(): void {
        this.popLayer.removeChild(this.currentPop);
        this.isPopUp = false
        this.currentPop = null;
    }


    // 获取道具弹窗
    public openItemGetPop(item: string): void {
        if (this.itemGetPop == null) {
            this.itemGetPop = new ItemGetPop();
            this.itemGetPop.setIcon(item);
            PopEffect.addPopUp(this.itemGetPop, true, 0, 0, 2);
            this.isPopUp = true;
            this.currentPop = this.itemGetPop;
        }
    }
    // 关闭道具弹窗
    public closeItemGetPop(): void {
        if (this.itemGetPop != null) {
            PopEffect.removePopUp(this.itemGetPop, 1);
            // ItemCtrlView.getInstance().updateItems(true);
            this.itemGetPop = null;
            this.isPopUp = false;
            this.currentPop = null;
        }
    }

    public openMenuPop(): void {
        if (this.menuPop == null) {
            this.menuPop = new MenuPop();
            this.popLayer.addChild(this.menuPop);
            // PopEffect.addPopUp(this.menuPop, false, 0, 0, 2);
            this.isPopUp = true;
            this.currentPop = this.menuPop;
        }
    }

    public closeMenuPop(): void {
        if (this.menuPop != null) {
            this.popLayer.removeChild(this.menuPop);
            // PopEffect.removePopUp(this.menuPop, 1);
            this.menuPop = null;
            this.currentPop = null;
            this.isPopUp = false;
        }
    }

    /**
     * 打開過關彈窗
     * 打開關閉動畫 淡入淡出
     */
    public openClearPop(stage, card, popViewRes): void {
        this.closeAllPop();
        if (this.clearPop == null) {
            this.clearPop = new ClearPop(stage, popViewRes);
            // this.clearPop.setCollections(card);
            this.getPopLayer().addChild(this.clearPop);
            this.currentPop = this.clearPop;
            this.isPopUp = true;
        }

    }

    public closeClearPop(): void {
        if (this.clearPop != null) {
            this.popLayer.removeChild(this.clearPop);
            this.clearPop = null;
            this.currentPop = null;
            this.isPopUp = false;
        }
    }

    /**
     * 打開失敗彈窗
     */
    public openGameOverPop(stage, card, popViewRes): void {
        this.closeAllPop();
        if (this.gameOverPop == null) {
            this.isPopUp = true;
            this.gameOverPop = new GameOverPop(stage, popViewRes);
            // this.gameOverPop.setCollections(card);
            this.popLayer.addChild(this.gameOverPop);
            this.currentPop = this.gameOverPop;
        }
    }

    public closeGameOverPop(): void {
        if (this.gameOverPop != null) {
            this.popLayer.removeChild(this.gameOverPop);
            this.gameOverPop = null;
            this.currentPop = null;
            this.isPopUp = false;
        }
    }

    public openCardPop(data): void {
        if (this.cardPop == null) {
            this.cardPop = new CardPop(data);
            this.isPopUp = true;
            this.popLayer.addChild(this.cardPop);
        }
    }

    public closeCardPop(): void {
        if (this.cardPop != null) {
            this.popLayer.removeChild(this.cardPop);
            // PopEffect.removePopUp(this.hintPop, 1);
            this.isPopUp = false;
            this.cardPop = null;
        }
    }

    public openCollectionHintPop(detail, status): void {
        if (this.collectionHintPop == null) {
            this.collectionHintPop = new CollectionHintPop(detail, status);
            this.isPopUp = true;
            this.popLayer.addChild(this.collectionHintPop);
        }
    }

    public closeCollectionHintPop(): void {
        if (this.collectionHintPop != null) {
            this.popLayer.removeChild(this.collectionHintPop);
            // PopEffect.removePopUp(this.hintPop, 1);
            this.isPopUp = false;
            this.collectionHintPop = null;
        }
    }

    public openJumpStagePop(): void {
        if (this.jumpStagePop == null) {
            this.jumpStagePop = new JumpStagePop();
            this.isPopUp = true;
            this.popLayer.addChild(this.jumpStagePop);
        }
    }

    public closeJumpStagePop(): void {
        if (this.jumpStagePop != null) {
            this.popLayer.removeChild(this.jumpStagePop);
            // PopEffect.removePopUp(this.hintPop, 1);
            this.isPopUp = false;
            this.jumpStagePop = null;
        }
    }

    public openHintPop(stageId, pop = false): void {
        if (this.hintPop == null) {
            this.hintPop = new HintPop(stageId);
            this.popLayer.addChild(this.hintPop);
            this.isPopUp = true;
            // if (pop) {
            //     PopEffect.addPopUp(this.hintPop, true, 0, 0, 2);
            // } else {
            //     this.popLayer.addChild(this.hintPop);
            // }
            // PopEffect.addPopUp(this.hintPop, true, 0, 0, 2);
            // this.currentPop = this.hintPop;
        }
    }

    public closeHintPop(): void {
        if (this.hintPop != null) {
            this.popLayer.removeChild(this.hintPop);
            // PopEffect.removePopUp(this.hintPop, 1);
            this.isPopUp = false;
            this.hintPop = null;
        }
    }

    public openNoVedioPop() {
        if (this.noVedioPop == null) {
            this.noVedioPop = new NoVedioPop();
            this.isPopUp = true;
            this.popLayer.addChild(this.noVedioPop);
        }
    }

    public closeNoVedioPop() {
        if (this.noVedioPop != null) {
            this.popLayer.removeChild(this.noVedioPop);
            // PopEffect.removePopUp(this.hintPop, 1);
            this.isPopUp = false;
            this.noVedioPop = null;
        }
    }

    /**
     * 關卡標題彈窗
     */
    public openStageTitlePop(): void {
        if (this.stageTitlePop == null) {
            this.stageTitlePop = new StageTitlePop();
            this.popLayer.addChild(this.stageTitlePop);
            this.currentPop = this.stageTitlePop;
            this.isPopUp = true;
        }
    }

    public closeStageTitlePop(): void {
        if (this.stageTitlePop != null) {
            this.popLayer.removeChild(this.stageTitlePop);
            this.currentPop = null;
            this.stageTitlePop = null;
            this.isPopUp = false;
        }
    }

    public openLotteryPop(): void {
        if (this.lotteryPop == null) {
            this.lotteryPop = new LotteryPop();
            this.popLayer.addChild(this.lotteryPop);
            this.currentPop = this.lotteryPop;
            this.isPopUp = true;
        }
    }

    public closeLotteryPop(): void {
        if (this.lotteryPop != null) {
            this.popLayer.removeChild(this.lotteryPop);
            this.currentPop = null;
            this.lotteryPop = null;
            this.isPopUp = false;
        }
    }

    public openMysteryStagePop(): void {
        if (this.mysteryStagePop == null) {
            this.mysteryStagePop = new MysteryStagePop();
            this.popLayer.addChild(this.mysteryStagePop);
            this.currentPop = this.mysteryStagePop;
            this.isPopUp = true;
        }
    }

    public closeMysteryStagePop(): void {
        if (this.mysteryStagePop != null) {
            this.popLayer.removeChild(this.mysteryStagePop);
            this.currentPop = null;
            this.mysteryStagePop = null;
            this.isPopUp = false;
        }
    }

    public closeAllPop(): void {
        this.closeItemGetPop();
        this.closeMenuPop();
        this.closeClearPop();
        this.closeGameOverPop();
        this.closeHintPop();
        this.closeLotteryPop();
        this.closeMysteryStagePop();
    }




    public showItemFullTip(): void {
        if (this.itemFullTip === undefined) {
            this.itemFullTip = new TSBitmap("itemfull_png");
            this.itemFullTip.alpha = 0;
            this.itemFullTip.x = Util.curWidth() / 2;
            this.itemFullTip.y = Util.curHeight() / 2;
            this.itemFullTip.anchorOffsetX = this.itemFullTip.width / 2;
            this.itemFullTip.anchorOffsetY = this.itemFullTip.height / 2;
            this.tipLayer.addChild(this.itemFullTip);
        }
        if (this.itemFullTip.alpha > 0) {
            return;
        }
        this.itemFullTip.alpha = 1;
        egret.Tween.get(this.itemFullTip).wait(1500).to({ alpha: 0 }, 500).call(() => {
            // this.itemFullTip.visible = false;
        })
    }






    // ----------------------------Layers---------------------    

    public getGameLayer(): egret.DisplayObjectContainer {
        return this.gameLayer;
    }

    public getUILayer(): egret.DisplayObjectContainer {
        return this.uiLayer;
    }

    public getLoadingLayer(): egret.DisplayObjectContainer {
        return this.loadingLayer;
    }


    public getPopLayer(): egret.DisplayObjectContainer {
        return this.popLayer;
    }

    public getTipLayer(): egret.DisplayObjectContainer {
        return this.tipLayer;
    }


    public updateStageNo() {
        this.stageNo.update();
    }




}