import { _decorator, Component, UITransform, view, Camera } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('FullScreenSprite')
export class FullScreenSprite extends Component {

    @property(Camera)
    camera: Camera = null; // Твоя основная камера

    start() {
        const uiTransform = this.node.getComponent(UITransform);
        const visibleSize = view.getVisibleSize();

        // Если камера ортографическая (2D)
        const worldHeight = this.camera.orthoHeight * 2;
        const worldWidth = worldHeight * (visibleSize.width / visibleSize.height);

        const scaleX = worldWidth / uiTransform.width;
        const scaleY = worldHeight / uiTransform.height;

        this.node.setScale(scaleX, scaleY, 1);
    }
}
