

class StageEvent extends egret.Event {

    static STAGE_CLEAR: string = "stage_clear";
    static STAGE_OPEN: string = "stage_open";
    static STAGE_SELECED: string = "stage_seleced";

    private stage;

    constructor(type: string, stage: number, bubbles?: boolean, cancelable?: boolean, data?: any) {
        super(type, bubbles, cancelable, data);
        this.stage = stage;
    }

    public getStage() {
        return this.stage;
    }
}