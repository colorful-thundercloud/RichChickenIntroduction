import { _decorator, Component, Label, Node, Enum, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

// Enum для выбора языка
enum Language {
    ENGEUR,
    ENGUSD,
    IT,
    ES,
    FR,
    DE,
    NL,
    CH,
    CA,
    CZ,
    PT,
    PL
}
Enum(Language);

// Класс с переводами
class TranslationData {
    static readonly translations = {
        [Language.ENGEUR]: {
            startMassage: "Guaranteed jackpot with in",
            goBtn: "GO",
            cashGame: "CASH OUT",
            win: "WIN!",
            install: "INSTALL NOW",
            ironLabel: "For illustrative purposes only",
            valutStr: "EUR",
            valutSign: "€"
        },
        [Language.ENGUSD]: {
            startMassage: "Guaranteed jackpot with in",
            goBtn: "GO",
            cashGame: "CASH OUT",
            win: "WIN!",
            install: "INSTALL NOW",
            ironLabel: "For illustrative purposes only",
            valutStr: "USD",
            valutSign: "$"
        },
        [Language.IT]: {
            startMassage: "Jackpot garantito entro",
            goBtn: "ANDARE",
            cashGame: "PRELEVARE",
            win: "VINCERE!",
            install: "INSTALLA ORA",
            ironLabel: "For illustrative purposes only",
            valutStr: "EUR",
            valutSign: "€"
        },
        [Language.ES]: {
            startMassage: "Jackpot garantizado en",
            goBtn: "IR",
            cashGame: "RETIRAR",
            win: "GANAR!",
            install: "INSTALAR AHORA",
            ironLabel: "For illustrative purposes only",
            valutStr: "EUR",
            valutSign: "€"
        },
        [Language.FR]: {
            startMassage: "Jackpot garanti dans",
            goBtn: "ALLER",
            cashGame: "ENCAISSER",
            win: "GAGNER!",
            install: "INSTALLER MAINTENANT",
            ironLabel: "For illustrative purposes only",
            valutStr: "EUR",
            valutSign: "€"
        },
        [Language.DE]: {
            startMassage: "Garantierter jackpot innerhalb",
            goBtn: "GEHEN",
            cashGame: "AUSZAHLEN",
            win: "GEWINNEN!",
            install: "JETZT INSTALLIEREN",
            ironLabel: "For illustrative purposes only",
            valutStr: "EUR",
            valutSign: "€"
        },
        [Language.NL]: {
            startMassage: "Gegarandeerde jackpot binnen",
            goBtn: "GAAN",
            cashGame: "UITBETALEN",
            win: "WINNEN!",
            install: "NU INSTALLEREN",
            ironLabel: "For illustrative purposes only",
            valutStr: "EUR",
            valutSign: "€"
        },
        [Language.CH]: {
            startMassage: "Garantierter Jackpot innerhalb",
            goBtn: "GEHEN",
            cashGame: "AUSZAHLEN",
            win: "GEWINNEN!",
            install: "JETZT INSTALLIEREN",
            ironLabel: "For illustrative purposes only",
            valutStr: "CHF",
            valutSign: "₣"
        },
        [Language.CA]: {
            startMassage: "Guaranteed jackpot within",
            goBtn: "GO",
            cashGame: "CASH OUT",
            win: "WIN!",
            install: "INSTALL NOW",
            ironLabel: "For illustrative purposes only",
            valutStr: "CAD",
            valutSign: "$"
        },
        [Language.CZ]: {
            startMassage: "ZaruČený jackpot BĚhem",
            goBtn: "JÍT",
            cashGame: "VYBRAT",
            win: "VYHRÁT!",
            install: "NAINSTALOVAT NYNÍ",
            ironLabel: "For illustrative purposes only",
            valutStr: "CZK",
            valutSign: "Kč"

        },
        [Language.PT]: {
            startMassage: "Jackpot garantido em",
            goBtn: "IR",
            cashGame: "SACAR",
            win: "GANHAR!",
            install: "INSTALAR AGORA",
            ironLabel: "For illustrative purposes only",
            valutStr: "EUR",
            valutSign: "€"
        },
        [Language.PL]: {
            startMassage: "Gwarantowany jackpot w ciagu",
            goBtn: "IŚĆ",
            cashGame: "WYPŁACIĆ",
            win: "WYGRAC!",
            install: "ZAINSTALUJ TERAZ",
            ironLabel: "For illustrative purposes only",
            valutStr: "PLN",
            valutSign: "zł"
        }

    };
}

@ccclass('GeoAdapter')
export class GeoAdapter extends Component 
{

    // Выбор языка с выпадающим списком
    @property({ type: Language })
    currentLanguage: Language = Language.ENGEUR;

    //======================GAMEPLAY=========================//
    @property()
    GAMEPLAY: boolean = false;

    //Port
    @property([Label]) public valutSigns_Port: Label[] = [];
    @property([Label]) public valutSignsLast_Port: Label[] = [];
    @property([Label]) public valutSignsPlusFirst_Port: Label[] = [];

    @property([Label]) public valutStr_Port: Label[] = [];

    @property(Label) startMsg_Port: Label;
    @property(Label) startMsgShadow_Port: Label;
    @property(Label) goButton_Port: Label;
    @property(Label) cashGame_Port: Label;
    @property(Label) ironLabel_Port: Label;

    //Land
    @property([Label]) public valutSigns_Land: Label[] = [];
    @property([Label]) public valutSignsLast_Land: Label[] = [];
    @property([Label]) public valutSignsPlusFirst_Land: Label[] = [];

    @property([Label]) public valutStr_Land: Label[] = [];

    @property(Label) startMsg_Land: Label;
    @property(Label) startMsgShadow_Land: Label;
    @property(Label) goButton_Land: Label;
    @property(Label) cashGame_Land: Label;
    @property(Label) ironLabel_Land: Label;

    //Conmmon
    @property([Label]) public valutSignsLastClose_Common: Label[] = [];
    @property(Label) win_Common: Label;
    @property(Label) install_Common: Label;
    
    protected onLoad(): void 
    {
        this.updateLanguage();
    }

    public getValutStr(): string {
        return TranslationData.translations[this.currentLanguage].valutStr;
    }

    public getValutSign(): string {
        return TranslationData.translations[this.currentLanguage].valutSign;
    }

    // Метод для смены языка
    changeLanguage(lang: Language): void {
        this.currentLanguage = lang;
        this.updateLanguage();
    }


    // Основной метод обновления текстов
    updateLanguage(): void {
        const texts = TranslationData.translations[this.currentLanguage];

        if (!texts) return;

        // Port версия
        if (this.startMsg_Port) this.startMsg_Port.string = texts.startMassage;
        if (this.startMsgShadow_Port) this.startMsgShadow_Port.string = texts.startMassage;
        if (this.goButton_Port) this.goButton_Port.string = texts.goBtn;
        if (this.cashGame_Port) this.cashGame_Port.string = texts.cashGame;
        if (this.ironLabel_Port) this.ironLabel_Port.string = texts.ironLabel;

        this.valutSigns_Port.forEach((vs) => vs.string = texts.valutSign);
        this.valutSignsLast_Port.forEach((vs) => vs.string = vs.string + ' ' + texts.valutSign);
        this.valutSignsPlusFirst_Port.forEach((vs) => vs.string = '+' + texts.valutSign + vs.string);
        this.valutStr_Port.forEach((vs) => vs.string = texts.valutStr);

        // Land версия
        if (this.startMsg_Land) this.startMsg_Land.string = texts.startMassage;
        if (this.startMsgShadow_Land) this.startMsgShadow_Land.string = texts.startMassage;
        if (this.goButton_Land) this.goButton_Land.string = texts.goBtn;
        if (this.cashGame_Land) this.cashGame_Land.string = texts.cashGame;
        if (this.ironLabel_Land) this.ironLabel_Land.string = texts.ironLabel;

        this.valutSigns_Land.forEach((vs) => vs.string = texts.valutSign);
        this.valutSignsLast_Land.forEach((vs) => vs.string = vs.string + ' ' + texts.valutSign);
        this.valutSignsPlusFirst_Land.forEach((vs) => vs.string = '+' + texts.valutSign + vs.string);
        this.valutStr_Land.forEach((vs) => vs.string = texts.valutStr);

        //Common

        if (this.win_Common) this.win_Common.string = texts.win;
        if (this.install_Common) this.install_Common.string = texts.install;

        this.valutSignsLastClose_Common.forEach((vs) => vs.string = vs.string + texts.valutSign);
    }

    // Для динамического обновления
    updateTexts(): void {
        this.updateLanguage();
    }
}