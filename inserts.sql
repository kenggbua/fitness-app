--users
INSERT INTO public.users (u_email, u_name, u_encrypted_password, birthdate, weight, height, visible) VALUES ('test@gmail.com', 'testuser1', '$2b$10$PjDOtNviXxmBej8JfpWscefdziMC6JFqaOguFUjR3bXELoKd12Muy', '1987-01-10', 82, 186, true);
INSERT INTO public.users (u_email, u_name, u_encrypted_password, birthdate, weight, height, visible) VALUES ('test2@gmail.com', 'testuser2', '$2b$10$MBH6VULvoUkc7uYAQ2R8be3k/O2uc.rdQZs13tHaiXKoU6VjedWJS', '1950-03-16', 110, 200, false);

--exercises
INSERT INTO public.exercise (name, description, iscardio) VALUES ('Jogging', 'kein', true);
INSERT INTO public.exercise (name, description, iscardio) VALUES ('Cycling', 'kein', true);
INSERT INTO public.exercise (name, description, iscardio) VALUES ('Deadlift', 'kein', false);
INSERT INTO public.exercise (name, description, iscardio) VALUES ('Squat', 'kein', false);
INSERT INTO public.exercise (name, description, iscardio) VALUES ('Pull Up', 'kein', false);
INSERT INTO public.exercise (name, description, iscardio) VALUES ('Military Press', 'kein', false);
INSERT INTO public.exercise (name, description, iscardio) VALUES ('Bench Press', 'kein', false);
INSERT INTO public.exercise (name, description, iscardio) VALUES ('Row', 'kein', false);

--workouts
INSERT INTO public.workout (id, name) VALUES (1, 'Starting Strength 1');
INSERT INTO public.workout (id, name) VALUES (2, 'Starting Strength 2');
INSERT INTO public.workout (id, name) VALUES (3, 'Just a Test');
INSERT INTO public.workout (id, name) VALUES (4, 'Cardio');

--ex_wo_junction
INSERT INTO public.ex_wo_junction (id, exercise_name, workout_id, sets, position, rest) VALUES (1, 'Squat', 1, 3, 1, 90);
INSERT INTO public.ex_wo_junction (id, exercise_name, workout_id, sets, position, rest) VALUES (2, 'Bench Press', 1, 3, 2, 90);
INSERT INTO public.ex_wo_junction (id, exercise_name, workout_id, sets, position, rest) VALUES (3, 'Row', 1, 3, 3, 90);
INSERT INTO public.ex_wo_junction (id, exercise_name, workout_id, sets, position, rest) VALUES (4, 'Deadlift', 2, 3, 1, 90);
INSERT INTO public.ex_wo_junction (id, exercise_name, workout_id, sets, position, rest) VALUES (5, 'Military Press', 2, 3, 2, 90);
INSERT INTO public.ex_wo_junction (id, exercise_name, workout_id, sets, position, rest) VALUES (6, 'Pull Up', 2, 3, 3, 90);
INSERT INTO public.ex_wo_junction (id, exercise_name, workout_id, sets, position, rest) VALUES (7, 'Squat', 3, 3, 1, 90);
INSERT INTO public.ex_wo_junction (id, exercise_name, workout_id, sets, position, rest) VALUES (8, 'Deadlift', 3, 3, 2, 90);
INSERT INTO public.ex_wo_junction (id, exercise_name, workout_id, sets, position, rest) VALUES (9, 'Pull Up', 3, 3, 3, 90);
INSERT INTO public.ex_wo_junction (id, exercise_name, workout_id, sets, position, rest) VALUES (10, 'Jogging', 4, 1, 1, null);

--workout_fin
INSERT INTO public.workout_fin (id, u_name, workout_id, sumweight, date) VALUES (1, 'testuser1', 1, null, '2020-02-06');
INSERT INTO public.workout_fin (id, u_name, workout_id, sumweight, date) VALUES (2, 'testuser2', 2, null, '2020-02-06');
INSERT INTO public.workout_fin (id, u_name, workout_id, sumweight, date) VALUES (3, 'testuser1', 4, null, '2020-02-06');


