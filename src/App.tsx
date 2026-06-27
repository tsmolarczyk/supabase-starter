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

  return (
    <>
      {products.map((el) => {
        return (
          <div>
            <h1>{el.name}</h1>;<p>{el.price}</p>;
          </div>
        );
      })}
    </>
  );
}

export default App;
