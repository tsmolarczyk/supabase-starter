import { type FormEvent, useState } from "react";
import styles from "./AddProductForm.module.css";
import { supabase } from "./lib/supabase.ts";

type AddProductFormProps = {
  onInsert: () => void;
};

export function AddProductForm({ onInsert }: AddProductFormProps) {
  const [form, setForm] = useState({ name: "", price: 0 });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

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
