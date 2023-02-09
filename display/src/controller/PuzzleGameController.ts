/**
 * create by tishoy
 * 2020.7.10
 */
class PuzzleGameController {

    static instance: PuzzleGameController = null;
    public finishFunc = () => { };

    constructor() {
    }

    public static getInstance(): PuzzleGameController {
        if (this.instance === null) {
            this.instance = new PuzzleGameController();
        }
        return this.instance;
    }

    public clearStage(card: Array<number> = [], popViewRes) {
        StageController.getInstance().clearStage([], popViewRes);
    }

    public gameOverStage(card: Array<number> = [], popViewRes) {
        StageController.getInstance().gameOverStage([], popViewRes);
    }

    public finishCGFunc() {
        
    }

    public finish() {
        this.finishFunc();
    }
}