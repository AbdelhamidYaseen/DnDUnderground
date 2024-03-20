import { Layout } from "components/layout";
import { DrupalJsonApiParams } from "drupal-jsonapi-params";
import { drupal } from "lib/drupal";
import { GetServerSidePropsResult } from "next";
import { DrupalNode } from "next-drupal";
import Head from "next/head";
import base from "/styles/layout.css/layout.module.scss";
import { Condition } from "components/condition-components/node--condition";

interface IndexPageProps {
  nodes: DrupalNode[];
}

const Page = ({nodes}:IndexPageProps) => {
  return (
    <Layout>
      <Head>
        <title>Conditions</title>
        <meta name="description" content="An overview of all conditions" />
      </Head>
        
      <div style={{ padding: "1rem" }}>
        <div className={base.pageheadercontainer}>
          <h1 className={base.pageheader}>Conditions </h1>
          <hr
            style={{
              border: "solid darkblue 2px",
              marginLeft: "auto",
              marginRight: "auto",
              width: "85%",
            }}
          />
        </div>
        <div style={{ marginLeft: "auto", marginRight: "auto", width: "85%" }}>
            <Condition
                items={[...nodes.map((e)=>(e))]}
            />

        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(
  context
): Promise<GetServerSidePropsResult<IndexPageProps>> {
  const params = new DrupalJsonApiParams()
    .addFields("node--condition", [
      "title",
      "path",
      "uid",
      "body",
      "field_condition_image"
    ])
    .addInclude(["field_condition_image"])

  const nodes = await drupal.getResourceCollectionFromContext<DrupalNode[]>(
    "node--condition",
    context,
    {
      params: params.getQueryObject(),
    }
  );

  return {
    props: {
      nodes,
    },
  };
}

export default Page;
