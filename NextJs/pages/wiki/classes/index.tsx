import { Layout } from "components/layout";
import exp from "constants"
import Head from "next/head";
import base from "/styles/layout.css/layout.module.scss";
import { DrupalNode } from "next-drupal";
import { GetStaticPropsResult } from "next";
import { drupal } from "lib/drupal";
import { ClassCard } from "components/class-components/node-classcard";
import classStyles from "/styles/class.css/class.module.scss";

//Interface for object received from DRUPAL GET
interface IndexPageProps {
    nodes: DrupalNode[];
  }
  


const Page = ({nodes}:IndexPageProps) =>{
    //console.log(nodes)

    return(
        <Layout>
            <Head>
            <title>Classes</title>
            <meta
            name="description"
            content="An overview of all classes."/>
            </Head>
            <div style={{padding:"1rem"}}>
                <div className={base.pageheadercontainer}>
                        <h1 className={base.pageheader} >Classes</h1>
                        <hr style={{border:"solid darkblue 2px",marginLeft:"auto",marginRight:"auto", width:"85%"}}/>
                </div>   
                <div className={classStyles.CardContainer}>
                    {nodes.map((e)=>(
                    <ClassCard 
                        name={e.title}
                        hitdie={e.field_base_class_values.field_health.field_class_hitdice}
                        primaryability={[...e.field_base_class_values.field_weapon_proficiencies.map((e) => (e.name))]}
                        saves={[...e.field_base_class_values.field_saving_throws.map((e) => (e.name))]}
                        description={e.body.value}

                        key={e.title} 
                        href={e.path.alias}                    
                        />
                    ))}
                </div>     
            </div>
        </Layout>
    )
}
export async function getStaticProps(
    context
  ): Promise<GetStaticPropsResult<IndexPageProps>> {

    const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
      "node--class",
      context,
      {
        params: {
          "fields[node--class]":
            "title,body,path,uid,field_base_class_values",
          include: "field_base_class_values.field_health,field_base_class_values.field_saving_throws,field_base_class_values.field_weapon_proficiencies",
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

export default Page;