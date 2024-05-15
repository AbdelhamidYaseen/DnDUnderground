import Link from "next/link"

import { drupal } from "lib/drupal"

import diceStyles from "/styles/dice.css/dice.module.scss";
import { useState } from "react";
export interface LayoutProps {
  children?: React.ReactNode
}

export function Layout({ children}) {
  const [Visibilty, setVisibility] = useState<boolean>(false);
  const [d4Amount, setd4Amount] = useState<number>(0);
  const [d6Amount, setd6Amount] = useState<number>(0);
  const [d8Amount, setd8Amount] = useState<number>(0);
  const [d100Amount, setd100Amount] = useState<number>(0);
  const [d10Amount, setd10Amount] = useState<number>(0);
  const [d12Amount, setd12Amount] = useState<number>(0);
  const [d20Amount, setd20Amount] = useState<number>(0);

  const [total, setTotal] = useState<number>(0);

  function getRandomNumber(max: number): number {
    const randomNumber = Math.random();
    
    const scaledNumber = randomNumber * (max - 1 + 1);
    
    const result = Math.floor(scaledNumber) + 1;
    
    return result;
  }
  function rollAmountOfDiceAndGetSum(diceType:number, diceAmount:number):number{
    let result = 0;

    for (let index = 0; index < diceAmount; index++) {
     result = result + getRandomNumber(diceType); 
    }


    return result;
  }
  const CalculateDiceRollTotal = () =>{
    setTotal(0);

    const d4Value = rollAmountOfDiceAndGetSum(4,d4Amount);
    const d6Value = rollAmountOfDiceAndGetSum(6,d6Amount);
    const d8Value = rollAmountOfDiceAndGetSum(8,d8Amount);
    const d100Value = rollAmountOfDiceAndGetSum(100,d100Amount);
    const d10Value = rollAmountOfDiceAndGetSum(10,d10Amount);
    const d12Value = rollAmountOfDiceAndGetSum(12,d12Amount);
    const d20Value = rollAmountOfDiceAndGetSum(20,d20Amount);

    setTotal(prevTotal => prevTotal + d4Value + d6Value + d8Value + d100Value + d10Value + d12Value + d20Value);

    setd4Amount(0);
    setd6Amount(0);
    setd8Amount(0);
    setd100Amount(0);
    setd10Amount(0);
    setd12Amount(0);
    setd20Amount(0);
  }

  return (
    <>
      <div>
        <main>{children}</main>
        <div className={diceStyles.navigation}>
        <div className={diceStyles.menuToggle} onClick={e=>setVisibility(!Visibilty)}></div>
          <div className={diceStyles.menu} style={{display:Visibilty ? "block" : "none"}}>
            <ul style={{display:Visibilty ? "flex" : "none", flexDirection:"column", justifyContent:"center",alignItems:"center"}}>
              <li className={diceStyles.diceItem} onClick={e=>setd20Amount(d20Amount+1)}>{d20Amount}<p className={diceStyles.diceItemText}>d20</p></li>
              <li className={diceStyles.diceItem} onClick={e=>setd12Amount(d12Amount+1)}>{d12Amount}<p className={diceStyles.diceItemText}>d12</p></li>
              <li className={diceStyles.diceItem} onClick={e=>setd10Amount(d10Amount+1)}>{d10Amount}<p className={diceStyles.diceItemText}>d10</p></li>
              <li className={diceStyles.diceItem} onClick={e=>setd100Amount(d100Amount+1)}>{d100Amount}<p className={diceStyles.diceItemText}>d100</p></li>
              <li className={diceStyles.diceItem} onClick={e=>setd8Amount(d8Amount+1)}>{d8Amount}<p className={diceStyles.diceItemText}>d8</p></li>
              <li className={diceStyles.diceItem} onClick={e=>setd6Amount(d6Amount+1)}>{d6Amount}<p className={diceStyles.diceItemText}>d6</p></li>
              <li className={diceStyles.diceItem} onClick={e=>setd4Amount(d4Amount+1)}>{d4Amount}<p className={diceStyles.diceItemText}>d4</p></li>
            </ul>
            <div style={{display:Visibilty ? "flex" : "none"}} className={diceStyles.TotalContainer}> 
              <div className={diceStyles.Total}>{total}</div>
              <div className={diceStyles.Roll} onClick={CalculateDiceRollTotal}>Roll</div>
            </div>
            
          </div>
        </div>

    </div>
    </>
  )
}

