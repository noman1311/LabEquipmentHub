--
-- PostgreSQL database dump
--

\restrict 2fAjgtZo2QtlxWWhNdCgQFDZNAvGgYeSqeC9MzBbHP8lDlfxNThgfgsbU2RvCZi

-- Dumped from database version 18.0
-- Dumped by pg_dump version 18.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: Equipment; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Equipment" (
    id text NOT NULL,
    name text NOT NULL,
    category text,
    location text,
    description text,
    "rfidTag" text,
    status text DEFAULT 'available'::text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "assignedAt" timestamp(3) without time zone,
    "assignedToId" text,
    "dueDate" timestamp(3) without time zone
);


ALTER TABLE public."Equipment" OWNER TO postgres;

--
-- Name: Session; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Session" (
    id text NOT NULL,
    "userId" text NOT NULL,
    active boolean DEFAULT true NOT NULL,
    "startTime" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "endTime" timestamp(3) without time zone
);


ALTER TABLE public."Session" OWNER TO postgres;

--
-- Name: Transaction; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."Transaction" (
    id text NOT NULL,
    "userId" text NOT NULL,
    "equipmentId" text NOT NULL,
    action text NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "sessionId" text
);


ALTER TABLE public."Transaction" OWNER TO postgres;

--
-- Name: User; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."User" (
    id text NOT NULL,
    name text NOT NULL,
    email text NOT NULL,
    "passwordHash" text NOT NULL,
    role text DEFAULT 'student'::text NOT NULL,
    "rfidCardId" text,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    department text,
    phone text,
    status text DEFAULT 'active'::text NOT NULL
);


ALTER TABLE public."User" OWNER TO postgres;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO postgres;

--
-- Data for Name: Equipment; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Equipment" (id, name, category, location, description, "rfidTag", status, "createdAt", "assignedAt", "assignedToId", "dueDate") FROM stdin;
219fcc54-7f23-48ce-9f25-5d6dceeac7ee	Analogue Multimeter	Multimeter	lab 04	meter	AA11BB22	available	2026-06-24 13:15:42.945	\N	\N	\N
1653a1dd-9196-4020-b788-e65d184bbd26	project board	Other	rack 2	15 volt plus minus	123456789ljbbj	available	2026-06-24 15:19:33.648	\N	\N	\N
8b17ac84-d010-4a65-bc54-18de1d0aff1f	Oscilloscope	Measurement	Lab 3	DSO138	E3E0FB27	available	2026-06-23 11:22:14.311	\N	\N	\N
d8212c5a-bcc7-4374-8855-e5cf274bb706	Multimeter		Lab 3	Fluke 87V	236D8416	issued	2026-06-23 11:22:42.828	2026-06-24 19:33:55.382	59647af3-6f51-47b0-ab9e-c1a28a3ef472	2026-06-20 19:33:55.382
\.


--
-- Data for Name: Session; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Session" (id, "userId", active, "startTime", "endTime") FROM stdin;
cba27172-c495-4c98-97d1-4ff542456218	dde1fad1-f5b8-4301-9ccb-0e4ab34cbb2b	f	2026-06-23 10:57:18.758	2026-06-23 10:58:54.354
18f80840-3a94-4eba-bf3a-20b14178280e	dde1fad1-f5b8-4301-9ccb-0e4ab34cbb2b	f	2026-06-23 11:18:04.383	2026-06-23 15:30:18.902
22a8c9a5-fe32-4f96-9848-fd33c3ee3ae3	dde1fad1-f5b8-4301-9ccb-0e4ab34cbb2b	f	2026-06-23 17:04:23.572	2026-06-23 17:12:27.614
e548c1ff-3e0d-4af9-8267-ff9c857a6474	dde1fad1-f5b8-4301-9ccb-0e4ab34cbb2b	f	2026-06-23 17:12:36.34	2026-06-23 21:08:05.259
94d953a8-d6a4-47ee-a047-013a4ba56254	dde1fad1-f5b8-4301-9ccb-0e4ab34cbb2b	f	2026-06-23 21:08:12.04	2026-06-23 21:09:11.834
ed00a840-89bc-4626-bf59-be6ab2915b6b	59647af3-6f51-47b0-ab9e-c1a28a3ef472	f	2026-06-24 15:00:58.303	2026-06-24 15:03:45.292
5ca2dd12-66b5-4394-bad3-91bf1c090b5c	59647af3-6f51-47b0-ab9e-c1a28a3ef472	f	2026-06-24 15:04:11.095	2026-06-24 15:21:29.192
5fc2dfab-ad93-4ba3-9bee-14323d21d9c1	59647af3-6f51-47b0-ab9e-c1a28a3ef472	f	2026-06-24 15:21:36.537	2026-06-24 15:22:16.162
af6e499e-b356-4b86-8931-3a4a1831c462	59647af3-6f51-47b0-ab9e-c1a28a3ef472	f	2026-06-24 19:33:37.139	2026-06-24 19:34:03.831
\.


