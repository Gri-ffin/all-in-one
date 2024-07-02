import { MYANIMELIST_API } from "@/constants"
import axios from "axios"

export const getAnimeDetails = async (id: number) => {
  const response = await axios.get(`${MYANIMELIST_API}/anime/${id}/full`)
  return response.data
}

export const getMangaDetails = async (id: number) => {
  const response = await axios.get(`${MYANIMELIST_API}/manga/${id}/full`)
  return response.data
}

export const getAnimeCharacters = async (id: number) => {
  const response = await axios.get(`${MYANIMELIST_API}/anime/${id}/characters`)
  return response.data
}

export const getMangaCharacters = async (id: number) => {
  const response = await axios.get(`${MYANIMELIST_API}/manga/${id}/characters`)
  return response.data
}

export const getCharacterFullById = async (id: number) => {
  const response = await axios.get(`${MYANIMELIST_API}/characters/${id}/full`)
  return response.data
}

export const getVoiceActor = async (id: number) => {
  const response = await axios.get(`${MYANIMELIST_API}/people/${id}/full`)
  return response.data
}
