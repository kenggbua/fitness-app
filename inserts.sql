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
INSERT INTO public.ex_wo_junction (id, exercise_name, workout_id, sets, position) VALUES (1, 'Squat', 1, 3, 1);
INSERT INTO public.ex_wo_junction (id, exercise_name, workout_id, sets, position) VALUES (2, 'Bench Press', 1, 3, 2);
INSERT INTO public.ex_wo_junction (id, exercise_name, workout_id, sets, position) VALUES (3, 'Row', 1, 3, 3);
INSERT INTO public.ex_wo_junction (id, exercise_name, workout_id, sets, position) VALUES (4, 'Deadlift', 2, 3, 1);
INSERT INTO public.ex_wo_junction (id, exercise_name, workout_id, sets, position) VALUES (5, 'Military Press', 2, 3, 2);
INSERT INTO public.ex_wo_junction (id, exercise_name, workout_id, sets, position) VALUES (6, 'Pull Up', 2, 3, 3);
INSERT INTO public.ex_wo_junction (id, exercise_name, workout_id, sets, position) VALUES (7, 'Squat', 3, 3, 1);
INSERT INTO public.ex_wo_junction (id, exercise_name, workout_id, sets, position) VALUES (8, 'Deadlift', 3, 3, 2);
INSERT INTO public.ex_wo_junction (id, exercise_name, workout_id, sets, position) VALUES (9, 'Pull Up', 3, 3, 3);
INSERT INTO public.ex_wo_junction (id, exercise_name, workout_id, sets, position) VALUES (10, 'Jogging', 4, 1, 1);

--log_entries
INSERT INTO public.log_entry (u_name, exercise_name, iscardio, setnumber, date, repetitions, weight, duration, workout_id) VALUES ('testuser1', 'Jogging', true, 1, '2020-01-10', null, null, 30, 4);
INSERT INTO public.log_entry (u_name, exercise_name, iscardio, setnumber, date, repetitions, weight, duration, workout_id) VALUES ('testuser1', 'Bench Press', false, 3, '2020-01-10', 5, 80, null, 1);
INSERT INTO public.log_entry (u_name, exercise_name, iscardio, setnumber, date, repetitions, weight, duration, workout_id) VALUES ('testuser1', 'Row', false, 1, '2020-01-10', 5, 60, null, 1);
INSERT INTO public.log_entry (u_name, exercise_name, iscardio, setnumber, date, repetitions, weight, duration, workout_id) VALUES ('testuser1', 'Bench Press', false, 1, '2020-01-10', 5, 80, null, 1);
INSERT INTO public.log_entry (u_name, exercise_name, iscardio, setnumber, date, repetitions, weight, duration, workout_id) VALUES ('testuser1', 'Bench Press', false, 2, '2020-01-10', 5, 80, null, 1);
INSERT INTO public.log_entry (u_name, exercise_name, iscardio, setnumber, date, repetitions, weight, duration, workout_id) VALUES ('testuser1', 'Row', false, 2, '2020-01-10', 5, 60, null, 1);
INSERT INTO public.log_entry (u_name, exercise_name, iscardio, setnumber, date, repetitions, weight, duration, workout_id) VALUES ('testuser1', 'Row', false, 3, '2020-01-10', 5, 60, null, 1);
INSERT INTO public.log_entry (u_name, exercise_name, iscardio, setnumber, date, repetitions, weight, duration, workout_id) VALUES ('testuser1', 'Squat', false, 2, '2020-01-10', 5, 100, null, 1);
INSERT INTO public.log_entry (u_name, exercise_name, iscardio, setnumber, date, repetitions, weight, duration, workout_id) VALUES ('testuser1', 'Squat', false, 3, '2020-01-10', 5, 100, null, 1);
INSERT INTO public.log_entry (u_name, exercise_name, iscardio, setnumber, date, repetitions, weight, duration, workout_id) VALUES ('testuser1', 'Squat', false, 1, '2020-01-10', 5, 100, null, 1);


--one_rep_max
INSERT INTO public.one_rep_max (u_name, exercise_name, max_weight) VALUES ('testuser1', 'Squat', 200);
INSERT INTO public.one_rep_max (u_name, exercise_name, max_weight) VALUES ('testuser1', 'Bench Press', 150);
INSERT INTO public.one_rep_max (u_name, exercise_name, max_weight) VALUES ('testuser1', 'Row', 100);
INSERT INTO public.one_rep_max (u_name, exercise_name, max_weight) VALUES ('testuser1', 'Deadlift', 250);
INSERT INTO public.one_rep_max (u_name, exercise_name, max_weight) VALUES ('testuser1', 'Military Press', 100);
INSERT INTO public.one_rep_max (u_name, exercise_name, max_weight) VALUES ('testuser2', 'Squat', 50);
INSERT INTO public.one_rep_max (u_name, exercise_name, max_weight) VALUES ('testuser2', 'Bench Press', 30);
INSERT INTO public.one_rep_max (u_name, exercise_name, max_weight) VALUES ('testuser2', 'Row', 30);
INSERT INTO public.one_rep_max (u_name, exercise_name, max_weight) VALUES ('testuser2', 'Deadlift', 60);
INSERT INTO public.one_rep_max (u_name, exercise_name, max_weight) VALUES ('testuser2', 'Military Press', 20);