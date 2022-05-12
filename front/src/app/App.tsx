import { Route, Routes } from "react-router-dom";
import { HomeView } from "./feature/home/HomeView";
import { Layout } from "./layout/Layout";

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomeView />} />
        </Route>
      </Routes>
    </>
  );
}
