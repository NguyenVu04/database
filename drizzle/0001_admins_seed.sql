CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE OR REPLACE FUNCTION hash_passwords()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' OR (TG_OP = 'UPDATE' AND NEW.password IS DISTINCT FROM OLD.password) THEN
        NEW.password := crypt(NEW.password, gen_salt('bf'));
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER hash_passwords_users
BEFORE INSERT OR UPDATE OF password ON users
FOR EACH ROW
EXECUTE FUNCTION hash_passwords();

CREATE OR REPLACE TRIGGER hash_passwords_admins
BEFORE INSERT OR UPDATE OF password ON admins
FOR EACH ROW
EXECUTE FUNCTION hash_passwords();

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