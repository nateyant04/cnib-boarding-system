-- Create boarding requests table
CREATE TABLE boarding_requests (
    id BIGSERIAL PRIMARY KEY,
    dog_id BIGINT NOT NULL,
    puppy_raiser_id BIGINT NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    status VARCHAR(50) NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'APPROVED', 'REJECTED', 'COMPLETED', 'CANCELLED')),
    special_instructions TEXT,
    rejection_reason TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_requests_dog FOREIGN KEY (dog_id) REFERENCES dogs(id) ON DELETE CASCADE,
    CONSTRAINT fk_requests_puppy_raiser FOREIGN KEY (puppy_raiser_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT check_request_date_range CHECK (end_date >= start_date)
);

-- Create indexes for common queries
CREATE INDEX idx_requests_dog_id ON boarding_requests(dog_id);
CREATE INDEX idx_requests_puppy_raiser_id ON boarding_requests(puppy_raiser_id);
CREATE INDEX idx_requests_status ON boarding_requests(status);
CREATE INDEX idx_requests_dates ON boarding_requests(start_date, end_date);

-- Create composite index for overlap queries
CREATE INDEX idx_requests_dog_dates ON boarding_requests(dog_id, start_date, end_date);
