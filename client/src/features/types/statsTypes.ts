export type StatType = {
    totalSongs: number,
    totalArtists: number,
    totalAlbums: number,
    totalGenres: number,
    songsByGenre: ByFilterType[],
    songsByArtist: ByFilterType[]
    songsByAlbum: ByFilterType[]
}
export type ByFilterType = {
    _id: string,
    count: number,
}

export const STATS = "stats";
export const GET_STATS = `${STATS}/getStats`;