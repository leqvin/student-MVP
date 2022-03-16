DROP TABLE IF EXISTS exercises CASCADE;

CREATE TABLE exercises (
    id SERIAL PRIMARY KEY,
    date DATE,
    name TEXT,
    weight NUMERIC,
    sets INT,
    reps INT
);

DELETE FROM exercises;

INSERT INTO exercises (date, name, weight, sets, reps) VALUES ('Mar-15-2022', 'Squat', 225 ,5, 5);
INSERT INTO exercises (date, name, weight, sets, reps) VALUES ('Mar-15-2022', 'Deadlift', 275, 5, 5);
INSERT INTO exercises (date, name, weight,sets, reps) VALUES ('Mar-15-2022', 'Bench Press', 185, 5, 5);
INSERT INTO exercises (date, name, weight,sets, reps) VALUES ('Mar-15-2022', 'Strict Press', 95, 5, 5);
INSERT INTO exercises (date, name, weight,sets, reps) VALUES ('Mar-15-2022', 'Sit Ups', 0, 3, 25);




