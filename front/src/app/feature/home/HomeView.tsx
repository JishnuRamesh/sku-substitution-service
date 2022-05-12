import ENV from "@config/env.json";
import { Button } from "@mui/material";
import gifPath from "assets/gif-example.gif";
import jpgPath from "assets/jpg-example.jpg";
import svgPath from "assets/logo.svg";
import pngPath from "assets/png-example.png";
import { Link } from "react-router-dom";
import { CardsView } from "../cards/CardsView";

export function HomeView() {
  return (
    <div>
      <h1>Welcome to the HelloFresh React Template</h1>
      <h2>Environment Variables</h2>
      <p>{JSON.stringify(ENV)}</p>
      <h2>Routes</h2>
      <Link to="signin" style={{ textDecoration: "none" }}>
        <Button>Sign in</Button>
      </Link>
      <br />
      <br />
      <Link to="lorem" style={{ textDecoration: "none" }}>
        <Button>Other</Button>
      </Link>
      <br />
      <br />
      <h2>Components</h2>
      <CardsView />
      <br />
      <br />
      <h2>Images</h2>
      <section style={{ display: "flex", flexWrap: "wrap" }}>
        <img src={gifPath} height={300} width={550} alt="GIF Example" />
        <img src={pngPath} height={300} width={550} alt="PNG Example" />
        <img src={jpgPath} height={300} width={550} alt="JPG Example" />
        <img src={svgPath} height={300} width={550} alt="SVG Example" />
      </section>
    </div>
  );
}
