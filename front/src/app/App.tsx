import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { HomeView } from "./feature/home/HomeView";
import { Layout } from "./layout/Layout";

export type SelectedOption = {
  recipe_name: string;
  actual_ingredient: string;
  substituted_ingredient: string;
  order_status: string;
};

export type SelectedOptions = Record<string, SelectedOption>;

export default function App() {
  const [isDone, setIsDone] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({});

  return (
    <>
      <Routes>
        <Route element={<Layout onDoneAll={() => setIsDone(true)} />}>
          <Route
            path="/"
            element={
              <HomeView
                isDone={isDone}
                onSelected={(options) => setSelectedOptions(options)}
                selectedOptions={selectedOptions}
              />
            }
          />
        </Route>
      </Routes>
    </>
  );
}
