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
    id            integer not null
        constraint ex_wo_junction_pk
            primary key,
    exercise_name varchar(64)
        constraint ex_wo_junction_exercise_name_fk
            references exercise,
    workout_id    integer
        constraint ex_wo_junction_workout_id_fk
            references workout,
    sets          integer,
    position      integer
);

alter table ex_wo_junction
    owner to postgres;

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

create table log_entry
(
    id            integer not null
        constraint log_entry_pk
            primary key,
    u_name        varchar(64)
        constraint log_entry_user_u_name_fk
            references users (u_name),
    exercise_name varchar(64)
        constraint log_entry_exercise_name_fk
            references exercise,
    iscardio      boolean,
    setnumber     integer,
    date          date
);

alter table log_entry
    owner to postgres;

create table entry_cardio
(
    log_id   integer          not null
        constraint entry_cardio_pk
            primary key
        constraint entry_cardio_log_entry_id_fk
            references log_entry,
    duration double precision not null
);

alter table entry_cardio
    owner to postgres;

create table entry_strength
(
    log_id      integer not null
        constraint entry_strength_pk
            primary key
        constraint entry_strength_log_entry_id_fk
            references log_entry,
    repetitions integer,
    weight      double precision
);

alter table entry_strength
    owner to postgres;


