INSERT INTO posts(visitor, post_date, content)
           ((SELECT id FROM users WHERE email = 'zTt1w@example.com'), '2022-01-01', '{"content": "This is a test post"}'),
           ((SELECT id FROM users WHERE email = 'zTt2w@example.com'), '2022-01-01', '{"content": "This is a test post"}'),
           ((SELECT id FROM users WHERE email = 'zTt3w@example.com'), '2022-01-01', '{"content": "This is a test post"}'),
           ((SELECT id FROM users WHERE email = 'zTt17w@example.com'), '2022-01-01', '{"content": "This is a test post"}'),
           ((SELECT id FROM users WHERE email = 'zTt18w@example.com'), '2022-01-01', '{"content": "This is a test post"}'),
           ((SELECT id FROM users WHERE email = 'zTt19w@example.com'), '2022-01-01', '{"content": "This is a test post"}');

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