const API_KEY = "2";

export const fetchInitialArtists = async () => {
    const list = ["Daft Punk", "Justice", "Kavinsky", "Rihanna", "Coldplay", "Muse", "Drake", "The Weeknd"];

    try {
        const promises = list.map(name =>
            fetch(`https://www.theaudiodb.com/api/v1/json/${API_KEY}/search.php?s=${encodeURIComponent(name)}`)
                .then(res => {
                    if (!res.ok) throw new Error("Problème réseau");
                    return res.json();
                })
        );

        const results = await Promise.all(promises);
        return results
            .map(d => d.artists ? d.artists[0] : null)
            .filter(a => a !== null);
    } catch (error) {
        console.error("Erreur API :", error);
        return [];
    }
};