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

--Functions--
CREATE OR REPLACE FUNCTION find_user_credentials(
    email_input VARCHAR,
    role_input VARCHAR
)
RETURNS VARCHAR AS $$
DECLARE
    user_id VARCHAR;
BEGIN
    IF role_input = 'visitor' THEN
        SELECT id INTO user_id
        FROM visitors
        WHERE id = (SELECT id FROM users WHERE users.email = email_input)
        LIMIT 1;
    ELSIF role = 'journalist' THEN
        SELECT id INTO user_id
        FROM journalists
        WHERE id = (SELECT id FROM users WHERE users.email = email_input)
        LIMIT 1;
    ELSIF role = 'tour_guide' THEN
        SELECT id INTO user_id
        FROM tour_guide
        WHERE id = (SELECT id FROM users WHERE users.email = email_input)
        LIMIT 1;
    ELSIF role = 'service_provider' THEN
        SELECT id INTO user_id
        FROM service_providers
        WHERE id = (SELECT id FROM users WHERE users.email = email_input)
        LIMIT 1;
    ELSE
        RAISE EXCEPTION 'Invalid role: %', role;
    END IF;

    RETURN user_id;
END;
$$ LANGUAGE plpgsql;

--Admins--
INSERT INTO admins (id, password)
    VALUES ('ADMIN00001', 'admin'),
           ('ADMIN00002', 'admin'),
           ('ADMIN00003', 'admin'),
           ('ADMIN00004', 'admin'),
           ('ADMIN00005', 'admin'),
           ('ADMIN00006', 'admin'),
           ('ADMIN00007', 'admin'),
           ('ADMIN00008', 'admin'),
           ('ADMIN00009', 'admin'),
           ('ADMIN00010', 'admin');

INSERT INTO configuration (key, value, admin_id)
    VALUES ('review_interval', '30 days', 'ADMIN00001'),
           ('facebook', 'https://www.facebook.com', 'ADMIN00001'),
           ('twitter', 'https://www.twitter.com', 'ADMIN00001'),
           ('zalo', 'https://www.zalo.com', 'ADMIN00001');

--Users--
INSERT INTO users (email, name, date_of_birth, password, gender) 
    VALUES ('wv4tG@example.com', 'John Doe', '2000-01-01', 'password', 'male'),
           ('VYs7D@example.com', 'Jane Doe', '2001-01-01', 'password', 'female'),
           ('zTt0w@example.com', 'Bob Smith', '2002-01-01', 'password', 'male'),
           ('zTt1w@example.com', 'Bob Smith', '2002-01-01', 'password', 'male'),
           ('zTt2w@example.com', 'Bob Smith', '2002-01-01', 'password', 'male'),
           ('laughingjack750@gmail.com', 'James Bond', '2002-01-01', 'admin', 'male'),
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
    VALUES  ((SELECT id FROM users WHERE email = 'zTt3w@example.com'), (SELECT id FROM users WHERE email = 'zTt8w@example.com'), 'This is a great tour guide', '2022-01-01', '2022-01-02', 5),
            ((SELECT id FROM users WHERE email = 'zTt2w@example.com'), (SELECT id FROM users WHERE email = 'zTt9w@example.com'), 'This is is not a good tour guide', '2022-01-01', '2022-01-02', 5),
            ((SELECT id FROM users WHERE email = 'zTt18w@example.com'), (SELECT id FROM users WHERE email = 'zTt9w@example.com'), 'This is is not a good tour guide', '2022-01-01', '2022-01-02', 5),
            ((SELECT id FROM users WHERE email = 'zTt1w@example.com'), (SELECT id FROM users WHERE email = 'zTt10w@example.com'), 'This is a great tour guide', '2022-01-01', '2022-01-02', 5);

INSERT INTO service_providers (id)
    VALUES ((SELECT id FROM users WHERE email = 'zTt11w@example.com')),
           ((SELECT id FROM users WHERE email = 'zTt12w@example.com')),
           ((SELECT id FROM users WHERE email = 'zTt13w@example.com')),
           ((SELECT id FROM users WHERE email = 'zTt14w@example.com')),
           ((SELECT id FROM users WHERE email = 'zTt15w@example.com')),
           ((SELECT id FROM users WHERE email = 'zTt16w@example.com'));       

