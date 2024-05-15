import Link from "next/link"
import raceStyles from "/styles/race.css/race.module.scss";



interface RaceCardProps{
    name:string,
    attribute_increases:any
    path:string,
}




export const RaceCard = ({name,path,attribute_increases}:RaceCardProps) =>{
    console.log(attribute_increases)
    return(
        <Link href={`/wiki/races${path}`} className={raceStyles.Card}>
            <h3 className={raceStyles.CardTitle}>{name}</h3>
            <div style={{borderBottom:"solid #822000 2px",paddingBottom:"1rem"}}>
                {attribute_increases.map((e)=>(e.map((f)=>(
                <p key={f.name} style={{textAlign:"left",paddingLeft:"1rem",paddingTop:"0.5rem"}}>
                    {f.name}: {f.amount}
                </p>
                ))))}
            </div>
        </Link>
    )
}















