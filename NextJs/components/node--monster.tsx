import Image from "next/image"
import { DrupalNode } from "next-drupal"

import { absoluteUrl, formatDate } from "lib/utils"

import monsterStyles from "/styles/monsters.css/monsters.module.scss";
import Link from "next/link";

interface ActionProps {
    name:string,
    description:string,
    attackbonus:number,
    damagedice:string,
    damagebonus:number,
}
interface LegendaryContainer{
    text:string,
    legendary:SpecialProps
}
interface SpecialProps{
    name:string,
    description:string,
}
interface NodeMonsterProps {
    name:string,
    size:string,
    type:string,
    aligment:string,
    proficiencybonus: number,

    armorclass:number,
    hitpoints:number,
    hitdice:string,
    speed:number[],

    attributes:{
        str:number,
        dex:number,
        con:number,
        int:number,
        wis:number,
        cha:number
    },
    savingthrows:{
        str:number,
        dex:number,
        con:number,
        int:number,
        wis:number,
        cha:number
    },
    skills:{
        athletics:number,
        acrobatics:number,
        sleightofhand:number,
        stealth:number,
        arcana:number,
        history:number,
        investigation:number,
        nature:number,
        religion:number,
        animalhandling:number,
        insight:number,
        medicine:number,
        perception:number,
        survival:number,
        deception:number,
        intimidation:number,
        performance:number,
        persuasion:number,
    },
    senses:string[],
    languages:string[],
    challengerating:number,

    actions:ActionProps[],
    bonusactions:ActionProps[],
    reactions:ActionProps[],
    legendaryactions:LegendaryContainer,
    legendaryresistances:LegendaryContainer,
    specialabilities:SpecialProps[]

