import { Layout } from "components/layout";
import { MonsterTable } from "components/node--monstertable";
import { drupal } from "lib/drupal";
import { GetStaticPathsContext, GetStaticPropsResult } from "next";
import { DrupalNode, DrupalView } from "next-drupal";
import Head from "next/head";
import { DrupalJsonApiParams } from "drupal-jsonapi-params"
import path from "path";

interface IndexPageProps {
    nodes: DrupalNode[]
}
  

export default function Page ({nodes}:IndexPageProps){
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


                <MonsterTable data={[...nodes.map((e)=>({
                  data:{
                    cr: e.field_monster_base_values.field_challenge_rating,
                    name: e.title,
                    type: e.field_monster_base_values.field_type.name,
                    size: e.field_monster_base_values.field_size.name,
                    alignment: e.field_monster_base_values.field_aligment.name,
                    path: e.path.alias
                  }

                }
                ))]}/>


                </div>  
            </div>
        </Layout>
    )
}


export async function getStaticProps(
    context
  ): Promise<GetStaticPropsResult<IndexPageProps>> {

    const params = new DrupalJsonApiParams()
    .addFields("node--monster", ["title","body","path","uid","field_monster_base_values"])
    .addInclude(["node_type", "revision_uid", "uid,field_monster_base_values.field_aligment", "field_monster_base_values.field_size", "field_monster_base_values.field_aligment", "field_monster_base_values.field_type"]);

    const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
      "node--monster",
      context,
      {
        params: params.getQueryObject()
      }
    );
    return {
      props: {
        nodes,
      },
    };
  }