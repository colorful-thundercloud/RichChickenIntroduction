import { _decorator, Component, Node, view } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('RandomOnline')
export class RandomOnline extends Component {
    @property(Node)     private portPanel: Node = null;
    @property(Node)     private landPanel: Node = null;
    @property([Node])   private portOnline: Node[] = [];
    @property([Node])   private landOnline: Node[] = [];

    private isPortrait: boolean = false;

    start() {
        this.isPortrait = view.getFrameSize().height > view.getFrameSize().width;

        if(this.isPortrait) {
            this.portPanel.active = true;
        } else {
            this.landPanel.active = true;
        }

        this.schedule(this.showRandomNode, 5);

        this.showRandomNode();
    }

    private showRandomNode() {
        const list = this.isPortrait ? this.portOnline : this.landOnline;

        if (list.length === 0) return;

        list.forEach(node => node.active = false);

        const randomIndex = Math.floor(Math.random() * list.length);
        list[randomIndex].active = true;
    }
}