INSERT INTO warn (admin_id, "user", content)
    VALUES ('ADMIN00001', (SELECT id FROM users WHERE email = 'zTt1w@example.com'), 'Your posts violate our community standards.'),
           ('ADMIN00002', (SELECT id FROM users WHERE email = 'zTt2w@example.com'), 'Your post is not suitable for our community.'),
           ('ADMIN00003', (SELECT id FROM users WHERE email = 'zTt3w@example.com'), 'Your post was irrelevant to this platform.'),
           ('ADMIN00004', (SELECT id FROM users WHERE email = 'zTt3w@example.com'), 'Your posts contains harmful information.');    

--Places--
INSERT INTO places (longtitude, latitude, address, name)
VALUES 
    (107.0734, 20.9505, 'Viet Nam', 'Ha Long Bay'),
    (108.4419, 11.9465, 'Viet Nam', 'Da Lat'),
    (108.3350, 15.8794, 'Viet Nam', 'Hoi An'),
    (106.2875, 17.4569, 'Viet Nam', 'Son Doong Cave'),
    (107.0843, 10.3460, 'Viet Nam', 'Vung Tau City'),
    (105.8544, 21.0285, 'Viet Nam', 'Hanoi Old Quarter'),
    (106.7010, 10.7769, 'Viet Nam', 'Ho Chi Minh City'),
    (107.5807, 16.4637, 'Viet Nam', 'Hue Imperial City'),
    (109.1967, 12.2388, 'Viet Nam', 'Nha Trang'),
    (105.8019, 20.9486, 'Viet Nam', 'Trang An Scenic Landscape Complex'),
    (105.6357, 21.2713, 'Viet Nam', 'Ba Vi National Park'),
    (107.2779, 11.3835, 'Viet Nam', 'Cat Tien National Park'),
    (105.8113, 20.2202, 'Viet Nam', 'Pu Luong Nature Reserve'),
    (107.9666, 12.6898, 'Viet Nam', 'Buon Ma Thuot'),
    (105.8560, 20.8514, 'Viet Nam', 'Hoa Lu Ancient Capital'),
    (108.6678, 15.9184, 'Viet Nam', 'My Son Sanctuary'),
    (106.9975, 10.3260, 'Viet Nam', 'Con Dao Islands'),
    (108.2367, 16.0545, 'Viet Nam', 'Da Nang'),
    (109.3425, 13.7753, 'Viet Nam', 'Quy Nhon'),
    (109.3445, 8.5875, 'Viet Nam', 'Phu Quoc Island');

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
    VALUES  ((SELECT id FROM users WHERE email = 'zTt1w@example.com'), '2022-01-01', '{"content": "Da Lat, often referred to as the City of Eternal Spring, is a picturesque highland destination in Vietnam known for its cool climate, lush landscapes, and charming French colonial architecture. Nestled in the Central Highlands at an elevation of about 1,500 meters, it boasts rolling hills, pine forests, and colorful flower gardens that captivate visitors year-round. Famous attractions include Xuan Huong Lake, the Crazy House, and the scenic Datanla Waterfalls. Da Lats vibrant markets, delicious local cuisine, and tranquil ambiance make it an ideal getaway for nature lovers, honeymooners, and those seeking a serene escape from bustling city life.", "mediaUrl":["https://loollu56fcqxklcd.public.blob.vercel-storage.com/bg-login-TkHyoOoLSum3ulD7kmL6jtvwDGiORM.jpg", "https://loollu56fcqxklcd.public.blob.vercel-storage.com/beach-2ImolK8dxpavJOrCskVS4nndV0nyBA.jpg"]}'),
            ((SELECT id FROM users WHERE email = 'zTt2w@example.com'), '2022-01-01', '{"content": "Nha Trang, known as the Riviera of the South China Sea, is a vibrant coastal city in Vietnam celebrated for its stunning beaches, crystal-clear waters, and lively atmosphere. It offers a perfect blend of natural beauty and modern amenities, making it a popular destination for both relaxation and adventure. Visitors can explore pristine islands like Hon Mun and Hon Tam, dive into colorful coral reefs, or unwind at luxurious beachfront resorts. The city is also home to cultural landmarks such as the ancient Po Nagar Cham Towers and the Long Son Pagoda. With its bustling markets, fresh seafood, and exciting nightlife, Nha Trang promises an unforgettable experience for every traveler.", "mediaUrl":["https://loollu56fcqxklcd.public.blob.vercel-storage.com/bg-login-TkHyoOoLSum3ulD7kmL6jtvwDGiORM.jpg", "https://loollu56fcqxklcd.public.blob.vercel-storage.com/bg-login-TkHyoOoLSum3ulD7kmL6jtvwDGiORM.jpg"]}'),
            ((SELECT id FROM users WHERE email = 'zTt3w@example.com'), '2022-01-01', '{"content": "Vung Tau is a coastal city in southern Vietnam, known for its beautiful beaches, pleasant climate, and rich history. Located just two hours from Ho Chi Minh City, it is a popular weekend getaway for both locals and tourists. The city features scenic spots such as the picturesque Front Beach, Back Beach, and the iconic Christ the King statue, which offers panoramic views of the coastline. Vung Tau is also home to a number of cultural landmarks, including the Vung Tau Lighthouse and the historical Niet Ban Tinh Xuc Pagoda. In addition to its natural beauty, the city is famous for its seafood, vibrant markets, and relaxed atmosphere, making it an ideal destination for beach lovers and those seeking a peaceful retreat.", "mediaUrl":["https://loollu56fcqxklcd.public.blob.vercel-storage.com/bg-login-TkHyoOoLSum3ulD7kmL6jtvwDGiORM.jpg", "https://loollu56fcqxklcd.public.blob.vercel-storage.com/beach-2ImolK8dxpavJOrCskVS4nndV0nyBA.jpg"]}'),
            ((SELECT id FROM users WHERE email = 'zTt17w@example.com'), '2022-01-01', '{"content": "Hoi An is a charming ancient town in central Vietnam, renowned for its well-preserved blend of historical architecture, vibrant culture, and picturesque riverside setting. Once a major trading port in Southeast Asia, the town boasts narrow streets lined with colorful lanterns, traditional wooden houses, and ancient temples, earning it UNESCO World Heritage status. The Old Town, with its fusion of Japanese, Chinese, and European influences, provides a unique glimpse into Vietnams rich cultural past. Visitors can enjoy strolling through the bustling night markets, sampling local dishes like cao lau and white rose dumplings, or taking a boat ride along the Thu Bon River. Hoi An is also famous for its tailor shops, where tourists can have custom-made clothing crafted from a wide range of fabrics. Its relaxed atmosphere and rich history make it a must-visit destination for anyone traveling to Vietnam.", "mediaUrl":["https://loollu56fcqxklcd.public.blob.vercel-storage.com/city-UTKJT00iIOMIgDDmfBng89VM3ChlKs.jpg", "https://loollu56fcqxklcd.public.blob.vercel-storage.com/bg-login-TkHyoOoLSum3ulD7kmL6jtvwDGiORM.jpg"]}'),
            ((SELECT id FROM users WHERE email = 'zTt18w@example.com'), '2022-01-01', '{"content": "Con Dao is a group of islands located off the southern coast of Vietnam, known for its pristine natural beauty, crystal-clear waters, and rich history. The archipelago is made up of 16 islands, with Con Son being the largest and most developed. The islands are famous for their stunning beaches, lush forests, and diverse marine life, making them a haven for eco-tourism and water activities like snorkeling, diving, and fishing. Con Dao is also historically significant for its role as a former prison island during the French colonial era and the Vietnam War, where political prisoners were held. Today, visitors can explore historical sites such as the Con Dao Prison and the Memorial to fallen heroes. The tranquil atmosphere, combined with its natural and historical attractions, makes Con Dao a perfect destination for those seeking both relaxation and cultural exploration.", "mediaUrl":["https://loollu56fcqxklcd.public.blob.vercel-storage.com/bg-login-TkHyoOoLSum3ulD7kmL6jtvwDGiORM.jpg", "https://loollu56fcqxklcd.public.blob.vercel-storage.com/bg-login-TkHyoOoLSum3ulD7kmL6jtvwDGiORM.jpg"]}'),
            ((SELECT id FROM users WHERE email = 'zTt19w@example.com'), '2022-01-01', '{"content": "Ba Vi is a stunning mountain range located in the northwest of Hanoi, Vietnam, known for its lush landscapes, cool climate, and scenic beauty. The area is home to the Ba Vi National Park, a popular destination for nature lovers and adventure enthusiasts. The park features dense forests, waterfalls, and a variety of flora and fauna, making it an ideal spot for hiking, picnicking, and exploring the great outdoors. One of the main attractions in Ba Vi is the Ba Vi Mountain, which offers panoramic views of the surrounding countryside. The region is also known for the historical Ba Vi Temple and the ruins of a French colonial church, adding a touch of history to its natural charm. With its peaceful atmosphere and proximity to Hanoi, Ba Vi is a perfect retreat for those looking to escape the hustle and bustle of the city.", "mediaUrl":["https://loollu56fcqxklcd.public.blob.vercel-storage.com/city-UTKJT00iIOMIgDDmfBng89VM3ChlKs.jpg", "https://loollu56fcqxklcd.public.blob.vercel-storage.com/bg-login-TkHyoOoLSum3ulD7kmL6jtvwDGiORM.jpg"]}');

