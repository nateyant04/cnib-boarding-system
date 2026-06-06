-- Create boarding feedback table
CREATE TABLE boarding_feedback (
    id BIGSERIAL PRIMARY KEY,
    assignment_id BIGINT NOT NULL UNIQUE,
    boarder_id BIGINT NOT NULL,
    feedback_text TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5),
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_feedback_assignment FOREIGN KEY (assignment_id) REFERENCES boarding_assignments(id) ON DELETE CASCADE,
    CONSTRAINT fk_feedback_boarder FOREIGN KEY (boarder_id) REFERENCES users(id) ON DELETE RESTRICT
);

-- Create indexes for queries
CREATE INDEX idx_feedback_assignment_id ON boarding_feedback(assignment_id);
CREATE INDEX idx_feedback_boarder_id ON boarding_feedback(boarder_id);
CREATE INDEX idx_feedback_submitted_at ON boarding_feedback(submitted_at);
