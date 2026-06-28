import "./App.css";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase.ts";
import { AddProductForm } from "./AddProductForm.tsx";

type Product = {
  id: number;
  name: string;
  price: number;
};

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const fetchProducts = async () => {
    const { data } = await supabase.from("products").select("*");
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
      <AddProductForm onInsert={fetchProducts} />
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