INSERT INTO include (longtitude, latitude, post, visitor, star)
    VALUES (107.0734, 20.9505, (SELECT id FROM posts WHERE visitor = (SELECT id FROM users WHERE email = 'zTt1w@example.com')), (SELECT id FROM users WHERE email = 'zTt1w@example.com'), 5),
           (108.4419, 11.9465, (SELECT id FROM posts WHERE visitor = (SELECT id FROM users WHERE email = 'zTt2w@example.com')), (SELECT id FROM users WHERE email = 'zTt2w@example.com'), 4),
           (108.3350, 15.8794, (SELECT id FROM posts WHERE visitor = (SELECT id FROM users WHERE email = 'zTt3w@example.com')), (SELECT id FROM users WHERE email = 'zTt3w@example.com'), 3),
           (107.0843, 10.3460, (SELECT id FROM posts WHERE visitor = (SELECT id FROM users WHERE email = 'zTt17w@example.com')), (SELECT id FROM users WHERE email = 'zTt17w@example.com'), 2),
           (107.0734, 20.9505, (SELECT id FROM posts WHERE visitor = (SELECT id FROM users WHERE email = 'zTt18w@example.com')), (SELECT id FROM users WHERE email = 'zTt18w@example.com'), 5),
           (107.0734, 20.9505, (SELECT id FROM posts WHERE visitor = (SELECT id FROM users WHERE email = 'zTt19w@example.com')), (SELECT id FROM users WHERE email = 'zTt19w@example.com'), 5);

