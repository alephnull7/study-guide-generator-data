create database postgres
    with owner postgres;

comment on database postgres is 'default administrative connection database';

create table public.artifact_type
(
    _id  serial
        primary key,
    name varchar(255) not null
);

alter table public.artifact_type
    owner to postgres;

create table public.users
(
    _id          serial
        primary key,
    account_type smallint                                       not null,
    uid          varchar(255)                                   not null
        constraint uid_unique
            unique,
    username     varchar(255) default 'NULL'::character varying not null
);

alter table public.users
    owner to postgres;

create table public.department
(
    _id        serial
        primary key,
    name       varchar(255) not null
        constraint name_unique
            unique,
    short_name varchar(255) not null
        constraint short_name_unique
            unique
);

alter table public.department
    owner to postgres;

create table public.course
(
    _id        serial
        primary key,
    name       varchar(255) not null,
    number     smallint,
    department integer
        constraint fk_department
            references public.department
);

alter table public.course
    owner to postgres;

create table public.classroom
(
    _id        serial
        primary key,
    name       varchar(255) not null,
    instructed integer      not null
        references public.users
        constraint fk_instructor
            references public.users,
    course     integer
        constraint fk_course
            references public.course
);

alter table public.classroom
    owner to postgres;

create table public.classroom_student
(
    student_id   integer not null
        references public.users
        constraint fk_student_id
            references public.users,
    classroom_id integer not null
        references public.classroom
        constraint fk_classroom_student_id
            references public.classroom,
    primary key (classroom_id, student_id)
);

alter table public.classroom_student
    owner to postgres;

create table public.artifact_template
(
    _id      serial
        primary key,
    messages jsonb        not null,
    type     integer      not null
        constraint fk_type
            references public.artifact_type,
    course   integer      not null
        constraint fk_course
            references public.course,
    name     varchar(255) not null
);

alter table public.artifact_template
    owner to postgres;

create table public.artifact
(
    _id      serial
        primary key,
    template integer
        constraint fk_template
            references public.artifact_template,
    name     varchar(255) not null,
    content  jsonb        not null,
    owner    integer      not null
        constraint fk_owner
            references public.users
);

alter table public.artifact
    owner to postgres;

create table public.classroom_artifact
(
    artifact_id  integer not null
        references public.artifact
        constraint fk_artifact_id
            references public.artifact,
    classroom_id integer not null
        references public.classroom
        constraint fk_classroom_id
            references public.classroom,
    primary key (classroom_id, artifact_id)
);

alter table public.classroom_artifact
    owner to postgres;