    resistances:string[],
    weaknesses:string[],
    immunities:string[],
}
  
  export function NodeMonster( props : NodeMonsterProps) {
    console.log(props.legendaryactions[0].legendary);
    function calculateAttributeModifier(attributeValue: number): string {
        const modifier = Math.floor((attributeValue - 10) / 2);
        return modifier >= 0 ? `+${modifier}` : `${modifier}`;
    }
    const numberWithCommas = (value: number): string => {
        return value.toLocaleString();
    };
    return (
        <div className={monsterStyles.Container}>
        <div className={monsterStyles.MonsterSheet}>
          
          <div className={monsterStyles.MonsterSheetTopBar}></div>
          <div className={monsterStyles.MonsterSheetContent}>
              <div className={monsterStyles.Header}>
                  <h2>{props.name}</h2>
                  <h3>{props.size} {props.type}, {props.aligment}</h3>
              </div>
              <div className={monsterStyles.Seperator}>
                <img src="https://www.dndbeyond.com/file-attachments/0/579/stat-block-header-bar.svg" alt="" />
              </div>
              <div className={monsterStyles.Stats}>
                <div className={monsterStyles.Stat}>
                    <span>Armor Class</span>
                    <span> {props.armorclass}</span>
                </div>
                <div className={monsterStyles.Stat}>
                    <span>Hit Points</span>
                    <span> {props.hitpoints}</span>
                    <span> ({props.hitdice})</span>
                </div>
                <div className={monsterStyles.Stat}>
                    <span>Speed</span>
                    <span> TODO refactor speed data</span>
                </div>
              </div>
              <div className={monsterStyles.Seperator}>
                <img src="https://www.dndbeyond.com/file-attachments/0/579/stat-block-header-bar.svg" alt="" />
              </div>
              <div className={monsterStyles.Attributes}>
                <div className={monsterStyles.AttributeHolder}>
                    <span className={monsterStyles.AttributeName}>
                        STR
                    </span>
                    <span className={monsterStyles.AttributeValue}>
                        {props.attributes.str} ({calculateAttributeModifier(props.attributes.str)})
                    </span>
                </div>
                <div>
                    <span className={monsterStyles.AttributeName}>
                        DEX
                    </span>
                    <span className={monsterStyles.AttributeValue}>
                    {props.attributes.dex} ({calculateAttributeModifier(props.attributes.dex)})
                    </span>
                </div>
                <div>
                    <span className={monsterStyles.AttributeName}>
                        CON
                    </span>
                    <span className={monsterStyles.AttributeValue}>
                    {props.attributes.con} ({calculateAttributeModifier(props.attributes.con)})
                    </span>
                </div>
                <div>
                    <span className={monsterStyles.AttributeName}>
                        INT
                    </span>
                    <span className={monsterStyles.AttributeValue}>
                    {props.attributes.int} ({calculateAttributeModifier(props.attributes.int)})
                    </span>
                </div>
                <div>
                    <span className={monsterStyles.AttributeName}>
                        WIS
                    </span>
                    <span className={monsterStyles.AttributeValue}>
                    {props.attributes.wis} ({calculateAttributeModifier(props.attributes.wis)})
                    </span>
                </div>
                <div>
                    <span className={monsterStyles.AttributeName}>
                        CHA
                    </span>
                    <span className={monsterStyles.AttributeValue}>
                    {props.attributes.cha} ({calculateAttributeModifier(props.attributes.cha)})
                    </span>
                </div>
              </div>
              <div className={monsterStyles.Seperator}>
                <img src="https://www.dndbeyond.com/file-attachments/0/579/stat-block-header-bar.svg" alt="" />
              </div>
              <div className={monsterStyles.Skills}>
                <div>
                    <span>Saving Throws</span>
                    {
                        props.savingthrows.str  !== 0 &&(
                            <span>STR {calculateAttributeModifier(props.attributes.str)}</span>
                        )
                    }
                    {
                        props.savingthrows.dex  !== 0 &&(
                            <span>DEX {calculateAttributeModifier(props.attributes.dex)}</span>
                        )
                    }
                    {
                        props.savingthrows.con  !== 0 &&(
                            <span>CON {calculateAttributeModifier(props.attributes.con)}</span>
                        )
                    }
                    {
                        props.savingthrows.int  !== 0 &&(
                            <span>INT {calculateAttributeModifier(props.attributes.int)}</span>
                        )
                    }
                    {
                        props.savingthrows.wis  !== 0 &&(
                            <span>WIS {calculateAttributeModifier(props.attributes.wis)}</span>
                        )
                    }
                    {
                        props.savingthrows.cha  !== 0 &&(
                            <span>CHA {calculateAttributeModifier(props.attributes.cha)}</span>
                        )
                    }
                </div>
                <div>
                <span>Skills</span>
                    {
                        props.skills.athletics  !== 0 &&(
                            <span>Athletics +{props.skills.athletics}</span>
                        )
                    }
                    {
                        props.skills.acrobatics  !== 0 &&(
                            <span>Acrobatics +{props.skills.acrobatics}</span>
                        )
                    }
                    {
                        props.skills.sleightofhand  !== 0 &&(
                            <span>Sleight Of Hand +{props.skills.sleightofhand}</span>
                        )
                    }
                    {
                        props.skills.arcana  !== 0 &&(
                            <span>Arcana +{props.skills.arcana}</span>
                        )
                    }
                    {
                        props.skills.history  !== 0 &&(
                            <span>History +{props.skills.history}</span>
                        )
                    }
                    {
                        props.skills.investigation  !== 0 &&(
                            <span>Investigation +{props.skills.investigation}</span>
                        )
                    }
                    {
                        props.skills.nature  !== 0 &&(
                            <span>Nature +{props.skills.nature}</span>
                        )
                    }
                    {
                        props.skills.religion  !== 0 &&(
                            <span>Religion +{props.skills.religion}</span>
                        )
                    }
                    {
                        props.skills.animalhandling  !== 0 &&(
                            <span>Animal Handling +{props.skills.animalhandling}</span>
                        )
                    }
                    {
                        props.skills.insight  !== 0 &&(
                            <span>Insight +{props.skills.insight}</span>
                        )
                    }
                    {
                        props.skills.medicine  !== 0 &&(
                            <span>Medicine +{props.skills.medicine}</span>
                        )
                    }
                    {
                        props.skills.perception  !== 0 &&(
                            <span>Perception +{props.skills.perception}</span>
                        )
                    }
                    {
                        props.skills.survival  !== 0 &&(
                            <span>Survival +{props.skills.survival}</span>
                        )
                    }
                    {
                        props.skills.deception  !== 0 &&(
                            <span>Deception +{props.skills.deception}</span>
                        )
                    }
                    {
                        props.skills.intimidation  !== 0 &&(
                            <span>Intimidation +{props.skills.intimidation}</span>
                        )
                    }
                    {
                        props.skills.performance  !== 0 &&(
                            <span>Performance +{props.skills.performance}</span>
                        )
                    }
                    {
                        props.skills.persuasion  !== 0 &&(
                            <span>Persuasion +{props.skills.persuasion}</span>
                        )
                    }
                </div>
                <div>
                    <span>Senses</span><span>{props.senses.map((e)=>(<>{e} </>))}</span>
                </div>
                <div>
                    <span>Languages</span>
                    <span>{props.languages.map((e)=>(<>{e} </>))}</span>
                </div>
                <div>
                    <span>Challenge</span>
                    <span>{props.challengerating} ({numberWithCommas(4*props.challengerating*1000*3/40)} XP)</span>
                </div>
                <div>
                    <span>Proficiency Bonus</span>
                    <span>+{props.proficiencybonus}</span>
                </div>
              </div>
              <div className={monsterStyles.Seperator}>
                <img src="https://www.dndbeyond.com/file-attachments/0/579/stat-block-header-bar.svg" alt="" />
              </div>
              <div className={monsterStyles.SpecialAbilities}>
                <h2>Unique Abilities</h2>
                {
                    props.specialabilities.map((e)=>(
                        <>
                            <span>{e.name}</span>
                            <p>{e.description}</p>
                        </>
                    ))
                }
              </div>
              <div className={monsterStyles.Actions}>
                <h2>Actions</h2>
                {
                    props.actions.map((e)=>(
                        <>
                            <span>{e.name}</span>
                            <p>{e.description}</p>
                        </>
                    ))
                }
              </div>   
                {
                    <>
                        <div>
                            <h2>Legendary Actions</h2>
                        </div>
                        <p>{props.legendaryactions[0].text}</p>
                        {
                            props.legendaryactions[0].legendary.map((e)=>(
                                <>
                                    <span>{e.name}</span>
                                    <p>{e.description}</p>
                                </>
                            ))
                        }
                    </>
                }
                {
                        <div>
                            <h2>Legendary Resistances</h2>
                        </div>
                }

          </div>
          <div className={monsterStyles.MonsterSheetBottomBar}></div>
        </div>
        <div className={monsterStyles.MonsterImage}>
        </div>
      </div>

    )
  }
  