import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import * as React from "react";

const RecipeSwapOptions: React.FC<{
  options: string[];
  onChange: (selection: string) => void;
}> = (props) => {
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="none"
        name="radio-buttons-group"
        onChange={(e) => {
          console.log(e.target.value);
          props.onChange(e.target.value);
        }}
      >
        {props.options.map((option, index) => {
          return (
            <FormControlLabel
              key={`SwapOption-${index}`}
              value={option}
              control={<Radio />}
              label={option}
            />
          );
        })}
        <FormControlLabel
          key={`SwapOption-${props.options.length}`}
          value="none"
          control={<Radio />}
          label="No Preference"
        />
      </RadioGroup>
    </FormControl>
  );
};

type RecipeSwapCardProps = {
  recipe_name: string;
  actual_ingredient: string;
  swap_options: string[];
  onChange: (selection: string) => void;
};
export const RecipeSwapCard: React.FC<RecipeSwapCardProps> = (props) => {
  return (
    <Card sx={{ maxWidth: 345 }} style={{ margin: "auto" }}>
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
        <div>
          <RecipeSwapOptions
            options={props.swap_options}
            onChange={props.onChange}
          />
        </div>
      </CardContent>
    </Card>
  );
};
