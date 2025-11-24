import { _decorator, Component, Node, tween, Tween, Vec3, AudioSource, AudioClip } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ChickenStateTwo')
export class ChickenStateTwo extends Component {

    @property(Node) private chickenNode: Node = null;
    @property([Node]) private chickenAnim: Node[] = []; // 0 - афк, 1 - бег, 2 - деф афк, 3 - деф бег, 4 - смэрт
    @property(Node) private gameController: Node = null; // ссылка на FirstGameController
    // @property(Node) private cameraPort: Node = null;
    @property(AudioSource) private audioSource: AudioSource = null;
    @property(AudioClip) private death: AudioClip = null;

    private isProtected: boolean = false;
    private isDead: boolean = false;
    private moveTween: Tween<Node> | null = null;

    public retry() {
        this.isDead = false;
        this.isProtected = false;
        this.chickenAnim.forEach(node => node.active = false);
        this.chickenAnim[0].active = true;
    }

    public die() {
        this.isDead = true;

        this.playSFX(this.death);

        if (this.moveTween) {
            this.moveTween.stop();
            this.moveTween = null;
        }

        this.chickenAnim.forEach(node => node.active = false);
        this.chickenAnim[4].active = true;

        const controller = this.gameController.getComponent('SecondGameController');
        if (controller != null) {
            controller.stopPlaying();
        }
    }

    // update() {
    //     this.cameraPort.position = new Vec3(this.chickenNode.position.x, -150, this.chickenNode.position.z);
    // }

    public changeState(state: number, targetX?: number, duration?: number) {
        if (this.isDead) return;

        this.chickenAnim.forEach(node => node.active = false);

        if (state === 1 && targetX !== undefined && duration !== undefined) {
            if (this.isProtected) {
                this.chickenAnim[3].active = true;
            } else {
                this.chickenAnim[1].active = true;
            }

            const startPos = this.chickenNode.position;
            const targetPos = new Vec3(targetX, startPos.y, startPos.z);

            this.moveTween = tween(this.chickenNode)
                .to(duration, { position: targetPos })
                .start();

        } else if (state === 0) {
            if (this.isProtected) {
                this.chickenAnim[2].active = true;
            } else {
                this.chickenAnim[0].active = true;
            }
        }
    }

    public makeDef() {
        this.isProtected = true;
        this.chickenAnim.forEach(node => node.active = false);
        this.chickenAnim[2].active = true;
    }

    public getProtection(): boolean {
        return this.isProtected;
    }

    private playSFX(clip: AudioClip) {
        this.audioSource.playOneShot(clip);
    }
}
