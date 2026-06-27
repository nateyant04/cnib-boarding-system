-- Split name column into first_name and last_name
ALTER TABLE users ADD COLUMN first_name VARCHAR(255);
ALTER TABLE users ADD COLUMN last_name VARCHAR(255);

-- Copy existing name data to first_name (temporary, you'll need to manually split existing data)
UPDATE users SET first_name = name, last_name = '';

-- Make first_name and last_name NOT NULL
ALTER TABLE users ALTER COLUMN first_name SET NOT NULL;
ALTER TABLE users ALTER COLUMN last_name SET NOT NULL;

-- Drop the old name column
ALTER TABLE users DROP COLUMN name;
