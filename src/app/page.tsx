'use client'

import styles from './page.module.css'
import { useEffect, useState, useContext } from 'react'
import CharCard from './components/card/charCard'
import NavBar from './components/navBar/navBar'
import { Search } from '@/app/contexts/search';
import { Char, CharModal, ThemeTypes } from './types/types'
import ModalComponent from './components/modal/modalComponent'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export default function Home() {
  const [characters, setCharacters] = useState<Char[]>([])
  const { search, setSearch } = useContext<ThemeTypes>(Search)
  const [charInfo, setCharInfo] = useState<CharModal[]>([])
  const [open, setOpen] = useState<boolean>(false)
  const [loading, setLoading] = useState(false)

  async function getData() {
    const data = await fetch("http://homologacao3.azapfy.com.br/api/ps/metahumans")
    let dataJson = await data.json()
    if(search !== "") {
      dataJson = await dataJson.filter((data: Char) => data.name.toLowerCase().includes(search))
    }
    setCharacters(dataJson)
    setLoading(true)
  }

  function checkWinner({ power: power1 }: CharModal, { power: power2 }: CharModal) {
    let charOne = 0
    let charTwo = 0

    const green = "#00e676"
    const red = "#f44336"
    const grey = "#808080"

    let colorScheme = {
      charColor1: { combat: red, durability: red, intelligence: red, power: red, strength: red, speed: red},
      charColor2: { combat: red, durability: red, intelligence: red, power: red, strength: red, speed: red}
    }

    if(power1.combat > power2.combat) {
      charOne++ 
      colorScheme.charColor1.combat = green
    } else if(power1.combat < power2.combat) {
      charTwo++
      colorScheme.charColor2.combat = green
    } 
    else {
      colorScheme.charColor1.combat = grey
      colorScheme.charColor2.combat = grey
    }

    
    if(power1.durability > power2.durability) {
      charOne++
      colorScheme.charColor1.durability = green
    } else if(power1.durability < power2.durability) {
      charTwo++
      colorScheme.charColor2.durability = green
    } else {
      colorScheme.charColor1.durability = grey
      colorScheme.charColor2.durability = grey
    }

    if(power1.intelligence > power2.intelligence) {
      charOne++
      colorScheme.charColor1.intelligence = green
    } else if(power1.intelligence < power2.intelligence) {
      charTwo++
      colorScheme.charColor2.intelligence = green
    } else {
      colorScheme.charColor1.intelligence = grey
      colorScheme.charColor2.intelligence = grey
    }

    if(power1.power > power2.power) {
      charOne++
      colorScheme.charColor1.power = green
    } else if(power1.power < power2.power) {
      charTwo++
      colorScheme.charColor2.power = green
    } else {
      colorScheme.charColor1.power = grey
      colorScheme.charColor2.power = grey
    }

    if(power1.speed > power2.speed) {
      charOne++
      colorScheme.charColor1.speed = green
    } else if(power1.speed < power2.speed) {
      charTwo++
      colorScheme.charColor2.speed = green
    }else {
      colorScheme.charColor1.speed = grey
      colorScheme.charColor2.speed = grey
    }

    if(power1.strength > power2.strength) {
      charOne++
      colorScheme.charColor1.strength = green
    } else if(power1.strength < power2.strength){
      charTwo++
      colorScheme.charColor2.strength = green
    }else {
      colorScheme.charColor1.strength = grey
      colorScheme.charColor2.strength = grey
    }

    if(charOne > charTwo ){
      charInfo[0].winner = true
    }
    if(charTwo > charOne) {
      charInfo[1].winner = true
    }

    charInfo[0].colorScheme = colorScheme.charColor1
    charInfo[1].colorScheme = colorScheme.charColor2
  }
  
  useEffect(() => {
    getData()
    
    if(charInfo.length === 2) {
      checkWinner(charInfo[0], charInfo[1])
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [search, charInfo])



function fightChar(char: CharModal) {
  setCharInfo([...charInfo, char])
}

function closeModal() {
  setOpen(false)
  setCharInfo([])
}

  return loading ? (
    <>
      <NavBar/>
      <div className={styles.divBody}>
        <div className={styles.mainDiv}>
          {characters.length === 0 ? <h1 className={styles.error}>Nenhum personagem encontrado.</h1> : '' }
          {characters.map(({ name, id, appearance, images, biography, powerstats }) => (
            <div key={id}>
              <CharCard props={{'select': fightChar, name, id, appearance, 'image': images.lg, 'publisher': biography.publisher, 'power': powerstats }} />
            </div>
          ))}
        </div>
      </div>
      {open && <ModalComponent props={{'char': charInfo, 'closeModal': closeModal}}  /> }
    </>
  ) : (
    <>
    <NavBar />
    <Box className={styles.loading} sx={{ display: 'flex' }}>
      <h1>Carregando...</h1>
      <CircularProgress />
    </Box>
    </>
  )
}
