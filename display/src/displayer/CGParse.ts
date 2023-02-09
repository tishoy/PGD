class CGParse extends BaseParse {
    constructor(script) {
        super(script);
        this.stageScript = script;

       
    }

    finishAll() {
        SaveDataManager.getInstance().saveCGShow();
        SceneManager.getInstance().toSelectScene();
    }

}