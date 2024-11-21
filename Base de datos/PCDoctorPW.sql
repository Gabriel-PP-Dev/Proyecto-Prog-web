--
-- PostgreSQL database dump
--

-- Dumped from database version 9.4.1
-- Dumped by pg_dump version 9.4.1
-- Started on 2024-11-21 17:08:42

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- TOC entry 180 (class 3079 OID 11855)
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- TOC entry 2046 (class 0 OID 0)
-- Dependencies: 180
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- TOC entry 175 (class 1259 OID 81934)
-- Name: local; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE local (
    id integer NOT NULL,
    direccion character varying(255) NOT NULL,
    nombre character varying(255) NOT NULL
);


ALTER TABLE local OWNER TO postgres;

--
-- TOC entry 174 (class 1259 OID 81932)
-- Name: local_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE local_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE local_id_seq OWNER TO postgres;

--
-- TOC entry 2047 (class 0 OID 0)
-- Dependencies: 174
-- Name: local_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE local_id_seq OWNED BY local.id;


--
-- TOC entry 173 (class 1259 OID 81923)
-- Name: prodcuto_almacen; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE prodcuto_almacen (
    id integer NOT NULL,
    nombre character varying(255) NOT NULL,
    imagen character varying(255) NOT NULL,
    precio double precision NOT NULL,
    costo double precision NOT NULL,
    cantidad integer NOT NULL
);


ALTER TABLE prodcuto_almacen OWNER TO postgres;

--
-- TOC entry 172 (class 1259 OID 81921)
-- Name: prodcuto_almacen_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE prodcuto_almacen_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE prodcuto_almacen_id_seq OWNER TO postgres;

--
-- TOC entry 2048 (class 0 OID 0)
-- Dependencies: 172
-- Name: prodcuto_almacen_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE prodcuto_almacen_id_seq OWNED BY prodcuto_almacen.id;


--
-- TOC entry 176 (class 1259 OID 81943)
-- Name: prodcuto_local; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE prodcuto_local (
    id_producto integer NOT NULL,
    id_local integer NOT NULL,
    cantidad integer NOT NULL
);


ALTER TABLE prodcuto_local OWNER TO postgres;

--
-- TOC entry 179 (class 1259 OID 81958)
-- Name: servicio_venta; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE servicio_venta (
    carnet_cliente integer NOT NULL,
    id integer NOT NULL,
    id_producto integer NOT NULL,
    id_local integer NOT NULL,
    carnet_trabajador character varying(11) NOT NULL
);


ALTER TABLE servicio_venta OWNER TO postgres;

--
-- TOC entry 178 (class 1259 OID 81956)
-- Name: servicio_venta_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE servicio_venta_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE servicio_venta_id_seq OWNER TO postgres;

--
-- TOC entry 2049 (class 0 OID 0)
-- Dependencies: 178
-- Name: servicio_venta_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE servicio_venta_id_seq OWNED BY servicio_venta.id;


--
-- TOC entry 177 (class 1259 OID 81948)
-- Name: trabajador; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE trabajador (
    carnet character varying(11) NOT NULL,
    nombre character varying(255) NOT NULL,
    salario double precision NOT NULL,
    rol character varying(255) NOT NULL,
    telefono character varying(255) NOT NULL,
    id_local integer NOT NULL
);


ALTER TABLE trabajador OWNER TO postgres;

--
-- TOC entry 1905 (class 2604 OID 81937)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY local ALTER COLUMN id SET DEFAULT nextval('local_id_seq'::regclass);


--
-- TOC entry 1904 (class 2604 OID 81926)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY prodcuto_almacen ALTER COLUMN id SET DEFAULT nextval('prodcuto_almacen_id_seq'::regclass);


--
-- TOC entry 1906 (class 2604 OID 81961)
-- Name: id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY servicio_venta ALTER COLUMN id SET DEFAULT nextval('servicio_venta_id_seq'::regclass);


--
-- TOC entry 2034 (class 0 OID 81934)
-- Dependencies: 175
-- Data for Name: local; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY local (id, direccion, nombre) FROM stdin;
1	Esquina Parque central	PCSolutions
2	Calle San Cristobal	PCItems
3	Calle 20 Centro ciudad	PCCOPEX
4	Distrito central	PCVRF
\.


--
-- TOC entry 2050 (class 0 OID 0)
-- Dependencies: 174
-- Name: local_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('local_id_seq', 1, false);


