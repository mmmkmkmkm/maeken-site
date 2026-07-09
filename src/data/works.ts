export type WorkCard = {
  id: string;
  title: string;
  meta: string;
  spotify?: { id: string; kind: "track" | "album" };
  youtubeId?: string;
  appleMusic?: string;
  comingSoon?: boolean;
  audioSrc?: string;
  isNew?: boolean;
};

export type WorkGroup = {
  key: string;
  num: string;
  jaLabel: string;
  enLabel: string;
  cards: WorkCard[];
};

export const workGroups: WorkGroup[] = [
  {
    key: "composition",
    num: "STAGE 1",
    jaLabel: "作編曲",
    enLabel: "Composition & Arrangement",
    cards: [
      {
        id: "goodbye",
        title: "Goodbye",
        meta: "JAG · 2025 · 作曲/編曲/ベース",
        spotify: { id: "1ULOM82c5GfszhyvAG5ASP", kind: "album" },
        youtubeId: "WuacZJTg9o0",
        appleMusic: "https://music.apple.com/jp/album/_/1809060290?i=1809060297",
        isNew: true,
      },
      {
        id: "hug",
        title: "Hug",
        meta: "JAG · 2024 · 作曲/編曲/ベース",
        spotify: { id: "3mPqNsQEmNbvAQnTVsfdHB", kind: "track" },
        youtubeId: "VVk1x1MAwNU",
        appleMusic: "https://music.apple.com/jp/album/hug/1778248163?i=1778248183",
      },
      {
        id: "geki",
        title: "劇",
        meta: "CoCoKoKo (Maeken & Calen) · 2022 · 作編曲/トラック",
        spotify: { id: "16EzQfCGmqPJprRU2n97WL", kind: "track" },
        youtubeId: "1VQzz39UxTo",
        appleMusic: "https://music.apple.com/jp/album/%E5%8A%87/1657986922?i=1657986923",
      },
      {
        id: "toriko",
        title: "虜",
        meta: "CoCoKoKo · 2022 · 作編曲/トラック",
        spotify: { id: "42cAWzrmV9t8G0A6OPrUuw", kind: "track" },
        youtubeId: "hxvVd4QRvak",
        appleMusic: "https://music.apple.com/jp/album/%E8%99%9C/1620290764?i=1620291126",
      },
      {
        id: "corgi",
        title: "Corgi",
        meta: "Maeken · Coming soon",
        comingSoon: true,
        audioSrc: "./assets/audio/Corgi.mp3",
      },
    ],
  },
  {
    key: "bass",
    num: "STAGE 2",
    jaLabel: "ベース",
    enLabel: "Bass",
    cards: [
      {
        id: "seiten-hikou",
        title: "晴天飛行",
        meta: "35's Town · 2020 · ベース",
        spotify: { id: "5fg2jv0a9aILf2PbrAGbUP", kind: "track" },
        youtubeId: "1lxBEPAj2zo",
        appleMusic: "https://music.apple.com/jp/album/%E6%99%B4%E5%A4%A9%E9%A3%9B%E8%A1%8C-single/1534835589",
      },
      {
        id: "bokura-no-yukei",
        title: "ぼくらの夕景",
        meta: "35's Town · 2020 · ベース",
        spotify: { id: "1cErScPLxEjhMycuP7MGoJ", kind: "track" },
        youtubeId: "GGpDeAGYgrQ",
        appleMusic: "https://music.apple.com/jp/album/%E3%81%BC%E3%81%8F%E3%82%89%E3%81%AE%E5%A4%95%E6%99%AF/1537935891?i=1537935894",
      },
      {
        id: "yoru-dake",
        title: "夜だけ",
        meta: "35's Town · 2020 · ベース",
        spotify: { id: "5WEEsyJHL9XUninI6Aqg0i", kind: "track" },
        youtubeId: "1WqDq1V6nro",
        appleMusic: "https://music.apple.com/jp/album/%E5%A4%9C%E3%81%A0%E3%81%91/1537935891?i=1537935895",
      },
      {
        id: "twangy",
        title: "twangy",
        meta: "THE NOBES · 2020 · ベース",
        spotify: { id: "6NjR5iXYwteN4PNU30D0ZW", kind: "track" },
        youtubeId: "Jqlcictr7pA",
        appleMusic: "https://music.apple.com/jp/album/twangy/1546576553?i=1546576555",
      },
      {
        id: "vivid",
        title: "vivid",
        meta: "THE NOBES · 2020 · ベース",
        spotify: { id: "51aQjypdhCPHjhiq5EJONe", kind: "track" },
        youtubeId: "lh9Nvvk_FvI",
        appleMusic: "https://music.apple.com/jp/album/vivid/1546576553?i=1546576554",
      },
      {
        id: "goodbye-bass",
        title: "Goodbye",
        meta: "JAG · ベース",
        spotify: { id: "1ULOM82c5GfszhyvAG5ASP", kind: "album" },
        youtubeId: "WuacZJTg9o0",
        appleMusic: "https://music.apple.com/jp/album/_/1809060290?i=1809060297",
      },
      {
        id: "hug-bass",
        title: "Hug",
        meta: "JAG · ベース",
        spotify: { id: "3mPqNsQEmNbvAQnTVsfdHB", kind: "track" },
        youtubeId: "VVk1x1MAwNU",
        appleMusic: "https://music.apple.com/jp/album/hug/1778248163?i=1778248183",
      },
    ],
  },
  {
    key: "trackmake",
    num: "STAGE 3",
    jaLabel: "トラックメイク",
    enLabel: "Track Making",
    cards: [
      {
        id: "geki-track",
        title: "劇",
        meta: "CoCoKoKo · トラックメイク",
        spotify: { id: "16EzQfCGmqPJprRU2n97WL", kind: "track" },
        youtubeId: "1VQzz39UxTo",
        appleMusic: "https://music.apple.com/jp/album/%E5%8A%87/1657986922?i=1657986923",
      },
      {
        id: "toriko-track",
        title: "虜",
        meta: "CoCoKoKo · トラックメイク",
        spotify: { id: "42cAWzrmV9t8G0A6OPrUuw", kind: "track" },
        youtubeId: "hxvVd4QRvak",
        appleMusic: "https://music.apple.com/jp/album/%E8%99%9C/1620290764?i=1620291126",
      },
    ],
  },
];
