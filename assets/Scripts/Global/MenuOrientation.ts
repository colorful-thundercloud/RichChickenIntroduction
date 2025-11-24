import { _decorator, Component, Node, view, Vec3 } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('MenuOrientation')
export class MenuOrientation extends Component {
    @property([Node])
    private port: Node[] = [];
    
    @property([Node])
    private land: Node[] = [];

    @property(Node)
    private topPanel: Node = null;
    
    private updateActiveCamera() {
        if (view.getFrameSize().y > view.getFrameSize().x) {
            this.port.forEach((node) => (node.active = true));
            this.land.forEach((node) => (node.active = false));
            this.topPanel.position = new Vec3(0, 1250, 0);
        } else {
            this.port.forEach((node) => (node.active = false));
            this.land.forEach((node) => (node.active = true));
            this.topPanel.position = new Vec3(0, 1150, 0);
        }
    }
    
    start() {
        this.updateActiveCamera();
        this.schedule(this.updateActiveCamera, 0.1);
    }
}


