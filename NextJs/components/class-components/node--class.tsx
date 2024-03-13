import exp from "constants";
import classStyles from "/styles/class.css/class.module.scss";
import { Table } from "./subcomponents/component--class-table";
import { Marked } from 'marked';
import { useState } from "react";


interface ClassProps{
    name: string,
    desc: string,
    equipment:string

    base_values:{
        hitpoints:{
            hit_dice: string,
            hp_at_1st_level: string,
            hp_at_higher_levels: string
        },
        proficiencies:{
            prof_armor: string[],
            prof_weapons: string[],
            prof_tools: string[],
            prof_saving_throws: string[],
            prof_skills: string
        }    
    }
    
    tabledata:any[]

    features:string
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


export const Class = (props : ClassProps) =>{
    //console.log(props.equipment)
    const [isClient, setIsClient] = useState(false)

    return (
        <>
        <div className={classStyles.BaseInfo}>
            <h2 className={classStyles.SubTitle}>{props.name}</h2>
            <p>As a {props.name}, you gain the following stats.</p>
            <div>
                <h3 className={classStyles.ThirdTitle}>Hit Points:</h3>
                <div className={classStyles.DataText}>
                <div>
                    <span className={classStyles.Label}>Hit Dice:</span>
                    <span className={classStyles.Data}>{props.base_values.hitpoints.hit_dice}</span>
                </div>
                <div>
                    <span className={classStyles.Label}>Hit points at 1st level:</span>
                    <span className={classStyles.Data}>{props.base_values.hitpoints.hp_at_1st_level}</span>
                </div>
                <div>
                    <span className={classStyles.Label}>Hit points at higher levels:</span>
                    <span className={classStyles.Data}>{props.base_values.hitpoints.hp_at_higher_levels}</span>
                </div>

                </div>
            </div>
            <div>
                <h3 className={classStyles.ThirdTitle}>Proficiencies:</h3>
                <div className={classStyles.DataText}>
                    <div>
                        <span className={classStyles.Label}>Armor:</span>
                        <span className={classStyles.Data}>{props.base_values.proficiencies.prof_armor.map((e)=>(<>| {e} </>))}|</span>
                    </div>
                    <div>
                        <span className={classStyles.Label}>Weapons:</span>
                        <span className={classStyles.Data}>{props.base_values.proficiencies.prof_weapons.map((e)=>(<>| {e} </>))}|</span>
                    </div>
                    <div>
                        <span className={classStyles.Label}>Tools:</span>
                        <span className={classStyles.Data}>
                            {
                            props.base_values.proficiencies.prof_tools.length != 0 ? <>{props.base_values.proficiencies.prof_tools.map((e)=>(<>| {e} </>))}|</> : <>You gain no proficiencies</> 
                            }
                        </span>
                    </div>
                    <div>
                        <span className={classStyles.Label}>Saving Throws:</span>
                        <span className={classStyles.Data}>{props.base_values.proficiencies.prof_saving_throws.map((e)=>(<>| {e} </>))}|</span>
                    </div>
                    <div>
                        <span className={classStyles.Label}>Skills:</span>
                        <span className={classStyles.Data}>{props.base_values.proficiencies.prof_skills}</span>
                    </div>
                </div>
            </div>
            <div>
                <h3 className={classStyles.ThirdTitle}>Equipment:</h3>
                <div className={classStyles.DataText}>
                    <div dangerouslySetInnerHTML={{ __html: marked.parse(processCMSData(props.equipment))}}/>
                </div>
            </div>
        </div>

        <div className={classStyles.ClassTable}>
            <h2 className={classStyles.SubTitle}>The {props.name} Table</h2>
            <Table 
                tablehead={props.tabledata[0].slice(0, -1)} 
                tablerow={props.tabledata.slice(1)}
            />
        </div>

        <div className={classStyles.ClassFeatures}>
            <h2 className={classStyles.SubTitle}>Class Features</h2>
            <div className={classStyles.HitPoints}>

            </div>
            <div className={classStyles.Proficiencies}>

            </div>
            <div className={classStyles.Equipment}>

            </div>
            <div dangerouslySetInnerHTML={{ __html: marked.parse(processCMSData(props.features))}} className={classStyles.Abilities}/>
        </div>

        </>
    )
}

