--Trigger--
CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION hash_passwords()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND NEW.password IS DISTINCT FROM OLD.password) THEN
        NEW.password := crypt(NEW.password, gen_salt('bf'));
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER hash_passwords_users
BEFORE INSERT OR UPDATE OF password ON users
FOR EACH ROW
EXECUTE FUNCTION hash_passwords();

CREATE OR REPLACE TRIGGER hash_passwords_admins
BEFORE INSERT OR UPDATE OF password ON admins
FOR EACH ROW
EXECUTE FUNCTION hash_passwords();

--Admins--
INSERT INTO admins (password)
    VALUES ('admin'),
           ('admin'),
           ('admin'),
           ('admin'),
           ('admin'),
           ('admin'),
           ('admin'),
           ('admin'),
           ('admin'),
           ('admin');

INSERT INTO configuration (key, value, admin_id)
    VALUES ('review_interval', '30 days', 1),
           ('facebook', 'https://www.facebook.com', 1),
           ('twitter', 'https://www.twitter.com', 1);

--Users--
INSERT INTO users (email, name, date_of_birth, password, gender) 
    VALUES ('wv4tG@example.com', 'John Doe', '2000-01-01', 'password', 'male'),
           ('VYs7D@example.com', 'Jane Doe', '2001-01-01', 'password', 'female'),
           ('zTt0w@example.com', 'Bob Smith', '2002-01-01', 'password', 'male'),
           ('zTt1w@example.com', 'Bob Smith', '2002-01-01', 'password', 'male'),
           ('zTt2w@example.com', 'Bob Smith', '2002-01-01', 'password', 'male'),
           ('laughingjack750@gmail.com', 'James Bond', '2002-01-01', 'password', 'male'),
           ('zTt3w@example.com', 'Bob Smith', '2002-01-01', 'password', 'male'),
           ('zTt4w@example.com', 'Bob Smith', '2002-01-01', 'password', 'male'),
           ('zTt5w@example.com', 'Bob Smith', '2002-01-01', 'password', 'male'),
           ('zTt6w@example.com', 'Bob Smith', '2002-01-01', 'password', 'male'),
           ('zTt7w@example.com', 'Bob Smith', '2002-01-01', 'password', 'male'),
           ('zTt8w@example.com', 'Bob Smith', '2002-01-01', 'password', 'male'),
           ('zTt9w@example.com', 'Bob Smith', '2002-01-01', 'password', 'male'),
           ('zTt10w@example.com', 'Bob Smith', '2002-01-01', 'password', 'male'),
           ('zTt11w@example.com', 'Bob Smith', '2002-01-01', 'password', 'male'),
           ('zTt12w@example.com', 'Bob Smith', '2002-01-01', 'password', 'male'),
           ('zTt13w@example.com', 'Bob Smith', '2002-01-01', 'password', 'male'),
           ('zTt14w@example.com', 'Bob Smith', '2002-01-01', 'password', 'male'),
           ('zTt15w@example.com', 'Bob Smith', '2002-01-01', 'password', 'male'),
           ('zTt16w@example.com', 'Bob Smith', '2002-01-01', 'password', 'male'),
           ('zTt17w@example.com', 'Bob Smith', '2002-01-01', 'password', 'male'),
           ('zTt18w@example.com', 'Bob Smith', '2002-01-01', 'password', 'male'),
           ('zTt19w@example.com', 'Bob Smith', '2002-01-01', 'password', 'male'),
           ('zTt20w@example.com', 'Bob Smith', '2002-01-01', 'password', 'male'),
           ('zTt21w@example.com', 'Bob Smith', '2002-01-01', 'password', 'male'),
           ('zTt22w@example.com', 'Bob Smith', '2002-01-01', 'password', 'male'),
           ('zTt23w@example.com', 'Bob Smith', '2002-01-01', 'password', 'male'),
           ('zTt24w@example.com', 'Bob Smith', '2002-01-01', 'password', 'male');

