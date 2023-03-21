// import { saveAs } from 'file-saver';

export default function Save(props){
    const styles = {
        backgroundColor: "red",
        height: "50px",
        width: "50px",
        borderRadius: "50%",
        alignSelf: "flex-end",
        textAlign: "center"
    }

    const FileSaver = require('file-saver');
    const blob = new Blob(["Hello, world!"], {type: "text/plain;charset=utf-8"});

    function saveCard(){
        FileSaver.saveAs(blob, "cards.txt");
    }


    return(
        <button style={styles} onClick={saveCard}>
            💾
        </button>
    )
}
