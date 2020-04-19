CREATE TYPE public.user_type AS ENUM
    ('portal_user', 'offficial_user');


CREATE TABLE public.users
(
    aadhar_number character varying(100),
    created_on timestamp with time zone NOT NULL,
    current_otp integer,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    phone_number numeric(20),
    user_type user_type,
    PRIMARY KEY (email)
);

ALTER TABLE public.users
    OWNER to postgres;