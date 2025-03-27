import { Gender } from "./gender";

export interface Member {
    id : number;
    usename : string;
    email : string;
    elo : number;
    gender : Gender;
}