INSERT INTO phone_numbers ("user", phone_number)
    VALUES ((SELECT id FROM users WHERE email = 'wv4tG@example.com'), '1234567890'),
           ((SELECT id FROM users WHERE email = 'VYs7D@example.com'), '1234567891'),
           ((SELECT id FROM users WHERE email = 'zTt0w@example.com'), '1234567892'),
           ((SELECT id FROM users WHERE email = 'zTt1w@example.com'), '1234567893'),
           ((SELECT id FROM users WHERE email = 'zTt2w@example.com'), '1234567894'),
           ((SELECT id FROM users WHERE email = 'laughingjack750@gmail.com'), '1234567895'),
           ((SELECT id FROM users WHERE email = 'zTt3w@example.com'), '1234567896'),
           ((SELECT id FROM users WHERE email = 'zTt4w@example.com'), '1234567897'),
           ((SELECT id FROM users WHERE email = 'zTt5w@example.com'), '1234567898'),
           ((SELECT id FROM users WHERE email = 'zTt6w@example.com'), '1234567899'),
           ((SELECT id FROM users WHERE email = 'zTt7w@example.com'), '1234567800'),
           ((SELECT id FROM users WHERE email = 'zTt8w@example.com'), '1234567801'),
           ((SELECT id FROM users WHERE email = 'zTt9w@example.com'), '1234567802'),
           ((SELECT id FROM users WHERE email = 'zTt10w@example.com'), '1234567803'),
           ((SELECT id FROM users WHERE email = 'zTt11w@example.com'), '1234567804'),
           ((SELECT id FROM users WHERE email = 'zTt12w@example.com'), '1234567805'),
           ((SELECT id FROM users WHERE email = 'zTt13w@example.com'), '1234567806'),
           ((SELECT id FROM users WHERE email = 'zTt14w@example.com'), '1234567807'),
           ((SELECT id FROM users WHERE email = 'zTt15w@example.com'), '1234567808'),
           ((SELECT id FROM users WHERE email = 'zTt16w@example.com'), '1234567809'),
           ((SELECT id FROM users WHERE email = 'zTt17w@example.com'), '1234567810'),
           ((SELECT id FROM users WHERE email = 'zTt18w@example.com'), '1234567811'),
           ((SELECT id FROM users WHERE email = 'zTt19w@example.com'), '1234567812'),
           ((SELECT id FROM users WHERE email = 'zTt20w@example.com'), '1234567813'),
           ((SELECT id FROM users WHERE email = 'zTt21w@example.com'), '1234567814'),
           ((SELECT id FROM users WHERE email = 'zTt22w@example.com'), '1234567815'),
           ((SELECT id FROM users WHERE email = 'zTt23w@example.com'), '1234567816'),
           ((SELECT id FROM users WHERE email = 'zTt24w@example.com'), '1234567817');

INSERT INTO visitors (id)
    VALUES ((SELECT id FROM users WHERE email = 'laughingjack750@gmail.com')),
           ((SELECT id FROM users WHERE email = 'zTt3w@example.com')),
           ((SELECT id FROM users WHERE email = 'zTt2w@example.com')),
           ((SELECT id FROM users WHERE email = 'zTt1w@example.com')),
           ((SELECT id FROM users WHERE email = 'zTt17w@example.com')),
           ((SELECT id FROM users WHERE email = 'zTt18w@example.com')),
           ((SELECT id FROM users WHERE email = 'zTt19w@example.com')),
           ((SELECT id FROM users WHERE email = 'zTt20w@example.com')),
           ((SELECT id FROM users WHERE email = 'zTt21w@example.com')),
           ((SELECT id FROM users WHERE email = 'zTt22w@example.com')),
           ((SELECT id FROM users WHERE email = 'zTt23w@example.com')),
           ((SELECT id FROM users WHERE email = 'zTt24w@example.com'));

INSERT INTO journalists (id, date_of_employment)
    VALUES ((SELECT id FROM users WHERE email = 'zTt0w@example.com'), '2022-01-01'),
           ((SELECT id FROM users WHERE email = 'zTt4w@example.com'), '2022-01-01'),
           ((SELECT id FROM users WHERE email = 'zTt5w@example.com'), '2022-01-01'),
           ((SELECT id FROM users WHERE email = 'zTt6w@example.com'), '2022-01-01');

INSERT INTO tour_guide (id)
    VALUES ((SELECT id FROM users WHERE email = 'zTt7w@example.com')),
           ((SELECT id FROM users WHERE email = 'zTt8w@example.com')),
           ((SELECT id FROM users WHERE email = 'zTt9w@example.com')),
           ((SELECT id FROM users WHERE email = 'zTt10w@example.com'));

