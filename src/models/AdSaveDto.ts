export interface AdSaveDto {
  name: string,
  yearsPlaying: number,
  discord: string,
  weeksDays: Array<number>,
  hoursStart: string,
  hoursEnd: string,
  useVoiceChannel: boolean
}