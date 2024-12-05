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