INSERT INTO booked (visitor, tour_guide, comment, start_date, end_date, rating)
    VALUES  ((SELECT id FROM users WHERE email = 'zTt3w@example.com'), (SELECT id FROM users WHERE email = 'zTt8w@example.com'), 'This is a comment', '2022-01-01', '2022-01-02', 5),
            ((SELECT id FROM users WHERE email = 'zTt2w@example.com'), (SELECT id FROM users WHERE email = 'zTt9w@example.com'), 'This is a comment', '2022-01-01', '2022-01-02', 5),
            ((SELECT id FROM users WHERE email = 'zTt1w@example.com'), (SELECT id FROM users WHERE email = 'zTt10w@example.com'), 'This is a comment', '2022-01-01', '2022-01-02', 5);

INSERT INTO service_providers (id)
    VALUES ((SELECT id FROM users WHERE email = 'zTt11w@example.com')),
           ((SELECT id FROM users WHERE email = 'zTt12w@example.com')),
           ((SELECT id FROM users WHERE email = 'zTt13w@example.com')),
           ((SELECT id FROM users WHERE email = 'zTt14w@example.com')),
           ((SELECT id FROM users WHERE email = 'zTt15w@example.com')),
           ((SELECT id FROM users WHERE email = 'zTt16w@example.com'));       

INSERT INTO warn (admin_id, "user", content)
    VALUES (1, (SELECT id FROM users WHERE email = 'zTt1w@example.com'), 'This is a warning'),
           (1, (SELECT id FROM users WHERE email = 'zTt2w@example.com'), 'This is a warning'),
           (3, (SELECT id FROM users WHERE email = 'zTt3w@example.com'), 'This is a warning');    

--Places--
INSERT INTO places (longtitude, latitude, address, name)
    VALUES (107.0734, 20.9505, 'Viet Nam', 'Ha Long Bay'),
           (108.4419, 11.9465, 'Viet Nam', 'Da Lat'),
           (108.3350, 15.8794, 'Viet Nam', 'Hoi An'),
           (106.2875, 17.4569, 'Viet Nam', 'Son Doong Cave'),
           (107.0843, 10.3460, 'Viet Nam', 'Vung Tau City');

INSERT INTO reviews (longtitude, latitude, post_date, star, content, journalist)
    VALUES (107.0734, 20.9505, '2022-01-01', 5, '{"content": "This is a review"}', (SELECT id FROM users WHERE email = 'zTt0w@example.com')),
           (108.4419, 11.9465, '2022-01-01', 4, '{"content": "This is a review"}', (SELECT id FROM users WHERE email = 'zTt4w@example.com')),
           (108.3350, 15.8794, '2022-01-01', 3, '{"content": "This is a review"}', (SELECT id FROM users WHERE email = 'zTt5w@example.com')),
           (106.2875, 17.4569, '2022-01-01', 2, '{"content": "This is a review"}', (SELECT id FROM users WHERE email = 'zTt6w@example.com'));

INSERT INTO work_at (longtitude, latitude, tour_guide, start_date)
    VALUES (107.0734, 20.9505, (SELECT id FROM tour_guide WHERE id = (SELECT id FROM users WHERE email = 'zTt7w@example.com')), '2022-01-01'),
           (108.4419, 11.9465, (SELECT id FROM tour_guide WHERE id = (SELECT id FROM users WHERE email = 'zTt8w@example.com')), '2022-01-01'),
           (108.4419, 11.9465, (SELECT id FROM tour_guide WHERE id = (SELECT id FROM users WHERE email = 'zTt9w@example.com')), '2022-01-01'),
           (108.4419, 11.9465, (SELECT id FROM tour_guide WHERE id = (SELECT id FROM users WHERE email = 'zTt10w@example.com')), '2022-01-01');

