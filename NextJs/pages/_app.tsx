/*
  * This page generates the base layout of the webapp, this contains the header, nav, body and footer that are to be generated on every page
  * To make it easier to generate the navigation the nav is made up of an array of CustomLinkProps each containing the possibilty of containing children for submenus
  * Header is sticky
*/

import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import Link from 'next/link';

import { FiSearch } from "react-icons/fi";

import '/styles/globals.scss';
import navStyles from "/styles/layout.css/nav.module.scss";
import headerStyles from "/styles/layout.css/header.module.scss";
import footerStyles from "/styles/layout.css/footer.module.scss";
import layout from "/styles/layout.css/layout.module.scss";

import Image from 'next/image';
import { useState } from 'react';




//Amount of links in Nav
const NavLinks : CustomLinkProps [] = [
  {href:"/characters",name:"Characters"},
  {href:"/beginners-guide",name:"Beginners Guide"},
  {href:"/wiki",name:"Wiki",childLinks:
    [
      {
        href:"/wiki/artefacts",
        name:"Artefacts",
        
      },
      {
        href:"/wiki/classes",
        name:"Classes",
      },
      {
        href:"/wiki/conditions",
        name:"Conditions",
      },
      {
        href:"/wiki/feats",
        name:"Feats",
      },
      {
        href:"/wiki/monsters",
        name:"Monsters",
      },
      {
        href:"/wiki/spells",
        name:"Spells",
      }
    ]
  },
  {href:"/user",name:"User",childLinks:
    [
      {
        href: '/login',
        name: 'Login'
      },
      {
        href:'/logout',
        name:'Logout'
      },
      {
        href:'/register',
        name:'Register'
      },
    ]
  },
];
//Custom Components
interface CustomLinkProps{
  href: string;
  name: string;
  childLinks?: CustomLinkProps[];
}
const CustomLink = (props: CustomLinkProps) =>{
  const router = useRouter();
  const currentRoute = router.pathname;
  const [showChildLinks, setShowChildLinks] = useState(false);

  const handleMouseEnter = () => {
    if (props.childLinks) {
      setShowChildLinks(true);
    }
  };

  const handleMouseLeave = () => {
    setShowChildLinks(false);
  };
  return(
    <>
      {
        props.childLinks 
        ?
        <li className={navStyles.ListItem} onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>
          <Link href={props.href} className={currentRoute === props.href ? navStyles.ActiveLink : navStyles.Link}>{props.name}
          {showChildLinks && (
          <ul className={navStyles.ChildLinks}>
            {props.childLinks.map(childLink => (
              <li key={childLink.href} className={navStyles.ChildLinksItem}>
                <Link href={childLink.href}>{childLink.name}</Link>
              </li>
            ))}
          </ul>
        )}

          </Link>        
        </li>
        :
        <li className={navStyles.ListItem}>
          <Link href={props.href} className={currentRoute === props.href ? navStyles.ActiveLink : navStyles.Link}>{props.name}</Link>
        </li>
      }
    </>
  )
}
const CustomLinkMobile = (props: CustomLinkProps)=>{
  const router = useRouter();
  const currentRoute = router.pathname;
  const [showChildLinks, setShowChildLinks] = useState(false);

  const handleMouseEnter = () => {
    if (props.childLinks) {
      setShowChildLinks(true);
    }
  };

  const handleMouseLeave = () => {
    setShowChildLinks(false);
  };

  return(
    <>
      {
      props.childLinks
      ?
      <li style={{width:"100%"}}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <Link href={props.href} className={currentRoute === props.href ? navStyles.ActiveLinkMobile : navStyles.LinkMobile}>
        {props.name}
        </Link>
        {
          showChildLinks && (
            <ul className={navStyles.ChildLinksMobile}>
              {props.childLinks.map(childLink => (
                <li key={childLink.href} className={navStyles.ChildLinksItemMobile}>
                  <Link href={childLink.href}>{childLink.name}</Link>
                </li>
              ))}
            </ul>
          )
        }
      </li>
      :
      <li style={{width:"100%"}}>
        <Link href={props.href} className={currentRoute === props.href ? navStyles.ActiveLinkMobile : navStyles.LinkMobile}>
        {props.name}  
        </Link>
      </li>
      }

    </>
  )
}
const NavigationBar = () =>{
  const [MobileNavigation, SetMobileNavigation] = useState<boolean>(false);
    return(
      <nav className={navStyles.Navigation}>
        <ul className={navStyles.NavigationList}>
          {NavLinks.map((e)=>(
              <CustomLink href={e.href} name={e.name} childLinks={e.childLinks} key={e.name}/>
          ))}
        </ul>
        <div className={navStyles.NavigationMobile}>
          <span className={navStyles.MobileMenuButton} onClick={(e)=>SetMobileNavigation(!MobileNavigation)}>
            {MobileNavigation ? <> &#10005; </> : <>&#9776;</>}
          </span>
          {
            MobileNavigation
            ?
            <ul className={navStyles.NavigationListMobile}>
            {
            NavLinks.map((e)=>(
              <>
                <CustomLinkMobile href={e.href} name={e.name} childLinks={e.childLinks}/>
              </>
            ))
            }

            <div className={navStyles.SearchHolder}>
              <form className={navStyles.Search}> 
              <input type="search" className={navStyles.SearchContent} />
              <button type="submit" className={navStyles.SearchButton}><FiSearch /></button>
              </form>
            </div>
          </ul>
            :
            <></>
          }

        </div>
      </nav>
  )
}

const HeaderBar = () =>{
  return(
    <header className={headerStyles.Header}>
        <Link href="/" className={headerStyles.Logo}>
        <img src="/assets/images/logo.png"style={{width:75, height:75, borderRadius:25}} alt=""/>
      </Link>
      <form className={headerStyles.Search}> 
          <input type="search" className={headerStyles.SearchContent} />
          <button type="submit" className={headerStyles.SearchButton}><FiSearch /></button>
      </form>
      <NavigationBar/>
    </header>
  )
}
const FooterBar = () =>{
  return(
      <footer className={footerStyles.Footer}>
       <div>
          Expanded Logo
       </div>
       <div>
          Quick Links
       </div>
      </footer>
  )
}

//Root of project && this will render on every page
export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={layout.__next}>
      <HeaderBar/>
      <Component {...pageProps} />
      <FooterBar/>
    </div>
  )
}

