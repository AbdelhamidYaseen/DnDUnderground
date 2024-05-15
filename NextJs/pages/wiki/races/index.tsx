import { Layout } from "components/layout";
import exp from "constants"
import Head from "next/head";
import base from "/styles/layout.css/layout.module.scss";
import { DrupalNode } from "next-drupal";
import { GetStaticPropsResult } from "next";
import { drupal } from "lib/drupal";
import { ClassCard } from "components/class-components/node-classcard";
import classStyles from "/styles/class.css/class.module.scss";
import { RaceCard } from "components/race-components/node--racecard";

//Interface for object received from DRUPAL GET
interface IndexPageProps {
    nodes: DrupalNode[];
  }
  


const Page = ({nodes}:IndexPageProps) =>{
    //nodes.map((e)=>console.log(e.path))
    //console.log(nodes)
    //nodes.map((e)=>(e.field_attributes_increases.map((f)=>(console.log(f.field_attribute.name + ": " + f.field_attribute_increase_amount )))))
    return(
        <Layout>
            <Head>
            <title>Races</title>
            <meta
            name="description"
            content="An overview of all races."/>
            </Head>
            <div style={{padding:"1rem"}}>
                <div className={base.pageheadercontainer}>
                        <h1 className={base.pageheader} >Races</h1>
                        <hr style={{border:"solid darkblue 2px",marginLeft:"auto",marginRight:"auto", width:"85%"}}/>
                </div>   
                <div className={classStyles.CardContainer}>
                    {nodes.map((e)=>(

                    
                      <RaceCard key={e.id}
                      name={e.title} path={e.path.alias} attribute_increases={nodes.map((e)=>(e.field_attributes_increases.map((f)=>({
                        name:f.field_attribute.name,
                        amount:f.field_attribute_increase_amount
                      }))))}/>
                    

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
      "node--race",
      context,
      {
        params: {
          "fields[node--race]":
            "title,body,path,uid,field_attributes_increases",
          include: "field_attributes_increases.field_attribute,field_attributes_increases.paragraph_type",
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












