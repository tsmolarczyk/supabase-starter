import "./App.css";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase.ts";
import { AddProductForm } from "./AddProductForm.tsx";

export type Product = {
  id: number;
  name: string;
  price: number;
};

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select("*").order("id");
    if (data) {
      setProducts(data);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id: number) => {
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (!error) {
      setProducts(products.filter((el) => el.id !== id));
    }
  };

  return (
    <>
      <AddProductForm onInsert={fetchProducts} product={editProduct} />
      {products.map((el) => {
        return (
          <div
            key={el.id}
            style={{
              display: "flex",
              gap: "5px",
              marginTop: "15px",
            }}
          >
            <p>{el.name}</p>
            <p>{el.price}</p>
            <button
              onClick={() => {
                setEditProduct(el);
                console.log(el);
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                handleDeleteProduct(el.id);
              }}
            >
              Delete
            </button>
          </div>
        );
      })}
    </>
  );
}

export default App;
