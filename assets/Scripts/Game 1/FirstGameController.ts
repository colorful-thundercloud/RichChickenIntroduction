import { _decorator, Component, Button, Node, Animation, Label, tween, Tween, Vec3, AudioSource, AudioClip } from 'cc';
import { ChickenState } from './ChickenState';
import { LaneSpawner } from './LaneSpawner';
import { AnimatedLabel } from './AnimatedLabel';
import { GeoAdapter } from '../GeoAdapter';

const { ccclass, property } = _decorator;

@ccclass('FirstGameController')
export class FirstGameController extends Component {

    @property(ChickenState)               private chickenState: ChickenState;
    @property([LaneSpawner])              private laneSpawners: LaneSpawner[] = [];
    @property([Node])                     private wheelFortune: Node[] = [];
    //@property([Button])                   private wheelFortuneButton: Button[] = [];
    @property(Node)                       private wonPanel: Node = null;
    @property([Button])                   private cashoutButtons: Button[] = [];
    @property(Label)                      private winLabel: Label = null;
    @property([Button])                   private playButton: Button[] = [];
    @property([Animation])                private wheelFortuneAnim: Animation[] = [];
    @property([Number])                   private coord: number[] = [];
    @property(Label)                      private balanceOnePort: Label;
    @property(Label)                      private balanceTwoPort: Label;
    @property(Label)                      private balanceThreeLand: Label;
    @property(Label)                      private balanceFourLand: Label;
    @property(Node)                       private cashBack: Node = null;
    @property(Animation)                  private confetti: Animation = null;
    @property(Number)                     private rewards: number[] = [];
    //@property(Vec3)                       private startPos: Vec3 = null;
    @property(Node)                       private cursorGo: Node = null;
    @property(Node)                       private cursorGoLand: Node = null;
    @property(AudioSource)                private audioSource: AudioSource = null;
    @property(AudioClip)                  private click: AudioClip = null;
    @property(AudioClip)                  private run: AudioClip = null;
    @property(AudioClip)                  private bonusWin: AudioClip = null;
    @property(AudioClip)                  private hugeWin: AudioClip = null;
    @property(AudioClip)                  private cashBackWin: AudioClip = null;
    @property(Node)                       private counting: Node = null;
    @property(Node)                       private Packshot: Node = null;
    @property(Node)                       private Bank: Node = null;
    @property(Animation)                  private BankAnim: Animation = null;
    @property(Label)                      private BankLabel: Label = null;
    @property(Label)                      private BankMessageLabel: Label = null;
    @property(Node)                       private warnings: Node[] = [];
    @property(Boolean)                    private withBank: Boolean = true;
    //@property(AnimatedLabel)              private animatedLabel: AnimatedLabel[] = [];
    //@property(Button)                     private finish: Button = null;

    @property(GeoAdapter) geoAdapter: GeoAdapter = null;

    private roadIndex: number = 0;
    private runningTime: number = 0.5;
    private chickenProtected: boolean = false;
    private killed: boolean = false;
    private cash: number = 0;
    private isBigWin: boolean = false;

    private _tween: Tween<{ value: number }> | null = null;
    private _tween2: Tween<{ value: number }> | null = null;
    private _tween3: Tween<{ value: number }> | null = null;
    private _tween4: Tween<{ value: number }> | null = null;
    private _tweenBank: Tween<{ value: number }> | null = null;

    private valutSign: string = "EUR";
    private valutStr: string = "€";

    start() {
        this.valutSign = this.geoAdapter.getValutSign();
        this.valutStr = this.geoAdapter.getValutStr();

        this.balanceOnePort.string = this.balanceOnePort.string + ' ' + this.valutStr;
        this.balanceTwoPort.string = this.balanceTwoPort.string + ' ' + this.valutStr;
        this.balanceThreeLand.string = this.balanceThreeLand.string + ' ' + this.valutStr;
        this.balanceFourLand.string = this.balanceFourLand.string + ' ' + this.valutStr;
    }

