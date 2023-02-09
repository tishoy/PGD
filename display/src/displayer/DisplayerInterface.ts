/**
 * create by tishoy
 * 2018.8.9
 * 关卡接口
 */

interface DisplayerInterface extends egret.DisplayObjectContainer {
    // _init(): void;
    // _loadRes(): void;
    // _start(): void;
    // _remove(): void;

    _scene;

    play_loop(): void;

    registItem(itemNo: number): void;
    useItem(itemNo: number, posX: number, posY: number): boolean;
}