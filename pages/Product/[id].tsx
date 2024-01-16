import Layout from "@/components/Layout";
import { ProductsData } from "@/components/Products";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
Image;

export default async function productSpecific() {
  const [items, setItems] = useState<ProductsData>();
  const router = useRouter();
  const { id } = router.query;
  const response = await fetch(`http://localhost:3000/api/client/${id}`);
  const data = await response.json();
  console.log(data);
  setItems(data);
  return (
    <Layout>
      <section className="p-5">
        {items &&
          items.map(({ item }: any) => (
            <>
              <div className="flex flex-col">
                <div className="w-full">
                  <Image
                    src={item.imgUrl}
                    height={340}
                    width={290}
                    alt="image"
                  />
                </div>
                <div className="flex flex-row ">
                  <h1 className="text-2xl text-bold text-blue-400 ">
                    Name:{item.name}
                  </h1>

                  <p className="justify-content text-sm">{item.description}</p>
                  <p className="text-bold">Brand:{item.brand}</p>
                  <p className="text-blue-400">Price:{item.price}</p>
                  <p className="text-blue-400">Quantity: {item.quantity}</p>
                </div>
              </div>
            </>
          ))}
      </section>
    </Layout>
  );
}