--Posts--
INSERT INTO posts (visitor, post_date, content)
    VALUES  ((SELECT id FROM users WHERE email = 'zTt1w@example.com'), '2022-01-01', '{"content": "This is a test post #test1", "mediaUrl":["https://loollu56fcqxklcd.public.blob.vercel-storage.com/bg-login-TkHyoOoLSum3ulD7kmL6jtvwDGiORM.jpg", "https://loollu56fcqxklcd.public.blob.vercel-storage.com/bg-login-TkHyoOoLSum3ulD7kmL6jtvwDGiORM.jpg"]}'),
            ((SELECT id FROM users WHERE email = 'zTt2w@example.com'), '2022-01-01', '{"content": "This is a test post #test2", "mediaUrl":["https://loollu56fcqxklcd.public.blob.vercel-storage.com/bg-login-TkHyoOoLSum3ulD7kmL6jtvwDGiORM.jpg", "https://loollu56fcqxklcd.public.blob.vercel-storage.com/bg-login-TkHyoOoLSum3ulD7kmL6jtvwDGiORM.jpg"]}'),
            ((SELECT id FROM users WHERE email = 'zTt3w@example.com'), '2022-01-01', '{"content": "This is a test post #test3", "mediaUrl":["https://loollu56fcqxklcd.public.blob.vercel-storage.com/bg-login-TkHyoOoLSum3ulD7kmL6jtvwDGiORM.jpg", "https://loollu56fcqxklcd.public.blob.vercel-storage.com/bg-login-TkHyoOoLSum3ulD7kmL6jtvwDGiORM.jpg"]}'),
            ((SELECT id FROM users WHERE email = 'zTt17w@example.com'), '2022-01-01', '{"content": "This is a test post #test4", "mediaUrl":["https://loollu56fcqxklcd.public.blob.vercel-storage.com/bg-login-TkHyoOoLSum3ulD7kmL6jtvwDGiORM.jpg", "https://loollu56fcqxklcd.public.blob.vercel-storage.com/bg-login-TkHyoOoLSum3ulD7kmL6jtvwDGiORM.jpg"]}'),
            ((SELECT id FROM users WHERE email = 'zTt18w@example.com'), '2022-01-01', '{"content": "This is a test post #test5", "mediaUrl":["https://loollu56fcqxklcd.public.blob.vercel-storage.com/bg-login-TkHyoOoLSum3ulD7kmL6jtvwDGiORM.jpg", "https://loollu56fcqxklcd.public.blob.vercel-storage.com/bg-login-TkHyoOoLSum3ulD7kmL6jtvwDGiORM.jpg"]}'),
            ((SELECT id FROM users WHERE email = 'zTt19w@example.com'), '2022-01-01', '{"content": "This is a test post #test6", "mediaUrl":["https://loollu56fcqxklcd.public.blob.vercel-storage.com/bg-login-TkHyoOoLSum3ulD7kmL6jtvwDGiORM.jpg", "https://loollu56fcqxklcd.public.blob.vercel-storage.com/bg-login-TkHyoOoLSum3ulD7kmL6jtvwDGiORM.jpg"]}');

INSERT INTO include (longtitude, latitude, post, visitor, star)
    VALUES (107.0734, 20.9505, (SELECT id FROM posts WHERE visitor = (SELECT id FROM users WHERE email = 'zTt1w@example.com')), (SELECT id FROM users WHERE email = 'zTt1w@example.com'), 5),
           (108.4419, 11.9465, (SELECT id FROM posts WHERE visitor = (SELECT id FROM users WHERE email = 'zTt2w@example.com')), (SELECT id FROM users WHERE email = 'zTt2w@example.com'), 4),
           (108.3350, 15.8794, (SELECT id FROM posts WHERE visitor = (SELECT id FROM users WHERE email = 'zTt3w@example.com')), (SELECT id FROM users WHERE email = 'zTt3w@example.com'), 3),
           (107.0843, 10.3460, (SELECT id FROM posts WHERE visitor = (SELECT id FROM users WHERE email = 'zTt17w@example.com')), (SELECT id FROM users WHERE email = 'zTt17w@example.com'), 2),
           (107.0734, 20.9505, (SELECT id FROM posts WHERE visitor = (SELECT id FROM users WHERE email = 'zTt18w@example.com')), (SELECT id FROM users WHERE email = 'zTt18w@example.com'), 5),
           (107.0734, 20.9505, (SELECT id FROM posts WHERE visitor = (SELECT id FROM users WHERE email = 'zTt19w@example.com')), (SELECT id FROM users WHERE email = 'zTt19w@example.com'), 5);