--log_entry
INSERT INTO public.log_entry (id, workout_fin_id, exercise_name, repetitions, setnumber, weight, duration, iscardio) VALUES (1, 1, 'Squat', 5, 1, 100, null, false);
INSERT INTO public.log_entry (id, workout_fin_id, exercise_name, repetitions, setnumber, weight, duration, iscardio) VALUES (2, 1, 'Squat', 5, 2, 100, null, false);
INSERT INTO public.log_entry (id, workout_fin_id, exercise_name, repetitions, setnumber, weight, duration, iscardio) VALUES (3, 1, 'Squat', 5, 3, 100, null, false);
INSERT INTO public.log_entry (id, workout_fin_id, exercise_name, repetitions, setnumber, weight, duration, iscardio) VALUES (4, 1, 'Bench Press', 5, 1, 80, null, false);
INSERT INTO public.log_entry (id, workout_fin_id, exercise_name, repetitions, setnumber, weight, duration, iscardio) VALUES (5, 1, 'Bench Press', 5, 1, 80, null, false);
INSERT INTO public.log_entry (id, workout_fin_id, exercise_name, repetitions, setnumber, weight, duration, iscardio) VALUES (6, 1, 'Bench Press', 5, 1, 80, null, false);
INSERT INTO public.log_entry (id, workout_fin_id, exercise_name, repetitions, setnumber, weight, duration, iscardio) VALUES (7, 1, 'Row', 5, 1, 60, null, false);
INSERT INTO public.log_entry (id, workout_fin_id, exercise_name, repetitions, setnumber, weight, duration, iscardio) VALUES (8, 1, 'Row', 5, 1, 60, null, false);
INSERT INTO public.log_entry (id, workout_fin_id, exercise_name, repetitions, setnumber, weight, duration, iscardio) VALUES (9, 1, 'Row', 5, 1, 60, null, false);
INSERT INTO public.log_entry (id, workout_fin_id, exercise_name, repetitions, setnumber, weight, duration, iscardio) VALUES (10, 2, 'Deadlift', 5, 1, 120, null, false);
INSERT INTO public.log_entry (id, workout_fin_id, exercise_name, repetitions, setnumber, weight, duration, iscardio) VALUES (11, 2, 'Deadlift', 5, 1, 120, null, false);
INSERT INTO public.log_entry (id, workout_fin_id, exercise_name, repetitions, setnumber, weight, duration, iscardio) VALUES (12, 2, 'Deadlift', 5, 1, 120, null, false);
INSERT INTO public.log_entry (id, workout_fin_id, exercise_name, repetitions, setnumber, weight, duration, iscardio) VALUES (13, 2, 'Military Press', 5, 1, 120, null, false);
INSERT INTO public.log_entry (id, workout_fin_id, exercise_name, repetitions, setnumber, weight, duration, iscardio) VALUES (14, 2, 'Military Press', 5, 1, 120, null, false);
INSERT INTO public.log_entry (id, workout_fin_id, exercise_name, repetitions, setnumber, weight, duration, iscardio) VALUES (15, 2, 'Military Press', 5, 1, 120, null, false);
INSERT INTO public.log_entry (id, workout_fin_id, exercise_name, repetitions, setnumber, weight, duration, iscardio) VALUES (16, 2, 'Pull Up', 5, 1, 20, null, false);
INSERT INTO public.log_entry (id, workout_fin_id, exercise_name, repetitions, setnumber, weight, duration, iscardio) VALUES (17, 2, 'Pull Up', 5, 1, 20, null, false);
INSERT INTO public.log_entry (id, workout_fin_id, exercise_name, repetitions, setnumber, weight, duration, iscardio) VALUES (18, 2, 'Pull Up', 5, 1, 20, null, false);
INSERT INTO public.log_entry (id, workout_fin_id, exercise_name, repetitions, setnumber, weight, duration, iscardio) VALUES (18, 3, 'Jogging', null, 1, null, 30, true);
INSERT INTO public.log_entry (id, workout_fin_id, exercise_name, repetitions, setnumber, weight, duration, iscardio) VALUES (19, 3, 'Cycling', null, 1, null, 60, true);

--one_rep_max
INSERT INTO public.one_rep_max (u_name, exercise_name, max_weight) VALUES ('testuser1', 'Squat', 0);
INSERT INTO public.one_rep_max (u_name, exercise_name, max_weight) VALUES ('testuser1', 'Bench Press', 0);
INSERT INTO public.one_rep_max (u_name, exercise_name, max_weight) VALUES ('testuser1', 'Row', 0);
INSERT INTO public.one_rep_max (u_name, exercise_name, max_weight) VALUES ('testuser1', 'Deadlift', 0);
INSERT INTO public.one_rep_max (u_name, exercise_name, max_weight) VALUES ('testuser1', 'Military Press', 0);
INSERT INTO public.one_rep_max (u_name, exercise_name, max_weight) VALUES ('testuser2', 'Squat', 0);
INSERT INTO public.one_rep_max (u_name, exercise_name, max_weight) VALUES ('testuser2', 'Bench Press', 0);
INSERT INTO public.one_rep_max (u_name, exercise_name, max_weight) VALUES ('testuser2', 'Row', 0);
INSERT INTO public.one_rep_max (u_name, exercise_name, max_weight) VALUES ('testuser2', 'Deadlift', 0);
INSERT INTO public.one_rep_max (u_name, exercise_name, max_weight) VALUES ('testuser2', 'Military Press', 0);