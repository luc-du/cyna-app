import edrPremium from "../assets/images/edrPremium.jpg";
import socPremium from "../assets/images/socPremium.jpg";
import xdrPremium from "../assets/images/xdrPremium.png";

export const MOCK_TopProductsData = [
  {
    id: 1,
    image: [socPremium, edrPremium, xdrPremium],
    name: "SOC Premium",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Rerum qui dolorem, molestiae deleniti animi aspernatur reprehenderit nostrum eos iusto esse deserunt voluptas saepe praesentium vitae provident, unde harum magni tempora.",
    disponible: true,
    link: "/products/1",
  },
  {
    id: 2,
    image: edrPremium,
    name: "EDR Avancé",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut modi fugit dolores suscipit fugiat beatae repellat aut saepe consequatur quibusdam! Iusto voluptas quod, placeat consectetur nisi vel veritatis quo fugit.",
    disponible: false,
    link: "/products/2",
  },
  {
    id: 3,
    image: xdrPremium,
    name: "XDR Pro",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut modi fugit dolores suscipit fugiat beatae repellat aut saepe consequatur quibusdam! Iusto voluptas quod, placeat consectetur nisi vel veritatis quo fugit.",
    disponible: true,
    link: "/products/3",
  },
];
