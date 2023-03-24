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
import SaveAsIcon from '@mui/icons-material/SaveAs';
import { cyan } from '@mui/material/colors';

// initialize decks variable
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

// the component function
export default function Save({
    correctAnswer,
    question
}) {
    // state for MateriaUI menu
    const [anchorEl, setAnchorEl] = React.useState(null);

    // AnkiConnect related state
    const [ankiState, setAnkiState] = React.useState({
        decks: decks,
        deck: "none",
    });

    const open = Boolean(anchorEl);

    // opens Menu
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // closes Menu
    const handleClose = () => {
        setAnchorEl(null);
    };

    // changes the deck variable in state from the Select component
    const handleDeckChange = (event) => {

        event.stopPropagation();
        setAnkiState({...ankiState, deck: event.target.value});
    };

    // handles saving the question answer pair to a txt file
    const handleClickTxt = () => {
        const FileSaver = require('file-saver');
        const blob = new Blob([`${question};${correctAnswer}`], {type: "text/plain;charset=utf-8"});
    
        function saveCard(){
            FileSaver.saveAs(blob, "cards.txt");
        };

        saveCard();
    };
    
    // handles initial AnkiConnect requests
    const handleClickAnki = async function () {

        // permission to connect
        await invoke('requestPermission', 6);

        // creates the model for trivia cards
        await invoke('createModel', 6, {
            "modelName" : "Quiz Time Trivia",
            "inOrderFields" : ["Front", "Back"],
            "cardTemplates" : [{
                "Front": "{{Front}}",
                "Back": "{{FrontSide}}<hr id=answer>{{Back}}"
            }]
        })

        // gets the user's decks and saves to variable
        decks = await invoke('deckNames', 6).then(data => data.result);

        // sets the deck state to the first deck in the array; this re-renders the Select component
        setAnkiState({...ankiState, deck: decks[0]});
        
    }

    // handles exporting a note to Anki
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

    // the component
    return (
        <div>
            <Button
                id="save-button"
                aria-controls={open ? 'save-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <SaveAsIcon sx={{ fontSize: 25, color: cyan[500]}}/>
                
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
                    <Accordion 
                        sx={{
                            width: 250
                            }}
                        className={"anki"}
                    >
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
                                    onClick={event => event.stopPropagation()}
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