CREATE TYPE "public"."gender" AS ENUM('male', 'female');--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "added_in" (
	"hash_tag" varchar(64) NOT NULL,
	"post" uuid NOT NULL,
	"visitor" uuid NOT NULL,
	CONSTRAINT "added_in_pkey" PRIMARY KEY("hash_tag","post","visitor")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "admins" (
	"id" serial PRIMARY KEY NOT NULL,
	"password" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "auto_repair_shops" (
	"longtitude" numeric(4) NOT NULL,
	"latitude" numeric(4) NOT NULL,
	CONSTRAINT "auto_repair_shop_pkey" PRIMARY KEY("longtitude","latitude")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "belongs" (
	"parent_comment" uuid NOT NULL,
	"parent_visitor" uuid NOT NULL,
	"parent_post" uuid NOT NULL,
	"child_comment" uuid NOT NULL,
	"child_visitor" uuid NOT NULL,
	"child_post" uuid NOT NULL,
	CONSTRAINT "belongs_pkey" PRIMARY KEY("parent_comment","parent_visitor","parent_post")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "booked" (
	"tour_guide" uuid NOT NULL,
	"visitor" uuid NOT NULL,
	"comment" varchar(100),
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"rating" smallint NOT NULL,
	CONSTRAINT "booked_pkey" PRIMARY KEY("tour_guide","visitor")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "comments" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"visitor" uuid NOT NULL,
	"post" uuid NOT NULL,
	"content" varchar(100) NOT NULL,
	"sender" uuid NOT NULL,
	"comment_date" date DEFAULT now() NOT NULL,
	CONSTRAINT "comment_pkey" PRIMARY KEY("id","visitor","post")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "configuration" (
	"key" varchar PRIMARY KEY NOT NULL,
	"value" varchar NOT NULL,
	"admin_id" serial NOT NULL,
	"change_date" date DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "convinience_stores" (
	"longtitude" numeric(4) NOT NULL,
	"latitude" numeric(4) NOT NULL,
	CONSTRAINT "convinience_store_pkey" PRIMARY KEY("longtitude","latitude")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "fuel" (
	"longtitude" numeric(4) NOT NULL,
	"latitude" numeric(4) NOT NULL,
	"fuel_price" numeric NOT NULL,
	"fuel_type" varchar NOT NULL,
	CONSTRAINT "fuel_pkey" PRIMARY KEY("longtitude","latitude","fuel_price","fuel_type")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "fuel_station" (
	"longtitude" numeric(4) NOT NULL,
	"latitude" numeric(4) NOT NULL,
	CONSTRAINT "fuel_station_pkey" PRIMARY KEY("longtitude","latitude")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hashtags" (
	"name" varchar(64) PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hotels" (
	"longtitude" numeric(4) NOT NULL,
	"latitude" numeric(4) NOT NULL,
	CONSTRAINT "hotel_pkey" PRIMARY KEY("longtitude","latitude")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "hotel_rooms" (
	"longtitude" numeric(4) NOT NULL,
	"latitude" numeric(4) NOT NULL,
	"room_type" varchar(16) NOT NULL,
	"room_price" integer NOT NULL,
	CONSTRAINT "hotel_room_pkey" PRIMARY KEY("longtitude","latitude","room_type","room_price")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "include" (
	"longtitude" numeric(4) NOT NULL,
	"latitude" numeric(4) NOT NULL,
	"post" uuid NOT NULL,
	"visitor" uuid NOT NULL,
	"star" smallint NOT NULL,
	CONSTRAINT "include_pkey" PRIMARY KEY("longtitude","latitude","post","visitor")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "items" (
	"longtitude" numeric(4) NOT NULL,
	"latitude" numeric(4) NOT NULL,
	"price" integer NOT NULL,
	"name" varchar(16) NOT NULL,
	CONSTRAINT "item_pkey" PRIMARY KEY("longtitude","latitude","price","name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "journalists" (
	"id" uuid PRIMARY KEY NOT NULL,
	"date_of_employment" date NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "menu" (
	"longtitude" numeric(4) NOT NULL,
	"latitude" numeric(4) NOT NULL,
	"dish_price" integer NOT NULL,
	"dish_name" varchar(16) NOT NULL,
	"dish_description" varchar(64) NOT NULL,
	CONSTRAINT "menu_pkey" PRIMARY KEY("longtitude","latitude","dish_price","dish_name","dish_description")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "notes" (
	"trip" uuid NOT NULL,
	"visitor" uuid NOT NULL,
	"time" timestamp NOT NULL,
	"content" varchar(100) NOT NULL,
	CONSTRAINT "note_pkey" PRIMARY KEY("trip","visitor","time","content")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "phone_numbers" (
	"user" uuid NOT NULL,
	"phone_number" varchar(10) NOT NULL,
	CONSTRAINT "phone_number_pkey" PRIMARY KEY("user","phone_number"),
	CONSTRAINT "phone_numbers_phone_number_unique" UNIQUE("phone_number")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "places" (
	"longtitude" numeric(4) NOT NULL,
	"latitude" numeric(4) NOT NULL,
	"address" varchar NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT "place_pkey" PRIMARY KEY("longtitude","latitude")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "posts" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"visitor" uuid NOT NULL,
	"post_date" date DEFAULT now() NOT NULL,
	"content" json NOT NULL,
	CONSTRAINT "posts_pkey" PRIMARY KEY("id","visitor")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "restaurants" (
	"longtitude" numeric(4) NOT NULL,
	"latitude" numeric(4) NOT NULL,
	CONSTRAINT "restaurant_pkey" PRIMARY KEY("longtitude","latitude")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reviews" (
	"longtitude" numeric(4) NOT NULL,
	"latitude" numeric(4) NOT NULL,
	"post_date" date DEFAULT now() NOT NULL,
	"star" smallint NOT NULL,
	"content" json NOT NULL,
	"journalist" uuid NOT NULL,
	CONSTRAINT "reviews_pkey" PRIMARY KEY("longtitude","latitude","post_date"),
	CONSTRAINT "star_check" CHECK ("reviews"."star" between 1 and 5)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "room_devices" (
	"longtitude" numeric(4) NOT NULL,
	"latitude" numeric(4) NOT NULL,
	"room_type" varchar(16) NOT NULL,
	"room_price" integer NOT NULL,
	"device_name" varchar(16) NOT NULL,
	"device_quantity" integer NOT NULL,
	CONSTRAINT "room_service_pkey" PRIMARY KEY("longtitude","latitude","room_type","room_price","device_name","device_quantity")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "services" (
	"longtitude" numeric(4) NOT NULL,
	"latitude" numeric(4) NOT NULL,
	"name" varchar NOT NULL,
	"provider" uuid NOT NULL,
	CONSTRAINT "service_pkey" PRIMARY KEY("longtitude","latitude")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "service_providers" (
	"id" uuid PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "shifts" (
	"longtitude" numeric(4) NOT NULL,
	"latitude" numeric(4) NOT NULL,
	"start_time" time NOT NULL,
	"end_time" time NOT NULL,
	CONSTRAINT "shift_pkey" PRIMARY KEY("longtitude","latitude","start_time","end_time"),
	CONSTRAINT "time_check" CHECK ("shifts"."start_time" < "shifts"."end_time")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "through" (
	"trip" uuid NOT NULL,
	"visitor" uuid NOT NULL,
	"longtitude" numeric(4) NOT NULL,
	"latitude" numeric(4) NOT NULL,
	"arrived_date" date NOT NULL,
	"arrived_hour" smallint NOT NULL,
	"departured_date" date NOT NULL,
	"departured_hour" smallint NOT NULL,
	CONSTRAINT "date_check" CHECK ("through"."arrived_date" <= "through"."departured_date"),
	CONSTRAINT "hour_check" CHECK ("through"."arrived_hour" <= "through"."departured_hour"),
	CONSTRAINT "valid_arrived_hour_check" CHECK ("through"."arrived_hour" between 0 and 23),
	CONSTRAINT "valid_departured_hour_check" CHECK ("through"."departured_hour" between 0 and 23),
	CONSTRAINT "arrived_before_departured_check" CHECK (("through"."arrived_date" < "through"."departured_date") OR ("through"."arrived_date" = "through"."departured_date" AND "through"."arrived_hour" < "through"."departured_hour"))
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tour_guide" (
	"id" uuid PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "trips" (
	"id" uuid DEFAULT gen_random_uuid() NOT NULL,
	"visitor" uuid NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	CONSTRAINT "trip_pkey" PRIMARY KEY("id","visitor")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"email" varchar NOT NULL,
	"name" varchar NOT NULL,
	"date_of_birth" date NOT NULL,
	"password" varchar NOT NULL,
	"gender" "gender" NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "age_check" CHECK ("users"."date_of_birth" + interval '18 years' <= now())
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "vehicles" (
	"longtitude" numeric(4) NOT NULL,
	"latitude" numeric(4) NOT NULL,
	"type" varchar(16) NOT NULL,
	CONSTRAINT "vehicle_pkey" PRIMARY KEY("longtitude","latitude","type")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "visitors" (
	"id" uuid PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "warn" (
	"admin_id" serial NOT NULL,
	"user" uuid NOT NULL,
	"content" varchar(64) NOT NULL,
	CONSTRAINT "warn_pkey" PRIMARY KEY("admin_id","user")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "work_at" (
	"longtitude" numeric(4) NOT NULL,
	"latitude" numeric(4) NOT NULL,
	"tour_guide" uuid NOT NULL,
	"start_date" date NOT NULL,
	CONSTRAINT "work_at_pkey" PRIMARY KEY("longtitude","latitude","tour_guide"),
	CONSTRAINT "start_date_check" CHECK ("work_at"."start_date" <= now())
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "added_in" ADD CONSTRAINT "added_in_hash_tag_hashtags_name_fk" FOREIGN KEY ("hash_tag") REFERENCES "public"."hashtags"("name") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "added_in" ADD CONSTRAINT "post_fkey" FOREIGN KEY ("post","visitor") REFERENCES "public"."posts"("id","visitor") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "auto_repair_shops" ADD CONSTRAINT "place_fkey" FOREIGN KEY ("longtitude","latitude") REFERENCES "public"."services"("longtitude","latitude") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "belongs" ADD CONSTRAINT "parent_comment_fkey" FOREIGN KEY ("parent_comment","parent_visitor","parent_post") REFERENCES "public"."comments"("id","visitor","post") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "belongs" ADD CONSTRAINT "child_comment_fkey" FOREIGN KEY ("child_comment","child_visitor","child_post") REFERENCES "public"."comments"("id","visitor","post") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "booked" ADD CONSTRAINT "booked_tour_guide_tour_guide_id_fk" FOREIGN KEY ("tour_guide") REFERENCES "public"."tour_guide"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "booked" ADD CONSTRAINT "booked_visitor_visitors_id_fk" FOREIGN KEY ("visitor") REFERENCES "public"."visitors"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "comments_sender_visitors_id_fk" FOREIGN KEY ("sender") REFERENCES "public"."visitors"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "comments" ADD CONSTRAINT "post_fkey" FOREIGN KEY ("visitor","post") REFERENCES "public"."posts"("visitor","id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "configuration" ADD CONSTRAINT "configuration_admin_id_admins_id_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."admins"("id") ON DELETE set null ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "convinience_stores" ADD CONSTRAINT "convinience_store_fkey" FOREIGN KEY ("longtitude","latitude") REFERENCES "public"."services"("longtitude","latitude") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fuel" ADD CONSTRAINT "place_fkey" FOREIGN KEY ("longtitude","latitude") REFERENCES "public"."fuel_station"("longtitude","latitude") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "fuel_station" ADD CONSTRAINT "place_fkey" FOREIGN KEY ("longtitude","latitude") REFERENCES "public"."services"("longtitude","latitude") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hotels" ADD CONSTRAINT "place_fkey" FOREIGN KEY ("longtitude","latitude") REFERENCES "public"."services"("longtitude","latitude") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "hotel_rooms" ADD CONSTRAINT "place_fkey" FOREIGN KEY ("longtitude","latitude") REFERENCES "public"."hotels"("longtitude","latitude") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "include" ADD CONSTRAINT "place_fkey" FOREIGN KEY ("longtitude","latitude") REFERENCES "public"."places"("longtitude","latitude") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "include" ADD CONSTRAINT "post_fkey" FOREIGN KEY ("post","visitor") REFERENCES "public"."posts"("id","visitor") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "items" ADD CONSTRAINT "convinience_store_fkey" FOREIGN KEY ("longtitude","latitude") REFERENCES "public"."convinience_stores"("longtitude","latitude") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "journalists" ADD CONSTRAINT "journalists_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "menu" ADD CONSTRAINT "restaurant_fkey" FOREIGN KEY ("longtitude","latitude") REFERENCES "public"."restaurants"("longtitude","latitude") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "notes" ADD CONSTRAINT "trip_fkey" FOREIGN KEY ("trip","visitor") REFERENCES "public"."trips"("id","visitor") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "phone_numbers" ADD CONSTRAINT "phone_numbers_user_users_id_fk" FOREIGN KEY ("user") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "posts" ADD CONSTRAINT "posts_visitor_visitors_id_fk" FOREIGN KEY ("visitor") REFERENCES "public"."visitors"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "restaurants" ADD CONSTRAINT "place_fkey" FOREIGN KEY ("longtitude","latitude") REFERENCES "public"."services"("longtitude","latitude") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reviews" ADD CONSTRAINT "reviews_journalist_journalists_id_fk" FOREIGN KEY ("journalist") REFERENCES "public"."journalists"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "reviews" ADD CONSTRAINT "place_fkey" FOREIGN KEY ("longtitude","latitude") REFERENCES "public"."places"("longtitude","latitude") ON DELETE cascade ON UPDATE cascade;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "room_devices" ADD CONSTRAINT "hotel_room_fkey" FOREIGN KEY ("longtitude","latitude","room_type","room_price") REFERENCES "public"."hotel_rooms"("longtitude","latitude","room_type","room_price") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "services" ADD CONSTRAINT "services_provider_service_providers_id_fk" FOREIGN KEY ("provider") REFERENCES "public"."service_providers"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "service_providers" ADD CONSTRAINT "service_providers_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shifts" ADD CONSTRAINT "service_fkey" FOREIGN KEY ("longtitude","latitude") REFERENCES "public"."services"("longtitude","latitude") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "through" ADD CONSTRAINT "trip_fkey" FOREIGN KEY ("trip","visitor") REFERENCES "public"."trips"("id","visitor") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "through" ADD CONSTRAINT "place_fkey" FOREIGN KEY ("longtitude","latitude") REFERENCES "public"."places"("longtitude","latitude") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tour_guide" ADD CONSTRAINT "tour_guide_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "trips" ADD CONSTRAINT "trips_visitor_visitors_id_fk" FOREIGN KEY ("visitor") REFERENCES "public"."visitors"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "vehicles" ADD CONSTRAINT "place_fkey" FOREIGN KEY ("longtitude","latitude") REFERENCES "public"."auto_repair_shops"("longtitude","latitude") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "visitors" ADD CONSTRAINT "visitors_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "warn" ADD CONSTRAINT "warn_admin_id_admins_id_fk" FOREIGN KEY ("admin_id") REFERENCES "public"."admins"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "warn" ADD CONSTRAINT "warn_user_users_id_fk" FOREIGN KEY ("user") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "work_at" ADD CONSTRAINT "work_at_tour_guide_tour_guide_id_fk" FOREIGN KEY ("tour_guide") REFERENCES "public"."tour_guide"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "work_at" ADD CONSTRAINT "place_fkey" FOREIGN KEY ("longtitude","latitude") REFERENCES "public"."places"("longtitude","latitude") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "users_email_unique" ON "users" USING btree ("email");