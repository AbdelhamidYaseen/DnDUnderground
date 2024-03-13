import Link from "next/link"
import classStyles from "/styles/class.css/class.module.scss";

interface ClasscardProps{
    name:string,
    hitdie:string,
    primaryability:string[],
    saves:string[]
    description:string
    href:string,
}


export const ClassCard = (props:ClasscardProps) =>{
    const url = `/images/spells/${props.name.toLowerCase()}.png`;
    return(
        <>
            <Link className={classStyles.Card}  href={`/wiki/classes/${props.href}`}>
                <div className={classStyles.CardFront} style={{backgroundImage:`url(${url})`,backgroundPosition:"center"}}>

                </div>
                <div className={classStyles.CardBack} style={{border:"solid 1px black"}}>
                    <h3>{props.name}</h3>
                    <div className={classStyles.Description}>
                        {props.description}
                    </div>
                    <div className={classStyles.Info}>
                        <div >
                            <label className={classStyles.Label}>Hit Die</label>
                            <p className={classStyles.Data}>{props.hitdie}</p>
                        </div>
                        <div>
                            <label className={classStyles.Label}>Weapons</label>
                            <p className={classStyles.Data}>{props.primaryability.map((e)=>(<>|{e}</>))}|</p>
                        </div>
                        <div>
                            <label className={classStyles.Label}>Saves</label>
                            <p className={classStyles.Data}>{props.saves.map((e)=>(<>|{e}</>))}|</p>
                        </div>
                    </div>
                </div>

            </Link>
        </>
    )
} 