import { _decorator, Component, Label, Node, Enum, Sprite, SpriteFrame } from 'cc';
const { ccclass, property } = _decorator;

// Enum для выбора языка
enum Language
{
    CA,
    CZ,
    DK,
    FI,
    GR,
    HR,
    HU,
    IE,
    KR,
    LU,
    NO,
    PL,
    PT,
    RO,
    SI,
    SK,
    SR
}
Enum(Language);

// Класс с переводами
class TranslationData
{
    static readonly translations = {
        [Language.CA]: {
            guaranteedJackpot: "Guaranteed jackpot within",
            goBtn: "Go",
            cashOut: "Cash out",
            bonusGame: "Bonus\ngame",
            win: "Win!",
            install: "Install now",
            ironLabel: "For illustrative purposes only",
            valutStr: "CAD",
            valutSign: "$"
        },
        [Language.CZ]: {
            guaranteedJackpot: "Zaručený jackpot během",
            goBtn: "Jdi",
            cashOut: "Vybrat",
            bonusGame: "Bonusová\nhra",
            win: "Vyhraj!",
            install: "Nainstaluj nyní",
            ironLabel: "Pouze pro ilustrativní účely",
            valutStr: "CZK",
            valutSign: "Kč"
        },
        [Language.DK]: {
            guaranteedJackpot: "Garanteret jackpot inden for",
            goBtn: "Gå",
            cashOut: "Udbetal",
            bonusGame: "Bonusspil",
            win: "Vind!",
            install: "Installer nu",
            ironLabel: "Kun til illustrative formål",
            valutStr: "EUR",
            valutSign: "€"
        },
        [Language.FI]: {
            guaranteedJackpot: "Taattu jackpot ajassa",
            goBtn: "Mene",
            cashOut: "Nosta rahaa",
            bonusGame: "Bonuspeli",
            win: "Voita!",
            install: "Asenna nyt",
            ironLabel: "Vain havainnollistavia tarkoituksia varten",
            valutStr: "EUR",
            valutSign: "€"
        },
        [Language.GR]: {
            guaranteedJackpot: "Εγγυημένο τζάκποτ μέσα σε",
            goBtn: "Πήγαινε",
            cashOut: "Ανάληψη",
            bonusGame: "Μπόνους\nπαιχνίδι",
            win: "Νίκησε!",
            install: "Εγκατάστησε τώρα",
            ironLabel: "Μόνο για εικονογραφικούς σκοπούς",
            valutStr: "EUR",
            valutSign: "€"
        },
        [Language.HR]: {
            guaranteedJackpot: "Zagarantirani jackpot unutar",
            goBtn: "Idi",
            cashOut: "Isplata",
            bonusGame: "Bonus\nigra",
            win: "Pobjedi!",
            install: "Instaliraj sada",
            ironLabel: "Samo u ilustrativne svrhe",
            valutStr: "EUR",
            valutSign: "€"
        },
        [Language.HU]: {
            guaranteedJackpot: "Garantált jackpot ennyi időn belül",
            goBtn: "Menj",
            cashOut: "Kifizetés",
            bonusGame: "Bónusz\njáték",
            win: "Nyerj!",
            install: "Telepítsd most",
            ironLabel: "Csak illusztrációs célokra",
            valutStr: "EUR",
            valutSign: "€"
        },
        [Language.IE]: {
            guaranteedJackpot: "Guaranteed jackpot within",
            goBtn: "Go",
            cashOut: "Cash out",
            bonusGame: "Bonus\ngame",
            win: "Win!",
            install: "Install now",
            ironLabel: "For illustrative purposes only",
            valutStr: "EUR",
            valutSign: "€"
        },
        [Language.KR]: {
            guaranteedJackpot: "보장된 잭팟 시간 내에",
            goBtn: "이동",
            cashOut: "현금 인출",
            bonusGame: "보너스\n게임",
            win: "승리!",
            install: "지금 설치",
            ironLabel: "예시용으로만 사용됩니다",
            valutStr: "EUR",
            valutSign: "€"
        },
        [Language.LU]: {
            guaranteedJackpot: "Garantierter Jackpot innerhalb",
            goBtn: "Gehen",
            cashOut: "Auszahlung",
            bonusGame: "Bonusspiel",
            win: "Gewinnen!",
            install: "Jetzt installieren",
            ironLabel: "Nur zu Illustrationszwecken",
            valutStr: "EUR",
            valutSign: "€"
        },
        [Language.NO]: {
            guaranteedJackpot: "Garantert jackpot innen",
            goBtn: "Gå",
            cashOut: "Ta ut",
            bonusGame: "Bonusspill",
            win: "Vinn!",
            install: "Installer nå",
            ironLabel: "Kun for illustrasjonsformål",
            valutStr: "EUR",
            valutSign: "€"
        },
        [Language.PL]: {
            guaranteedJackpot: "Gwarantowany jackpot w ciągu",
            goBtn: "Idź",
            cashOut: "Wypłać",
            bonusGame: "Gra\nbonusowa",
            win: "Wygraj!",
            install: "Zainstaluj teraz",
            ironLabel: "Tylko w celach ilustracyjnych",
            valutStr: "PLN",
            valutSign: "zł"
        },
        [Language.PT]: {
            guaranteedJackpot: "Jackpot garantido em",
            goBtn: "Ir",
            cashOut: "Sacar",
            bonusGame: "Jogo\nbônus",
            win: "Ganhar!",
            install: "Instalar agora",
            ironLabel: "Apenas para fins ilustrativos",
            valutStr: "EUR",
            valutSign: "€"
        },
        [Language.RO]: {
            guaranteedJackpot: "Jackpot garantat în",
            goBtn: "Mergi",
            cashOut: "Retrage",
            bonusGame: "Joc\nbonus",
            win: "Câștigă!",
            install: "Instalează acum",
            ironLabel: "Doar în scop ilustrativ",
            valutStr: "EUR",
            valutSign: "€"
        },
        [Language.SI]: {
            guaranteedJackpot: "Zagotovljen jackpot v roku",
            goBtn: "Pojdi",
            cashOut: "Izplačilo",
            bonusGame: "Bonus\nigra",
            win: "Zmagaj!",
            install: "Namesti zdaj",
            ironLabel: "Samo za ponazoritev",
            valutStr: "EUR",
            valutSign: "€"
        },
        [Language.SK]: {
            guaranteedJackpot: "Zaručený jackpot do",
            goBtn: "Choď",
            cashOut: "Vybrať",
            bonusGame: "Bonusová\nhra",
            win: "Vyhraj!",
            install: "Nainštaluj teraz",
            ironLabel: "Iba na ilustračné účely",
            valutStr: "EUR",
            valutSign: "€"
        },
        [Language.SR]: {
            guaranteedJackpot: "Загарантован џекпот у року од",
            goBtn: "Иди",
            cashOut: "Исплата",
            bonusGame: "Бонус\nигра",
            win: "Победа!",
            install: "Инсталирај сада",
            ironLabel: "Само у илустративне сврхе",
            valutStr: "EUR",
            valutSign: "€"
        }
    };
}

