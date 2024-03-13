/*
  * Spells page
  * Renders all spell nodes
  * Contains filter, sort functions
  * Requires getStaticProps to run && the endpoint to exist
*/



import { Layout } from "components/layout";
import { drupal } from "lib/drupal";
import { GetStaticPropsResult } from "next";
import { DrupalNode, DrupalTaxonomyTerm } from "next-drupal";
import Head from "next/head";
import base from "/styles/layout.css/layout.module.scss";
import tableStyles from "/styles/spells.css/spelltable.module.scss";
import { useState } from "react";
import Link from "next/link";

//Interface for object received from DRUPAL GET
interface IndexPageProps {
  nodes: DrupalNode[];
}
//Custom Component for 1 row of data
interface SpellRowProps {
  level: string;
  name: string;
  school: string;
  duration: string;
  castingTime: string;
  concentration: boolean;
  ritual: boolean;
  components: any[];
  path:string
}

const SpellRow = (props: SpellRowProps) => {
  //Custom Function to return innter items of components and format them.
  const returnShorterComponents = (e:string) =>{
    let component : string = "";
    if(e){
      component = e[0].toUpperCase();
      return component;
    }
    return e;
  }
  return (
    <Link href={`/wiki/spells${props.path}`}className={tableStyles.TableRow}>
      <div className={tableStyles.TableRowData}>{props.level}</div>
      <div className={tableStyles.TableRowData}><>{props.name}</></div>
      <div className={tableStyles.TableRowData}>{props.school}</div>
      <div className={`${tableStyles.TableRowData} ${tableStyles.CastTime}`}>{props.duration}</div>
      <div className={`${tableStyles.TableRowData} ${tableStyles.Duration}`}>{props.castingTime}</div>
      <div className={`${tableStyles.TableRowData} ${tableStyles.Components}`} >
        {props.components.map((e) => (
          <>{returnShorterComponents(e.name)}</>
        ))}
      </div>
    </Link>
  );
};

