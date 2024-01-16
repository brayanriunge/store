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
    const { id } = req.query;

    const data = await prisma.product.findUnique({
      where: {
        id: id as string,
      },
    });
    console.log(data);
    res.status(200).json({ message: "product found" });
  } catch (error) {
    console.log(error);
  }
}
