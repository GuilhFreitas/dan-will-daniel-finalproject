export default function Save(props){
    const styles = {
        backgroundColor: "red",
        height: "50px",
        width: "50px",
        borderRadius: "50%",
        alignSelf: "flex-end",
        textAlign: "center"
    }

    async function saveCard(){
        async function invoke(action, version, params={}) {
            const response = await fetch ('http://127.0.0.1:8765', {
                method: "POST",
                mode: "cors",
                cache: "no-cache",
                credentials: "same-origin",
                body: JSON.stringify({action, version, params}),

            });
            return response.json();
            };
        
        await invoke ('requestPermission', 6);
        await invoke('createDeck', 6, {deck: 'test1'});
        const result = await invoke('deckNames', 6);
        console.log(`got list of decks: ${result}`);
    }


    return(
        <button style={styles} onClick={saveCard}>
            💾
        </button>
    )
}
