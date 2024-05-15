import exp from "constants";
import raceStyles from "/styles/race.css/race.module.scss";
import { Marked } from 'marked';
import { useState } from "react";

interface AttributeIncrease{
    name:any,
    amount:any
}

interface RaceProps {
    title:string,
    description:string,

    base_values:{
        age:string,
        alignment:string,
        movement:string,
        languages:string,
        size:string,
        vision:string,
        traits:string,
    }

    attribute_increases:AttributeIncrease[]
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


export const Race = ({title,description,base_values,attribute_increases}:RaceProps) =>{
    const [isClient, setIsClient] = useState(false)

    return (
        <>
            <div>
                <h2 className={raceStyles.Title}>{title}</h2>
                <div dangerouslySetInnerHTML={{__html:marked.parse(processCMSData(base_values.alignment))}} className={raceStyles.ParsedDescription}></div>
                <div dangerouslySetInnerHTML={{__html:marked.parse(processCMSData(base_values.languages))}} className={raceStyles.ParsedDescription}></div>
                <div dangerouslySetInnerHTML={{__html:marked.parse(processCMSData(base_values.size))}} className={raceStyles.ParsedDescription}></div>
                <div dangerouslySetInnerHTML={{__html:marked.parse(processCMSData(base_values.traits))}} className={raceStyles.ParsedDescription}></div>
                <div dangerouslySetInnerHTML={{__html:marked.parse(processCMSData(base_values.vision))}} className={raceStyles.ParsedDescription}></div>
                <div dangerouslySetInnerHTML={{__html:marked.parse(processCMSData(description))}} className={raceStyles.ParsedDescription}></div>
                <div dangerouslySetInnerHTML={{__html:marked.parse(processCMSData(base_values.traits))}} className={raceStyles.ParsedTraits}></div>
                <div style={{marginTop:"1rem"}}>
                    <h2 className={raceStyles.SubTitle}>Increased Attributes</h2>
                    {
                        attribute_increases.map((e)=>(
                        <div key={e.name.name} className={raceStyles.AttributeContainer}>
                            <span className={raceStyles.Attribute}>{e.name.name}:</span>
                            <span className={raceStyles.AttributeAmount}>{e.amount}</span>
                        </div>
                        ))
                    }
                </div>
            </div>
        </>
    )
}

