

class AdvertiseManager {

    private static instance: AdvertiseManager = null;

    private _banner;
    private _vedio = null;
    private _appBox;
    private _interstitialAd = null;
    private schemeEntrance: egret.Bitmap;

    private _interstitialAdTimes = 0;
    private _interstitialAdStartStage = 0;

    private _bannerShow = false;

    private _vedioLoaded = false;

    private advertiseConfig;


    constructor() {
        this.init();
    }



    private init(): void {

        if (AdvertiseManager.instance !== null) {
            throw new Error("single instance error");
        }

        this.advertiseConfig = GameManager.getInstance().getGameConfig().advertise;
        this._banner = null;
        this._vedio = null;
        this._interstitialAd = null;
        // this.schemeEntrance = new egret.Bitmap();
        console.log(this.advertiseConfig);
        this._interstitialAdTimes = this.getInterstitialAdTimes();
        this._interstitialAdStartStage = this.getInterstitialAdStage();
    }

    public static getInstance(): AdvertiseManager {
        if (this.instance === null) {
            this.instance = new AdvertiseManager();
        }
        return this.instance;
    }

    async fetchVedio() {
        if (this._vedio === null) {
            this._vedio = await platform.fetchVedio(() => {
                UIManager.getInstance().openNoVedioPop();
                this.vedioLoaded = false;
            });
            if (this._vedio !== null) {
                this._vedioLoaded = true;
            }
        }
    }

    async vedioPlay(onPlay, onEnd) {
        if (!this._vedioLoaded) {
            UIManager.getInstance().openNoVedioPop();
            return;
        }
        platform.vedioPlay(this._vedio, onPlay, (result) => {
            let isEnd = result.finish;
            console.log("视频播放完成" + isEnd);
            onEnd(isEnd)
        });
        // await platform.vedioPlay(this._vedio, onPlay).then((result) => {
        //     platform.print(result);
        //     if (result !== null && result.finish !== undefined) {
        //         onEnd(result.finish);
        //         if (result.finish) {
        //             this.fetchVedio();
        //         }
        //     }
        // });
    }

    async fetchInterstitial() {
        if (this._interstitialAd === null) {
            this._interstitialAd = await platform.fetchInterstitial();
        }
    }

    interstitialTimesShow() {
        if (MemeryController.getInstance().addInterstitialShow(this.getInterstitialAdTimes())) {
            this.showInterstitial();
        }
    }

    showInterstitial() {
        if (!platform.hasInterstitialSDK()) {
            return;
        }
        platform.showInterstitial(this._interstitialAd);
    }

    // getNativeIcon() {

    //     let iconUrl = "";
    //     if (platform.name === "wxgame") {
    //         iconUrl = AdManager._mtgNativeView.bannerData["iconUrl"];
    //         if (iconUrl === "") {

    //         } else {
    //             return new MtgAdIcon(iconUrl);
    //         }

    //     }

    // }

    // showNative() {
    //     if (platform.name === "wxgame") {
    //         AdManager._mtgNativeView.width = Util.curWidth();
    //         AdManager._mtgNativeView.show();
    //     }
    // }

    // hideNative() {
    //     if (platform.name === "wxgame") {
    //         AdManager._mtgNativeView.width = Util.curWidth();
    //         AdManager._mtgNativeView.close();
    //         this.mtgNativeTimes += 1;
    //         if (this.mtgNativeTimes === 3) {
    //             AdManager._mtgNativeView.refresh();
    //             this.mtgNativeTimes = 0;
    //         }
    //     }
    // }

    async fetchAppBox() {
        if (platform.name === "qqgame") {
            this._appBox = await platform.fetchAppBox();
        }
    }

    showAppBox() {
        if (platform.name === "qqgame") {
            platform.showAppBox(this._appBox);
        }
    }

    async fetchBanner(isShow = true) {
        if (this._banner === null) {
            this._banner = await platform.fetchBanner();
        }
        if (this._banner !== null && isShow) {
            console.log("show old banner");
            // this.showBanner();
        }
    }

    addBannerShowListener(e) {
        if (SceneManager.getInstance().isGameScene() && !UIManager.getInstance().isPopUp) {
            this.hideBanner();
        } else {
            this.showBanner();
        }
    }

    showBanner() {

        if (this._banner !== null && !this._bannerShow) {
            this._bannerShow = true;
            platform.showBanner(this._banner);
        }
    }

    showScheme() {
        if (platform.name === "tt") {
            if (this.schemeEntrance === null || this.schemeEntrance === undefined) {
                this.schemeEntrance.texture = RES.getRes("banner_png");
                this.schemeEntrance.width = Util.curWidth();
                this.schemeEntrance.height = 120;
                this.schemeEntrance.anchorOffsetX = this.schemeEntrance.width / 2;
                this.schemeEntrance.anchorOffsetY = this.schemeEntrance.height;
                this.schemeEntrance.x = Util.curWidth() / 2;
                this.schemeEntrance.y = Util.curHeight();
            }
            this.schemeEntrance.texture = RES.getRes("banner_png");
            this.schemeEntrance.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSchemeTouched, this);
            this.schemeEntrance.visible = true;
        }
    }

    hideScheme() {
        if (platform.name === "tt") {
            this.schemeEntrance.visible = false;
            this.schemeEntrance.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSchemeTouched, this);
        }
    }


    hideBanner() {
        if (this._banner !== null && this._bannerShow) {
            this._bannerShow = false;
            platform.hideBanner(this._banner);
            if (platform.name !== "oppo") {
                this._banner = null;
                this.fetchBanner(false);
            }
        }
    }

    get bannerHeight() {
        console.log(this._banner);
        if (this._banner && this._banner.style) {
            let result = this._banner.style.top / ScreenAdaptManager.getPixelHeight() * ScreenAdaptManager.getDisplayHeight();
            if (isNaN(result)) {
                return 0;
            }
            console.log("广告高度" + result)
            return result;
        }
        return 0;
    }

    get bannerOK() {
        return this._banner === null ? false : true;
    }

    get banner() {
        return this._banner;
    }

    get vedio() {
        return this._vedio;
    }

    get appBox() {
        return this._appBox;
    }

    get bannerShow() {
        return this._bannerShow;
    }

    get interstitialAd() {
        return this._interstitialAd;
    }

    get vedioOK() {
        // if (!this._vedioLoaded) {
        //     this.fetchVedio();
        // }
        if (!this._vedioLoaded) {
            platform.reloadVedio(this._vedio);
        }
        return this._vedioLoaded;
    }

    set vedioLoaded(loaded) {
        this._vedioLoaded = loaded;
    }

    private onSchemeTouched(e) {
        platform.openScheme();
    }

    public getInterstitialAdTimes() {
        return this.advertiseConfig.interstitial.times;
    }

    public getInterstitialAdStage(): number {
        console.log(this.advertiseConfig.interstitial.startStage);
        return this.advertiseConfig.interstitial.startStage as number;
    }
}