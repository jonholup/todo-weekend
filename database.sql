CREATE TABLE todo (
    id SERIAL PRIMARY KEY,
    task varchar(100),
    complete boolean
);

INSERT INTO todo(task, complete)
VALUES ('Touch toes', false),
('Buy an otter', false),
('Take out garbage', false),
('Eat some food', false);
