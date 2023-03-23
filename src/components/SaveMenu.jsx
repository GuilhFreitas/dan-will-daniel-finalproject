import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';

let decks = ["None"];
// function sends POST request to AnkiConnect
async function invoke(action, version, params = {}) {
    const response = await fetch('http://127.0.0.1:8765', {
        method: "POST",
        mode: "cors",
        cache: "no-cache",
        credentials: "same-origin",
        body: JSON.stringify({ action, version, params }),

    })
        return response.json();
    
};

export default function SaveMenu({
    correctAnswer,
    question
}) {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [ankiState, setAnkiState] = React.useState({
        decks: decks,
        deck: "none",
    });
    // React.useEffect(() => {

    //   }, [ankiState.decks, ankiState.models]);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleDeckChange = (event) => {
        setAnkiState({...ankiState, deck: event.target.value});
    };
    const handleClickTxt = () => {
        const FileSaver = require('file-saver');
        const blob = new Blob([`${question};${correctAnswer}`], {type: "text/plain;charset=utf-8"});
    
        function saveCard(){
            FileSaver.saveAs(blob, "cards.txt");
        };

        saveCard();
    };
    const handleClickAnki = async function () {
        await invoke('requestPermission', 6);
        await invoke('createModel', 6, {
            "modelName" : "Quiz Time Trivia",
            "inOrderFields" : ["Front", "Back"],
            "cardTemplates" : [{
                "Front": "{{Front}}",
                "Back": "{{FrontSide}}<hr id=answer>{{Back}}"
            }]
        })
        decks = await invoke('deckNames', 6).then(data => data.result);

    }

    const handleAnkiExport = async function() {
        console.log("handleAnkiExport");
        await invoke('addNote', 6, {
            "note" : {
                "deckName" : ankiState.deck,
                "modelName" : "Quiz Time Trivia",
                "fields" : {
                    "Front" : question,
                    "Back" : correctAnswer
                },
                "options": {
                    "allowDuplicate": false,
                    "duplicateScope": "deck",
                    "duplicateScopeOptions": {
                        "deckName": ankiState.deck,
                        "checkChildren": false,
                        "checkAllModels": false
                    }
                },
                "tags": [
                    "quiz-time"
                ]

            }
        });
    }

    console.log(correctAnswer);
    console.log(question);

    return (
        <div>
            <Button
                id="save-button"
                aria-controls={open ? 'save-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                💾
            </Button>
            <Menu 
                PaperProps={{  
                    style: {  
                      width: 300,  
                    },  
                 }}
                id="save-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'save-button',
                }}
            >
                <MenuItem onClick={handleClickTxt}>Save as txt file</MenuItem>
                <MenuItem onClick={handleClickAnki}>
                    <Accordion sx={{
                        width: 250
                    }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            Save to Anki
                        </AccordionSummary>
                        <AccordionDetails>
                            <FormControl sx={{width:150}}>
                                <InputLabel id="deck-label">Deck</InputLabel>
                                <Select
                                    labelId="deck-label"
                                    id="deck"
                                    value={ankiState.deck}
                                    label="deck"
                                    onChange={handleDeckChange}
                                >
                                    {decks.map((deck, i) => (
                                        <MenuItem value={deck} key={i}>{deck}</MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                            <Button variant="outlined" onClick={handleAnkiExport}>Save</Button>
                        </AccordionDetails>
                    </Accordion>
                </MenuItem>
            </Menu>
        </div>
    );
}