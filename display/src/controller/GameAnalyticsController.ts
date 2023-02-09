/**
 * 尚未启用
 */

class GameAnalyticsController {

    static instance: GameAnalyticsController = null;

    constructor() {
        this.init();
    }

    private init() {

    }

    public static getInstance(): GameAnalyticsController {
        if (this.instance === null) {
            this.instance = new GameAnalyticsController();
        }
        return this.instance;
    }

    public stageStartAnalytics(stage) {
        if (platform.name === "qqplay" || platform.name === "mi") {
            platform.print("关卡开始统计");
            GameAnalytics("addProgressionEvent", "Start", "stage", stage);
        } else if (platform.name === "wxgame") {
            platform.analytics("关卡开始", { "stage": stage })
        }
    }

    public stageGameOverAnalytics(stage) {
        if (platform.name === "qqplay" || platform.name === "mi") {
            platform.print("关卡结束统计");
            GameAnalytics("addProgressionEvent", "Fail", "stage", stage);
        } else if (platform.name === "wxgame") {
            platform.analytics("关卡失败", { "stage": stage })
        }
    }

    public stageClearAnalytics(stage) {
        if (platform.name === "qqplay" || platform.name === "mi") {
            platform.print("关卡胜利统计");
            GameAnalytics("addProgressionEvent", "Complete", "stage", stage);
        } else if (platform.name === "wxgame") {
            platform.analytics("关卡胜利", { "stage": stage })
        }
    }

    public stageVedioPlayAnalytics(stage, hint) {
        if (platform.name === "qqplay" || platform.name === "mi") {
            platform.print("视频播放统计");
            GameAnalytics("addDesignEvent", "StageHint:" + stage + ":" + hint, 1);
        } else if (platform.name === "wxgame") {
            platform.analytics("关卡视频广告", { "stage": stage, "hint": hint })
        }
    }

    public cardGotAnalytics(card) {
        if (platform.name === "qqplay" || platform.name === "mi") {
            platform.print("卡片获取统计");
            card.forEach(element => {
                GameAnalytics("addProgressionEvent", "Complete", "card", element);
            });
        } else if (platform.name === "wxgame") {
            card.forEach(element => {
                platform.analytics("获得卡片", { "card": element })
            });
        }
    }

    public cardVedioPlayAnalytics(card) {
        if (platform.name === "qqplay" || platform.name === "mi") {
            platform.print("卡片视频统计");
            GameAnalytics("addDesignEvent", "CardHint:" + card, 1);
        } else if (platform.name === "wxgame") {
            platform.analytics("卡片视频广告", { "card": card })
        }
    }

    public rankEnterAnalytics() {
        if (platform.name === "qqplay" || platform.name === "mi") {
            platform.print("排行进入统计");
            GameAnalytics("addDesignEvent", "RankEnter", 1);
        } else if (platform.name === "wxgame") {
            platform.analytics("进入排行", { "times": 1 })
        }
    }
}