INSERT INTO places (longtitude, latitude, address, name)
    VALUES (107.0734, 20.9505, 'Viet Nam', 'Ha Long Bay'),
           (108.4419, 11.9465, 'Viet Nam', 'Da Lat'),
           (108.3350, 15.8794, 'Viet Nam', 'Hoi An'),
           (106.2875, 17.4569, 'Viet Nam', 'Son Doong Cave'),
           (107.0843, 10.3460, 'Viet Nam', 'Vung Tau City');

INSERT INTO reviews (longtitude, latitude, post_date, star, content, journalist)
    VALUES (107.0734, 20.9505, '2022-01-01', 5, 'This is a review', (SELECT id FROM journalists WHERE email = 'zTt0w@example.com')),
           (108.4419, 11.9465, '2022-01-01', 4, 'This is a review', (SELECT id FROM journalists WHERE email = 'zTt4w@example.com')),
           (108.3350, 15.8794, '2022-01-01', 3, 'This is a review', (SELECT id FROM journalists WHERE email = 'zTt5w@example.com')),
           (106.2875, 17.4569, '2022-01-01', 2, 'This is a review', (SELECT id FROM journalists WHERE email = 'zTt6w@example.com')),
           (107.0843, 10.3460, '2022-01-01', 1, 'This is a review', (SELECT id FROM journalists WHERE email = 'zTt7w@example.com'));