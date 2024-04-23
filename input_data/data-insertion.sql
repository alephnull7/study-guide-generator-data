INSERT INTO artifact_type (name)
VALUES ('study_guide'),
       ('quiz');

INSERT INTO department (name, short_name)
VALUES ('Computer Science', 'CSCI'),
       ('Mathematics', 'MATH');

INSERT INTO course (name, number, department)
VALUES ('Foundations of Computing', 241, 1),
       ('Elements of Statistics', 250, 2);
