
module Util {

    export const TOTAL_STAGES = 30;
    export function factor(): number {
        return egret.MainContext.instance.stage.stageWidth / 720;
    }
    export function x_fix(): number {
        return (egret.MainContext.instance.stage.stageWidth - 720) / 2;
    }
    export function y_fix(): number {
        return (egret.MainContext.instance.stage.stageHeight - 1280) / 2;
    }

    export function gameStage(): egret.Stage {
        return egret.MainContext.instance.stage;
    }

    //当前游戏宽度
    export function curWidth(): number {
        return egret.MainContext.instance.stage.stageWidth;
    }

    //当前游戏宽度
    export function curHeight(): number {
        return egret.MainContext.instance.stage.stageHeight;
    }

    export function displayWidth(): number {
        return 720
    }

    export function displayHeight(): number {
        return 1280;
    }

    export function scaleMode(): string {
        return egret.MainContext.instance.stage.scaleMode;
    }

    export function loopPlay(mc, from = 1, to = 0) {
        if (to === 0) {
            to = mc.totalFrames;
        }
        if (mc.currentFrame < from || mc.currentFrame >= to) {
            mc.gotoAndStop(from);
        } else {
            mc.nextFrame();
        }
    }

    export function singletonPush(ary: Array<any>, data) {
        if (ary.indexOf(data) === -1) {
            ary.push(data);
        }
    }

    export function setImageColor(image: egret.Bitmap, color: number) {
        // 将16进制颜色分割成rgb值
        let spliceColor = (color) => {
            let result = { r: -1, g: -1, b: -1 };
            result.b = color % 256;
            result.g = Math.floor((color / 256)) % 256;
            result.r = Math.floor((color / 256) / 256);
            return result;
        }
        let result = spliceColor(color);
        let colorMatrix = [
            1, 0, 0, 0, 0,
            0, 1, 0, 0, 0,
            0, 0, 1, 0, 0,
            0, 0, 0, 1, 0
        ];
        colorMatrix[0] = result.r / 255;
        colorMatrix[6] = result.g / 255;
        colorMatrix[12] = result.b / 255;
        let colorFilter = new egret.ColorMatrixFilter(colorMatrix);

        image.filters = [colorFilter];
    }
}
