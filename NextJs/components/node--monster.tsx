import Image from "next/image"
import { DrupalNode } from "next-drupal"

import { absoluteUrl, formatDate } from "lib/utils"

import monsterStyles from "/styles/monsters.css/monsters.module.scss";
import Link from "next/link";

interface NodeMonsterProps {
    name:string,
    size:string,
    type:string,
    aligment:string,
    proficiencybonus: number,

    armorclass:number,
    hitpoints:number,
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

}
  
  export function NodeMonster( props : NodeMonsterProps) {
    console.log(props);
    return (
        <div className={monsterStyles.Container}>
        <div className={monsterStyles.MonsterSheet}>
          <div className={monsterStyles.MonsterSheetTopBar}></div>
          <div className={monsterStyles.MonsterSheetContent}>
              <div className={monsterStyles.Header}>
                  <h2>{props.name}</h2>
                  <h3>{props.size} {props.type}, {props.aligment}</h3>
              </div>
              <div className={monsterStyles.Stats}>

              </div>
              <div className={monsterStyles.Attributes}>

              </div>
              <div className={monsterStyles.Skills}>

              </div>
          </div>
          <div className={monsterStyles.MonsterSheetBottomBar}></div>
        </div>
        <div className={monsterStyles.MonsterImage}>
        </div>
      </div>

    )
  }
  