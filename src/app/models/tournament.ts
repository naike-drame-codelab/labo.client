import { Category } from "./category";
import { Status } from "./status";

export interface Tournament {
    id : number;
    name : string;
    location : string;
    minPlayers : number;
    maxPlayers : number;
    minElo : number;
    maxElo : number;
    categories: Category[];
    status: Status;
    currentRound : number;
    womenOnly : boolean;
    endOfRegistrationDate : Date;
    createdAt: Date;
    lastUpdatedAt: Date;
}