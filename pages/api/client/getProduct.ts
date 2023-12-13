import { prisma } from "@/utils/db";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET")
    return res.status(405).json({ message: "method not allowed" });

  try {
    const data = await prisma.product.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    console.log(data);
    res.status(200).json(data);
    if (data)
      return res.status(201).json({ message: "products fetched successful" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "internal server error" });
  }
}
