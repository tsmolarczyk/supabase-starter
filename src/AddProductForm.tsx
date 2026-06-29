import { type FormEvent, useEffect, useState } from "react";
import styles from "./AddProductForm.module.css";
import { supabase } from "./lib/supabase.ts";
import type { Product } from "./App.tsx";

type AddProductFormProps = {
  onInsert: () => void;
  product?: Product | null;
};

export function AddProductForm({ onInsert, product }: AddProductFormProps) {
  const [form, setForm] = useState({ name: "", price: 0 });

  useEffect(() => {
    if (product) {
      // TODO:
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setForm({ name: product.name, price: product.price });
    }
  }, [product]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (product) {
      const { error } = await supabase
        .from("products")
        .update({ ...form })
        .eq("id", product.id);
      if (!error) {
        onInsert();
      }
      return;
    }

    const { error } = await supabase.from("products").insert({ ...form });

    if (!error) {
      onInsert();
    }
    setForm({ name: "", price: 0 });
  };

  return (
    <div>
      <h1>Add new product</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name:</label>
        <input
          className={styles.input}
          type={"text"}
          id="name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id={"price"}
          value={form.price}
          onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
        />
        <button type="submit">Add new product</button>
      </form>
    </div>
  );
}
