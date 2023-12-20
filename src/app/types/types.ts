import { Dispatch, ReactEventHandler, SetStateAction } from "react"

type Appearance = {
    gender: string,
  }
  
type Biography = {
    publisher: string
  }

type Images = {
    lg: string,
  }
  
type TypeModal = {
  char: CharModal[],
  closeModal: ReactEventHandler,
}

type PowerStats = {
    combat: number,
    durability: number,
    intelligence: number,
    power: number,
    speed: number,
    strength: number
  }

type PowerColor = {
  combat: string,
  durability: string,
  intelligence: string,
  power: string,
  speed: string,
  strength: string
}

export interface PropsChildren {
  children: string
}

export interface Char extends WinnerType{
    appearance: Appearance,
    biography: Biography,
    images: Images,
    powerstats: PowerStats,
}

export interface CharModal extends WinnerType {
  power: PowerStats,
  image: string,
  colorScheme?: PowerColor,
  winner?: boolean
}

export interface CharProps extends CharModal {
    appearance: Appearance,
    publisher: string,
    select: any
}

export interface PropsChar {
    props: CharProps,
}

export interface PropsModal {
  props: TypeModal
}

export interface ThemeTypes {
  search: string,
  setSearch: Dispatch<SetStateAction<string>>,
} 

export interface WinnerType {
  name: string,
  id: number
}
