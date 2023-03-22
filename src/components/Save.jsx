import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

// function sents POST request to AnkiConnect
async function invoke(action, version, params = {}) {
    const response = await fetch('http://127.0.0.1:8765', {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        body: JSON.stringify({ action, version, params }),

    });
    return response.json();
};

function SaveMenu(props) {

}

// defines the dialog box
function SaveDialog(props) {

    // const { onClose, selectedValue, open } = props;

    // const handleClose = () => {
    //     onClose(selectedValue);
    // };

    // const handleListItemClick = (value) => {
    //     onClose(value);
    // };

    // return (
    //     <Dialog
    //         fullWidth
    //         maxWidth="xs"
    //         onClose={handleClose}
    //         open={open}
    //     >
    //         <DialogContent
    //             style={{height:'200px'}}
    //         >
    //             <DialogTitle>Set backup account</DialogTitle>
    //             <List sx={{ pt: 0 }}>
    //                 {emails.map((email) => (
    //                     <ListItem disableGutters>
    //                         <ListItemButton onClick={() => handleListItemClick(email)} key={email}>
    //                             <ListItemAvatar>
    //                                 <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
    //                                     <PersonIcon />
    //                                 </Avatar>
    //                             </ListItemAvatar>
    //                             <ListItemText primary={email} />
    //                         </ListItemButton>
    //                     </ListItem>
    //                 ))}

    //                 <ListItem disableGutters>
    //                     <ListItemButton
    //                         autoFocus
    //                         onClick={() => handleListItemClick('addAccount')}
    //                     >
    //                         <ListItemAvatar>
    //                             <Avatar>
    //                                 <AddIcon />
    //                             </Avatar>
    //                         </ListItemAvatar>
    //                         <ListItemText primary="Add account" />
    //                     </ListItemButton>
    //                 </ListItem>
    //             </List>
    //         </DialogContent>

    //     </Dialog>
    // );

    const { onClose, open } = props;

    const handleClose = () => {
        onClose();
    };

    const handleListItemClick = (value) => {
        // placeholder for txt file save
        if (value === "txt"){
            return
        }else if (value === "anki"){
            invoke()
        }
    };

    return (
        <Dialog
            fullWidth
            maxWidth="xs"
            onClose={handleClose}
            open={open}>
            <DialogContent
            >
                <List sx={{ pt: 0 }}>
                    <ListItem disableGutters>
                        <ListItemButton onClick={() => handleListItemClick("txt")}>
                            <ListItemText primary="Save as txt file" />
                        </ListItemButton>
                    </ListItem>

                    <ListItem disableGutters>
                        <ListItemButton onClick={() => handleListItemClick("anki")}>
                            <ListItemText primary="Save with AnkiConnect" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </DialogContent>

        </Dialog>
    );
}

// sets data type for function above
SaveDialog.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,

};

export default function Save(props) {

    // button style
    const styles = {
        backgroundColor: "red",
        height: "50px",
        width: "50px",
        borderRadius: "50%",
        alignSelf: "flex-end",
        textAlign: "center"
    }

    // functions for dialog box
    const [open, setOpen] = React.useState(false);
    // const [selectedValue, setSelectedValue] = React.useState(emails[1]);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        // setSelectedValue(value);
    };


    async function saveCard() {

        await invoke('requestPermission', 6);
        await invoke('addNote', 6, { deck: 'test1' });
        const result = await invoke('deckNames', 6);
        console.log(`got list of decks: ${result}`);
    }


    return (
        <div>
            <Button style={styles} onClick={handleClickOpen}>
                💾
            </Button>
            <SaveDialog
                open={open}
                onClose={handleClose}
            />
        </div>
    )
}
