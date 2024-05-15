import monsterStyles from "/styles/monsters.css/monsters.module.scss";
import featStyles from "/styles/feat.css/feat.module.scss";
import { useState } from "react";



interface featProps{
    title:string,
    description:string,
    prerequisites:string,
    effect:string[]
}

export const Feat = ({title,description,prerequisites,effect} : featProps) =>{
    return(
        <>
            <div className={featStyles.MonsterSheet}>
            <div className={monsterStyles.MonsterSheetTopBar}></div>
                <div style={{padding:"1rem"}}>
                    <div className={monsterStyles.Header} >
                        <h2>{title}</h2>
                        { prerequisites != null  ? <h3 style={{paddingLeft:"0.5rem"}}>Requires: {prerequisites}</h3> : <></>}
                    </div>
                    <div style={{marginTop:"0.5rem"}} >
                        <p>{description}</p>
                        <span>{effect.map((e)=>(<p style={{paddingTop:"0.4rem"}} key={e}>{e}</p>))}</span>
                    </div>
                </div>
                <div className={monsterStyles.MonsterSheetBottomBar}></div>
            </div>
        </>
    )

}