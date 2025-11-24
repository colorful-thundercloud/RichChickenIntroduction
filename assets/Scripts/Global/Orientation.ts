import { _decorator, Component, view, Camera } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('Orientation')
export class Orientation extends Component {

    // @property(Camera)
    // private portCamera: Camera = null; // Камера для портрета

    // @property(Camera)
    // private landCamera: Camera = null; // Камера для ландшафта


    // private activeCamera: Camera = null;

    // private updateActiveCamera() {
    //     if (view.getVisibleSize().y > view.getVisibleSize().x) {
    //         this.activeCamera = this.portCamera;
    //     } else {
    //         this.activeCamera = this.landCamera;
    //     }
    // }

    // start() {
    //     this.updateActiveCamera();
    // }

    // update(dt: number) {
    //     this.updateActiveCamera();
    //     if (this.activeCamera) {
    //         this.node.setPosition(this.activeCamera.node.getPosition());
    //     }
    // }
}
