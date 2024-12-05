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

INSERT INTO phone_numbers (user, phone_number)
    VALUE ((SELECT id FROM users WHERE email = 'wv4tG@example.com'), '1234567890'),
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

INSERT INTO visitors 
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

INSERT INTO journalists 
    VALUES ((SELECT id FROM users WHERE email = 'zTt0w@example.com'), '2022-01-01'),
           ((SELECT id FROM users WHERE email = 'zTt4w@example.com'), '2022-01-01'),
           ((SELECT id FROM users WHERE email = 'zTt5w@example.com'), '2022-01-01'),
           ((SELECT id FROM users WHERE email = 'zTt6w@example.com'), '2022-01-01');

INSERT INTO tour_guide
    VALUES ((SELECT id FROM users WHERE email = 'zTt7w@example.com')),
           ((SELECT id FROM users WHERE email = 'zTt8w@example.com')),
           ((SELECT id FROM users WHERE email = 'zTt9w@example.com')),
           ((SELECT id FROM users WHERE email = 'zTt10w@example.com'));

INSERT INTO service_providers
    VALUES ((SELECT id FROM users WHERE email = 'zTt11w@example.com')),
           ((SELECT id FROM users WHERE email = 'zTt12w@example.com')),
           ((SELECT id FROM users WHERE email = 'zTt13w@example.com')),
           ((SELECT id FROM users WHERE email = 'zTt14w@example.com')),
           ((SELECT id FROM users WHERE email = 'zTt15w@example.com')),
           ((SELECT id FROM users WHERE email = 'zTt16w@example.com'));

