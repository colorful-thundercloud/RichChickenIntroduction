import { _decorator, Component, Node, Animation,/*, Button, AudioSource, AudioClip */
AudioClip,
AudioSource} from 'cc';
const { ccclass, property } = _decorator;

@ccclass('StartBonus')
export class StartBonus extends Component {
    @property(Animation)        private bonusAnimation: Animation = null;
    //@property(Button)           private buttonEnd: Button = null;
    //@property(AudioSource)      private audioSource: AudioSource = null;
    //@property(AudioClip)        private click: AudioClip = null;
    @property(Node)             private tik: Node = null;

    @property(Node)
    timerLand: Node = null;

    @property(Node)
    timerPort: Node = null;

    @property(AudioClip)
    awakeSound: AudioClip = null;

    @property(AudioSource)
    audioSource: AudioSource = null;

    start() {
        //this.buttonEnd.interactable = false;
        //this.buttonEnd.node.on(Button.EventType.CLICK, this.endBonus,this);
        this.bonusAnimation.play();
        this.tik.active = true;
        //this.scheduleOnce(() => { this.buttonEnd.interactable = true; }, 0.45);
        this.scheduleOnce(this.endBonus, 3);
        console.log("[StartBonus]: started");
    }

    private endBonus() {
        this.bonusAnimation.play("bonusEnd");
        console.log("[StartBonus]: ended");
        //this.buttonEnd.interactable = false;
        //this.audioSource.playOneShot(this.click);
        this.scheduleOnce(() => {
            this.node.active = false;
            this.timerLand.active = true;
            this.timerPort.active = true;
            this.tik.getComponent(AudioSource).volume = 0.5;
        }, 0.5);
    }
}


