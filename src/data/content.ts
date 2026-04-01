// ── Types ────────────────────────────────────────────────
export interface TimelineItem {
  scene: string;
  year: string;
  flag: string;
  title: string;
  desc: string;
  stampIdx: number;
  stampIcon: string;
  stampLabel: string;
}

export interface PhotoCard {
  idx: number;
  bg: string;
  icon: string;
  location: string;
  caption: string;
  date: string;
  lbCaption: string;
  lbDesc: string;
}

export interface StatItem {
  icon: string;
  num: string;
  label: string;
  dynamic?: boolean; // true = replaced with live days-together count
}

export interface MusicTrack {
  url: string;
  name: string;
  icon: string;
}

export interface EggMessage {
  icon: string;
  msg: string;
}

export interface Prize {
  icon: string;
  title: string;
  msg: string;
}

// ── Constants ────────────────────────────────────────────
export const START_DATE = new Date('2015-07-20T00:00:00');
export const SECRET_CODE = '2015';
export const STAMP_ICONS = ['🌸', '⛩️', '🗼', '🌌', '🌾', '🏛️'] as const;

export const SCENE_TINTS: Record<string, string> = {
  home:      'rgba(13,10,26,0)',
  kyoto:     'rgba(120,40,10,0.18)',
  paris:     'rgba(10,20,70,0.22)',
  iceland:   'rgba(0,60,30,0.20)',
  tuscany:   'rgba(80,55,0,0.18)',
  santorini: 'rgba(0,40,90,0.22)',
};

// ── Data ─────────────────────────────────────────────────
export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    scene: 'home', year: '2015 · 夏', flag: '🇹🇼',
    title: '台灣 · 故事的起點',
    desc: '2015 年 7 月 20 日，那個夏天，我們的故事就此展開。從此每一段旅程，都有你的身影相伴。',
    stampIdx: 0, stampIcon: '🌸', stampLabel: '蓋上台灣紀念章',
  },
  {
    scene: 'kyoto', year: '2016 · 春', flag: '🇯🇵',
    title: '日本 · 京都の春',
    desc: '嵐山的竹林間，我們並肩而行；伏見稻荷的千本鳥居，映著你的笑臉，那橘紅色的光是我記憶最深的色彩。',
    stampIdx: 1, stampIcon: '⛩️', stampLabel: '蓋上京都紀念章',
  },
  {
    scene: 'paris', year: '2017 · 秋', flag: '🇫🇷',
    title: '法國 · 巴黎夜色',
    desc: '鐵塔閃燈的瞬間，你依偎在我身旁。塞納河畔我們許下的心願，仍然清晰如昨。',
    stampIdx: 2, stampIcon: '🗼', stampLabel: '蓋上巴黎紀念章',
  },
  {
    scene: 'iceland', year: '2018 · 冬', flag: '🇮🇸',
    title: '冰島 · 極光之約',
    desc: '零下的夜空突然綠光搖曳，你的驚呼聲至今仍在耳邊。那是我們看過最神奇的夜晚。',
    stampIdx: 3, stampIcon: '🌌', stampLabel: '蓋上冰島紀念章',
  },
  {
    scene: 'tuscany', year: '2019 · 夏', flag: '🇮🇹',
    title: '義大利 · 托斯卡尼',
    desc: '金色麥田與柏樹林道，我們騎著腳踏車穿越山丘小鎮，喝著當地紅酒，時光慢得剛剛好。',
    stampIdx: 4, stampIcon: '🌾', stampLabel: '蓋上托斯卡尼紀念章',
  },
  {
    scene: 'santorini', year: '2023 · 春', flag: '🇬🇷',
    title: '希臘 · 聖托里尼',
    desc: '藍白教堂的屋頂上，愛琴海一望無際。我們看著落日緩緩沉入海面，彼此什麼都沒說，卻什麼都懂。',
    stampIdx: 5, stampIcon: '🏛️', stampLabel: '蓋上聖托里尼紀念章',
  },
];

