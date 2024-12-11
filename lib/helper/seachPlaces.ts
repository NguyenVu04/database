'use server';
import placeDao from "../dao/PlaceDao";

export async function searchPlace(searchTerm: string) {
    return placeDao.findBySearchTerm(searchTerm);
}