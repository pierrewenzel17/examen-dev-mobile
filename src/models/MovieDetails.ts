import Genre from "./Genre"

export default interface MovieDetails {
  title: string
  release_date: string
  genres: Array<Genre>
  runtime:number
  overview:string
  cast:Array<string>
}