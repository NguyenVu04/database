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