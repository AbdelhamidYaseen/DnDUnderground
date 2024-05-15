
/*
  * Homepage
  * TODO
*/

import Head from "next/head"
import { Layout } from "components/layout"

import homeStyles from "/styles/home.css/home.module.scss";
import Image from "next/image";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import { drupal } from "lib/drupal";
import { DrupalJsonApiParams } from "drupal-jsonapi-params";
import { CustomSession } from "./api/auth/[...nextauth]";
import loginStyles from "/styles/login.css/login.module.scss";


export default function IndexPage() {

  return(
    <>
      <h1>Homepage</h1>
      <div className={loginStyles.AccountContainer2} >
        <p>Create custom components for your games</p>
        <p>Have a custom account with custom saved values</p>
        <p>Prepare your best game
        </p>
        <div className={loginStyles.ButtonContainer}>
            <a className={loginStyles.LoginButton} href="/wiki">start your journey here</a>
          </div>

      </div>
    </>
  )
}