export const PHOTO_CARDS: PhotoCard[] = [
  {
    idx: 0,
    bg: 'linear-gradient(135deg,#1a0a2e,#3d1a5e)',
    icon: '⛩️', location: '📍 KYOTO, JAPAN',
    caption: '千本鳥居的橘紅光廊', date: '2016 · 春',
    lbCaption: '千本鳥居的橘紅光廊',
    lbDesc: '伏見稻荷大社的神秘鳥居隧道，兩人攜手穿越，每一步都是回憶。那橘紅色的光暈染進了我們的故事裡。',
  },
  {
    idx: 1,
    bg: 'linear-gradient(135deg,#0d1a3d,#1a2d5e)',
    icon: '🗼', location: '📍 PARIS, FRANCE',
    caption: '鐵塔閃燈的每個整點', date: '2017 · 秋',
    lbCaption: '鐵塔閃燈的每個整點',
    lbDesc: '巴黎鐵塔的閃燈表演，五分鐘的夢幻，我卻只看著你的眼睛。塞納河畔的夜風，吹亂了你的頭髮，那是最美的一幕。',
  },
  {
    idx: 2,
    bg: 'linear-gradient(135deg,#0a1a0d,#0d2a14)',
    icon: '🌌', location: '📍 ICELAND',
    caption: '那夜的極光，綠色星河', date: '2018 · 冬',
    lbCaption: '那夜的極光，綠色星河',
    lbDesc: '冰島零下的夜空突然爆發了綠色的光。你激動地抓著我的手，整個宇宙都在為我們起舞。那晚我許願，願這輩子一直有你。',
  },
  {
    idx: 3,
    bg: 'linear-gradient(135deg,#2a1500,#4a2a00)',
    icon: '🌾', location: '📍 TUSCANY, ITALY',
    caption: '金色麥田的午後單車', date: '2019 · 夏',
    lbCaption: '金色麥田的午後單車',
    lbDesc: '托斯卡尼的山丘上，我們各騎一台老鐵馬，穿越柏樹夾道的鄉間小路。汗水和笑聲，是最好的記憶釀造法。',
  },
  {
    idx: 4,
    bg: 'linear-gradient(135deg,#0a1a2a,#0d2840)',
    icon: '🏛️', location: '📍 SANTORINI, GREECE',
    caption: '藍頂教堂與愛琴海落日', date: '2023 · 春',
    lbCaption: '藍頂教堂與愛琴海落日',
    lbDesc: '聖托里尼的日落是世界上最被拍攝的，但那天我們看到的，是屬於我們自己的版本。你手中的那杯白酒，映著橙金色的海。',
  },
  {
    idx: 5,
    bg: 'linear-gradient(135deg,#1a0a0a,#3d1515)',
    icon: '🌸', location: '📍 ARASHIYAMA, JAPAN',
    caption: '嵐山竹林間的午後漫步', date: '2016 · 春',
    lbCaption: '嵐山竹林間的午後漫步',
    lbDesc: '竹葉沙沙作響，光線從葉縫間灑落。你說這裡像是另一個世界，我說只要有你，任何地方都是我最喜歡的世界。',
  },
];

export const STATS: StatItem[] = [
  { icon: '✈️', num: '6+',   label: '國家足跡' },
  { icon: '📸', num: '∞',    label: '珍貴回憶' },
  { icon: '💌', num: '???',  label: '相愛天數', dynamic: true },
  { icon: '🌅', num: '100+', label: '日出日落' },
  { icon: '☕', num: '1000+',label: '共飲咖啡' },
  { icon: '❤️', num: '永遠', label: '我對你的愛' },
];

export const MUSIC_TRACKS: MusicTrack[] = [
  { url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', name: '夜空の旋律',    icon: '🌙' },
  { url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', name: 'Parisian Waltz', icon: '🗼' },
  { url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', name: 'Aurora Dream',   icon: '🌌' },
  { url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3', name: 'Aegean Sunset',  icon: '🏛️' },
];

export const EGG_MESSAGES: EggMessage[] = [
  { icon: '🌙', msg: '在世界上的某個角落，此刻有人和你看著同一片星空，那個人想告訴你：你是他眼中最亮的星。' },
  { icon: '🌹', msg: '你知道嗎？我數過每一趟旅行裡所有美好的瞬間，發現它們都有一個共同點——那就是有你在。' },
  { icon: '💌', msg: '如果旅行是一本書，你就是我最喜歡的那一章。我願意一遍一遍重讀，永遠不膩。' },
];

export const PRIZES: Prize[] = [
  { icon: '✈️', title: '下一站，我帶你去',     msg: '你閉上眼睛，我來選目的地。只要是和你在一起，哪裡都是最好的旅程。' },
  { icon: '🌹', title: '今天的愛，比昨天多一點', msg: '我不知道愛是不是有最大值，但我知道每天早上醒來，我比昨天更愛你一點。' },
  { icon: '🌙', title: '夜空下的約定',          msg: '還記得冰島那晚嗎？那道極光是宇宙在為我們慶祝。我的心願，是這輩子一直有你陪著看星星。' },
  { icon: '☕', title: '和你喝每一杯咖啡',       msg: '別人說旅行是為了尋找自己，我的旅行是為了和你分享每一個清晨的第一杯咖啡。' },
  { icon: '💌', title: '沒說出口的那句話',       msg: '每次旅行在機場告別，我最想說的不是再見，而是「你趕快回來，我想你了」。' },
  { icon: '🌸', title: '你是我最喜歡的風景',     msg: '京都的春天很美，巴黎的夜色很迷人，但我拍最多的照片裡，主角永遠都是你。' },
];

export const BIRTHDAY_MESSAGE =
  `每一次旅行，都是我們寫給彼此的情書。\n` +
  `謝謝你出現在我的生命裡，陪我走遍世界每個角落。\n` +
  `你是我最喜歡的風景，也是我最想帶著出發的理由。\n\n` +
  `生日快樂，願你的每一天都像旅途中那些黃金時刻，\n` +
  `閃閃發光，充滿驚喜與溫柔。`;
