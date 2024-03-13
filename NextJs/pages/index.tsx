
/*
  * Homepage
  * TODO
*/

import Head from "next/head"
import { Layout } from "components/layout"

import homeStyles from "/styles/home.css/home.module.scss";
import Image from "next/image";


export default function IndexPage({nodes}) {
  
  return (
    <Layout>
      <Head>
        <title>Home</title>
        <meta
          name="Home"
          content="the Homepage containing the recent blog posts and an introduction to the owner"
        />
      </Head>
      <div className={homeStyles.Container}>

        <div>
          <div>
            hero
          </div>
          <div>
            hero text
          </div>
        </div>

        <div className={homeStyles.HeroCharacters}>
          characters
        </div>

        <div>
          wiki
          <div>item1</div>
          <div>item2</div>
          <div>item3</div>
          <div>item4</div>
          <div>item5</div>
          <div>item6</div>
          [go to wiki page]
        </div>

        <div>
          guides
          [to guides page button]
        </div>

      </div>
    </Layout>
  )
}

