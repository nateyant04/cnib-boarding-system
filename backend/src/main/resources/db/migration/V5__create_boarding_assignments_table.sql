-- Create boarding assignments table
CREATE TABLE boarding_assignments (
    id BIGSERIAL PRIMARY KEY,
    boarding_request_id BIGINT NOT NULL UNIQUE,
    boarder_id BIGINT NOT NULL,
    coordinator_id BIGINT NOT NULL,
    approved_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_assignments_request FOREIGN KEY (boarding_request_id) REFERENCES boarding_requests(id) ON DELETE CASCADE,
    CONSTRAINT fk_assignments_boarder FOREIGN KEY (boarder_id) REFERENCES users(id) ON DELETE RESTRICT,
    CONSTRAINT fk_assignments_coordinator FOREIGN KEY (coordinator_id) REFERENCES users(id) ON DELETE RESTRICT
);

-- Create indexes for queries
CREATE INDEX idx_assignments_request_id ON boarding_assignments(boarding_request_id);
CREATE INDEX idx_assignments_boarder_id ON boarding_assignments(boarder_id);
CREATE INDEX idx_assignments_coordinator_id ON boarding_assignments(coordinator_id);
