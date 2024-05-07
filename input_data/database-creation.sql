create table artifact_type
(
    _id  serial
        primary key,
    name varchar(255) not null
);

alter table artifact_type
    owner to postgres;

create table users
(
    account_type smallint                                       not null,
    uid          varchar(255)                                   not null
        primary key,
    username     varchar(255) default 'NULL'::character varying not null
);

alter table users
    owner to postgres;

create table department
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

alter table department
    owner to postgres;

create table course
(
    _id        serial
        primary key,
    name       varchar(255) not null,
    number     smallint     not null,
    department integer      not null
        constraint fk_department
            references department
);

alter table course
    owner to postgres;

create table artifact_template
(
    _id      serial
        primary key,
    messages jsonb        not null,
    type     integer      not null
        constraint fk_type
            references artifact_type,
    course   integer      not null
        constraint fk_course
            references course,
    name     varchar(255) not null
);

alter table artifact_template
    owner to postgres;

create table classroom
(
    _id        serial
        primary key,
    name       varchar(255) not null,
    instructed varchar(255) not null
        references users
        constraint fk_instructor
            references users,
    course     integer
        constraint fk_course
            references course
);

alter table classroom
    owner to postgres;

create table artifact
(
    _id      serial
        primary key,
    template integer
        constraint fk_template
            references artifact_template,
    name     varchar(255) not null,
    content  jsonb        not null,
    owner    varchar(255) not null
        constraint fk_owner
            references users
);

alter table artifact
    owner to postgres;

create table classroom_artifact
(
    artifact_id  integer not null
        references artifact
        constraint fk_artifact_id
            references artifact,
    classroom_id integer not null
        references classroom
        constraint fk_classroom_id
            references classroom,
    primary key (classroom_id, artifact_id)
);

alter table classroom_artifact
    owner to postgres;

create table classroom_student
(
    student_id   varchar(255) not null
        references users
        constraint fk_student_id
            references users,
    classroom_id integer      not null
        references classroom
        constraint fk_classroom_student_id
            references classroom,
    primary key (classroom_id, student_id)
);

alter table classroom_student
    owner to postgres;
