import { Disc3, Library, ListMusic, PlusCircle } from "lucide-react";

export const adminMenu = [
  {
    icon: PlusCircle,
    id: "add-song",
    label: "Thêm Bài Hát",
    path: "/add-song",
  },
  {
    icon: ListMusic,
    id: "list-song",
    label: "Danh Sách Bài Hát",
    path: "/list-songs",
  },
  {
    icon: Disc3,
    id: "add-album",
    label: "Thêm Album",
    path: "/add-album",
  },
  {
    icon: Library,
    id: "list-album",
    label: "Danh Sách Album",
    path: "/list-albums",
  },
];
