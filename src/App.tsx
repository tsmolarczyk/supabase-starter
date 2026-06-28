import "./App.css";
import { useEffect, useState } from "react";
import { supabase } from "./lib/supabase.ts";

type Product = {
  id: number;
  name: string;
  price: number;
};

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from("products").select("*");
      if (data) {
        setProducts(data);
      }
      console.log(data);
    };

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
      {products.map((el) => {
        return (
          <div
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
