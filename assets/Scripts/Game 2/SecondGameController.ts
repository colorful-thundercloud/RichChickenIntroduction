import { _decorator, Component, Button, Node, Animation, Label, tween, Tween, Vec3, view, AudioSource, AudioClip } from 'cc';
import { ChickenStateTwo } from './ChickenStateTwo';

const { ccclass, property } = _decorator;

@ccclass('SecondGameController')
export class SecondGameController extends Component {

    @property(ChickenStateTwo)            private chickenState: ChickenStateTwo;
    @property(Node)                       private YellowEffect: Node[] = [];
    @property(Animation)                  private YellowEffectAnim: Animation[] = [];
    @property(Node)                       private ShowRewarded: Node[] = [];
    @property(Node)                       private Fire: Node[] = [];
    @property(Node)                       private Bonus: Node = null;
    @property(Node)                       private Balance: Node = null;
    @property([Button])                   private playButton: Button[] = [];
    @property([Node])                     private finishNode: Node = null;
    @property(Button)                     private finishButton: Button = null;
    @property([Number])                   private coord: number[] = [];
    @property(Label)                      private balanceOnePort: Label;
    @property(Label)                      private balanceTwoPort: Label;
    @property(Number)                     private rewards: number[] = [];
    @property(Vec3)                       private startPos: Vec3 = new Vec3(0, 0, 0);
    @property(Vec3)                       private portBalance: Vec3 = new Vec3(0, 0, 0);
    @property(Node)                       private rotationNode: Node = null;
    @property([Number])                   private rotationAngles: number[] = [];
    @property(Node)                       private cursorGo: Node = null;
    @property(Node)                       private cursorCashOut: Node = null;
    @property(AudioSource)                private audioSource: AudioSource = null;
    @property(AudioClip)                  private click: AudioClip = null;
    @property(AudioClip)                  private run: AudioClip = null;
    @property(AudioClip)                  private fire: AudioClip = null;
    @property(AudioClip)                  private bonus: AudioClip = null;
    @property(AudioClip)                  private hugeWin: AudioClip = null;
    @property(Node)                       private counting: Node = null;

    private roadIndex: number = 0;
    private runningTime: number = 0.5;
    private chickenProtected: boolean = false;
    private killed: boolean = false;
    private cash: number = 0;
    private replay: boolean = false;

    private _tween: Tween<{ value: number }> | null = null;
    private _tween2: Tween<{ value: number }> | null = null;

    onLoad() {
        if(this.playButton) { this.playButton.forEach((play) => play.node.on(Button.EventType.CLICK, this.onPlayClick, this)); }
        if(this.finishButton) {
            this.finishButton.node.on(Button.EventType.CLICK, this.final, this);
            this.finishButton.interactable = false;
        }

        if (view.getVisibleSize().y > view.getVisibleSize().x) {
            this.Balance.position = this.portBalance;
        }
    }

    restartAll() {
        this.ShowRewarded.forEach((rew) => { rew.active = false; });
        this.Bonus.active = true;
        this.Fire[0].active = false;
        this.replay = true;
        this.cash = 0;
        this.animateLabel(0, 0);
        this.animateLabel2(0, 0);
        this.roadIndex = 0;
        this.killed = false;
        this.chickenState.node.position = this.startPos;
        this.chickenState.retry();
        this.YellowEffect.forEach((effect) => { effect.active = false });
        this.playButton.forEach((play) => play.interactable = true);
        this.cursorGo.active = true;

        if (this.rotationNode && this.rotationAngles.length >= this.roadIndex) {
            const targetAngle = this.rotationAngles[0];
            const currentAngle = this.rotationNode.angle;

            tween(this.rotationNode)
                .to(0.5, { angle: targetAngle })
                .start();
        }
    }

