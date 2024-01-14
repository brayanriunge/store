import { prisma } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    res.status(401).json({ message: "Method not found" });
  }
  try {
    const productId = req.query.slug as string;

    const data = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });
    console.log(data);
    res.status(200).json({ message: "product found" });
  } catch (error) {
    console.log(error);
  }
}