--
-- Data for Name: Transaction; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."Transaction" (id, "userId", "equipmentId", action, "createdAt", "sessionId") FROM stdin;
13fe68a2-59f9-4238-950c-64185a5a90e4	dde1fad1-f5b8-4301-9ccb-0e4ab34cbb2b	8b17ac84-d010-4a65-bc54-18de1d0aff1f	borrow	2026-06-23 15:19:52.047	18f80840-3a94-4eba-bf3a-20b14178280e
2df4a4d1-a7dd-450e-8902-25ddbfad626e	dde1fad1-f5b8-4301-9ccb-0e4ab34cbb2b	8b17ac84-d010-4a65-bc54-18de1d0aff1f	return	2026-06-23 15:22:00.849	18f80840-3a94-4eba-bf3a-20b14178280e
12d0a59e-2ac4-45c5-bb9a-0199c65ba135	dde1fad1-f5b8-4301-9ccb-0e4ab34cbb2b	8b17ac84-d010-4a65-bc54-18de1d0aff1f	borrow	2026-06-23 15:22:07.938	18f80840-3a94-4eba-bf3a-20b14178280e
6f5ab153-0c34-4c0a-830e-f583b16a1ba5	dde1fad1-f5b8-4301-9ccb-0e4ab34cbb2b	d8212c5a-bcc7-4374-8855-e5cf274bb706	borrow	2026-06-23 15:28:24.948	18f80840-3a94-4eba-bf3a-20b14178280e
6742e8a4-7e76-4589-ac90-a924841c83e7	dde1fad1-f5b8-4301-9ccb-0e4ab34cbb2b	8b17ac84-d010-4a65-bc54-18de1d0aff1f	return	2026-06-23 15:29:03.283	18f80840-3a94-4eba-bf3a-20b14178280e
54452985-1563-463c-a231-353fc893eda1	dde1fad1-f5b8-4301-9ccb-0e4ab34cbb2b	d8212c5a-bcc7-4374-8855-e5cf274bb706	return	2026-06-23 15:29:48.163	18f80840-3a94-4eba-bf3a-20b14178280e
0a43693e-7753-4116-be63-7be09cec0846	dde1fad1-f5b8-4301-9ccb-0e4ab34cbb2b	d8212c5a-bcc7-4374-8855-e5cf274bb706	borrow	2026-06-23 17:13:08.694	e548c1ff-3e0d-4af9-8267-ff9c857a6474
7b75b4ce-7fb4-489f-a1c3-ccce3a999e1e	dde1fad1-f5b8-4301-9ccb-0e4ab34cbb2b	8b17ac84-d010-4a65-bc54-18de1d0aff1f	borrow	2026-06-23 17:13:16.393	e548c1ff-3e0d-4af9-8267-ff9c857a6474
74131ab1-c5a7-4eaa-aa87-10f2e38c16ac	dde1fad1-f5b8-4301-9ccb-0e4ab34cbb2b	d8212c5a-bcc7-4374-8855-e5cf274bb706	return	2026-06-23 17:13:22.57	e548c1ff-3e0d-4af9-8267-ff9c857a6474
398d07e2-d141-4ff2-ba02-1011c820cdc2	dde1fad1-f5b8-4301-9ccb-0e4ab34cbb2b	8b17ac84-d010-4a65-bc54-18de1d0aff1f	return	2026-06-23 17:13:50.846	e548c1ff-3e0d-4af9-8267-ff9c857a6474
18640fe3-7cd3-4a3b-8bf1-736bfc40b7fa	dde1fad1-f5b8-4301-9ccb-0e4ab34cbb2b	d8212c5a-bcc7-4374-8855-e5cf274bb706	borrow	2026-06-23 21:08:36.432	94d953a8-d6a4-47ee-a047-013a4ba56254
d6815b6e-99bf-4fe7-b844-80ddaa15a7ef	dde1fad1-f5b8-4301-9ccb-0e4ab34cbb2b	8b17ac84-d010-4a65-bc54-18de1d0aff1f	borrow	2026-06-23 21:08:49.009	94d953a8-d6a4-47ee-a047-013a4ba56254
8424a1d2-b8a3-4683-8c01-6dc4537de16e	dde1fad1-f5b8-4301-9ccb-0e4ab34cbb2b	d8212c5a-bcc7-4374-8855-e5cf274bb706	return	2026-06-23 21:08:57.201	94d953a8-d6a4-47ee-a047-013a4ba56254
c04187eb-ad75-4f5e-97c7-8342a8b62d2c	dde1fad1-f5b8-4301-9ccb-0e4ab34cbb2b	8b17ac84-d010-4a65-bc54-18de1d0aff1f	return	2026-06-23 21:09:03.548	94d953a8-d6a4-47ee-a047-013a4ba56254
4c0ee42a-0c2c-4ed5-b84c-f8d517b9c6c7	59647af3-6f51-47b0-ab9e-c1a28a3ef472	d8212c5a-bcc7-4374-8855-e5cf274bb706	borrow	2026-06-24 15:01:51.701	ed00a840-89bc-4626-bf59-be6ab2915b6b
b8b1a3b3-c8b0-4f3d-937b-f4e742bab6b0	59647af3-6f51-47b0-ab9e-c1a28a3ef472	8b17ac84-d010-4a65-bc54-18de1d0aff1f	borrow	2026-06-24 15:02:20.726	ed00a840-89bc-4626-bf59-be6ab2915b6b
b2203692-36ad-481f-bf33-45392b2c3639	59647af3-6f51-47b0-ab9e-c1a28a3ef472	8b17ac84-d010-4a65-bc54-18de1d0aff1f	return	2026-06-24 15:02:46.892	ed00a840-89bc-4626-bf59-be6ab2915b6b
5883aa4f-ee9a-4b13-a84b-f4fe2c4fde82	59647af3-6f51-47b0-ab9e-c1a28a3ef472	8b17ac84-d010-4a65-bc54-18de1d0aff1f	borrow	2026-06-24 15:02:48.767	ed00a840-89bc-4626-bf59-be6ab2915b6b
ea189c17-04ea-45a3-b748-24c042f02e86	59647af3-6f51-47b0-ab9e-c1a28a3ef472	8b17ac84-d010-4a65-bc54-18de1d0aff1f	return	2026-06-24 15:03:01.876	ed00a840-89bc-4626-bf59-be6ab2915b6b
ddf313e1-56b3-4637-a5c0-2bf81020aca3	59647af3-6f51-47b0-ab9e-c1a28a3ef472	d8212c5a-bcc7-4374-8855-e5cf274bb706	return	2026-06-24 15:03:21.341	ed00a840-89bc-4626-bf59-be6ab2915b6b
43556797-001e-47dc-8ff9-b658078dba80	59647af3-6f51-47b0-ab9e-c1a28a3ef472	d8212c5a-bcc7-4374-8855-e5cf274bb706	borrow	2026-06-24 15:04:33.531	5ca2dd12-66b5-4394-bad3-91bf1c090b5c
4428c4b3-f7c9-4d8c-937c-187dfc9e1711	59647af3-6f51-47b0-ab9e-c1a28a3ef472	d8212c5a-bcc7-4374-8855-e5cf274bb706	return	2026-06-24 15:04:35.372	5ca2dd12-66b5-4394-bad3-91bf1c090b5c
8a860976-b786-4d76-87ca-40e2b3b390e4	59647af3-6f51-47b0-ab9e-c1a28a3ef472	d8212c5a-bcc7-4374-8855-e5cf274bb706	borrow	2026-06-24 15:04:56.136	5ca2dd12-66b5-4394-bad3-91bf1c090b5c
11ff1f78-918d-4cd6-85db-be6529c01c7d	59647af3-6f51-47b0-ab9e-c1a28a3ef472	8b17ac84-d010-4a65-bc54-18de1d0aff1f	borrow	2026-06-24 15:05:14.903	5ca2dd12-66b5-4394-bad3-91bf1c090b5c
05b733b9-9fde-4197-bb90-c16979ec2885	59647af3-6f51-47b0-ab9e-c1a28a3ef472	d8212c5a-bcc7-4374-8855-e5cf274bb706	return	2026-06-24 15:05:28.127	5ca2dd12-66b5-4394-bad3-91bf1c090b5c
60358646-257e-42c6-b63f-89c1803543bc	59647af3-6f51-47b0-ab9e-c1a28a3ef472	8b17ac84-d010-4a65-bc54-18de1d0aff1f	return	2026-06-24 15:05:31.08	5ca2dd12-66b5-4394-bad3-91bf1c090b5c
5b58917b-ec06-4b09-8734-eef919c0b458	59647af3-6f51-47b0-ab9e-c1a28a3ef472	d8212c5a-bcc7-4374-8855-e5cf274bb706	borrow	2026-06-24 15:05:44.015	5ca2dd12-66b5-4394-bad3-91bf1c090b5c
98898cd0-c1a1-483d-a112-0e02cdc8a696	59647af3-6f51-47b0-ab9e-c1a28a3ef472	8b17ac84-d010-4a65-bc54-18de1d0aff1f	borrow	2026-06-24 15:05:50.637	5ca2dd12-66b5-4394-bad3-91bf1c090b5c
6b8157d3-db88-4500-a722-fb85a52dc754	59647af3-6f51-47b0-ab9e-c1a28a3ef472	d8212c5a-bcc7-4374-8855-e5cf274bb706	return	2026-06-24 15:21:57.124	5fc2dfab-ad93-4ba3-9bee-14323d21d9c1
5bcc9e2f-4e11-4962-ba7c-cc1ead1a1afa	59647af3-6f51-47b0-ab9e-c1a28a3ef472	8b17ac84-d010-4a65-bc54-18de1d0aff1f	return	2026-06-24 19:33:48.746	af6e499e-b356-4b86-8931-3a4a1831c462
9a8b6326-dc45-4305-b2d2-277e3e48e29b	59647af3-6f51-47b0-ab9e-c1a28a3ef472	d8212c5a-bcc7-4374-8855-e5cf274bb706	borrow	2026-06-24 19:33:55.385	af6e499e-b356-4b86-8931-3a4a1831c462
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."User" (id, name, email, "passwordHash", role, "rfidCardId", "createdAt", department, phone, status) FROM stdin;
f3f9dc9e-7fae-4580-a040-047cefed92bb	Admin	admin@kuet.com	$2b$10$DCMB6egGUCpdxkIq7hUE3uDoa8MgIAc8M9Im61TA3LRLehqRjTkWK	admin	\N	2026-06-23 21:57:37.719	\N	\N	active
dde1fad1-f5b8-4301-9ccb-0e4ab34cbb2b	Admin	admin@test.com	$2b$10$3aF9YQmOMSsygmDwBj70nua1dtScHoTLTxMMmFVZAy9pfB5SjFI7y	admin	\N	2026-06-23 06:10:38.324	CSE	01700000000	active
59647af3-6f51-47b0-ab9e-c1a28a3ef472	Shuvo	siyam1311@gmail.com	$2b$10$IbJvzFESRaUvyIZEchud5eNtZqDgzf1Y1rvYzIcz2ewEjV8ulNkrG	student	0397E2F7	2026-06-24 05:03:01.217	EEE	0152132178	active
40956ba9-766f-49c9-b911-bd28f9d21c05	Ahanaf	ahanafhoque312@gmail.com	$2b$10$jKQje7dyfhpbJpntIfYSW.fpLKFdsnOQ6v48xwmbIGiNVarHxLroa	student	43BCC30E	2026-06-25 03:40:36.158	EEE	01521788022	active
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
a843220b-9818-46d3-aabe-b351bdfd5c6f	eda11f2fd80e6a09d409e3720e922602d9d4881e6a08ee3e60f5795da1e11997	2026-06-23 11:59:12.124415+06	20260623055912_init	\N	\N	2026-06-23 11:59:12.087633+06	1
e534f521-2617-4ff9-a0f4-b756411f1636	b4487b7d6842d49be8224e91be85fe1f0aaf83042e91f0e64271d4b32259737c	2026-06-23 15:18:12.287705+06	20260623091812_user_fields	\N	\N	2026-06-23 15:18:12.238493+06	1
fe9f5ddb-793c-4651-8bbf-577d3ecdcb40	69f8dd986f19c45bd68ee95d09041a002012b522cb99c2cf480a30e9388c287e	2026-06-23 16:05:55.874542+06	20260623100555_sessions	\N	\N	2026-06-23 16:05:55.80804+06	1
28d51dd9-04be-4b30-8e05-3240e9b49231	4e6eaca44a35053be2e75dd966bdf35ddac1f045fb7e53db7f363f035eef9431	2026-06-23 16:10:07.031609+06	20260623101006_equipment_assignment	\N	\N	2026-06-23 16:10:06.988583+06	1
2239cd06-1c57-40ee-9c93-f23ec2cfd13f	9021fef5e88cc1b36efe6fcdf69af2df32fe6dcaa2babfa092d97ff2c367d1ff	2026-06-23 17:07:10.806429+06	20260623110710_session_transactions	\N	\N	2026-06-23 17:07:10.767952+06	1
e908fdf6-839e-4800-b52c-f20c7329f67a	3a115a8b137c7310a9bbaae3c95071f2ad17587acd0e6a3206d3bcf6d3d39eb7	2026-06-24 19:25:30.22719+06	20260624132530_equipment_borrower_relation	\N	\N	2026-06-24 19:25:30.220535+06	1
855229c7-85f9-443b-91c5-e05169d1ff15	abe746d2e89de85373605513a0a868b241ff9e07daa6f83f3c4e278af8189765	2026-06-24 22:07:59.872818+06	20260624160759_add_due_date	\N	\N	2026-06-24 22:07:59.862994+06	1
\.


