import { AdSaveDto } from './models/AdSaveDto';
import express from 'express'
import { PrismaClient } from '@prisma/client'
import { convertHoursToMinutes } from './utils/convert-hours-to-minutes'
import { convertMinutesToHours } from './utils/convert-minutes-to-hours';
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

const prisma = new PrismaClient({
  log: ['query']
})

app.get('/games', async(req, res) => {
  const games = await prisma.games.findMany({
    include: {
      _count: {
        select: {
          ads: true
        }
      }
    }
  })

  return res.status(200).json(games)
})

app.get('/games/:id/ads', async(req, res) => {
  const gameId = req.params.id

  const ads = await prisma.ads.findMany({
    select: {
      id: true,
      name: true,
      weeksDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hoursStart: true,
      hoursEnd: true
    },
    where: {
      gamesId: gameId,
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return res.status(200).json(ads.map(ad => {
    return {
      ...ad,
      weeksDays: ad.weeksDays.split(','),
      hoursStart: convertMinutesToHours(ad.hoursStart),
      hoursEnd: convertMinutesToHours(ad.hoursEnd)
    }
  }))
})

app.get('/ads/:id/discord', async(req, res) => {
  const adId = req.params.id

  const ad = await prisma.ads.findFirstOrThrow({
    select: {
      discord: true
    },
    where: {
      id: adId
    }
  })

  return res.status(200).json(ad)
})

app.post('/games/:id/ads', async(req, res) => {
  const gamesId: string = req.params.id
  const body: AdSaveDto = req.body

  console.log(body)
  const ad = await prisma.ads.create({
    data: {
      gamesId,
      name: body.name,  
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weeksDays: body.weeksDays.join(','),
      hoursStart: convertHoursToMinutes(body.hoursStart),
      hoursEnd: convertHoursToMinutes(body.hoursEnd),
      useVoiceChannel: body.useVoiceChannel,
    }
  })

  return res.status(201).json(ad)
})

app.listen(3333)