import db from "@/db/db";
import { auto_repair_shops } from "@/db/schema/autorepairshop.schema";
import { convinience_stores } from "@/db/schema/conviniencestore.schema";
import fuel_station from "@/db/schema/fuelstation.schema";
import { hotels } from "@/db/schema/hotel.schema";
import { restaurants } from "@/db/schema/restaurant.schema";
import { services } from "@/db/schema/service.schema";
import { shifts } from "@/db/schema/shift.schema";
import { users } from "@/db/schema/user.schema";
import { and, eq } from "drizzle-orm";

class ServiceDao {
    constructor() { }

    async findAll(type: "hotel" | "restaurant" | "fuel_station" | "auto_repair_shop" | "convinience_store"): Promise<{
        longtitude: string;
        latitude: string;
        name: string;
        provider: string;
        providerName: string;
        shifts: { startTime: string, endTime: string }[],
    }[]> {
        let serviceIds;

        switch (type) {
            case "hotel":
                serviceIds = db.select({
                    longtitude: hotels.longtitude,
                    latitude: hotels.latitude
                })
                    .from(hotels)
                    .as("service_ids");
                break;
            case "restaurant":
                serviceIds = db.select({
                    longtitude: restaurants.longtitude,
                    latitude: restaurants.latitude
                })
                    .from(restaurants)
                    .as("service_ids");
                break;
            case "fuel_station":
                serviceIds = db.select({
                    longtitude: fuel_station.longtitude,
                    latitude: fuel_station.latitude
                })
                .from(fuel_station)
                .as("service_ids");
                break;
            case "auto_repair_shop":
                serviceIds = db.select({
                    longtitude: auto_repair_shops.longtitude,
                    latitude: auto_repair_shops.latitude
                })
                .from(auto_repair_shops)
                .as("service_ids");
                break;
            case "convinience_store":
                serviceIds = db.select({
                    longtitude: convinience_stores.longtitude,
                    latitude: convinience_stores.latitude
                })
                .from(convinience_stores)
                .as("service_ids");
                break;
        }

        const serviceList = db.select()
            .from(services)
            .where(and(
                eq(services.longtitude, serviceIds.longtitude),
                eq(services.latitude, serviceIds.latitude)
            ))
            .as("service_list");

        const providerServices = await db.select({
            longtitude: services.longtitude,
            latitude: services.latitude,
            name: services.name,
            provider: services.provider,
            providerName: users.name
        })
            .from(serviceList)
            .innerJoin(users, eq(serviceList.provider, users.id));

        const result = providerServices.map(async (service) => {
            const serviceShifts = await db.select({
                startTime: shifts.start_time,
                endTime: shifts.end_time
            })
                .from(shifts)
                .where(and(
                    eq(shifts.longtitude, service.longtitude),
                    eq(shifts.latitude, service.latitude)
                ));

            return { ...service, shifts: serviceShifts };
        })

        return await Promise.all(result);
    }

    async create(
        longtitude: string,
        latitude: string,
        name: string,
        type: "hotel" | "restaurant" | "fuel_station" | "auto_repair_shop" | "convinience_store",
        provider: string
    ) {
        const result = await db.insert(services)
            .values({ longtitude, latitude, name, provider })
            .returning({ longtitude: services.longtitude, latitude: services.latitude });

        const { longtitude: newLongtitude, latitude: newLatitude } = result[0];
        
        switch (type) {
            case "hotel":
                await db.insert(hotels)
                    .values({ longtitude: newLongtitude, latitude: newLatitude })
                break;
            case "restaurant":
                await db.insert(restaurants)
                    .values({ longtitude: newLongtitude, latitude: newLatitude })
                break;
            case "fuel_station":
                await db.insert(fuel_station)
                    .values({ longtitude: newLongtitude, latitude: newLatitude })
                break;
            case "auto_repair_shop":
                await db.insert(auto_repair_shops)
                    .values({ longtitude: newLongtitude, latitude: newLatitude })
                break;
            case "convinience_store":
                await db.insert(convinience_stores)
                    .values({ longtitude: newLongtitude, latitude: newLatitude })
                break;
        }
    }
}

export const serviceDao = new ServiceDao();