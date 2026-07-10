export type GalleryPost = {
  id: string;
  type: "photo" | "text";
  date?: string;
  image?: string;
  caption?: string;
};

export const galleryPosts: GalleryPost[] = [
  {
    id: "live-bass-1",
    type: "photo",
    image: "./assets/gallery/live-bass-1.jpg",
    caption: "ベース演奏",
  },
  {
    id: "bass-sky",
    type: "photo",
    image: "./assets/gallery/bass-sky.jpg",
  },
  {
    id: "night-walk",
    type: "photo",
    image: "./assets/gallery/night-walk.jpg",
  },
  {
    id: "fullbody",
    type: "photo",
    image: "./assets/gallery/fullbody.jpg",
  },
  {
    id: "site-launch-0709",
    type: "text",
    date: "2026.07",
    caption:
      "このサイト、今日一日で作りました。ファミコン風にしたくて、ドット絵にしたり、コーギーを走らせたり、隠しコマンドまで仕込んで、結構やりすぎた気がする。",
  },
  {
    id: "post-1",
    type: "text",
    date: "2026.07",
    caption:
      "ここは近況を残していくアルバムです。制作風景の写真や、ふと思ったことなど、ぼちぼち更新していきます。",
  },
  {
    id: "hospital",
    type: "photo",
    image: "./assets/gallery/hospital.jpg",
    caption: "2025年、病人だった時。",
  },
];
