export type GalleryPost = {
  id: string;
  type: "photo" | "text";
  date: string;
  image?: string;
  caption: string;
};

export const galleryPosts: GalleryPost[] = [
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
];