--
-- TOC entry 2032 (class 0 OID 81923)
-- Dependencies: 173
-- Data for Name: prodcuto_almacen; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY prodcuto_almacen (id, nombre, imagen, precio, costo, cantidad) FROM stdin;
12	Pelli	6g7g6h6h6tt6h6htt66t6gf	400	150	300
22	Galletas dulces	yf37tr734t347634t4b7363n	200	80	290
35	Leche condensada	uyf37648767337373g7th63	500	230	150
40	Salsa de tomate	73467836h484h4376	900	500	250
\.


--
-- TOC entry 2051 (class 0 OID 0)
-- Dependencies: 172
-- Name: prodcuto_almacen_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('prodcuto_almacen_id_seq', 1, false);


--
-- TOC entry 2035 (class 0 OID 81943)
-- Dependencies: 176
-- Data for Name: prodcuto_local; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY prodcuto_local (id_producto, id_local, cantidad) FROM stdin;
12	1	30
22	1	20
35	1	40
12	2	30
35	3	26
40	4	20
22	4	34
\.


--
-- TOC entry 2038 (class 0 OID 81958)
-- Dependencies: 179
-- Data for Name: servicio_venta; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY servicio_venta (carnet_cliente, id, id_producto, id_local, carnet_trabajador) FROM stdin;
36538164	123	12	1	99067465347
48376275	345	35	1	99067465347
65566567	234	22	1	99067465347
\.


--
-- TOC entry 2052 (class 0 OID 0)
-- Dependencies: 178
-- Name: servicio_venta_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('servicio_venta_id_seq', 1, false);


--
-- TOC entry 2036 (class 0 OID 81948)
-- Dependencies: 177
-- Data for Name: trabajador; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY trabajador (carnet, nombre, salario, rol, telefono, id_local) FROM stdin;
12345678910	Pepe	7000	Administrador	58445639	1
03048576123	David	2500	Limpieza	34243862	1
99067465347	Anibal	4000	Vendedor	64362873	1
91164736402	Amalia	5000	Gestor de productos	26376832	2
\.


--
-- TOC entry 1910 (class 2606 OID 81942)
-- Name: local_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY local
    ADD CONSTRAINT local_pkey PRIMARY KEY (id);


--
-- TOC entry 1908 (class 2606 OID 81931)
-- Name: prodcuto_almacen_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY prodcuto_almacen
    ADD CONSTRAINT prodcuto_almacen_pkey PRIMARY KEY (id);


--
-- TOC entry 1912 (class 2606 OID 81947)
-- Name: prodcuto_local_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY prodcuto_local
    ADD CONSTRAINT prodcuto_local_pkey PRIMARY KEY (id_producto, id_local);


--
-- TOC entry 1916 (class 2606 OID 81963)
-- Name: servicio_venta_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY servicio_venta
    ADD CONSTRAINT servicio_venta_pkey PRIMARY KEY (id);


--
-- TOC entry 1914 (class 2606 OID 81955)
-- Name: trabajador_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY trabajador
    ADD CONSTRAINT trabajador_pkey PRIMARY KEY (carnet);


--
-- TOC entry 1918 (class 2606 OID 81969)
-- Name: fkprodcuto_l455494; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY prodcuto_local
    ADD CONSTRAINT fkprodcuto_l455494 FOREIGN KEY (id_local) REFERENCES local(id);


--
-- TOC entry 1917 (class 2606 OID 81964)
-- Name: fkprodcuto_l747151; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY prodcuto_local
    ADD CONSTRAINT fkprodcuto_l747151 FOREIGN KEY (id_producto) REFERENCES prodcuto_almacen(id);


--
-- TOC entry 1921 (class 2606 OID 81979)
-- Name: fkservicio_v642615; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY servicio_venta
    ADD CONSTRAINT fkservicio_v642615 FOREIGN KEY (carnet_trabajador) REFERENCES trabajador(carnet);


--
-- TOC entry 1920 (class 2606 OID 81974)
-- Name: fkservicio_v738763; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY servicio_venta
    ADD CONSTRAINT fkservicio_v738763 FOREIGN KEY (id_producto, id_local) REFERENCES prodcuto_local(id_producto, id_local);


--
-- TOC entry 1919 (class 2606 OID 81984)
-- Name: fktrabajador250676; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY trabajador
    ADD CONSTRAINT fktrabajador250676 FOREIGN KEY (id_local) REFERENCES local(id);


--
-- TOC entry 2045 (class 0 OID 0)
-- Dependencies: 5
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


-- Completed on 2024-11-21 17:08:42

--
-- PostgreSQL database dump complete
--

