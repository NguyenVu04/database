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