import { ProductsData } from "@/components/Products"
import { useState } from "react"

export default async function productSpecific(){
    const [item, setItem]= useState<ProductsData>()
    const response = await fetch(`http://localhost:3000/api/${slug}`)
    
}