-- Fix existing user data by splitting first_name into first_name and last_name
-- Run this in pgAdmin Query Tool for the dogboarding database

-- For users where first_name contains a space, split it
UPDATE users 
SET 
    last_name = TRIM(SUBSTRING(first_name FROM POSITION(' ' IN first_name) + 1)),
    first_name = TRIM(SUBSTRING(first_name FROM 1 FOR POSITION(' ' IN first_name) - 1))
WHERE POSITION(' ' IN first_name) > 0;

-- For users where first_name has no space, set last_name to a default value
UPDATE users 
SET last_name = 'User'
WHERE last_name = '' OR last_name IS NULL;

-- View the results
SELECT id, email, first_name, last_name FROM users;