@ccclass('GeoAdapter')
export class GeoAdapter extends Component 
{

    // Выбор языка с выпадающим списком
    @property({ type: Language })
    currentLanguage: Language = Language.CA;

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
    @property(Label) bonusGame: Label;
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
        if (this.startMsg_Port) this.startMsg_Port.string = texts.guaranteedJackpot;
        if (this.startMsgShadow_Port) this.startMsgShadow_Port.string = texts.guaranteedJackpot;
        if (this.goButton_Port) this.goButton_Port.string = texts.goBtn;
        if (this.cashGame_Port) this.cashGame_Port.string = texts.cashOut;
        if (this.ironLabel_Port) this.ironLabel_Port.string = texts.ironLabel;

        this.valutSigns_Port.forEach((vs) => vs.string = texts.valutSign);
        this.valutSignsLast_Port.forEach((vs) => vs.string = vs.string + ' ' + texts.valutSign);
        this.valutSignsPlusFirst_Port.forEach((vs) => vs.string = '+' + texts.valutSign + vs.string);
        this.valutStr_Port.forEach((vs) => vs.string = texts.valutStr);

        // Land версия
        if (this.startMsg_Land) this.startMsg_Land.string = texts.guaranteedJackpot;
        if (this.startMsgShadow_Land) this.startMsgShadow_Land.string = texts.guaranteedJackpot;
        if (this.goButton_Land) this.goButton_Land.string = texts.goBtn;
        if (this.cashGame_Land) this.cashGame_Land.string = texts.cashOut;
        if (this.ironLabel_Land) this.ironLabel_Land.string = texts.ironLabel;

        this.valutSigns_Land.forEach((vs) => vs.string = texts.valutSign);
        this.valutSignsLast_Land.forEach((vs) => vs.string = vs.string + ' ' + texts.valutSign);
        this.valutSignsPlusFirst_Land.forEach((vs) => vs.string = '+' + texts.valutSign + vs.string);
        this.valutStr_Land.forEach((vs) => vs.string = texts.valutStr);

        //Common

        if (this.bonusGame) this.bonusGame.string = texts.bonusGame;
        if (this.win_Common) this.win_Common.string = texts.win;
        if (this.install_Common) this.install_Common.string = texts.install;

        this.valutSignsLastClose_Common.forEach((vs) => vs.string = vs.string + texts.valutSign);
    }

    // Для динамического обновления
    updateTexts(): void {
        this.updateLanguage();
    }
}