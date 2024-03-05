import { Layout } from "components/layout";
import { drupal } from "lib/drupal";
import { GetStaticPathsContext, GetStaticPropsResult } from "next";
import { DrupalNode, DrupalView } from "next-drupal";
import Head from "next/head";
import path from "path";

interface IndexPageProps {
    nodes: DrupalNode[]
  }
  

export default function Page ({nodes}:IndexPageProps){
  console.log(nodes)
    return(
        <Layout>
            <Head>
                <title>The Beastiary</title>
                <meta
                    name="description"
                    content="An overview of all monsters."
                />
            </Head>
            <div style={{padding: "1rem"}}>
                <div>
                    <h1 className="mb-10 text-6xl font-black" style={{marginLeft:'7rem'}}>Monsters</h1>
                    <hr style={{border:"solid darkblue 2px",marginLeft:"auto",marginRight:"auto", width:"85%"}}/>
                </div>        
                <div style={{paddingTop:"5rem",marginLeft:"auto",marginRight:"auto", width:"85%"}}>
                {
                    nodes.map((e)=>(
                        <div style={{display:"flex"}} key={e.title}>
                            <p>{e.field_challenge_rating}</p>
                            <p>{e.title}</p>
                            <div>
                              <h2>Attributes</h2>
                              <p>{e.field_attributes.field_strength}</p>
                              <p>{e.field_attributes.field_dexterity}</p>
                              <p>{e.field_attributes.field_constitution}</p>
                              <p>{e.field_attributes.field_intelligence}</p>
                              <p>{e.field_attributes.field_wisdom}</p>
                              <p>{e.field_attributes.field_charisma}</p>
                            </div>
                        </div>
                    ))
                }  
                </div>  
            </div>
        </Layout>
    )
}


export async function getStaticProps(
    context
  ): Promise<GetStaticPropsResult<IndexPageProps>> {

    const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
      "node--monster",
      context,
      {
        params: {
          "fields[node--monster]":
          "title,body,path,uid,field_actions,field_attributes,body,field_legendary_actions,field_monster_base_values,field_movement,field_skills,field_special_abilities,field_vulnerabilites",
          include: "node_type, revision_uid, uid, menu_link, field_actions, field_attributes, field_legendary_actions, field_monster_base_values, field_movement, field_skills, field_special_abilities, field_vulnerabilites",
        },
      }
    );
      console.log(nodes);
    return {
      props: {
        nodes,
      },
    };
  }