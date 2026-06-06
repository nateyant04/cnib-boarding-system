-- Create dogs table
CREATE TABLE dogs (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    breed VARCHAR(255),
    age INTEGER,
    medical_info TEXT,
    dietary_restrictions TEXT,
    profile_picture_url VARCHAR(500),
    puppy_raiser_id BIGINT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_dogs_puppy_raiser FOREIGN KEY (puppy_raiser_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Create index for puppy raiser lookups
CREATE INDEX idx_dogs_puppy_raiser_id ON dogs(puppy_raiser_id);

-- Create index for name searches
CREATE INDEX idx_dogs_name ON dogs(name);
