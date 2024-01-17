import { ProductsData } from "@/types/ProductType";
import Image from "next/image";
import Link from "next/link";

export default function StoreItem({
  id,
  name,
  brand,
  category,
  description,
  imgUrl,
  price,
  quantity,
}: ProductsData) {
  return (
    <div className=" flex flex-col bg-white justify-between gap-2  rounded-md shadow-sm  px-5">
      <div className=" w-full h-64 block rounded-md">
        <Link href={`/Product/${id}`}>
          <Image
            src={imgUrl}
            alt="image"
            className="object-cover block object-center h-full width-full"
            width={290}
            height={70}
          />
        </Link>
      </div>

      <div className="flex items-start justify-between gap-4">
        <h1 className="text-bold text-lg ">Name:</h1>
        <p className="text-md">{name}</p>
      </div>
      <div className="flex items-start justify-between gap-4">
        <h1 className="text-bold text-lg ">Brand:</h1>
        <p className="text-md">{brand}</p>
      </div>
      <div className="flex justify-between gap-4">
        <h1 className="text-bold text-lg items-start flex">Description:</h1>
        <p className="text-md">{description.slice(0, 20)}...</p>
      </div>
      <div className="flex  justify-between gap-4">
        <h1 className="text-bold text-lg items-start flex ">Price:</h1>
        <p className="text-md">
          {" "}
          <span>KSH</span>
          {""}
          {price}
        </p>
      </div>
    </div>
  );
}
