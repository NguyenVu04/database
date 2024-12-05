INSERT INTO admins (password)
    VALUES ('admin'),
           ('admin2'),
           ('admin3'),
           ('admin4'),
           ('admin5'),
           ('admin6'),
           ('admin7'),
           ('admin8'),
           ('admin9'),
           ('admin10');

INSERT INTO configuration (key, value, admin_id)
    VALUES ('review_interval', '30 days', 1),
           ('facebook', 'https://www.facebook.com', 1),
           ('twitter', 'https://www.twitter.com', 1);

INSERT_INTO warn (admin_id, user, content)
    VALUES (1, (SELECT id FROM users WHERE email = 'zTt1w@example.com'), 'This is a warning'),
           (1, (SELECT id FROM users WHERE email = 'zTt2w@example.com'), 'This is a warning'),
           (3, (SELECT id FROM users WHERE email = 'zTt3w@example.com'), 'This is a warning');