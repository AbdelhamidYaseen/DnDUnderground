import Image from "next/image"
import { DrupalNode } from "next-drupal"

import { absoluteUrl, formatDate } from "lib/utils"

import spellStyles from "/styles/spells.css/spell.module.scss";
import Link from "next/link";


interface NodeSpellProps {
  node: DrupalNode
}

export function NodeSpell({ node, ...props }: NodeSpellProps) {
  return (
    <article {...props} style={{padding:"3rem", paddingLeft:"5rem", paddingRight:"5rem"}}>
      <h1 className={spellStyles.Title} style={{textTransform:"capitalize"}}>{node.title}</h1>
      <hr className={spellStyles.LargeBreak}/>
        <div className={spellStyles.Container}>
          <div className={spellStyles.Info}>
            <div className={spellStyles.SpellStats}>

              <div className={spellStyles.StatBlock}>
              <div className={spellStyles.StatLabel}>
                  Level
                </div>
                <div className={spellStyles.StatValue}>
                  {node.field_level}
                </div>
              </div>
              
              <div className={spellStyles.StatBlock}>
                <div className={spellStyles.StatLabel}>
                  Casting Time
                </div>
                <div className={spellStyles.StatValue}>
                  {node.field_casting_time}
                </div>
              </div>

              <div className={spellStyles.StatBlock}>
              <div className={spellStyles.StatLabel}>
                  Range
                </div>
                <div className={spellStyles.StatValue}>
                  {node.field_range}
                </div>
              </div>

              <div className={spellStyles.StatBlock}>
                <div className={spellStyles.StatLabel}>
                  Duration
                </div>
                <div className={spellStyles.StatValue}>
                  {node.field_duration}
                </div>
              </div>

              <div className={spellStyles.StatBlock}>
                <div className={spellStyles.StatLabel}>
                  School
                </div>
                <div className={spellStyles.StatValue}>
                  {node.field_magic_school.name}
                </div>
              </div>

              <div className={spellStyles.StatBlock}>
              <div className={spellStyles.StatLabel}>
                  Damage/Effect
                </div>
                <div className={spellStyles.StatValue}>
                  {node.field_level}
                </div>
              </div>

            </div>
            <hr className={spellStyles.SmallerBreak}/>
            <div className={spellStyles.SpellText}>
              <p className={spellStyles.Text}>
                {
                  node.body.value
                }
              </p>
            </div>
          </div>


          <div className={spellStyles.ImgContainer}>
            <img src={`/images/schools/${node.field_magic_school.name}.png`} alt="" />
          </div>
        </div>
        <hr className={spellStyles.LargeBreak}/>
        <div className={spellStyles.Tags}>
          <div style={{display:"flex"}}>
                <label htmlFor="">Available For: </label>
                <div className={spellStyles.TagsContainer}>
                  {
                    node.field_magic_casters.map((e)=>(
                      <Link key={e.title} className={`${spellStyles.Tag} ${spellStyles.raise}`} href={`/wiki/classes/${e.title}`}>
                        {e.title}
                      </Link>
                    ))
                  }
                </div>
          </div>
        </div>
    </article>
  )
}
