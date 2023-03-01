import { BingChat } from 'bing-chat'
import * as dotenv from 'dotenv'
dotenv.config()

export const getBingResponse = async (_event:Electron.IpcMainEvent, query: string) => {
  const api = new BingChat({
    cookie: process.env.BING_COOKIE
  })
  const res = await api.sendMessage(query)
  return res
}