    onLoad() {
        //if(this.wheelFortuneButton) { this.wheelFortuneButton.forEach((wheelFortune) => wheelFortune.node.on(Button.EventType.CLICK, this.onWheelFortuneClick, this)); }
        if(this.playButton) { this.playButton.forEach((play) => play.node.on(Button.EventType.CLICK, this.onPlayClick, this)); }
        if(this.cashoutButtons) { this.cashoutButtons.forEach((cashout) => { cashout.node.on(Button.EventType.CLICK, this.cashoutReward, this); }); }
        //if(this.withBank === true) {
        //    if(this.warnings.length != 0) {
        //        this.warnings.forEach((nod) => { nod.active = false; });
        //    }
        //} else {
        //    if(this.warnings.length != 0) {
        //        this.warnings.forEach((nod) => { nod.active = true; });
        //    }
        //}
        //if(this.finish) { this.finish.node.on(Button.EventType.CLICK, this.bankSwitch, this); }
    }

    restartAll() {
        this.playSFX(this.click);
        this.scheduleOnce(() => {
            if (this.wheelFortune) {
                this.wheelFortune.forEach((wF) => wF.active = false);
            }
            this.laneSpawners.forEach((spawn) => { spawn.setBarrierActive(false) });
            this.laneSpawners.forEach((spawn) => { spawn.goldLukActive(false) });
            this.cash = 0;
            this.animateLabel(0, 0);
            this.animateLabel2(0, 0);
            this.animateLabel3(0, 0);
            this.animateLabel4(0, 0);
            this.roadIndex = 0;
            //this.chickenState.node.position = this.startPos;
            this.killed = false;
            this.playButton.forEach((play) => play.interactable = true);
        }, 0.5);
    }

    public onPlayClick() {
        if(this.killed == true) { return; }
        if(this.roadIndex >= 8) { return; }
        if(this.laneSpawners[this.roadIndex].isBusy) { return; }

        this.playSFX(this.click);
        this.cursorGo.active = false;
        this.cursorGoLand.active = false;
        this.playButton.forEach((play) => play.interactable = false);
        this.roadIndex++;

        const targetY = this.coord[this.roadIndex - 1] ?? 0;

        this.chickenState.changeState(
            1,               // состояние: бежим
            targetY,         // координата по Y
            this.runningTime,// время анимации бега
        );

        this.playSFX(this.run);

        this.scheduleOnce(() => {
            this.chickenState.changeState(0);

            const laneIndex = this.roadIndex - 1;
            if (this.laneSpawners[laneIndex]) {
                this.laneSpawners[laneIndex].setBarrierActive(true);
                this.laneSpawners[laneIndex].goldLukActive(true);
            }

            this.cash = this.rewards[laneIndex];
            if(this.roadIndex === 2) {
                this.scheduleOnce(() => {
                    this.animateLabel(this.cash, 0.5);
                    this.animateLabel2(this.cash, 0.5);
                    this.animateLabel3(this.cash, 0.5);
                    this.animateLabel4(this.cash, 0.5);
                }, 1.6);
            } else {
                this.animateLabel(this.cash, 0.5);
                this.animateLabel2(this.cash, 0.5);
                this.animateLabel3(this.cash, 0.5);
                this.animateLabel4(this.cash, 0.5);
            }

            if (this.roadIndex == 2 && this.cashBack != null) {
                this.cashBack.active = true;
                this.playSFX(this.cashBackWin);
            }

            if (this.roadIndex == 6 && this.wheelFortune.length != 0) {
                console.log("finish");
                this.wheelFortune.forEach((wF) => wF.active = true);
                this.playButton.forEach((play) => play.interactable = false);
                this.scheduleOnce(() => {this.onWheelFortuneClick();}, 0.5);
                return;
            }

            this.playButton.forEach((play) => play.interactable = true);
            //this.cursorGo.active = true;
            //this.cursorGoLand.active = true;

        }, this.runningTime);
    }

    private onWheelFortuneClick() {
        if(this.killed == true) { return; }

        this.playSFX(this.click);

        if (this.wheelFortuneAnim) {
            this.wheelFortuneAnim.forEach((anim) => anim.play("GoFortune"));
        }

        this.scheduleOnce(() => {
            this.playSFX(this.bonusWin);
            this.megaWin();
        }, 2.5);

        this.scheduleOnce(() => {
            this.playSFX(this.hugeWin);
        }, 3);

        this.playButton.forEach((play) => play.interactable = false);
        this.playButton.forEach((play) => play.interactable = false);
        this.cursorGo.active = false;
        this.cursorGoLand.active = false;

        this.scheduleOnce(() => {
            if (this.wheelFortune) {
                this.wheelFortune.forEach((wF) => wF.active = false);
            }
            this.cashoutReward();
        }, 3.5);
    }

