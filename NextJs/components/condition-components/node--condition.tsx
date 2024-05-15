
import { Marked } from "marked";
import conditionstyle from "/styles/condition.css/condition.module.scss";
import { useState } from "react";


interface ConditionProps{
    items:any[]
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



export const Condition = ({items}:ConditionProps) =>{
    const [currentTitle, setCurrentTitle] = useState<string>("please select a condition below");
    const [currentDescription, setCurrentDescription] = useState<string>("");

    const handleClick = (title,description) =>{
        setCurrentTitle(title)
        setCurrentDescription(description)
    }

    return(
        <>
            <div className={conditionstyle.Container}>
                <div className={conditionstyle.ConditionExplanation}>
                    <h3 className={conditionstyle.Title}>{currentTitle}</h3>
                    <div dangerouslySetInnerHTML={{ __html: marked.parse(processCMSData(currentDescription))}}/>
                </div>
                <div className={conditionstyle.ConditionsHolder}>
                    {
                        items.map((e)=>(
                            <div key={e.title}
                            
                            className={conditionstyle.ImageHolder}
                            >
                                <img src={`https://nextjs.ddev.site/${e.field_condition_image.uri.url}`} alt="" className={`${conditionstyle.Image} ${currentTitle == e.title ? conditionstyle.Selected : conditionstyle.Image}`}
                                onClick={()=> handleClick(e.title, e.body.value)}
                                />
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

