import { _decorator, Component, Node, Button, Vec3, AudioSource, AudioClip } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('LevelController')
export class LevelController extends Component {
    // @property(Node)                       private chickenPos: Node;
    // @property(Vec3)                       private chicken: Vec3 = new Vec3(0,0,0);
    // @property(Node)                       private GameNode: Node;
    // @property(Node)                       private Bank: Node;
    // @property(Button)                     private buttonToBank: Button = null;
    // @property(AudioSource)                private audioSource: AudioSource = null;
    // @property(AudioClip)                  private click: AudioClip = null;


    // start() {
    //     this.buttonToBank.node.on(Button.EventType.CLICK, this.toBank, this);
    // }

    // toBank() {
    //     this.playSFX(this.click);
    //     this.scheduleOnce(() => {
    //         this.chickenPos.position = this.chicken;
    //         this.Bank.active = true;
    //     }, 6);

    //     this.scheduleOnce(() => {
    //         if(this.GameNode != null) { this.GameNode.active = true; }
    //     }, 10);
    // }

    // private playSFX(clip: AudioClip) {
    //     this.audioSource.playOneShot(clip);
    // }
}


