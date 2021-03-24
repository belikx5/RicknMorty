import "../../../styles/watchlist/watchlistItem.scss";
import React from "react";
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";
import Checkbox from "@material-ui/core/Checkbox";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { EpisodeToWatch } from "../../../store/actionTypes/watchlistActionTypes";

type ItemProps = {
  watchlistItem: EpisodeToWatch;
  onWatchedClicked: Function;
  onRemoveClicked: Function;
};

function WatchlistItem({
  watchlistItem,
  onWatchedClicked,
  onRemoveClicked,
}: ItemProps) {
  const cutName = () => {
    const name = watchlistItem.name;
    if (name.length > 50) return name.slice(0, 48) + "...";
    return name;
  };
  return (
    <div className="watchlist-item">
      <Card variant="outlined">
        <CardContent className="watchlist-item-data">
          <Checkbox
            checked={watchlistItem.isWatched}
            onChange={() =>
              onWatchedClicked(watchlistItem.id, !watchlistItem.isWatched)
            }
            color="primary"
            inputProps={{ "aria-label": "secondary checkbox" }}
          />
          <Typography className="watchlist-item-name">{cutName()}</Typography>
          <Button
            onClick={() => onRemoveClicked(watchlistItem.id)}
            variant="contained"
            color="secondary"
            size="small"
            startIcon={<DeleteIcon />}>
            Remove
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default WatchlistItem;
