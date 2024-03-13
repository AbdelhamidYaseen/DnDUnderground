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
interface MovementProps{
    name: string,
    amount: number
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
    speed:MovementProps[],

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

    image:string,
}
  
 export function NodeMonster( props : NodeMonsterProps) {
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
                            <span className={monsterStyles.Label}>Armor Class</span>
                            <span className={monsterStyles.Data}> {props.armorclass}</span>
                        </div>
                        <div className={monsterStyles.Stat}>
                            <span className={monsterStyles.Label}>Hit Points</span>
                            <span className={monsterStyles.Data}> {props.hitpoints}</span>
                            <span className={monsterStyles.Data}> ({props.hitdice})</span>
                        </div>
                        <div className={monsterStyles.Stat}>
                            <span className={monsterStyles.Label}>Speed</span>
                            <span className={monsterStyles.DataSpeed}>{props.speed.map((e)=>(<div className={monsterStyles.SpeedItem} key={e.name}>{e.name} {e.amount} ft.</div>))}</span>
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
                        <div className={monsterStyles.AttributeHolder}>
                            <span className={monsterStyles.AttributeName}>
                                DEX
                            </span>
                            <span className={monsterStyles.AttributeValue}>
                            {props.attributes.dex} ({calculateAttributeModifier(props.attributes.dex)})
                            </span>
                        </div>
                        <div className={monsterStyles.AttributeHolder}>
                            <span className={monsterStyles.AttributeName}>
                                CON
                            </span>
                            <span className={monsterStyles.AttributeValue}>
                            {props.attributes.con} ({calculateAttributeModifier(props.attributes.con)})
                            </span>
                        </div>
                        <div className={monsterStyles.AttributeHolder}>
                            <span className={monsterStyles.AttributeName}>
                                INT
                            </span>
                            <span className={monsterStyles.AttributeValue}>
                            {props.attributes.int} ({calculateAttributeModifier(props.attributes.int)})
                            </span>
                        </div>
                        <div className={monsterStyles.AttributeHolder}>
                            <span className={monsterStyles.AttributeName}>
                                WIS
                            </span>
                            <span className={monsterStyles.AttributeValue}>
                            {props.attributes.wis} ({calculateAttributeModifier(props.attributes.wis)})
                            </span>
                        </div>
                        <div className={monsterStyles.AttributeHolder}>
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
                        <div className={monsterStyles.SavingThrows}>
                            <span className={monsterStyles.Label}>Saving Throws</span>
                            {
                                props.savingthrows.str  !== 0 &&(
                                    <span className={monsterStyles.Data}>STR{calculateAttributeModifier(props.attributes.str)}</span>
                                )
                            }
                            {
                                props.savingthrows.dex  !== 0 &&(
                                    <span className={monsterStyles.Data}>DEX{calculateAttributeModifier(props.attributes.dex)}</span>
                                )
                            }
                            {
                                props.savingthrows.con  !== 0 &&(
                                    <span className={monsterStyles.Data}>CON{calculateAttributeModifier(props.attributes.con)}</span>
                                )
                            }
                            {
                                props.savingthrows.int  !== 0 &&(
                                    <span className={monsterStyles.Data}>INT{calculateAttributeModifier(props.attributes.int)}</span>
                                )
                            }
                            {
                                props.savingthrows.wis  !== 0 &&(
                                    <span className={monsterStyles.Data}>WIS{calculateAttributeModifier(props.attributes.wis)}</span>
                                )
                            }
                            {
                                props.savingthrows.cha  !== 0 &&(
                                    <span className={monsterStyles.Data}>CHA{calculateAttributeModifier(props.attributes.cha)}</span>
                                )
                            }
                        </div>
                        <div className={monsterStyles.InnerSkills}>
                        <span className={monsterStyles.Label}>Skills</span>
                            {
                                props.skills.athletics  !== 0 &&(
                                    <span className={monsterStyles.Data}>Athletics +{props.skills.athletics}</span>
                                )
                            }
                            {
                                props.skills.acrobatics  !== 0 &&(
                                    <span className={monsterStyles.Data}>Acrobatics +{props.skills.acrobatics}</span>
                                )
                            }
                            {
                                props.skills.sleightofhand  !== 0 &&(
                                    <span className={monsterStyles.Data}>Sleight Of Hand +{props.skills.sleightofhand}</span>
                                )
                            }
                            {
                                props.skills.arcana  !== 0 &&(
                                    <span className={monsterStyles.Data}>Arcana +{props.skills.arcana}</span>
                                )
                            }
                            {
                                props.skills.history  !== 0 &&(
                                    <span className={monsterStyles.Data}>History +{props.skills.history}</span>
                                )
                            }
                            {
                                props.skills.investigation  !== 0 &&(
                                    <span className={monsterStyles.Data}>Investigation +{props.skills.investigation}</span>
                                )
                            }
                            {
                                props.skills.nature  !== 0 &&(
                                    <span className={monsterStyles.Data}>Nature +{props.skills.nature}</span>
                                )
                            }
                            {
                                props.skills.religion  !== 0 &&(
                                    <span className={monsterStyles.Data}>Religion +{props.skills.religion}</span>
                                )
                            }
                            {
                                props.skills.animalhandling  !== 0 &&(
                                    <span className={monsterStyles.Data}>Animal Handling +{props.skills.animalhandling}</span>
                                )
                            }
                            {
                                props.skills.insight  !== 0 &&(
                                    <span className={monsterStyles.Data}>Insight +{props.skills.insight}</span>
                                )
                            }
                            {
                                props.skills.medicine  !== 0 &&(
                                    <span className={monsterStyles.Data}>Medicine +{props.skills.medicine}</span>
                                )
                            }
                            {
                                props.skills.perception  !== 0 &&(
                                    <span className={monsterStyles.Data}>Perception +{props.skills.perception}</span>
                                )
                            }
                            {
                                props.skills.survival  !== 0 &&(
                                    <span className={monsterStyles.Data}>Survival +{props.skills.survival}</span>
                                )
                            }
                            {
                                props.skills.deception  !== 0 &&(
                                    <span className={monsterStyles.Data}>Deception +{props.skills.deception}</span>
                                )
                            }
                            {
                                props.skills.intimidation  !== 0 &&(
                                    <span className={monsterStyles.Data}>Intimidation +{props.skills.intimidation}</span>
                                )
                            }
                            {
                                props.skills.performance  !== 0 &&(
                                    <span className={monsterStyles.Data}>Performance +{props.skills.performance}</span>
                                )
                            }
                            {
                                props.skills.persuasion  !== 0 &&(
                                    <span className={monsterStyles.Data}>Persuasion +{props.skills.persuasion}</span>
                                )
                            }
                        </div>
                        <div>
                            <span className={monsterStyles.Label}>Senses</span><span className={monsterStyles.Data}>{props.senses.map((e)=>(<>| <>{e} </></>))}|</span>
                        </div>
                        <div>
                            <span className={monsterStyles.Label}>Languages</span>
                            <span className={monsterStyles.Data}>{props.languages.map((e)=>(<>|<> {e} </></>))}|</span>
                        </div>
                        <div style={{display:"flex"}}>
                            <div>
                                <span className={monsterStyles.Label}>Challenge</span>
                                <span className={monsterStyles.Data}>{props.challengerating} ({numberWithCommas(4*props.challengerating*1900*3/40)} XP)</span>
                            </div>
                            <div style={{marginLeft:"2.7rem"}}>
                                <span className={monsterStyles.Label}>Proficiency Bonus</span>
                                <span className={monsterStyles.Data}>+{props.proficiencybonus}</span>
                            </div>
                            </div>
                    </div>
                    <div className={monsterStyles.Seperator}>
                        <img src="https://www.dndbeyond.com/file-attachments/0/579/stat-block-header-bar.svg" alt="" />
                    </div>
                    <div className={monsterStyles.SpecialAbilities}>
                        {
                            props.specialabilities.map((e)=>(
                                <div key={e.name} style={{marginTop:"0.5rem"}}>
                                    <span className={monsterStyles.LabelSkill}>{e.name}.</span>
                                    <p className={monsterStyles.DataSkill}>{e.description} <br /></p>
                                </div>
                            ))
                        }
                    </div>
                    <div className={monsterStyles.Actions}>
                        <h2 className={monsterStyles.ActionTitle}>Actions</h2>
                        {
                            props.actions.map((e)=>(
                                <div key={e.name} style={{marginTop:"0.5rem"}}>
                                    <span className={monsterStyles.LabelSkill}>{e.name}.</span>
                                    <p className={monsterStyles.DataSkill}>{e.description} <br /></p>
                                </div>
                            ))
                        }
                    </div>   
                        {
                            props.legendaryactions[0].legendary.length !== 0 &&(
                            <div>
                                <h2 className={monsterStyles.ActionTitle}>Legendary Actions</h2>
                                <p style={{marginTop:"0.5rem", marginBottom:"0.7rem"}}>{props.legendaryactions[0].text}</p>
                                {
                                    props.legendaryactions[0].legendary.map((e)=>(
                                        <div key={e.name} style={{marginTop:"0.5rem"}}>
                                            <span className={monsterStyles.LabelSkill}>{e.name}.</span>
                                            <p className={monsterStyles.DataSkill}>{e.description}</p>
                                        </div>
                                    ))
                                }
                            </div>
                            )
                        }
                        {
                            props.legendaryresistances && props.legendaryresistances[0]?.text && (
                                <>
                                    <div>
                                        <h2>Legendary Resistances</h2>
                                    </div>
                                    <p>{props.legendaryresistances[0].text}</p>
                                    {props.legendaryactions && props.legendaryactions[0]?.legendary.map((e) => (
                                        <>
                                            <span>{e.name}</span>
                                            <p>{e.description}</p>
                                        </>
                                    ))}
                                </>
                            )
                        }
                </div>
                <div className={monsterStyles.MonsterSheetBottomBar}></div>
            </div>
            <div className={`${monsterStyles.MonsterImage} ${monsterStyles.MonsterImageContainer}`}>
                <img src={`https://nextjs.ddev.site/${props.image}`} alt="" className={monsterStyles.MonsterImage}/>
            </div>
        </div>
    )
}
