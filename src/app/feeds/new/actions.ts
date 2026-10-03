"use server";
import { z } from "zod";

const feedSchema=z.object({name:z.string().trim().min(3,"Use at least 3 characters").max(60),topics:z.string().trim().min(1,"Add at least one topic"),location:z.string().trim().min(1,"Choose a location"),timeRange:z.enum(["24h","48h","3d","7d","30d"])});
export type FeedActionState={success:boolean;message:string;errors?:Record<string,string[]>};
export async function createFeed(_state:FeedActionState,formData:FormData):Promise<FeedActionState>{const parsed=feedSchema.safeParse(Object.fromEntries(formData));if(!parsed.success)return{success:false,message:"Review the highlighted fields.",errors:z.flattenError(parsed.error).fieldErrors};return{success:true,message:`“${parsed.data.name}” is valid. Saving is preview-only until Supabase is connected.`}}
