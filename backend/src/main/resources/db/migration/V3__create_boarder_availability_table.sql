-- Create boarder availability table
CREATE TABLE boarder_availability (
    id BIGSERIAL PRIMARY KEY,
    boarder_id BIGINT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    capacity INTEGER NOT NULL DEFAULT 1 CHECK (capacity > 0),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_availability_boarder FOREIGN KEY (boarder_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT check_date_range CHECK (end_date >= start_date)
);

-- Create index for boarder lookups
CREATE INDEX idx_availability_boarder_id ON boarder_availability(boarder_id);

-- Create index for date range queries
CREATE INDEX idx_availability_dates ON boarder_availability(start_date, end_date);
