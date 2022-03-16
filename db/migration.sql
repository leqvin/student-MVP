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

INSERT INTO exercises (date, name, weight, sets, reps) VALUES ('Jan-08-1999', 'squat', 150 ,3, 10);
INSERT INTO exercises (date, name, weight, sets, reps) VALUES ('Feb-08-1999', 'deadlift', 135, 5, 5);
INSERT INTO exercises (date, name, weight,sets, reps) VALUES ('Mar-08-1999', 'benchpress', 185, 3, 10);





