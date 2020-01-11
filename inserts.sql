--users
INSERT INTO public.users (u_email, u_name, u_encrypted_password, birthdate, weight, height, visible) VALUES ('test@gmail.com', 'testuser', 'testpwd', '1987-01-10', 82, 186, true);
INSERT INTO public.users (u_email, u_name, u_encrypted_password, birthdate, weight, height, visible) VALUES ('test2@gmail.com', 'testuser2', 'testpwd2', '1950-03-16', 110, 200, false);

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

--log_entries
INSERT INTO public.log_entry (id, u_name, exercise_name, iscardio, setnumber, date) VALUES (10, 'testuser', 'Jogging', true, 1, '2020-01-10');
INSERT INTO public.log_entry (id, u_name, exercise_name, iscardio, setnumber, date) VALUES (6, 'testuser', 'Bench Press', false, 3, '2020-01-10');
INSERT INTO public.log_entry (id, u_name, exercise_name, iscardio, setnumber, date) VALUES (7, 'testuser', 'Row', false, 1, '2020-01-10');
INSERT INTO public.log_entry (id, u_name, exercise_name, iscardio, setnumber, date) VALUES (4, 'testuser', 'Bench Press', false, 1, '2020-01-10');
INSERT INTO public.log_entry (id, u_name, exercise_name, iscardio, setnumber, date) VALUES (5, 'testuser', 'Bench Press', false, 2, '2020-01-10');
INSERT INTO public.log_entry (id, u_name, exercise_name, iscardio, setnumber, date) VALUES (8, 'testuser', 'Row', false, 2, '2020-01-10');
INSERT INTO public.log_entry (id, u_name, exercise_name, iscardio, setnumber, date) VALUES (9, 'testuser', 'Row', false, 3, '2020-01-10');
INSERT INTO public.log_entry (id, u_name, exercise_name, iscardio, setnumber, date) VALUES (2, 'testuser', 'Squat', false, 2, '2020-01-10');
INSERT INTO public.log_entry (id, u_name, exercise_name, iscardio, setnumber, date) VALUES (3, 'testuser', 'Squat', false, 3, '2020-01-10');
INSERT INTO public.log_entry (id, u_name, exercise_name, iscardio, setnumber, date) VALUES (1, 'testuser', 'Squat', false, 1, '2020-01-10');

--specific log_entries
INSERT INTO public.entry_cardio (log_id, duration) VALUES (10, 30);
INSERT INTO public.entry_strength (log_id, repetitions, weight) VALUES (1, 5, 100);
INSERT INTO public.entry_strength (log_id, repetitions, weight) VALUES (2, 5, 100);
INSERT INTO public.entry_strength (log_id, repetitions, weight) VALUES (3, 5, 100);
INSERT INTO public.entry_strength (log_id, repetitions, weight) VALUES (4, 5, 80);
INSERT INTO public.entry_strength (log_id, repetitions, weight) VALUES (5, 5, 80);
INSERT INTO public.entry_strength (log_id, repetitions, weight) VALUES (6, 5, 80);
INSERT INTO public.entry_strength (log_id, repetitions, weight) VALUES (7, 5, 75);
INSERT INTO public.entry_strength (log_id, repetitions, weight) VALUES (8, 5, 75);
INSERT INTO public.entry_strength (log_id, repetitions, weight) VALUES (9, 5, 75);

--one_rep_max
INSERT INTO public.one_rep_max (u_name, exercise_name, max_weight) VALUES ('testuser', 'Squat', 200);
INSERT INTO public.one_rep_max (u_name, exercise_name, max_weight) VALUES ('testuser', 'Bench Press', 150);
INSERT INTO public.one_rep_max (u_name, exercise_name, max_weight) VALUES ('testuser', 'Row', 100);
INSERT INTO public.one_rep_max (u_name, exercise_name, max_weight) VALUES ('testuser', 'Deadlift', 250);
INSERT INTO public.one_rep_max (u_name, exercise_name, max_weight) VALUES ('testuser', 'Military Press', 100);
INSERT INTO public.one_rep_max (u_name, exercise_name, max_weight) VALUES ('testuser2', 'Squat', 50);
INSERT INTO public.one_rep_max (u_name, exercise_name, max_weight) VALUES ('testuser2', 'Bench Press', 30);
INSERT INTO public.one_rep_max (u_name, exercise_name, max_weight) VALUES ('testuser2', 'Row', 30);
INSERT INTO public.one_rep_max (u_name, exercise_name, max_weight) VALUES ('testuser2', 'Deadlift', 60);
INSERT INTO public.one_rep_max (u_name, exercise_name, max_weight) VALUES ('testuser2', 'Military Press', 20);