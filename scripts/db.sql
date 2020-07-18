-- Table: public.complaints

-- DROP TABLE public.complaints;

CREATE TABLE public.complaints
(
    complaint_owner character varying COLLATE pg_catalog."default",
    complaint_type character varying COLLATE pg_catalog."default",
    date character varying COLLATE pg_catalog."default",
    id bigint NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1000 MINVALUE 1 MAXVALUE 9223372036854775807 CACHE 1 ),
    complaint_data json
)

TABLESPACE pg_default;

ALTER TABLE public.complaints
    OWNER to postgres;

-- Table: public.users

-- DROP TABLE public.users;

CREATE TABLE public.users
(
    aadhar_number character varying(100) COLLATE pg_catalog."default",
    current_otp integer,
    email character varying(100) COLLATE pg_catalog."default" NOT NULL,
    password character varying(100) COLLATE pg_catalog."default" NOT NULL,
    phone_number numeric(20,0),
    user_type user_type,
    otp_verified boolean DEFAULT false,
    CONSTRAINT users_pkey PRIMARY KEY (email)
)

TABLESPACE pg_default;

ALTER TABLE public.users
    OWNER to postgres;