
interface ArtefactProps{
    title:string,
    desc:string,
    rarity:string,
    attunement:boolean,
    type:string
}


const Artefact = (props:ArtefactProps) =>{


    return(
        <>
            <ul>
                <li>{props.title}</li>
                <li>{props.desc}</li>
                <li>{props.rarity}</li>
                <li>{`${props.attunement}`}</li>
                <li>{props.type}</li>
            </ul>
        </>
    )
}




export default Artefact;