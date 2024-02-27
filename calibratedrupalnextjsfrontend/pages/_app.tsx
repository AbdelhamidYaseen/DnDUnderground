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

const NavLinks : CustomLinkProps [] = [
  {href:"/characters",name:"Characters"},
  {href:"/beginners-guide",name:"Beginners Guide"},
  {href:"/wiki",name:"Wiki"},
  {href:"/login",name:"Login"},
];
interface CustomLinkProps{
  href: string;
  name: string
}
const CustomLink = (props: CustomLinkProps) =>{
  const router = useRouter();
  const currentRoute = router.pathname;
  return(
    <>
      <li className={navStyles.ListItem}>
        <Link href={props.href} className={currentRoute === props.href ? navStyles.ActiveLink : navStyles.Link}>{props.name}</Link>
      </li>
    </>
  )
}
const NavigationBar = () =>{
    return(
      <nav className={navStyles.Navigation}>
        <ul className={navStyles.NavigationList}>
          {NavLinks.map((e)=>(
            <>
              <CustomLink href={e.href} name={e.name} />
            </>
          ))}
        </ul>
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


export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={layout.__next}>
      <HeaderBar/>
      <Component {...pageProps} />
      <FooterBar/>
    </div>
  )
}

