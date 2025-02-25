import placeholder3 from "../assets/images/identity.jpg";
import placeholder from "../assets/images/siem.jpg";
import placeholder2 from "../assets/images/technology.jpg";

export const MOCK_Categories = [
  {
    id: 1,
    name: "SOC & SIEM",
    url: "1",
    imageUrl: placeholder,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, reiciendis dolores molestiae voluptas tenetur quod facilis fuga, itaque obcaecati nisi illo commodi incidunt sit, rem excepturi dicta sapiente fugit officia!",
    products: [
      {
        id: 0,
        name: "Produit A",
        prix: 99.99,
        disponible: true,
        img: placeholder2,
        imageUrl: placeholder,
      },
      {
        id: 1,
        name: "Produit B",
        prix: 99.99,
        disponible: true,
        img: placeholder2,
        imageUrl: placeholder,
      },
    ],
  },
  {
    id: 2,
    name: "EDR & XDR",
    url: "2",
    imageUrl: placeholder2,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, reiciendis dolores molestiae voluptas tenetur quod facilis fuga, itaque obcaecati nisi illo commodi incidunt sit, rem excepturi dicta sapiente fugit officia!",
    products: [
      {
        id: 0,
        name: "Produit D",
        prix: 99.99,
        img: placeholder2,
        disponible: false,
        imageUrl: placeholder,
      },
      {
        id: 1,
        name: "Produit E",
        prix: 99.99,
        img: placeholder2,
        disponible: true,
        imageUrl: placeholder,
      },
    ],
  },
  {
    id: 3,
    name: "Cyna SOC",
    url: "3",
    imageUrl: placeholder3,
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, reiciendis dolores molestiae voluptas tenetur quod facilis fuga, itaque obcaecati nisi illo commodi incidunt sit, rem excepturi dicta sapiente fugit officia!",
    products: [
      {
        id: 0,
        name: "Produit D",
        prix: 99.99,
        disponible: true,
        img: placeholder2,
        imageUrl: placeholder,
      },
      {
        id: 1,
        name: "Produit E",
        prix: 99.99,
        disponible: true,
        img: placeholder2,
        imageUrl: placeholder,
      },
    ],
  },
];
