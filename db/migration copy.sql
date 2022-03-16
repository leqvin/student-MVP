DROP TABLE IF EXISTS cohort CASCADE;
DROP TABLE IF EXISTS people CASCADE;
DROP TABLE IF EXISTS companies;

CREATE TABLE companies (
    id SERIAL PRIMARY KEY,
    name TEXT,
    location TEXT
);

CREATE TABLE people (
    id SERIAL PRIMARY KEY,
    first_name TEXT,
    location TEXT,
    company_id INT,
    CONSTRAINT fk_company FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
);


CREATE TABLE cohort (
    id int GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    name TEXT,
    age NUMERIC
);

DELETE FROM cohort;

INSERT INTO cohort (name, age) VALUES ('pegasus', 33);
INSERT INTO cohort (name, age) VALUES ('john', 34);
INSERT INTO cohort (name, age) VALUES ('joe', 25);

INSERT INTO companies (name, location) VALUES ('U.S. Navy', 'Washington');
INSERT INTO companies (name, location) VALUES ('CS, Inc.', 'London');
INSERT INTO companies (name, location) VALUES ('Stanford', 'Palo Alto');

INSERT INTO people (first_name, location, company_id) VALUES ('Hopper', 'Dallas', 1);
INSERT INTO people (first_name, location, company_id) VALUES ('Lovelace', 'New York', NULL);
INSERT INTO people (first_name, location, company_id) VALUES ('Knuth', 'Seattle', 3);

