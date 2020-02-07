drop table if exists one_rep_max cascade;
drop table if exists entry_cardio cascade;
drop table if exists entry_strength cascade;
drop table if exists log_entry cascade;
drop table if exists isFriend cascade;
drop table if exists ex_wo_junction cascade;
drop table if exists workout cascade;
drop table if exists exercise cascade;
drop table if exists users cascade;
drop table if exists termin cascade;
drop table if exists workout_fin cascade;

create table users
(
    u_email              varchar(128) not null
        constraint app_user_pkey
            primary key,
    u_name               varchar(64),
    u_encrypted_password varchar(128) not null,
    birthdate            date,
    weight               integer,
    height               integer,
    visible              boolean
);

alter table users
    owner to postgres;

create unique index user_u_name_uindex
    on users (u_name);

create table exercise
(
    name        varchar(64) not null
        constraint exercise_pk
            primary key,
    description varchar(256),
    iscardio    boolean
);

alter table exercise
    owner to postgres;

create table workout
(
    id   integer not null
        constraint workout_pk
            primary key,
    name varchar(128)
);

alter table workout
    owner to postgres;

create table ex_wo_junction
(
	id integer not null
		constraint ex_wo_junction_pk
			primary key,
	exercise_name varchar(64)
		constraint ex_wo_junction_exercise_name_fk
			references exercise,
	workout_id integer
		constraint ex_wo_junction_workout_id_fk
			references workout,
	sets integer,
	position integer,
	rest integer
);

alter table ex_wo_junction owner to postgres;



create table one_rep_max
(
    u_name        varchar(64)
        constraint one_rep_max_user_u_name_fk
            references users (u_name),
    exercise_name varchar(64)
        constraint one_rep_max_exercise_name_fk
            references exercise,
    max_weight    double precision,
    constraint one_rep_max_pk
        unique (u_name, exercise_name)
);

alter table one_rep_max
    owner to postgres;

create table workout_fin
(
	id serial not null
		constraint table_name_pk
			primary key,
	u_name varchar(64)
		constraint workout_fin_users_u_name_fk
			references users (u_name),
	workout_id integer
		constraint workout_fin_workout_id_fk
			references workout,
	date date
);

alter table workout_fin owner to postgres;






create table log_entry
(
	id serial not null,
	workout_fin_id integer
		constraint log_entry_workout_fin_id_fk
			references workout_fin,
	exercise_name varchar(64)
		constraint log_entry_exercise_name_fk
			references exercise,
	repetitions integer,
	setnumber integer,
	weight double precision,
	duration double precision,
	iscardio boolean
);

alter table log_entry owner to postgres;





create table isFriend(
    u_name1 varchar(128) ,
    u_name2 varchar(128) ,
    isConfirmed boolean,
    primary key (u_name1, u_name2)
);

alter table isFriend
    owner to postgres;

create table termin
(
	id serial not null
		constraint termin_pk
			primary key,
	u_name varchar(128)
		constraint termin_users_u_name_fk
			references users (u_name),
	subject varchar(128),
	date date,
	time time
);

alter table termin owner to postgres;