import { _decorator, Component, Node, tween, Tween, Vec3, Collider2D, Contact2DType, Animation, view, AudioSource, AudioClip } from 'cc';
const { ccclass, property } = _decorator;

@ccclass('ChickenState')
export class ChickenState extends Component {

    @property(Node) private chickenNode: Node = null;
    @property([Node]) private chickenAnim: Node[] = []; // 0 - афк, 1 - бег
    // @property(Node) private respawnPanel: Node = null;
    // @property(Node) private gameController: Node = null
    // @property(Animation) private uiKillingAnim: Animation = null;
    // @property(Node) private uiKillingNode: Node = null;
    // @property(Animation) private uiKillingAnimLand: Animation = null;
    // @property(Node) private uiKillingNodeLand: Node = null;
    // @property(AudioSource) private audioSource: AudioSource = null;
    // @property(AudioClip) private death: AudioClip = null;

    // private isProtected: boolean = false;
    // private isDead: boolean = false;
    private moveTween: Tween<Node> | null = null;

    // onLoad() {
    //     const collider = this.getComponent(Collider2D);
    //     if(collider) {
    //         collider.on(Contact2DType.BEGIN_CONTACT, this.onCollisionEnter, this);
    //     }
    // }

    // private onCollisionEnter(selfCollider: Collider2D, otherCollider: Collider2D) {
    //     if(!this.isProtected && !this.isDead) {
    //         this.die();
    //     }
    // }

    // public retry() {
    //     this.isDead = false;
    //     this.isProtected = false;
    //     this.chickenAnim.forEach(node => node.active = false);
    //     this.chickenAnim[0].active = true;
    // }

    // private die() {
    //     this.isDead = true;

    //     this.playSFX(this.death);

    //     if(this.moveTween) {
    //         this.moveTween.stop();
    //         this.moveTween = null;
    //     }

    //     this.chickenAnim.forEach(node => node.active = false);
    //     this.chickenAnim[4].active = true;

    //     if(this.respawnPanel) {
    //         this.scheduleOnce(() => {
    //             this.respawnPanel.active = true;
    //         }, 1);
    //     }

    //     const isPortrait = view.getFrameSize().height > view.getFrameSize().width;

    //     if (isPortrait) {
    //         this.uiKillingNode.active = true;
    //         this.uiKillingAnim.play();
    //         this.scheduleOnce(() => {
    //             this.uiKillingNode.active = false;
    //         }, 1);
    //     } else {
    //         this.uiKillingNodeLand.active = true;
    //         this.uiKillingAnimLand.play();
    //         this.scheduleOnce(() => {
    //             this.uiKillingNodeLand.active = false;
    //         }, 1);
    //     }

    //     const controller = this.gameController.getComponent('FirstGameController');
    //     if(controller != null) {
    //         controller.stopPlaying();
    //     }
    // }

    // update() {
    //     this.cameraPort.position = new Vec3(this.chickenNode.position.x, -150, this.chickenNode.position.z);
    // }

    public changeState(state: number, targetX?: number, duration?: number) {
        // if(this.isDead) return;

        this.chickenAnim.forEach(node => node.active = false);

        if(state === 1 && targetX !== undefined && duration !== undefined) {
            this.chickenAnim[1].active = true;

            const startPos = this.chickenNode.position;
            const targetPos = new Vec3(targetX, startPos.y, startPos.z);

            this.moveTween = tween(this.chickenNode)
                .to(duration, { position: targetPos })
                .start();

        } else if (state === 0) {
            this.chickenAnim[0].active = true;
        }
    }

    // public makeDef() {
    //     this.isProtected = true;
    //     this.chickenAnim.forEach(node => node.active = false);
    //     this.chickenAnim[2].active = true;
    // }

    // public getProtection(): boolean {
    //     return this.isProtected;
    // }

    // private playSFX(clip: AudioClip) {
    //     this.audioSource.playOneShot(clip);
    // }
}
