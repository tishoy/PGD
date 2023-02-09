/**
 * 游戏控制器材
 * create by tishoy
 * 2020.7.1
 */
class AnimateManager {

    private static instance: AnimateManager = null;

    constructor() {
        this.init();
    }



    private init(): void {
        if (AnimateManager.instance !== null) {
            throw new Error("single instance error");
        }

    }


    public static getInstance(): AnimateManager {
        if (this.instance === null) {
            this.instance = new AnimateManager();
        }
        return this.instance;
    }

}