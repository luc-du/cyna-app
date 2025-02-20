import placeholder from "../assets/images/cloud.jpg";
import placeholder2 from "../assets/images/edr.jpg";
import placeholder3 from "../assets/images/edrPremium.jpg";

export const MOCK_Categories = [
  {
    id: 1,
    name: "Service 1",
    url: "/service-1",
    imageUrl: placeholder,
    products: [
      {
        name: "Produit A",
        prix: 99.99,
        disponible: true,
        img: placeholder2,
        imageUrl: placeholder,
      },
      {
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
    name: "Service 2",
    url: "/service-2",
    imageUrl: placeholder2,
    products: [
      {
        name: "Produit D",
        prix: 99.99,
        img: placeholder2,
        disponible: true,
        imageUrl: placeholder,
      },
      {
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
    name: "Service 3",
    url: "/service-3",
    imageUrl: placeholder3,
    disponible: true,
    products: [
      {
        name: "Produit D",
        prix: 99.99,
        disponible: true,
        img: placeholder2,
        imageUrl: placeholder,
      },
      {
        name: "Produit E",
        prix: 99.99,
        disponible: true,
        img: placeholder2,
        imageUrl: placeholder,
      },
    ],
  },
  {
    id: 4,
    name: "Service 4",
    url: "/service-4",
    imageUrl: placeholder,
    products: [
      {
        name: "Produit A",
        prix: 99.99,
        disponible: true,
        img: placeholder2,
        imageUrl: placeholder,
      },
      {
        name: "Produit B",
        prix: 99.99,
        disponible: true,
        img: placeholder2,
        imageUrl: placeholder,
      },
    ],
  },
  {
    id: 5,
    name: "Service 5",
    url: "/service-5",
    imageUrl: placeholder2,
    products: [
      {
        name: "Produit D",
        prix: 99.99,
        disponible: true,
        imageUrl: placeholder,
      },
      {
        name: "Produit E",
        prix: 99.99,
        disponible: true,
        imageUrl: placeholder,
      },
    ],
  },
  {
    id: 6,
    name: "Service 6",
    url: "/service-6",
    imageUrl: placeholder3,
    disponible: true,
    products: [
      {
        name: "Produit D",
        prix: 99.99,
        disponible: true,
        imageUrl: placeholder,
      },
      {
        name: "Produit E",
        prix: 99.99,
        disponible: false,
        imageUrl: placeholder,
      },
    ],
  },
];
