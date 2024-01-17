import Layout from "@/components/Layout";
import { ProductsData } from "@/types/ProductType";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function productSpecific() {
  const [items, setItems] = useState<ProductsData>();
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      const fetchProduct = async () => {
        const response = await fetch(`http://localhost:3000/api/client/${id}`);
        const data = await response.json();
        console.log(data);
        setItems(await data);
      };
      fetchProduct();
    }
  }, [id]);

  return (
    <Layout>
      <section className="p-5">
        <>
          <div className="flex flex-col">
            <div className="w-full">
              <Image
                src={items?.imgUrl as string}
                height={340}
                width={290}
                alt="image"
              />
            </div>
            <div className="flex flex-row ">
              <h1 className="text-2xl text-bold text-blue-400 ">
                Name:{items?.name}
              </h1>

              <p className="justify-content text-sm">{items?.description}</p>
              <p className="text-bold">Brand:{items?.brand}</p>
              <p className="text-blue-400">Price:{items?.price}</p>
              <p className="text-blue-400">Quantity: {items?.quantity}</p>
            </div>
          </div>
        </>
      </section>
    </Layout>
  );
}
