-- A continuación, una empresa que dicta cursos de inglés nos hace entrega de un set de datos que contiene información de inscritos. Estas inscripciones se realizan a través de dos vías, por página web y por el blog de la institución. Con el set de datos, nos solicitan que realicemos un conjunto de consultas que serán utilizadas para saber cuál es el medio que más utilizan los/as futuros estudiantes y cuál tiene más impacto en las redes sociales.

-- El set de datos es el siguiente:

CREATE TABLE INSCRITOS(cantidad INT, fecha DATE, fuente VARCHAR);
INSERT INTO INSCRITOS(cantidad, fecha, fuente)
VALUES ( 44, '2021-01-01', 'Blog' );
INSERT INTO INSCRITOS(cantidad, fecha, fuente)
VALUES ( 56, '2021-01-01', 'Página' );
INSERT INTO INSCRITOS(cantidad, fecha, fuente)
VALUES ( 39, '2021-01-02', 'Blog' );
INSERT INTO INSCRITOS(cantidad, fecha, fuente)
VALUES ( 81, '2021-01-02', 'Página' );
INSERT INTO INSCRITOS(cantidad, fecha, fuente)
VALUES ( 12, '2021-01-03', 'Blog' );
INSERT INTO INSCRITOS(cantidad, fecha, fuente)
VALUES ( 91, '2021-01-03', 'Página' );
INSERT INTO INSCRITOS(cantidad, fecha, fuente)
VALUES ( 48, '2021-01-04', 'Blog' );
INSERT INTO INSCRITOS(cantidad, fecha, fuente)
VALUES ( 45, '2021-01-04', 'Página' );
INSERT INTO INSCRITOS(cantidad, fecha, fuente)
VALUES ( 55, '2021-01-05', 'Blog' );
INSERT INTO INSCRITOS(cantidad, fecha, fuente)
VALUES ( 33, '2021-01-05', 'Página' );
INSERT INTO INSCRITOS(cantidad, fecha, fuente)
VALUES ( 18, '2021-01-06', 'Blog' );
INSERT INTO INSCRITOS(cantidad, fecha, fuente)
VALUES ( 12, '2021-01-06', 'Página' );
INSERT INTO INSCRITOS(cantidad, fecha, fuente)
VALUES ( 34, '2021-01-07', 'Blog' );
INSERT INTO INSCRITOS(cantidad, fecha, fuente)
VALUES ( 24, '2021-01-07', 'Página' );
INSERT INTO INSCRITOS(cantidad, fecha, fuente)
VALUES ( 83, '2021-01-08', 'Blog' );
INSERT INTO INSCRITOS(cantidad, fecha, fuente)
VALUES ( 99, '2021-01-08', 'Página' );


-- 1. ¿Cuántos registros hay?
SELECT COUNT(*) FROM INSCRITOS;
 count
-------
    16
(1 row)

-- 2. ¿Cuántos inscritos hay en total?
SELECT SUM(cantidad) FROM INSCRITOS;
 sum
-----
 774
(1 row)

-- 3. ¿Cuál o cuáles son los registros de mayor antigüedad?
SELECT * FROM INSCRITOS WHERE fecha = (SELECT MIN(fecha) FROM INSCRITOS);
 cantidad |   fecha    | fuente
----------+------------+--------
       44 | 2021-01-01 | Blog
       56 | 2021-01-01 | Página
(2 rows)

-- 4. ¿Cuántos inscritos hay por día? (Indistintamente de la fuente de inscripción)
SELECT fecha, SUM(cantidad) FROM INSCRITOS GROUP BY fecha ORDER BY fecha;
   fecha    | sum
------------+-----
 2021-01-01 | 100
 2021-01-02 | 120
 2021-01-03 | 103
 2021-01-04 |  93
 2021-01-05 |  88
 2021-01-06 |  30
 2021-01-07 |  58
 2021-01-08 | 182
(8 rows)

-- 5. ¿Cuántos inscritos hay por fuente?
SELECT fuente, SUM(cantidad) FROM INSCRITOS GROUP BY fuente;
 fuente | sum
--------+-----
 Página | 441
 Blog   | 333
(2 rows)

-- ¿Qué día se inscribió la mayor cantidad de personas? Y ¿Cuántas personas se inscribieron en ese día?
SELECT fecha, SUM(cantidad) FROM INSCRITOS GROUP BY fecha ORDER BY SUM(cantidad) DESC LIMIT 1;
   fecha    | sum
------------+-----
 2021-01-08 | 182
(1 row)

-- 7. ¿Qué día se inscribieron la mayor cantidad de personas utilizando el blog? ¿Cuántas personas fueron? (si hay más de un registro con el máximo de personas, considera solo el primero)
SELECT fecha, SUM(cantidad) FROM INSCRITOS WHERE fuente = 'Blog' GROUP BY fecha ORDER BY SUM(cantidad) DESC LIMIT 1;
   fecha    | sum
------------+-----
 2021-01-08 |  83
(1 row)

--  8. ¿Cuál es el promedio de personas inscritas por día? Toma en consideración que la base de datos tiene un registro de 8 días, es decir, se obtendrán 8 promedios.
SELECT fecha, ROUND(AVG(cantidad), 2) FROM INSCRITOS GROUP BY fecha ORDER BY fecha;  
   fecha    | round
------------+-------
 2021-01-01 | 50.00
 2021-01-02 | 60.00
 2021-01-03 | 51.50
 2021-01-04 | 46.50
 2021-01-05 | 44.00
 2021-01-06 | 15.00
 2021-01-07 | 29.00
 2021-01-08 | 91.00
(8 rows)

-- 9. ¿Qué días se inscribieron más de 50 personas?
SELECT fecha, SUM(cantidad) FROM INSCRITOS GROUP BY fecha HAVING SUM(cantidad) > 50 ORDER BY fecha;
   fecha    | sum
------------+-----
 2021-01-01 | 100
 2021-01-02 | 120
 2021-01-03 | 103
 2021-01-04 |  93
 2021-01-05 |  88
 2021-01-07 |  58
 2021-01-08 | 182
(7 rows)

-- 10. ¿Cuál es el promedio por día de personas inscritas? Considerando sólo calcular desde el tercer día.
SELECT fecha, ROUND(AVG(cantidad), 2) FROM INSCRITOS WHERE fecha >= '2021-01-03' GROUP BY fecha ORDER BY fecha;
   fecha    | round
------------+-------
 2021-01-03 | 51.50
 2021-01-04 | 46.50
 2021-01-05 | 44.00
 2021-01-06 | 15.00
 2021-01-07 | 29.00
 2021-01-08 | 91.00
(6 rows)