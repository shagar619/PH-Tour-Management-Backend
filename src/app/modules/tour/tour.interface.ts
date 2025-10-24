import { Types } from "mongoose";


export interface ITourType {
     name: string;
}


export interface ITour {
     title: string;
     slug: string;
     description?: string;
     image?: string;
     location?: string;
     costFrom?: number;
     startDate?: Date;
     endDate?: Date;
     included?: string[];
     excluded?: string[];
     amenities?: string[];
     tourPlan?: string[];
     tourType?: Types.ObjectId;
     maxGuests?: number;
     minAge?: number;
     division: Types.ObjectId;
}