    public setChickenProtected(state: boolean) {
        if(this.killed == true) { return; }

        this.chickenProtected = state;
    }

    public stopPlaying() {
        this.killed = true;
    }

    public animateLabel(to: number, duration: number, onComplete?: () => void) {

        this.counting.active = true;

        const data = { value: parseFloat(this.balanceOnePort.string) || 0 };

        this._tween?.stop();

        this._tween = tween(data)
            .to(duration, { value: to }, {
                onUpdate: () => {
                    this.balanceOnePort.string = `${ data.value.toFixed(1) } ${ this.valutStr }`;
                },
                onComplete: onComplete
            })
            .start();

        this.counting.active = false;
    }

    public animateLabel2(to: number, duration: number, onComplete?: () => void) {

        const data2 = { value: parseFloat(this.balanceTwoPort.string) || 0 };

        this._tween2?.stop();

        this._tween2 = tween(data2)
            .to(duration, { value: to }, {
                onUpdate: () => {
                    this.balanceTwoPort.string = `${data2.value.toFixed(1)} ${this.valutStr }`;
                },
                onComplete: onComplete
            })
            .start();
    }

    public animateLabel3(to: number, duration: number, onComplete?: () => void) {

        const data3 = { value: parseFloat(this.balanceThreeLand.string) || 0 };

        this._tween3?.stop();

        this._tween3 = tween(data3)
            .to(duration, { value: to }, {
                onUpdate: () => {
                    this.balanceThreeLand.string = `${data3.value.toFixed(1)} ${this.valutStr }`;
                },
                onComplete: onComplete
            })
            .start();
    }

    public animateLabel4(to: number, duration: number, onComplete?: () => void) {

        const data4 = { value: parseFloat(this.balanceFourLand.string) || 0 };

        this._tween4?.stop();

        this._tween4 = tween(data4)
            .to(duration, { value: to }, {
                onUpdate: () => {
                    this.balanceFourLand.string = `${data4.value.toFixed(1)} ${this.valutStr }`;
                },
                onComplete: onComplete
            })
            .start();
    }

    public animateLabelBank(to: number, duration: number, onComplete?: () => void) {

        const data5 = { value: parseFloat(this.BankLabel.string) || 0 };

        this._tweenBank?.stop();

        this._tweenBank = tween(data5)
            .to(duration, { value: to }, {
                onUpdate: () => {
                    this.BankLabel.string = `${this.valutSign} ${data5.value.toFixed(0)}`;
                },
                onComplete: onComplete
            })
            .start();
    }

    private megaWin() {
        this.cash = 10400;
        this.animateLabel(this.cash, 0.5);
        this.animateLabel2(this.cash, 0.5);
        this.animateLabel3(this.cash, 0.5);
        this.animateLabel4(this.cash, 0.5);
        this.confetti.play();
        this.isBigWin = true;
    }

    private cashoutReward() {
        if(this.roadIndex === 0) { return; }
        if(this.withBank === true) {
            this.wonPanel.active = true;
            this.winLabel.string = `${this.cash} ${this.valutSign}`;
            this.scheduleOnce(() => {
                this.Bank.active = true;
                if(this.isBigWin === true) { this.BankAnim.play("bankFinish-lite"); } //названия анимаций перепутались
                else {
                    this.BankAnim.play("bankFinish");
                    //this.BankLabel.string = `${this.cash}.00`;
                    this.scheduleOnce(() => { this.animateLabelBank(this.cash, 0.5); }, 0.5);
                    this.BankMessageLabel.string = `+ ${this.cash}.00 ${this.valutSign}`;
                }
            }, 3);
            this.scheduleOnce(() => { this.Packshot.active = true; this.Bank.active = false; }, 6);
        } else {
            this.wonPanel.active = true;
            this.winLabel.string = `${this.cash} ${this.valutSign}`;
            this.scheduleOnce(() => {
                this.Packshot.active = true;
            }, 3);
        }
    }

    onDisable() {
        this._tween?.stop();
        this._tween2?.stop();
    }

    private playSFX(clip: AudioClip) {
        this.audioSource.playOneShot(clip);
    }

    // private bankSwitch() {
    //     this.animatedLabel[0].animateLabel(16840, 3.5);
    //     this.animatedLabel[1].animateLabel(16840, 0);
    // }
}