--
-- Name: Equipment Equipment_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Equipment"
    ADD CONSTRAINT "Equipment_pkey" PRIMARY KEY (id);


--
-- Name: Session Session_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_pkey" PRIMARY KEY (id);


--
-- Name: Transaction Transaction_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Equipment_rfidTag_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "Equipment_rfidTag_key" ON public."Equipment" USING btree ("rfidTag");


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_rfidCardId_key; Type: INDEX; Schema: public; Owner: postgres
--

CREATE UNIQUE INDEX "User_rfidCardId_key" ON public."User" USING btree ("rfidCardId");


--
-- Name: Equipment Equipment_assignedToId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Equipment"
    ADD CONSTRAINT "Equipment_assignedToId_fkey" FOREIGN KEY ("assignedToId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Session Session_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Session"
    ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Transaction Transaction_equipmentId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_equipmentId_fkey" FOREIGN KEY ("equipmentId") REFERENCES public."Equipment"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- Name: Transaction Transaction_sessionId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES public."Session"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: Transaction Transaction_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."Transaction"
    ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE RESTRICT;


--
-- PostgreSQL database dump complete
--

\unrestrict 2fAjgtZo2QtlxWWhNdCgQFDZNAvGgYeSqeC9MzBbHP8lDlfxNThgfgsbU2RvCZi

