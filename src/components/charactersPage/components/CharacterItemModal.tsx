import React from "react";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import MuiDialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { Close } from "@material-ui/icons";
import {
  createStyles,
  Theme,
  withStyles,
  WithStyles,
} from "@material-ui/core/styles";
import { Character } from "../../../store/actionTypes/charactersActionTypes";

import CharacterDetails from "./CharacterDetails";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

interface DialogTitleProps extends WithStyles<typeof styles> {
  id: string;
  children: React.ReactNode;
  onClose: () => void;
}
const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}>
          <Close />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme: Theme) => ({
    root: {
      padding: 0,
    },
  }))(MuiDialogContent);
  

type ItemModalProps = {
  character: Character | null;
  modalOpen: boolean;
  closeModal: any;
};
function CharacterItemModal({
  modalOpen,
  closeModal,
  character,
}: ItemModalProps) {
    
  return (
    <Dialog
      onClose={closeModal}
      aria-labelledby="customized-dialog-title"
      open={modalOpen}>
      <DialogTitle id="customized-dialog-title" onClose={closeModal}>
        Character's info
      </DialogTitle>
      <DialogContent dividers>
        {<CharacterDetails character={character} />}
      </DialogContent>
    </Dialog>
  );
}

export default CharacterItemModal;
