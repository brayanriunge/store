import { NextApiRequest, NextApiResponse } from "next";
import { v2 as cloudinary } from "cloudinary";
import formidable from "formidable";
import { prisma } from "@/utilis/db";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const config = {
  api: {
    bodyParser: false,
  },
};

const getFormData = async (
  req: NextApiRequest
): Promise<{ fields: formidable.Fields; files: formidable.Files }> => {
  const options: formidable.Options = {};
  options.maxFileSize = 4000 * 1024 * 1024;
  const form = formidable(options);
  return new Promise<{ fields: formidable.Fields; files: formidable.Files }>(
    (resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) {
          reject(err);
        } else {
          const productFields = JSON.parse(fields.product[0]);
          resolve({ fields: productFields, files });
        }
      });
    }
  );
};
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(405).json({ message: "The method is not allowed" });
  try {
    //extracting fields and files from form data
    const { fields, files } = await getFormData(req);

    // Extract the uploaded file from the form data
    const myFile = files.picture as formidable.File[];
    const file = myFile[0];

    //uploading image to cloudinary
    const uploadImage = await cloudinary.uploader.upload(file.filepath);
    if (!uploadImage)
      return res.status(500).json({ message: "failed to upload image" });

    //extracting fields
    const { description, brand, name, quantity, price, category } = fields;

    //checking if any field is missing
    if (!description || !brand || !name || !quantity || !price || !category)
      return res.status(400).json({ message: "missing required fields" });

    //creating a new product
    const newProduct = await prisma.product.create({
      data: {
        brand: brand as unknown as string,
        category: category as unknown as string,
        description: description as unknown as string,
        imgUrl: uploadImage.secure_url,
        name: name as unknown as string,
        price: parseInt(price as unknown as string),
        quantity: parseInt(quantity as unknown as string),
      },
    });
    console.log(newProduct);
    if (!newProduct) {
      return res.status(401).json({ message: "Failed to created product" });
    } else {
      return res.status(200).json({ message: "Product created successfully" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Internal server error" });
  }
}
