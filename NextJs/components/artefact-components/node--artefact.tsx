import artefactStyles from "/styles/artefact.css/artefact.module.scss";
import { Marked } from 'marked';

interface ArtefactProps{
    title:string,
    desc:string,
    rarity:string,
    attunement:boolean,
    type:string
}
const marked = new Marked();
function processCMSData(data: any): string {
    // Convert non-string data to string
    let convertedData: string;
    if (typeof data !== 'string') {
        try {
            // Assuming data is in JSON format
            convertedData = JSON.stringify(data);
        } catch (error) {
            console.error("Error converting data to string:", error);
            return ''; // Return empty string if conversion fails
        }
    } else {
        convertedData = data; // If data is already a string, use it directly
    }

    // Replace occurrences of "\\n" with "\n"
    return convertedData.replace(/\\n/g, '\n');
}



const Artefact = ({title,desc,rarity,attunement,type}:ArtefactProps) =>{

    const rarityColorStyle = (rarity) => {
        const rarities = ["common", "uncommon", "rare", "very rare", "legendary"];
        const colors = ["grey", "green", "blue", "purple", "orange"];
    
        const index = rarities.indexOf(rarity.toLowerCase());
    
        if (index !== -1) {
            const color = colors[index];
            return { color: color }; // Return an object with the 'color' property
        } else {
            // Handle case where rarity is not found
            return { color: 'black' }; // Default color if rarity is not found
        }
    }    
    const colorstyle = rarityColorStyle(rarity)
    
    return(
        <>
            <div className={artefactStyles.Header}>
                <h1 className={artefactStyles.Title}>{title}</h1>
            </div>
            <div className={artefactStyles.MainContainer}>
                <div className={artefactStyles.DescriptionContainer}>
                    <div className={artefactStyles.UnderTitle}>
                        <p>{type}, <span style={colorstyle}>{rarity}</span></p>
                    </div>
                    <div className={artefactStyles.Description}>
                    <div dangerouslySetInnerHTML={{ __html: marked.parse(processCMSData(desc))}}/>
                    </div>
                </div>
            </div>
        </>
    )
}




export default Artefact;