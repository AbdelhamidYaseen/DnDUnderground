
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
          content="the Homepage"
        />
      </Head>
      <div className={homeStyles.Container}>

        <div className={homeStyles.HeroCharacters}>
          
        </div>

        <div className={homeStyles.GuidesDiv}>
          guides

          <button>[go to guides page]</button>
        </div>


        <div className={homeStyles.WikiDiv}>
          <div style={{display:"flex", height:"100%"}}>
            <div className={homeStyles.WikiDivItem}>
                <h3>Artefacts</h3>
                <p></p>
                <button>[go to artefacts]</button>
            </div>
            <div className={homeStyles.WikiDivItemActive}>
                <h3>Classes</h3>
                <p></p>
                <button>[go to classes]</button>
            </div>
            <div className={homeStyles.WikiDivItem}>
                <h3>Conditions</h3>
                <p></p>
                <button>[go to conditions]</button>
            </div>
            <div className={homeStyles.WikiDivItem}>
                <h3>Feats</h3>
                <p></p>
                <button>[go to feats]</button>
            </div>
            <div className={homeStyles.WikiDivItem}>
                <h3>Monsters</h3>
                <p></p>
                <button>[go to monsters]</button>
            </div>
            <div className={homeStyles.WikiDivItem}>
                <h3>Spells</h3>
                <p></p>
                <button>[go to spells]</button>
            </div>
          </div>
        </div>


      </div>
    </Layout>
  )
}