INSERT INTO comments (visitor, post, content, sender, comment_date)
    VALUES ((SELECT id FROM users WHERE email = 'zTt1w@example.com'), (SELECT id FROM posts WHERE visitor = (SELECT id FROM users WHERE email = 'zTt1w@example.com')), 'This is a comment', (SELECT id FROM users WHERE email = 'zTt2w@example.com'), '2022-01-01'),
           ((SELECT id FROM users WHERE email = 'zTt2w@example.com'), (SELECT id FROM posts WHERE visitor = (SELECT id FROM users WHERE email = 'zTt2w@example.com')), 'This is a comment', (SELECT id FROM users WHERE email = 'zTt1w@example.com'), '2022-01-01'),
           ((SELECT id FROM users WHERE  email = 'zTt3w@example.com'), (SELECT id FROM posts WHERE visitor = (SELECT id FROM users WHERE email = 'zTt3w@example.com')), 'This is a comment', (SELECT id FROM users WHERE email = 'zTt1w@example.com'), '2022-01-01'),
           ((SELECT id FROM users WHERE email = 'zTt17w@example.com'), (SELECT id FROM posts WHERE visitor = (SELECT id FROM users WHERE email = 'zTt17w@example.com')), 'This is a comment', (SELECT id FROM users WHERE email = 'zTt1w@example.com'), '2022-01-01');

INSERT INTO hashtags (name)
    VALUES ('test1'),
           ('test2'),
           ('test3'),
           ('test4'),
           ('test5'),
           ('test6');

INSERT INTO added_in (hash_tag, post, visitor)
    VALUES ('test1', (SELECT id FROM posts WHERE visitor = (SELECT id FROM users WHERE email = 'zTt1w@example.com')), (SELECT id FROM users WHERE email = 'zTt1w@example.com')),
           ('test2', (SELECT id FROM posts WHERE visitor = (SELECT id FROM users WHERE email = 'zTt2w@example.com')), (SELECT id FROM users WHERE email = 'zTt2w@example.com')),
           ('test3', (SELECT id FROM posts WHERE visitor = (SELECT id FROM users WHERE email = 'zTt3w@example.com')), (SELECT id FROM users WHERE email = 'zTt3w@example.com')),
           ('test4', (SELECT id FROM posts WHERE visitor = (SELECT id FROM users WHERE email = 'zTt17w@example.com')), (SELECT id FROM users WHERE email = 'zTt17w@example.com')),
           ('test5', (SELECT id FROM posts WHERE visitor = (SELECT id FROM users WHERE email = 'zTt18w@example.com')), (SELECT id FROM users WHERE email = 'zTt18w@example.com')),
           ('test6', (SELECT id FROM posts WHERE visitor = (SELECT id FROM users WHERE email = 'zTt19w@example.com')), (SELECT id FROM users WHERE email = 'zTt19w@example.com'));

--Services--
INSERT INTO services (longtitude, latitude, name, provider)
    VALUES (103.0734, 20.9505, 'KFC', (SELECT id FROM users WHERE email = 'zTt11w@example.com')),
           (106.4419, 11.9465, 'McDonalds', (SELECT id FROM users WHERE email = 'zTt12w@example.com')),
           (101.3350, 15.8794, 'Burger King', (SELECT id FROM users WHERE email = 'zTt13w@example.com')),
           (102.0734, 20.9505, 'KFC', (SELECT id FROM users WHERE email = 'zTt14w@example.com')),
           (106.0734, 22.9505, 'Circle K', (SELECT id FROM users WHERE email = 'zTt15w@example.com')),
           (108.4419, 11.9475, 'Dam Sen Park', (SELECT id FROM users WHERE email = 'zTt16w@example.com'));

INSERT INTO shifts (longtitude, latitude, start_time, end_time)
    VALUES (103.0734, 20.9505, '2022-01-01 08:00:00', '2022-01-01 16:00:00'),
           (106.4419, 11.9465, '2022-01-01 08:00:00', '2022-01-01 16:00:00'),
           (101.3350, 15.8794, '2022-01-01 08:00:00', '2022-01-01 16:00:00'),
           (102.0734, 20.9505, '2022-01-01 08:00:00', '2022-01-01 16:00:00'),
           (106.0734, 22.9505, '2022-01-01 08:00:00', '2022-01-01 16:00:00'),
           (108.4419, 11.9475, '2022-01-01 08:00:00', '2022-01-01 16:00:00');

INSERT INTO hotels (longtitude, latitude)
    VALUES (103.0734, 20.9505),
           (106.4419, 11.9465),
           (101.3350, 15.8794),
           (102.0734, 20.9505);

INSERT INTO hotel_rooms (longtitude, latitude, room_type, room_price)
    VALUES (103.0734, 20.9505, 'Single', 100),
           (106.4419, 11.9465, 'Double', 150),
           (101.3350, 15.8794, 'Single', 100),
           (102.0734, 20.9505, 'Double', 150);

