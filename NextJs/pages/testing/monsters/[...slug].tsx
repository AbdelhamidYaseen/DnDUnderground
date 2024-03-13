import { GetStaticPathsResult, GetStaticPropsResult } from "next"
import Head from "next/head"
import { DrupalNode } from "next-drupal"

import { drupal } from "lib/drupal"
import { Layout } from "components/layout"
import { NodeSpell } from "components/spell-components/node--spell"

import monsterStyles from "/styles/monsters.css/monsters.module.scss";
import { NodeMonster } from "components/monster-components/node--monster"

interface NodePageProps {
  node: DrupalNode
}

export default function NodePage({ node }: NodePageProps) {
  //console.log("                                   ___________                                   ")
  //console.log("-----------------------------------|PRINT OUT|-----------------------------------")
  //console.log("                                   ¯¯¯¯¯¯¯¯¯¯¯                                   ")
  //console.log(node.field_monster_base_values.field_drawing)
  //console.log("-------------------------------------------------------------------------------")
  return (
    <Layout>
      <Head>
        <title>{node.title}</title>
        <meta name="description" content="A Next.js site powered by Drupal." />
      </Head>
      <NodeMonster 
        name={node.title}
        size={node.field_monster_base_values.field_size.name}
        type={node.field_monster_base_values.field_type.name}
        aligment={node.field_monster_base_values.field_aligment.name}
        proficiencybonus={node.field_monster_base_values.field_proficiency_bonus}
        armorclass={node.field_monster_base_values.field_armor_class} hitpoints={node.field_monster_base_values.field_hit_points}
        attributes={{
          str: node.field_attributes.field_strength,
          dex: node.field_attributes.field_dexterity,
          con: node.field_attributes.field_constitution,
          int: node.field_attributes.field_intelligence,
          wis: node.field_attributes.field_wisdom,
          cha: node.field_attributes.field_charisma
        }}
        savingthrows={{
          str: node.field_saving_throws.field_strength_save,
          dex: node.field_saving_throws.field_dexterity_save,
          con: node.field_saving_throws.field_constitution_save,
          int: node.field_saving_throws.field_intelligence_save,
          wis: node.field_saving_throws.field_wisdom_save,
          cha: node.field_saving_throws.field_charisma_save
        }}
        skills={{
          athletics: node.field_skills.field_athletics,
          acrobatics: node.field_skills.field_acrobatics,
          sleightofhand: node.field_skills.field_sleight_of_hand,
          stealth: node.field_skills.field_stealth,
          arcana: node.field_skills.field_arcana,
          history: node.field_skills.field_history,
          investigation: node.field_skills.field_investigation,
          nature: node.field_skills.field_nature,
          religion: node.field_skills.field_religion,
          animalhandling: node.field_skills.field_animal_handling,
          insight: node.field_skills.field_insight,
          medicine: node.field_skills.field_medicine,
          perception: node.field_skills.field_perception,
          survival: node.field_skills.field_survival,
          deception: node.field_skills.field_deception,
          intimidation: node.field_skills.field_intimidation,
          performance: node.field_skills.field_performance,
          persuasion: node.field_skills.field_persuasion
        }}
        senses={[...node.field_monster_base_values.field_senses.map((e) => (e.name))]}
        languages={[...node.field_monster_base_values.field_languages.map((e) => (e.name))]}
        challengerating={node.field_monster_base_values.field_challenge_rating}

        actions={[...node.field_actions.map(action => ({
          name: action.field_name,
          description: action.field_description,
          attackbonus: action.field_attack_bonus,
          damagedice: action.field_damage_dice,
          damagebonus: action.field_damage_bonus
        }))]}
        bonusactions={[...node.field_bonus_actions.map(action => ({
          name: action.field_name,
          description: action.field_description,
          attackbonus: action.field_attack_bonus,
          damagedice: action.field_damage_dice,
          damagebonus: action.field_damage_bonus
        }))]}
        reactions={[...node.field_reactions.map(action => ({
          name: action.field_name,
          description: action.field_description,
          attackbonus: action.field_attack_bonus,
          damagedice: action.field_damage_dice,
          damagebonus: action.field_damage_bonus
        }))]}
        speed={[...node.field_movement.field_movement.map((e) => ({
          name: e.field_movement_name,
          amount: e.field_movement_amount
        }))]}



        legendaryactions={node.field_legendary_actions.map(item => (
          {
            text: item.field_legendary_text,
            legendary: [...item.field_legendary_actions.map((unit) => ({ name: unit.field_legendary_name, description: unit.field_legendary_description }))]
          }
        ))}

        legendaryresistances={node.field_legendary_resistances.map(action => ({
          text: action.field_legendary_text,
          legendary: [...action.field_legendary_actions.map((unit) => ({ name: unit.field_legendary_name, description: unit.field_legendary_description }))]
        }))}




        specialabilities={[...node.field_special_abilities.map(action => ({
          name: action.field_special_name,
          description: action.field_special_description
        }))]}
        resistances={[...node.field_vulnerabilites.map((e) => (e.field_resistances.map((f) => (f.name))))]}
        weaknesses={[...node.field_vulnerabilites.map((e) => (e.field_vulnerabilities.map((f) => (f.name))))]}
        immunities={[...node.field_vulnerabilites.map((e) => (e.field_immunities.map((f) => (f.name))))]}
        hitdice={node.field_monster_base_values.field_hitdice} 
        
        image={node.field_monster_base_values.field_drawing.uri.url} 
        />
    </Layout>
  )
}

export async function getStaticPaths(context): Promise<GetStaticPathsResult> {
  return {
    paths: await drupal.getStaticPathsFromContext("node--monster", context),
    fallback: "blocking",
  }
}

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<NodePageProps>> {
  const path = await drupal.translatePathFromContext(context)

  const type = path.jsonapi.resourceName
  let params = {}
  if (type === "node--monster") {
    params = {
      include: "uid",
    }
  }

  const node = await drupal.getResourceFromContext<DrupalNode>(
    path,
    context,
    {
        params: {
            "fields[node--monster]":
            "title,body,path,uid,field_actions,field_attributes,body,field_legendary_actions,field_monster_base_values,field_movement,field_skills,field_special_abilities,field_vulnerabilites,field_saving_throws,field_legendary_resistances,field_reactions,field_bonus_actions",
            include: 
            "field_actions,field_attributes,field_legendary_actions,field_movement,field_skills,field_special_abilities,field_vulnerabilites,field_monster_base_values,field_monster_base_values.field_drawing,field_monster_base_values.field_languages,field_monster_base_values.field_senses,field_monster_base_values.field_aligment,field_monster_base_values.field_size,field_monster_base_values.field_type,field_saving_throws,field_reactions,field_bonus_actions,field_legendary_resistances,field_vulnerabilites.field_resistances,field_vulnerabilites,field_vulnerabilites.field_vulnerabilities,field_legendary_actions.field_legendary_actions,field_movement.field_movement",
          }
    }
  )

  return {
    props: {
      node,
    },
  }
}