INSERT INTO comments (visitor, post, content, sender, comment_date)
    VALUES ((SELECT id FROM users WHERE email = 'zTt1w@example.com'), (SELECT id FROM posts WHERE visitor = (SELECT id FROM users WHERE email = 'zTt1w@example.com')), 'This post beautifully captures Da Lats charm, emphasizing its cool climate, stunning landscapes, and unique French colonial architecture.', (SELECT id FROM users WHERE email = 'zTt2w@example.com'), '2022-01-01'),
           ((SELECT id FROM users WHERE email = 'zTt2w@example.com'), (SELECT id FROM posts WHERE visitor = (SELECT id FROM users WHERE email = 'zTt2w@example.com')), 'The post succinctly paints Nha Trang as a lively, coastal paradise with a variety of experiences for travelers.', (SELECT id FROM users WHERE email = 'zTt1w@example.com'), '2022-01-01'),
           ((SELECT id FROM users WHERE  email = 'zTt3w@example.com'), (SELECT id FROM posts WHERE visitor = (SELECT id FROM users WHERE email = 'zTt3w@example.com')), 'This description of Vung Tau effectively highlights its proximity to Ho Chi Minh City and its appeal as a weekend getaway.', (SELECT id FROM users WHERE email = 'zTt1w@example.com'), '2022-01-01'),
           ((SELECT id FROM users WHERE email = 'zTt17w@example.com'), (SELECT id FROM posts WHERE visitor = (SELECT id FROM users WHERE email = 'zTt17w@example.com')), 'The paragraph about Hoi An beautifully conveys the towns historical significance and unique charm.', (SELECT id FROM users WHERE email = 'zTt1w@example.com'), '2022-01-01');

