import { GetStaticPathsResult, GetStaticPropsResult } from "next"
import Head from "next/head"
import { DrupalNode } from "next-drupal"
import { Marked } from 'marked';


import { drupal } from "lib/drupal"
import { Layout } from "components/layout"

import classStyles from "/styles/class.css/class.module.scss";
import { Class } from "components/class-components/node--class";

interface NodePageProps {
  node: DrupalNode
}
;

export default function NodePage({ node }: NodePageProps) {
  const filteredData = Object.values(node.field_class_table.value).map((row:any) => {
    const rowDataWithoutWeight = { ...row };
    delete rowDataWithoutWeight.weight;
    return rowDataWithoutWeight;
  });
  const stringArray: string[][] = [];

  // Iterate over each entry in the object
  Object.values(node.field_class_table.value).forEach(entry => {
    const values = Object.values(entry);
    stringArray.push(values); // Push array of values into the array
  });
  return (
    <Layout>
      <Head>
        <title>{node.title}</title>
        <meta name="description" content="A Next.js site powered by Drupal." />
      </Head>
      <div style={{padding:"1rem"}} className={classStyles.Container}>

        <Class 
          name={node.title}
          desc={node.body}
          equipment={node.field_base_class_values.field_equipment}

          base_values={{
            hitpoints: {
              hit_dice: node.field_base_class_values.field_health.field_class_hitdice,
              hp_at_1st_level: node.field_base_class_values.field_health.field_hp_level_1,
              hp_at_higher_levels: node.field_base_class_values.field_health.field_hp_per_level
            },
            proficiencies: {
              prof_armor: [...node.field_base_class_values.field_armor_proficiencies.map((e)=>(e.name))],
              prof_weapons: [...node.field_base_class_values.field_weapon_proficiencies.map((e)=>(e.name))],
              prof_tools: [...node.field_base_class_values.field_tool_proficiencies.map((e)=>(e.name))],
              prof_saving_throws: [...node.field_base_class_values.field_saving_throws.map((e)=>(e.name))],
              prof_skills: node.field_base_class_values.field_skills
            }
          }}

          tabledata={[...stringArray]} 
          features={node.field_base_class_values.field_ability_description}        
          />

      
      </div>
</Layout>
  )
}

export async function getStaticPaths(context): Promise<GetStaticPathsResult> {
  return {
    paths: await drupal.getStaticPathsFromContext("node--class", context),
    fallback: "blocking",
  }
}

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<NodePageProps>> {
  const path = await drupal.translatePathFromContext(context)

  const type = path.jsonapi.resourceName
  let params = {}
  if (type === "node--class") {
    params = {
      include: "uid",
    }
  }

  const node = await drupal.getResourceFromContext<DrupalNode>(
    path,
    context,
    {
        params: {
            "fields[node--class]":
            "title,body,path,uid,field_class_table,field_base_class_values",
            include: 
            "field_base_class_values.field_armor_proficiencies,field_base_class_values.paragraph_type,field_base_class_values.field_saving_throws,field_base_class_values.field_weapon_proficiencies,field_base_class_values.field_weapon_proficiencies,field_base_class_values.field_health",
          }
    }
  )

  return {
    props: {
      node,
    },
  }
}
