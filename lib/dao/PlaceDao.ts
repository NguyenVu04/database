import db from "@/db/db";
import { Place, places } from "@/db/schema/place.schema";
import { and, eq, ilike, or } from "drizzle-orm";

class PlaceDao {
    constructor() { }

    async create(place: Place): Promise<Place[]> {
        return await db.insert(places)
            .values(place)
            .returning();
    }

    async findByLongtitudeAndLatitude(longtitude: number, latitude: number): Promise<Place[]> {
        return await db.select()
            .from(places)
            .where(and(
                eq(places.longtitude, longtitude.toFixed(4)),
                eq(places.latitude, latitude.toFixed(4))
            ))
            .limit(1);
    }

    async deleteByLongtitudeAndLatitude(longtitude: number, latitude: number): Promise<Place[]> {
        return await db.delete(places)
            .where(and(
                eq(places.longtitude, longtitude.toFixed(4)),
                eq(places.latitude, latitude.toFixed(4))
            ))
            .returning();
    }

    async updateByLongtitudeAndLatitude(
        longtitude: number,
        latitude: number,
        data: Partial<Omit<Place, "longtitude" | "latitude">>): Promise<Place[]> {
        return await db.update(places)
            .set(data)
            .where(and(
                eq(places.longtitude, longtitude.toFixed(4)),
                eq(places.latitude, latitude.toFixed(4))
            ))
            .returning();
    }

    async findBySearchTerm(searchTerm: string): Promise<Place[]> {
        return await db.select()
            .from(places)
            .where(
                or(
                    ilike(places.address, `%${searchTerm}%`),
                    ilike(places.name, `%${searchTerm}%`)
                )
            );
    }
}

const placeDao = new PlaceDao();
export default placeDao;