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