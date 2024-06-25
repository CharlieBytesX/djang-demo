import { Edit, X } from "lucide-react";

function formatPrice(priceN: number) {
  const price = priceN.toString();
  const splittedOnComma = price.split(",");
  const beforeComma = splittedOnComma[0];
  const afterComma = splittedOnComma[1];

  let lastCharIndexAdded = beforeComma.length;
  const chunks: string[] = [];

  for (let index = beforeComma.length - 1; index >= 0; index--) {
    if ((index + 1) % 3 === 0) {
      chunks.push(beforeComma.substring(index, lastCharIndexAdded));
      lastCharIndexAdded = index;
    }
  }

  if (lastCharIndexAdded !== 0) {
    chunks.push(beforeComma.substring(0, lastCharIndexAdded));
  }

  let newPrice = "";
  for (let index = chunks.length - 1; index >= 0; index--) {
    newPrice += chunks[index];
    if (index !== 0) {
      newPrice += ".";
    }
  }
  if (afterComma) {
    newPrice += `,${afterComma}`;
  }

  return newPrice;
}
export interface CardAd {
  title: string;
  id: number;
  description: string;
  car_image: string;
  price: number;
  contact_number: string;
}

interface Props {
  ad: CardAd;
  showEditButton?: boolean;
  editButtonAction?: () => void;

  showEraseButton?: boolean;
  eraseButtonAction?: () => void;
  clickCardAction?: () => void;
}

export default function CarCard(props: Props) {
  return (
    <div
      onClick={props.clickCardAction}
      className="flex flex-col py-2 px-4 border rounded-sm w-60 h-72  hover:cursor-pointer shadow-sm transition-all transform hover:scale-105 hover:opacity-90"
    >
      <div className="flex right-2 gap-2   ">
        <div className="font-semibold text-xl truncate ">{props.ad.title}</div>
        {props.showEditButton && (
          <Edit
            className="hover:scale-150 transition-all hover:opacity-90 duration-300"
            size={20}
            onClick={(e) => {
              e.stopPropagation();
              props.editButtonAction ? props.editButtonAction() : null;
            }}
          />
        )}
        {props.showEraseButton && (
          <X
            className="hover:scale-150 duration-300 transition-all "
            onClick={(e) => {
              e.stopPropagation();
              props.eraseButtonAction ? props.eraseButtonAction() : null;
            }}
          />
        )}
      </div>

      <img alt="" className="  h-40 object-contain" src={props.ad.car_image} />
      <span className="truncate h-7">{props.ad.description}</span>
      <span className=" text-green-400 font-semibold overflow-ellipsis">
        ₡ {formatPrice(props.ad.price)}
      </span>
      <span className="">Contact: {props.ad.contact_number}</span>
    </div>
  );
}
