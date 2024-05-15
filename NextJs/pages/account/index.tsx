
/*
  * Homepage
  * TODO
*/

import Head from "next/head"
import { Layout } from "components/layout"

import loginStyles from "/styles/login.css/login.module.scss";
import Image from "next/image";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { drupal } from "lib/drupal";
import { DrupalJsonApiParams } from "drupal-jsonapi-params";
import { CustomSession } from "pages/api/auth/[...nextauth]";
import { log } from "console";


export default function IndexPage({users}) {
  const { data: session } = useSession()
  console.log(users)
  if(session) {
    return(
      <Layout>
      <Head>
        <title>Home</title>
        <meta
          name="Home"
          content="the Homepage"
        />
      </Head>
      <div className={loginStyles.Container}>
        <div className={loginStyles.AccountContainer}>
          <h2 className={loginStyles.User}>{users[0].name}</h2>
            <div className={loginStyles.LabelHolder}> 
            
              <label className={loginStyles.Label}>id</label>
              <br />
              <p className={loginStyles.Value}>{users[0].id}</p>
              <br />
              <label className={loginStyles.Label}>display_name</label>
              <br />
              <p className={loginStyles.Value}>{users[0].display_name}</p>
              <br />
              <label className={loginStyles.Label}>created</label>
              <br />
              <p className={loginStyles.Value}>{users[0].created}</p>
              <br />
              <label className={loginStyles.Label}>changed</label>
              <br />
              <p className={loginStyles.Value}>{users[0].changed}</p>
            
            </div>
            <div className={loginStyles.ButtonContainer}>
            <button className={loginStyles.LoginButton} onClick={() => signOut()}>Sign out</button>
          </div>
        </div>
      </div>
    </Layout>

    )
  }
  return( 
    <Layout>
    <Head>
      <title>Home</title>
      <meta
        name="Home"
        content="the Homepage"
      />
    </Head>
      <div className={loginStyles.Container}>
        <div className={loginStyles.AccountContainer2}>
          <p>Not signed in </p>
          <br/>
          <button className={loginStyles.LoginButton} onClick={() => signIn()}>Sign in</button>
        </div>
      </div>
  </Layout>

  )
}


export async function getServerSideProps(context) {
	const session = await getSession(context)
  const customSession = session as CustomSession
	if (session) {
		// Using next-drupal
    //console.log(session)
    const params = new DrupalJsonApiParams()
    //.addInclude(["attributes.name"])
    .addFilter("uid",customSession.id)
    const users = await drupal.getResourceCollection("user--user",{
      params: params.getQueryObject()
      ,
      withAuth: session.accessToken
    })
    return {
      props:{
      users:users
    }
  }
  }
  return{
    props:{
      users: null
    }
  }
}