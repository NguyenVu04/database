'use server';

import { userDao } from "../dao/UserDao";

export default async function signUp(
    role: string,
    email: string,
    username: string,
    password: string,
    dob: string,
    gender: string,
    phoneNumbers: string[], // Start with one empty phone number field
): Promise<string> {
    const id = await userDao.create({
        email: email,
        name: username,
        password: password,
        date_of_birth: new Date(dob),
        gender: gender as "male" | "female",
        phone_numbers: phoneNumbers,
    }, role as "visitor" | "journalist" | "service_provider" | "tour_guide");
    return id;
}