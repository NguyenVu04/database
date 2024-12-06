INSERT INTO posts (visitor, post_date, content)
    VALUES  ((SELECT id FROM users WHERE email = 'zTt1w@example.com'), '2022-01-01', '{"content": "This is a test post #test1"}'),
            ((SELECT id FROM users WHERE email = 'zTt2w@example.com'), '2022-01-01', '{"content": "This is a test post #test2"}'),
            ((SELECT id FROM users WHERE email = 'zTt3w@example.com'), '2022-01-01', '{"content": "This is a test post #test3"}'),
            ((SELECT id FROM users WHERE email = 'zTt17w@example.com'), '2022-01-01', '{"content": "This is a test post #test4"}'),
            ((SELECT id FROM users WHERE email = 'zTt18w@example.com'), '2022-01-01', '{"content": "This is a test post #test5"}'),
            ((SELECT id FROM users WHERE email = 'zTt19w@example.com'), '2022-01-01', '{"content": "This is a test post #test6"}');

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

INSERT INTO hashtags (name)
    VALUES ('test1'),
           ('test2'),
           ('test3'),
           ('test4'),
           ('test5'),
           ('test6');

INSERT INTO added_in (hash_tag, post, visitor)
    VALUES ('test1', (SELECT id FROM posts WHERE visitor = (SELECT id FROM users WHERE email = 'zTt1w@example.com')), (SELECT id FROM users WHERE email = 'zTt1w@example.com')),
           ('test2', (SELECT id FROM posts WHERE visitor = (SELECT id FROM users WHERE email = 'zTt2w@example.com')), (SELECT id FROM users WHERE email = 'zTt2w@example.com')),
           ('test3', (SELECT id FROM posts WHERE visitor = (SELECT id FROM users WHERE email = 'zTt3w@example.com')), (SELECT id FROM users WHERE email = 'zTt3w@example.com')),
           ('test4', (SELECT id FROM posts WHERE visitor = (SELECT id FROM users WHERE email = 'zTt17w@example.com')), (SELECT id FROM users WHERE email = 'zTt17w@example.com')),
           ('test5', (SELECT id FROM posts WHERE visitor = (SELECT id FROM users WHERE email = 'zTt18w@example.com')), (SELECT id FROM users WHERE email = 'zTt18w@example.com')),
           ('test6', (SELECT id FROM posts WHERE visitor = (SELECT id FROM users WHERE email = 'zTt19w@example.com')), (SELECT id FROM users WHERE email = 'zTt19w@example.com'));