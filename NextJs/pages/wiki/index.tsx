/*
  * Wiki page
  * Contains guides for the subparts of every the wiki (small introductions)
*/
import wikiSyles from "/styles/wiki.css/wiki.module.scss";



const Page = () =>{

    return(
        <div className={wikiSyles.Container}>
            <h1>
                Wiki
            </h1>
            <ul className={wikiSyles.InnerContainer}>
                <a href="wiki/artefacts" className={wikiSyles.Unit}>Artefacts</a>
                <a href="wiki/classes" className={wikiSyles.Unit}>Classes</a>
                <a href="wiki/conditions" className={wikiSyles.Unit}>Conditions</a>
                <a href="wiki/feats" className={wikiSyles.Unit}>Feats</a>
                <a href="wiki/monsters" className={wikiSyles.Unit}>Monsters</a>
                <a href="wiki/races" className={wikiSyles.Unit}>Races</a>
                <a href="wiki/spells"className={wikiSyles.Unit}>Spells</a>
            </ul>
        </div>
    )
}

export default Page;