INSERT INTO hashtags (name)
    VALUES ('ILoveVungTau'),
           ('ILoveHoiAn'),
           ('ILoveDaLat'),
           ('ILoveNhaTrang'),
           ('ILoveHoChiMinh'),
           ('ILoveHue');

INSERT INTO added_in (hash_tag, post, visitor)
    VALUES ('ILoveVungTau', (SELECT id FROM posts WHERE visitor = (SELECT id FROM users WHERE email = 'zTt1w@example.com')), (SELECT id FROM users WHERE email = 'zTt1w@example.com')),
           ('ILoveHoiAn', (SELECT id FROM posts WHERE visitor = (SELECT id FROM users WHERE email = 'zTt2w@example.com')), (SELECT id FROM users WHERE email = 'zTt2w@example.com')),
           ('ILoveDaLat', (SELECT id FROM posts WHERE visitor = (SELECT id FROM users WHERE email = 'zTt3w@example.com')), (SELECT id FROM users WHERE email = 'zTt3w@example.com')),
           ('ILoveNhaTrang', (SELECT id FROM posts WHERE visitor = (SELECT id FROM users WHERE email = 'zTt17w@example.com')), (SELECT id FROM users WHERE email = 'zTt17w@example.com')),
           ('ILoveHoChiMinh', (SELECT id FROM posts WHERE visitor = (SELECT id FROM users WHERE email = 'zTt18w@example.com')), (SELECT id FROM users WHERE email = 'zTt18w@example.com')),
           ('ILoveHue', (SELECT id FROM posts WHERE visitor = (SELECT id FROM users WHERE email = 'zTt19w@example.com')), (SELECT id FROM users WHERE email = 'zTt19w@example.com'));

INSERT INTO reports (post, visitor, reporter)
    VALUES ((SELECT id FROM posts WHERE visitor = (SELECT id FROM users WHERE email = 'zTt1w@example.com')), (SELECT id FROM users WHERE email = 'zTt1w@example.com'), (SELECT id FROM users WHERE email = 'zTt2w@example.com')),
           ((SELECT id FROM posts WHERE visitor = (SELECT id FROM users WHERE email = 'zTt1w@example.com')), (SELECT id FROM users WHERE email = 'zTt1w@example.com'), (SELECT id FROM users WHERE email = 'zTt3w@example.com')),
           ((SELECT id FROM posts WHERE visitor = (SELECT id FROM users WHERE email = 'zTt1w@example.com')), (SELECT id FROM users WHERE email = 'zTt1w@example.com'), (SELECT id FROM users WHERE email = 'zTt17w@example.com')),
           ((SELECT id FROM posts WHERE visitor = (SELECT id FROM users WHERE email = 'zTt1w@example.com')), (SELECT id FROM users WHERE email = 'zTt1w@example.com'), (SELECT id FROM users WHERE email = 'zTt18w@example.com')),
           ((SELECT id FROM posts WHERE visitor = (SELECT id FROM users WHERE email = 'zTt1w@example.com')), (SELECT id FROM users WHERE email = 'zTt1w@example.com'), (SELECT id FROM users WHERE email = 'zTt19w@example.com'));

--Services--
INSERT INTO services (longtitude, latitude, name, provider)
    VALUES (103.0734, 20.9505, 'KFC', (SELECT id FROM users WHERE email = 'zTt11w@example.com')),
           (106.4419, 11.9465, 'McDonalds', (SELECT id FROM users WHERE email = 'zTt12w@example.com')),
           (101.3350, 15.8794, 'Burger King', (SELECT id FROM users WHERE email = 'zTt13w@example.com')),
           (102.0734, 20.9505, 'KFC', (SELECT id FROM users WHERE email = 'zTt14w@example.com')),
           (106.0734, 22.9505, 'Circle K', (SELECT id FROM users WHERE email = 'zTt15w@example.com')),
           (108.4419, 11.9475, 'Petrolimex', (SELECT id FROM users WHERE email = 'zTt16w@example.com'));

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