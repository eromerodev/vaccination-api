-- public."user" definition

-- Drop table

-- DROP TABLE "user";

CREATE TABLE "user" (
	id bigserial NOT NULL,
	username varchar NULL,
	email varchar NOT NULL,
	password_hash varchar NOT NULL,
	CONSTRAINT user_unique UNIQUE (email),
	CONSTRAINT user_pk PRIMARY KEY (id)
);

-- public.drug definition

-- Drop table

-- DROP TABLE drug;

CREATE TABLE drug (
	id bigserial NOT NULL,
	drug_name varchar NULL,
	is_approved bool NULL,
	min_dose int2 NULL,
	max_dose int2 NULL,
	available_at date NULL,
	CONSTRAINT drug_pk PRIMARY KEY (id)
);


-- public.vaccination definition

-- Drop table

-- DROP TABLE vaccination;

CREATE TABLE vaccination (
	id bigserial NOT NULL,
	individual_name varchar NULL,
	drug_id int8 NOT NULL,
	dose int2 NULL,
	vac_date date NULL,
	CONSTRAINT vaccination_pk PRIMARY KEY (id),
	CONSTRAINT vaccination_fk FOREIGN KEY (drug_id) REFERENCES drug(id)
);