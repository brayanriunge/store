export default function Products() {
  const fetchProducts = async () => {
    const res = fetch("http://localhost:3000/api/client/getProducts");
    const data = (await res).json();
    console.log(data);
  };
  return <div>products</div>;
}
