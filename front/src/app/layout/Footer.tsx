import { Link } from "@mui/material";

export function Footer() {
  return (
    <footer
      style={{
        position: "relative",
        bottom: 0,
        textAlign: "center",
        padding: "10px 0px",
      }}
    >
      <div>
        <Link
          href="https://www.hellofresh.com.au/my-account/deliveries/menu/"
          component="button"
          variant="body2"
        >
          VIEW YOUR RECIPES HERE
        </Link>
      </div>
      <div>
        <small>&copy; 2022 HelloFresh</small>
      </div>
    </footer>
  );
}
