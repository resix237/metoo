"use server"
import { scrapeLinkedInProfile } from "@/lib/services";


async function scrapeLinkedInProfileAction(url:string) {
    return scrapeLinkedInProfile(url);
}

export {
    scrapeLinkedInProfileAction
}