    public onPlayClick() {
        if(this.killed == true) { return; }
        if(this.roadIndex >= 6) { return; }

        this.playSFX(this.click);
        this.cursorGo.active = false;
        this.playButton.forEach((play) => play.interactable = false);
        this.YellowEffect.forEach((effect) => { effect.active = false });

        this.roadIndex++;

        // Плавная ротация 2D-спрайта
        if (this.rotationNode && this.rotationAngles.length >= this.roadIndex) {
            const targetAngle = this.rotationAngles[this.roadIndex];
            const currentAngle = this.rotationNode.angle;

            tween(this.rotationNode)
                .to(0.5, { angle: targetAngle }) // 0.5 сек — время поворота
                .start();
        }

        const targetY = this.coord[this.roadIndex - 1] ?? 0;

        this.chickenState.changeState(
            1,               // состояние: бежим
            targetY,         // координата по Y
            this.runningTime,// время анимации бега
        );
        this.playSFX(this.run);

        this.scheduleOnce(() => {
            this.chickenState.changeState(0);

            this.cash = this.rewards[this.roadIndex - 1];
            this.animateLabel(this.cash, 0.75);
            this.animateLabel2(this.cash, 0.75);

            if (this.roadIndex < 6) {
                this.YellowEffect[this.roadIndex - 1].active = true;
                this.YellowEffectAnim[this.roadIndex - 1].play();
            }

            if (this.roadIndex == 3) {
                if(this.replay == false) {
                    console.log("fire");
                    this.Fire[0].active = true;
                    this.chickenState.die();
                    this.ShowRewarded[this.roadIndex - 1].active = true;
                    this.playSFX(this.fire);
                    this.scheduleOnce(() => {
                        this.restartAll();
                    }, 1.5);
                    return;
                } else {
                    this.chickenState.makeDef();
                    this.playSFX(this.bonus);
                    this.scheduleOnce(() => {
                        this.cursorGo.active = true;
                    }, 0.5);
                }
            } else if (this.roadIndex == 5) {
                console.log("fire 2");
                this.Fire[1].active = true;
                this.playSFX(this.fire);
                this.scheduleOnce(() => {
                    this.cursorGo.active = true;
                }, 0.5);
            } else if (this.roadIndex == 6) {
                console.log("finish");
                this.finishButton.interactable = true;
                this.scheduleOnce(() => {
                    this.cursorGo.active = false;
                    this.cursorCashOut.active = true;
                    this.playSFX(this.hugeWin);
                }, 0.5);
                return;
            } else {
                this.ShowRewarded[this.roadIndex - 1].active = true;
                this.scheduleOnce(() => {
                    this.cursorGo.active = true;
                }, 0.5);
            }

            this.playButton.forEach((play) => play.interactable = true);

        }, this.runningTime);
    }

    public setChickenProtected(state: boolean) {
        if(this.killed == true) { return; }

        this.chickenProtected = state;
    }

    public stopPlaying() {
        this.killed = true;
    }

    public animateLabel(to: number, duration: number, onComplete?: () => void) {

        // if (this.moneyAnim != null) {
        //     this.moneyAnim.play();
        // }

        this.counting.active = true;

        const data = { value: parseFloat(this.balanceOnePort.string) || 0 };

        this._tween?.stop();

        this._tween = tween(data)
            .to(duration, { value: to }, {
                onUpdate: () => {
                    this.balanceOnePort.string = `${data.value.toFixed(2)} EUR`;
                },
                onComplete: onComplete
            })
            .start();

        this.counting.active = false;

    }

    public animateLabel2(to: number, duration: number, onComplete?: () => void) {

        // if (this.moneyAnim != null) {
        //     this.moneyAnim.play();
        // }

        const data2 = { value: parseFloat(this.balanceTwoPort.string) || 0 };

        this._tween2?.stop();

        //tween(data)
        this._tween2 = tween(data2)
            .to(duration, { value: to }, {
                onUpdate: () => {
                    this.balanceTwoPort.string = `${data2.value.toFixed(2)} EUR`;
                },
                onComplete: onComplete
            })
            .start();

    }

    onDisable() {
        this._tween?.stop();
        this._tween2?.stop();
    }

    final() {
        this.finishNode.active = true;
    }

    private playSFX(clip: AudioClip) {
        this.audioSource.playOneShot(clip);
    }
}
