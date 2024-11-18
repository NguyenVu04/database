import { sql } from "drizzle-orm";
import db from "./db";
//TODO: add trigger for reviews
function main() {
    db.execute(sql`
        CREATE OR REPLACE FUNCTION update_post_date()
        RETURNS TRIGGER AS $$
        BEGIN
            NEW.change_date = now();
            RETURN NEW;
        END;
        $$ LANGUAGE plpgsql;
    `);

    db.execute(sql`
        CREATE TRIGGER check_review_date
        BEFORE INSERT OR UPDATE ON reviews
        FOR EACH ROW
        EXECUTE PROCEDURE update_post_date();
    `);
}   

main();