//Main Page
export default function IndexPage({ nodes }: IndexPageProps) {
  //UseState for filters & sorts  
  const [sort, setSort] = useState("level");
    
    const [searchOpen, setSearchOpen] = useState(true);
    const [filterName, setFilterName] = useState<string>("");
    const [filterLevel, setFilterLevel] = useState<string>("");
    const [filterTags, setFilterTags] = useState<string>("");

    const [allSpells, setAllSpells] = useState(true);
    const [artificer, setArtificer] = useState(false);
    const [bard, setBard] = useState(false);
    const [cleric, setCleric] = useState(false);
    const [druid, setDruid] = useState(false);
    const [paladin, setPaladin] = useState(false);
    const [ranger, setRanger] = useState(false);
    const [sorcerer, setSorcerer] = useState(false);
    const [warlock, setWarlock] = useState(false);
    const [wizard, setWizard] = useState(false);

    const setAllSpellsInversion = () => {
      if (allSpells === true) {
        setAllSpells(!allSpells);

        setArtificer(true);
        setBard(true);
        setCleric(true);
        setDruid(true);
        setPaladin(true);
        setRanger(true);
        setSorcerer(true);
        setWarlock(true);
        setWizard(true);
      } 
      else if(allSpells === false) {
        setAllSpells(!allSpells);

        setArtificer(false);
        setBard(false);
        setCleric(false);
        setDruid(false);
        setPaladin(false);
        setRanger(false);
        setSorcerer(false);
        setWarlock(false);
        setWizard(false);
        }    
    }

    //Url for filters
    const artficerUrl = "/images/spells/artificer.jpg"
    const bardrUrl = "/images/spells/bard.png"
    const clericrUrl = "/images/spells/cleric.png"
    const druidUrl = "/images/spells/druid.png"
    const paladinUrl = "/images/spells/paladin.png"
    const rangerUrl = "/images/spells/ranger.png"
    const sorcererUrl = "/images/spells/sorcerer.png"
    const warlockUrl = "/images/spells/warlock.png"
    const wizardUrl = "/images/spells/wizard.png"

    //Filters out the unique values from casting_time & duration an makes a new array from them
    const uniqueValues = Array.from(new Set([
      ...nodes.map(node => node.field_casting_time),
      ...nodes.map(node => node.field_duration)
    ]));

    //Sorts the local array (nodes) depending on the current useState
    nodes.sort((val1, val2) => {
      if (sort === "level") {
        return val1.field_level - val2.field_level;
      }
      if (sort === "name") {
        return val1.title.localeCompare(val2.title);
      }
    });

    return (
      <Layout>
        <Head>
          {/*This contains specific data that needs to be added to the HEAD*/ }
          <title>The Spellbook</title>
          <meta
            name="description"
            content="An overview of all spells."
          />
        </Head>
        <div style={{ padding: "1rem" }}>


        <div className={base.pageheadercontainer}>
                    <h1 className={base.pageheader} >Spells</h1>
                    <hr style={{border:"solid darkblue 2px",marginLeft:"auto",marginRight:"auto", width:"85%"}}/>
        </div>        
          
          <div className={`${tableStyles.Search} ${searchOpen ? tableStyles.Search : tableStyles.SmallerSearch}`}>
            
            <div className={`${tableStyles.Classes} ${searchOpen ? tableStyles.Classes : tableStyles.HiddenMenu}`}>
              <div className={tableStyles.ClassDiv}>
                <div className={`${tableStyles.ClassSearch} ${searchOpen ? tableStyles.ClassSearch : tableStyles.HiddenMenu}`} style={{backgroundImage:`url(${artficerUrl})`,backgroundPosition:"center",backgroundSize:"cover",filter : artificer ? "blur(0px)" : "blur(1px)",border : artificer ? "green 3px solid" : "black 2px solid"}} onClick={() => setArtificer(prevState => !prevState)}></div>
                <p>Artificer</p>
              </div>
              <div className={tableStyles.ClassDiv}>
                <div className={`${tableStyles.ClassSearch} ${searchOpen ? tableStyles.ClassSearch : tableStyles.HiddenMenu}`} style={{backgroundImage:`url(${bardrUrl})`,backgroundPosition:"center",backgroundSize:"cover",filter : bard ? "blur(0px)" : "blur(1px)",border : bard ? "green 3px solid" : "black 2px solid"}} onClick={() => setBard(prevState => !prevState)}></div>
                <p>Bard</p>
              </div>
              <div className={tableStyles.ClassDiv}>
                <div className={`${tableStyles.ClassSearch} ${searchOpen ? tableStyles.ClassSearch : tableStyles.HiddenMenu}`} style={{backgroundImage:`url(${clericrUrl})`,backgroundPosition:"center",backgroundSize:"cover",filter : cleric ? "blur(0px)" : "blur(1px)",border : cleric ? "green 3px solid" : "black 2px solid"}} onClick={() => setCleric(prevState => !prevState)}></div>
                <p>Cleric</p>
              </div>
              <div className={tableStyles.ClassDiv}>
                <div className={`${tableStyles.ClassSearch} ${searchOpen ? tableStyles.ClassSearch : tableStyles.HiddenMenu}`} style={{backgroundImage:`url(${druidUrl})`,backgroundPosition:"center",backgroundSize:"cover",filter : druid ? "blur(0px)" : "blur(1px)",border : druid ? "green 3px solid" : "black 2px solid"}} onClick={() => setDruid(prevState => !prevState)}></div>
                <p>Druid</p>
              </div>
              <div className={tableStyles.ClassDiv}>
                <div className={`${tableStyles.ClassSearch} ${searchOpen ? tableStyles.ClassSearch : tableStyles.HiddenMenu}`} style={{backgroundImage:`url(${paladinUrl})`,backgroundPosition:"center",backgroundSize:"cover",filter : paladin ? "blur(0px)" : "blur(1px)",border : paladin ? "green 3px solid" : "black 2px solid"}} onClick={() => setPaladin(prevState => !prevState)}></div>
                <p>Paladin</p>
              </div>
              <div className={tableStyles.ClassDiv}>
                <div className={`${tableStyles.ClassSearch} ${searchOpen ? tableStyles.ClassSearch : tableStyles.HiddenMenu}`} style={{backgroundImage:`url(${rangerUrl})`,backgroundPosition:"center",backgroundSize:"cover",filter : ranger ? "blur(0px)" : "blur(1px)",border : ranger ? "green 3px solid" : "black 2px solid"}} onClick={() => setRanger(prevState => !prevState)}></div>
                <p>Ranger</p>
              </div>
              <div className={tableStyles.ClassDiv}>
                <div className={`${tableStyles.ClassSearch} ${searchOpen ? tableStyles.ClassSearch : tableStyles.HiddenMenu}`} style={{backgroundImage:`url(${sorcererUrl})`,backgroundPosition:"center",backgroundSize:"cover",filter : sorcerer ? "blur(0px)" : "blur(1px)",border : sorcerer ? "green 3px solid" : "black 2px solid"}} onClick={() => setSorcerer(prevState => !prevState)}></div>
                <p>Sorcerer</p>
              </div>
              <div className={tableStyles.ClassDiv}>
                <div className={`${tableStyles.ClassSearch} ${searchOpen ? tableStyles.ClassSearch : tableStyles.HiddenMenu}`} style={{backgroundImage:`url(${warlockUrl})`,backgroundPosition:"center",backgroundSize:"cover",filter : warlock ? "blur(0px)" : "blur(1px)",border : warlock ? "green 3px solid" : "black 2px solid"}} onClick={() => setWarlock(prevState => !prevState)}></div>
                <p>Warlock</p>
              </div>
              <div className={tableStyles.ClassDiv}>
                <div className={`${tableStyles.ClassSearch} ${searchOpen ? tableStyles.ClassSearch : tableStyles.HiddenMenu}`} style={{backgroundImage:`url(${wizardUrl})`,backgroundPosition:"center",backgroundSize:"cover",filter : wizard ? "blur(0px)" : "blur(1px)",border : wizard ? "green 3px solid" : "black 2px solid"}} onClick={() => setWizard(prevState => !prevState)}></div>
                <p>Wizard</p>
              </div>
            </div>

            <div className={`${tableStyles.InputSearch} ${searchOpen ? tableStyles.InputSearch : tableStyles.HiddenMenu}`}>
            <div className={tableStyles.PartOne}>
              <div className={`${tableStyles.ClassSearch} ${searchOpen ? tableStyles.ClassSearch : tableStyles.HiddenMenu}`} style={{ backgroundColor: allSpells ? 'lightblue' : 'white' }} onClick={() => 
              setAllSpellsInversion()
              }>All Spells</div>
            </div>
            <div className={tableStyles.PartTwo}>
              <div className={`${tableStyles.InputDiv} ${searchOpen ? tableStyles.InputDiv : tableStyles.HiddenMenu}`}>
                  <label htmlFor="">Spell Name</label>
                  <input type="search" className={tableStyles.Input} value={filterName} onChange={e=>setFilterName(e.target.value)}/>
                </div>
                
                <div className={`${tableStyles.InputDiv} ${searchOpen ? tableStyles.InputDiv : tableStyles.HiddenMenu}`}>
                  <label htmlFor="">Spell Level</label>
                  <input type="search"  className={tableStyles.Input} value={filterLevel} onChange={e=>setFilterLevel(e.target.value)}/>
                </div>
                  <div className={`${tableStyles.InputDiv} ${searchOpen ? tableStyles.InputDiv : tableStyles.HiddenMenu}`}>
                  <label htmlFor="">Casting Tags</label>
                  <select  className={tableStyles.Input} value={filterTags} onChange={e=>setFilterTags(e.target.value)}>
                  <option selected value={""}>-- none --</option>
                    {
                      uniqueValues.map((e)=>(
                        <option key={e}>{e}</option>
                      ))
                    }
                  </select>
              </div>
            </div>
              
            </div>

            <div className={`${tableStyles.CollapseButton} ${searchOpen ? tableStyles.CollapseButton : tableStyles.RotatedButton}`} onClick={()=>setSearchOpen(!searchOpen)}>
              ^
            </div>

          </div>

          <div className={tableStyles.Table}>

              <ul className={tableStyles.TableHeadRow}>
                    <div className={tableStyles.TableHeadRowTitle}
                      onClick={e=>setSort("level")}
                      style={{cursor:"pointer"}}
                    >Level</div>
                    <div className={tableStyles.TableHeadRowTitle}
                      onClick={e=>setSort("name")}
                      style={{cursor:"pointer"}}
                    >Name</div>
                    <div className={tableStyles.TableHeadRowTitle}>School</div>
                    <div className={`${tableStyles.TableHeadRowTitle} ${tableStyles.CastTime}`}>Casting Time</div>
                    <div className={`${tableStyles.TableHeadRowTitle} ${tableStyles.Duration}`}
                    >Duration</div>
                    <div className={`${tableStyles.TableHeadRowTitle} ${tableStyles.Components}`}>Components</div>
              </ul>

            <div className={tableStyles.TableBody}>

              {
              nodes
                .filter((e)=> {if(e.title.toUpperCase().includes(filterName.toUpperCase())){return true}}).filter((e)=> {if(e.field_level == filterLevel || filterLevel == ""){return true}})
                .filter((e)=> {if(e.field_casting_time == filterTags || filterTags == "" ||e.field_duration == filterTags ){return true}})
                .filter((e) => {
                  let found = false;
                  e.field_magic_casters.forEach((f) => {
                    if (f.title === "Wizard" && wizard || 
                    f.title === "Warlock"&& warlock ||
                    f.title === "Sorcerer"&& sorcerer ||
                    f.title === "Ranger"&& ranger ||
                    f.title === "Paladin"&& paladin ||
                    f.title === "Druid"&& druid ||
                    f.title === "Cleric"&& cleric ||
                    f.title === "Bard"&& bard ||
                    f.title === "Artificer"&& artificer ||
                    allSpells
                    ) {
                      found = true;
                    }
                  });
                  return found;
                })           
                .map((node) => (
                <SpellRow
                    level={node.field_level}
                    name={node.title}
                    school={node.field_magic_school.name}
                    duration={node.field_duration}
                    castingTime={node.field_casting_time}
                    concentration={node.field_concentration}
                    ritual={node.field_ritual}
                    components={node.field_components}
                    key={node.id} path={node.path.alias}                />
              ))}

            </div>

          </div>
          
        </div>
      </Layout>
    );
  }

  export async function getStaticProps(
    context
  ): Promise<GetStaticPropsResult<IndexPageProps>> {

    const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
      "node--spell",
      context,
      {
        params: {
          "fields[node--spell]":
            "title,body,path,uid,field_level,field_components,field_casting_time,field_duration,field_magic_school,field_ritual,field_concentration,field_magic_casters,alias",
          include: "field_magic_school,field_components,field_magic_casters",
        },
      }
    );
    //nodes.map((e)=>(console.log(e.path)))
    return {
      props: {
        nodes,
        /*terms,*/
      },
    };
  }
