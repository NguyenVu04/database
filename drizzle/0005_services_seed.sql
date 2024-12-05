INSERT INTO services (longtitude, latitude, name, provider)
    VALUES (103.0734, 20.9505, 'KFC', (SELECT id FROM service_providers WHERE email = 'zTt11w@example.com')),
           (106.4419, 11.9465, 'McDonalds', (SELECT id FROM service_providers WHERE email = 'zTt12w@example.com')),
           (101.3350, 15.8794, 'Burger King', (SELECT id FROM service_providers WHERE email = 'zTt13w@example.com')),
           (102.0734, 20.9505, 'KFC', (SELECT id FROM service_providers WHERE email = 'zTt14w@example.com')),
           (103.0734, 20.9505, 'Circle K', (SELECT id FROM service_providers WHERE email = 'zTt15w@example.com')),
           (108.4419, 11.9475, 'Dam Sen Park', (SELECT id FROM service_providers WHERE email = 'zTt16w@example.com'));

INSERT INTO hotels (longtitude, latitude)
    VALUES (103.0734, 20.9505),
           (106.4419, 11.9465),
           (101.3350, 15.8794),
           (102.0734, 20.9505);

INSERT INTO restaurants (longtitude, latitude)
    VALUES (103.0734, 20.9505),
           (106.4419, 11.9465),
           (101.3350, 15.8794),
           (102.0734, 20.9505);

INSERT INTO auto_repair_shops (longtitude, latitude)
    VALUES (103.0734, 20.9505),
           (106.4419, 11.9465),
           (103.0734, 20.9505),
           (108.4419, 11.9475);

INSERT INTO convinience_stores (longtitude, latitude)
    VALUES (103.0734, 20.9505),
           (106.4419, 11.9465),
           (101.3350, 15.8794),
           (102.0734, 20.9505);

INSERT INTO fuel_station (longtitude, latitude)
    VALUES (103.0734, 20.9505),
           (102.0734, 20.9505),
           (103.0734, 20.9505),
           (108.4419, 11.9475);