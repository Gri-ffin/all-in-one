import { MYANIMELIST_API } from "@/constants"
import axios from "axios"

export const getAnimeDetails = async (id: number) => {
  const response = await axios.get(`${MYANIMELIST_API}/anime/${id}/full`)
  return response.data
}
