// ** Type import
import { VerticalNavItemsType } from "src/@core/layouts/types";

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: "Home",
      path: "/home",
      icon: "tabler:smart-home",
    },
    {
      title: "Artists",
      icon: "tabler:blockquote",
      children: [
        {
          title: "All Artists",
          path: "/artists",
        },
        {
          title: "Add new Artist",
          path: "/artists/AddNewArtist",
        },
      ],
    },
    {
      title: "Festivals",
      icon: "tabler:users",
      children: [
        {
          title: "All Festivals",
          path: "/festivals",
        },
        {
          title: "Add new Festival",
          path: "/festivals/AddNewFestival",
        },
      ],
    },
    {
      title: "Artists Festivals",
      icon: "tabler:users",
      children: [
        {
          title: "All Artist Festivals",
          path: "/artistsfestivals",
        },
        {
          title: "Add New",
          path: "/artistsfestivals/AddNewArtistFestival",
        },
      ],
    },
  ];
};

export default navigation;
