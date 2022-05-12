import DoneIcon from "@mui/icons-material/Done";
import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import * as React from "react";

const RenderSwapOptions: React.FC<{ options: string[] }> = (props) => {
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="none"
        name="radio-buttons-group"
      >
        {props.options.map((option, index) => {
          return (
            <FormControlLabel
              value={option}
              control={<Radio />}
              label={option}
            />
          );
        })}
        <FormControlLabel
          value="none"
          control={<Radio />}
          label="No Preference"
        />
      </RadioGroup>
    </FormControl>
  );
};

type RecipeSwapProps = {
  recipe_name: string;
  actual_ingredient: string;
  swap_options: string[];
};
export const RecipeSwapCard: React.FC<RecipeSwapProps> = (props) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        component="img"
        height="194"
        image="https://be.nxt.to/e91939f0-2f79-4f62-9c84-6359bca5b4cd/8ed2f196-65c9-4b83-94db-176e22508679"
        alt="Recipe Image"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.recipe_name}
        </Typography>
        <Typography gutterBottom variant="subtitle2" component="div">
          Available Options
        </Typography>
        <div>{RenderSwapOptions({ options: props.swap_options })}</div>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="save swaps" style={{ marginLeft: "auto" }}>
          <DoneIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
