import "../../../styles/watchlist/watchlistForm.scss";
import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

type FormProps = {
  onCreateClicked: Function;
};

function CreationForm({ onCreateClicked }: FormProps) {
  const [name, setName] = useState("");
  const onCreate = () => {
    if (name.trim()) onCreateClicked(name);
    setName("");
  };
  return (
    <div className="watchlist-form">
      <TextField
        id="standard-basic"
        label="Episode to watch"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <Button onClick={onCreate} variant="contained" color="primary">
        Add
      </Button>
    </div>
  );
}

export default CreationForm;