INSERT INTO room_devices (longtitude, latitude, room_type, room_price, device_name, device_quantity)
    VALUES (103.0734, 20.9505, 'Single', 100, 'TV', 1),
           (106.4419, 11.9465, 'Double', 150, 'Refrigerator', 1),
           (101.3350, 15.8794, 'Single', 100, 'Air Conditioner', 1),
           (102.0734, 20.9505, 'Double', 150, 'Bed', 2);

INSERT INTO restaurants (longtitude, latitude)
    VALUES (103.0734, 20.9505),
           (106.4419, 11.9465),
           (101.3350, 15.8794),
           (102.0734, 20.9505);

INSERT INTO menu (longtitude, latitude, dish_price, dish_name, dish_description)
    VALUES (103.0734, 20.9505, 100, 'Burger', 'Tasty burger'),
           (106.4419, 11.9465, 150, 'Fried Rice', 'Tasty fried rice'),
           (101.3350, 15.8794, 100, 'Pizza', 'Tasty pizza'),
           (102.0734, 20.9505, 150, 'Noodles', 'Tasty noodles');

INSERT INTO auto_repair_shops (longtitude, latitude)
    VALUES (103.0734, 20.9505),
           (106.4419, 11.9465),
           (106.0734, 22.9505),
           (108.4419, 11.9475);

INSERT INTO vehicles (longtitude, latitude, type)
    VALUES (103.0734, 20.9505, 'Car'),
           (106.4419, 11.9465, 'Car'),
           (106.0734, 22.9505, 'Car'),
           (108.4419, 11.9475, 'Car');

INSERT INTO convinience_stores (longtitude, latitude)
    VALUES (103.0734, 20.9505),
           (106.4419, 11.9465),
           (101.3350, 15.8794),
           (102.0734, 20.9505);

INSERT INTO items (longtitude, latitude, price, name)
    VALUES (103.0734, 20.9505, 1, 'Toothbrush'),
           (106.4419, 11.9465, 2, 'Shampoo'),
           (101.3350, 15.8794, 1, 'Toothpaste'),
           (102.0734, 20.9505, 1, 'Soap');

INSERT INTO fuel_station (longtitude, latitude)
    VALUES (103.0734, 20.9505),
           (102.0734, 20.9505),
           (106.0734, 22.9505),
           (108.4419, 11.9475);

INSERT INTO fuel (longtitude, latitude, fuel_price, fuel_type)
    VALUES (103.0734, 20.9505, 1, 'Petrol'),
           (102.0734, 20.9505, 2, 'Petrol'),
           (106.0734, 22.9505, 1, 'Petrol'),
           (108.4419, 11.9475, 1, 'Petrol');

--Trips--
INSERT INTO trips (visitor, start_date, end_date)
    VALUES ((SELECT id FROM users WHERE email = 'zTt1w@example.com'), '2022-01-01', '2022-01-02'),
           ((SELECT id FROM users WHERE email = 'zTt2w@example.com'), '2022-01-01', '2022-01-02'),
           ((SELECT id FROM users WHERE email = 'zTt3w@example.com'), '2022-01-01', '2022-01-02'),
           ((SELECT id FROM users WHERE email = 'zTt24w@example.com'), '2022-01-01', '2022-01-02');

INSERT INTO through (trip, visitor, longtitude, latitude, arrived_date, arrived_hour, departured_date, departured_hour)
    VALUES ((SELECT id FROM trips WHERE visitor = (SELECT id FROM users WHERE email = 'zTt1w@example.com')), (SELECT id FROM users WHERE email = 'zTt1w@example.com'), 107.0734, 20.9505, '2022-01-01', '0', '2022-01-02', '1'),
           ((SELECT id FROM trips WHERE visitor = (SELECT id FROM users WHERE email = 'zTt2w@example.com')), (SELECT id FROM users WHERE email = 'zTt2w@example.com'), 108.4419, 11.9465, '2022-01-01', '0', '2022-01-02', '1'),
           ((SELECT id FROM trips WHERE visitor = (SELECT id FROM users WHERE email = 'zTt3w@example.com')), (SELECT id FROM users WHERE email = 'zTt3w@example.com'), 108.3350, 15.8794, '2022-01-01', '0', '2022-01-02', '1'),
           ((SELECT id FROM trips WHERE visitor = (SELECT id FROM users WHERE email = 'zTt24w@example.com')), (SELECT id FROM users WHERE email = 'zTt24w@example.com'), 106.2875, 17.4569, '2022-01-01', '0', '2022-01-02', '1');