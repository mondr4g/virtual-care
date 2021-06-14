-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 14-06-2021 a las 08:51:19
-- Versión del servidor: 10.4.19-MariaDB
-- Versión de PHP: 7.3.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `virtualcare`
--
CREATE DATABASE IF NOT EXISTS `virtualcare` DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci;
USE `virtualcare`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `admin`
--
-- Creación: 13-06-2021 a las 20:55:24
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `idpersonal` int(11) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `PERSONAL` (`idpersonal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- RELACIONES PARA LA TABLA `admin`:
--   `idpersonal`
--       `personal` -> `Id`
--

--
-- Truncar tablas antes de insertar `admin`
--

TRUNCATE TABLE `admin`;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chat`
--
-- Creación: 14-06-2021 a las 05:17:22
--

DROP TABLE IF EXISTS `chat`;
CREATE TABLE IF NOT EXISTS `chat` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `idpersonal` int(11) NOT NULL,
  `idconsulta` int(11) NOT NULL,
  `mensaje` text COLLATE utf8_unicode_ci NOT NULL,
  `fecha` datetime NOT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `CONSULTACH` (`idconsulta`),
  KEY `PERSONALCH` (`idpersonal`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- RELACIONES PARA LA TABLA `chat`:
--   `idconsulta`
--       `consulta` -> `Id`
--   `idpersonal`
--       `personal` -> `Id`
--

--
-- Truncar tablas antes de insertar `chat`
--

TRUNCATE TABLE `chat`;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consulta`
--
-- Creación: 14-06-2021 a las 06:48:03
--

DROP TABLE IF EXISTS `consulta`;
CREATE TABLE IF NOT EXISTS `consulta` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `idvllamada` int(11) DEFAULT NULL,
  `idpeticionc` int(11) DEFAULT NULL,
  `anotaciones` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `sintomas` text COLLATE utf8_unicode_ci NOT NULL,
  `fecha` datetime NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `VIDEOLL` (`idvllamada`) USING BTREE,
  KEY `PETICIONID` (`idpeticionc`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- RELACIONES PARA LA TABLA `consulta`:
--   `idpeticionc`
--       `peticiones_consulta` -> `Id`
--   `idvllamada`
--       `videollamada` -> `Id`
--

--
-- Truncar tablas antes de insertar `consulta`
--

TRUNCATE TABLE `consulta`;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `diagenf`
--
-- Creación: 13-06-2021 a las 20:55:22
--

DROP TABLE IF EXISTS `diagenf`;
CREATE TABLE IF NOT EXISTS `diagenf` (
  `Id_enfermedad` int(11) NOT NULL,
  `id_diagnostico` int(11) NOT NULL,
  KEY `DIAGNOSTICOEF` (`id_diagnostico`),
  KEY `ENFERMEDADG` (`Id_enfermedad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- RELACIONES PARA LA TABLA `diagenf`:
--   `id_diagnostico`
--       `diagnostico` -> `Id`
--   `Id_enfermedad`
--       `enfermedad` -> `Id`
--

--
-- Truncar tablas antes de insertar `diagenf`
--

TRUNCATE TABLE `diagenf`;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `diagnostico`
--
-- Creación: 13-06-2021 a las 20:55:23
--

DROP TABLE IF EXISTS `diagnostico`;
CREATE TABLE IF NOT EXISTS `diagnostico` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `idconsulta` int(11) NOT NULL,
  `causas` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `recomendaciones` text COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `CONSULTAD` (`idconsulta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- RELACIONES PARA LA TABLA `diagnostico`:
--   `idconsulta`
--       `consulta` -> `Id`
--

--
-- Truncar tablas antes de insertar `diagnostico`
--

TRUNCATE TABLE `diagnostico`;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `direccion`
--
-- Creación: 13-06-2021 a las 20:55:23
--

DROP TABLE IF EXISTS `direccion`;
CREATE TABLE IF NOT EXISTS `direccion` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `calle` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `numero` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `interior` varchar(5) COLLATE utf8_unicode_ci DEFAULT NULL,
  `colonia` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `cp` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `ciudad` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `estado` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `pais` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- RELACIONES PARA LA TABLA `direccion`:
--

--
-- Truncar tablas antes de insertar `direccion`
--

TRUNCATE TABLE `direccion`;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `doctor`
--
-- Creación: 14-06-2021 a las 04:58:42
--

DROP TABLE IF EXISTS `doctor`;
CREATE TABLE IF NOT EXISTS `doctor` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `cedula` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `idpersonal` int(11) NOT NULL,
  `activo` tinyint(1) NOT NULL,
  `consultando` tinyint(1) NOT NULL,
  `idEspecialidad` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `PERSONALD` (`idpersonal`) USING BTREE,
  KEY `ESPECIALD` (`idEspecialidad`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- RELACIONES PARA LA TABLA `doctor`:
--   `idEspecialidad`
--       `especialidades` -> `Id`
--   `idpersonal`
--       `personal` -> `Id`
--

--
-- Truncar tablas antes de insertar `doctor`
--

TRUNCATE TABLE `doctor`;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `enfermedad`
--
-- Creación: 13-06-2021 a las 20:55:23
--

DROP TABLE IF EXISTS `enfermedad`;
CREATE TABLE IF NOT EXISTS `enfermedad` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `tratamiento` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- RELACIONES PARA LA TABLA `enfermedad`:
--

--
-- Truncar tablas antes de insertar `enfermedad`
--

TRUNCATE TABLE `enfermedad`;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `enfermera`
--
-- Creación: 14-06-2021 a las 04:24:06
--

DROP TABLE IF EXISTS `enfermera`;
CREATE TABLE IF NOT EXISTS `enfermera` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `idpersonal` int(11) NOT NULL,
  `idUnidadmedica` int(11) NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `PERSONALE` (`idpersonal`) USING BTREE,
  KEY `UNIDADENF` (`idUnidadmedica`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- RELACIONES PARA LA TABLA `enfermera`:
--   `idpersonal`
--       `personal` -> `Id`
--   `idUnidadmedica`
--       `unidad_medica` -> `IdUnidad`
--

--
-- Truncar tablas antes de insertar `enfermera`
--

TRUNCATE TABLE `enfermera`;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `especialidades`
--
-- Creación: 14-06-2021 a las 04:06:32
--

DROP TABLE IF EXISTS `especialidades`;
CREATE TABLE IF NOT EXISTS `especialidades` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- RELACIONES PARA LA TABLA `especialidades`:
--

--
-- Truncar tablas antes de insertar `especialidades`
--

TRUNCATE TABLE `especialidades`;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiolab`
--
-- Creación: 13-06-2021 a las 20:55:23
--

DROP TABLE IF EXISTS `estudiolab`;
CREATE TABLE IF NOT EXISTS `estudiolab` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha` int(11) NOT NULL,
  `especificaciones` text COLLATE utf8_unicode_ci NOT NULL,
  `idpaciente` int(11) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `PACIENTEL` (`idpaciente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- RELACIONES PARA LA TABLA `estudiolab`:
--   `idpaciente`
--       `paciente` -> `Id`
--

--
-- Truncar tablas antes de insertar `estudiolab`
--

TRUNCATE TABLE `estudiolab`;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historialmedico`
--
-- Creación: 14-06-2021 a las 04:38:31
--

DROP TABLE IF EXISTS `historialmedico`;
CREATE TABLE IF NOT EXISTS `historialmedico` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `idpaciente` int(11) NOT NULL,
  `alergias` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `HISTORIAP` (`idpaciente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- RELACIONES PARA LA TABLA `historialmedico`:
--   `idpaciente`
--       `paciente` -> `Id`
--

--
-- Truncar tablas antes de insertar `historialmedico`
--

TRUNCATE TABLE `historialmedico`;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente`
--
-- Creación: 14-06-2021 a las 04:23:20
--

DROP TABLE IF EXISTS `paciente`;
CREATE TABLE IF NOT EXISTS `paciente` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `idusuario` int(11) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `idUnidadmedica` int(11) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `USUARIOP` (`idusuario`),
  KEY `UNIDADPACIENTE` (`idUnidadmedica`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- RELACIONES PARA LA TABLA `paciente`:
--   `idUnidadmedica`
--       `unidad_medica` -> `IdUnidad`
--   `idusuario`
--       `usuario` -> `Id`
--

--
-- Truncar tablas antes de insertar `paciente`
--

TRUNCATE TABLE `paciente`;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal`
--
-- Creación: 13-06-2021 a las 20:55:23
--

DROP TABLE IF EXISTS `personal`;
CREATE TABLE IF NOT EXISTS `personal` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `idUsuario` int(11) DEFAULT NULL,
  `email` varchar(30) COLLATE utf8_unicode_ci DEFAULT NULL,
  `username` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `profileimg` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `email_check` tinyint(1) NOT NULL,
  `email_verify_token` varchar(150) COLLATE utf8_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `username` (`username`),
  UNIQUE KEY `USUARIO` (`idUsuario`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- RELACIONES PARA LA TABLA `personal`:
--   `idUsuario`
--       `usuario` -> `Id`
--

--
-- Truncar tablas antes de insertar `personal`
--

TRUNCATE TABLE `personal`;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `peticiones_consulta`
--
-- Creación: 14-06-2021 a las 06:51:06
--

DROP TABLE IF EXISTS `peticiones_consulta`;
CREATE TABLE IF NOT EXISTS `peticiones_consulta` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `idDoctor` int(11) NOT NULL,
  `idPaciente` int(11) NOT NULL,
  `idEnfermera` int(11) NOT NULL,
  `tokenPeticion` varchar(180) COLLATE utf8_unicode_ci DEFAULT NULL,
  `fecha_hora` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `rechazada` tinyint(1) NOT NULL,
  `aceptada` tinyint(1) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `DOCTORC` (`idDoctor`),
  KEY `ENFERMERAC` (`idEnfermera`),
  KEY `PACIENTEC` (`idPaciente`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- RELACIONES PARA LA TABLA `peticiones_consulta`:
--   `idDoctor`
--       `doctor` -> `Id`
--   `idEnfermera`
--       `enfermera` -> `Id`
--   `idPaciente`
--       `paciente` -> `Id`
--

--
-- Truncar tablas antes de insertar `peticiones_consulta`
--

TRUNCATE TABLE `peticiones_consulta`;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `signosconsulta`
--
-- Creación: 13-06-2021 a las 20:55:23
--

DROP TABLE IF EXISTS `signosconsulta`;
CREATE TABLE IF NOT EXISTS `signosconsulta` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `idsigno` int(11) NOT NULL,
  `idconsulta` int(11) NOT NULL,
  `medida` decimal(4,3) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `SIGNOC` (`idsigno`),
  KEY `CONSULTA_S` (`idconsulta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- RELACIONES PARA LA TABLA `signosconsulta`:
--   `idconsulta`
--       `consulta` -> `Id`
--   `idsigno`
--       `signovital` -> `Id`
--

--
-- Truncar tablas antes de insertar `signosconsulta`
--

TRUNCATE TABLE `signosconsulta`;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `signovital`
--
-- Creación: 13-06-2021 a las 20:55:23
--

DROP TABLE IF EXISTS `signovital`;
CREATE TABLE IF NOT EXISTS `signovital` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `rango_superior` decimal(5,3) NOT NULL,
  `rango_inferior` decimal(5,3) NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- RELACIONES PARA LA TABLA `signovital`:
--

--
-- Truncar tablas antes de insertar `signovital`
--

TRUNCATE TABLE `signovital`;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `unidad_medica`
--
-- Creación: 14-06-2021 a las 04:22:24
--

DROP TABLE IF EXISTS `unidad_medica`;
CREATE TABLE IF NOT EXISTS `unidad_medica` (
  `IdUnidad` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` int(11) NOT NULL,
  `idDireccion` int(11) NOT NULL,
  PRIMARY KEY (`IdUnidad`),
  KEY `DIRECCIONUNIDAD` (`idDireccion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- RELACIONES PARA LA TABLA `unidad_medica`:
--   `idDireccion`
--       `direccion` -> `Id`
--

--
-- Truncar tablas antes de insertar `unidad_medica`
--

TRUNCATE TABLE `unidad_medica`;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--
-- Creación: 13-06-2021 a las 20:55:24
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `apellido` varchar(30) COLLATE utf8_unicode_ci NOT NULL,
  `genero` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `direccionId` int(11) NOT NULL,
  `fecha_nac` date NOT NULL,
  `telefono` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  `celular` varchar(15) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `DIRECCION` (`direccionId`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- RELACIONES PARA LA TABLA `usuario`:
--   `direccionId`
--       `direccion` -> `Id`
--

--
-- Truncar tablas antes de insertar `usuario`
--

TRUNCATE TABLE `usuario`;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `videollamada`
--
-- Creación: 13-06-2021 a las 20:55:24
--

DROP TABLE IF EXISTS `videollamada`;
CREATE TABLE IF NOT EXISTS `videollamada` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `idconsulta` int(11) NOT NULL,
  `id_dinamico` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `audio_path` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `video_path` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `CONSULTAV` (`idconsulta`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- RELACIONES PARA LA TABLA `videollamada`:
--

--
-- Truncar tablas antes de insertar `videollamada`
--

TRUNCATE TABLE `videollamada`;
--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `admin`
--
ALTER TABLE `admin`
  ADD CONSTRAINT `PERSONAL` FOREIGN KEY (`idpersonal`) REFERENCES `personal` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `chat`
--
ALTER TABLE `chat`
  ADD CONSTRAINT `CONSULTACH` FOREIGN KEY (`idconsulta`) REFERENCES `consulta` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `PERSONALCH` FOREIGN KEY (`idpersonal`) REFERENCES `personal` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `consulta`
--
ALTER TABLE `consulta`
  ADD CONSTRAINT `PETICIONID` FOREIGN KEY (`idpeticionc`) REFERENCES `peticiones_consulta` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `VIDEOLL` FOREIGN KEY (`idvllamada`) REFERENCES `videollamada` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `diagenf`
--
ALTER TABLE `diagenf`
  ADD CONSTRAINT `DIAGNOSTICOEF` FOREIGN KEY (`id_diagnostico`) REFERENCES `diagnostico` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ENFERMEDADG` FOREIGN KEY (`Id_enfermedad`) REFERENCES `enfermedad` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `diagnostico`
--
ALTER TABLE `diagnostico`
  ADD CONSTRAINT `CONSULTAD` FOREIGN KEY (`idconsulta`) REFERENCES `consulta` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `doctor`
--
ALTER TABLE `doctor`
  ADD CONSTRAINT `ESPECIALD` FOREIGN KEY (`idEspecialidad`) REFERENCES `especialidades` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `PERSONALD` FOREIGN KEY (`idpersonal`) REFERENCES `personal` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `enfermera`
--
ALTER TABLE `enfermera`
  ADD CONSTRAINT `PERSONALE` FOREIGN KEY (`idpersonal`) REFERENCES `personal` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `UNIDADENF` FOREIGN KEY (`idUnidadmedica`) REFERENCES `unidad_medica` (`IdUnidad`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `estudiolab`
--
ALTER TABLE `estudiolab`
  ADD CONSTRAINT `PACIENTEL` FOREIGN KEY (`idpaciente`) REFERENCES `paciente` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `historialmedico`
--
ALTER TABLE `historialmedico`
  ADD CONSTRAINT `HISTORIAP` FOREIGN KEY (`idpaciente`) REFERENCES `paciente` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD CONSTRAINT `UNIDADPACIENTE` FOREIGN KEY (`idUnidadmedica`) REFERENCES `unidad_medica` (`IdUnidad`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `USUARIOP` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `personal`
--
ALTER TABLE `personal`
  ADD CONSTRAINT `USUARIO` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `peticiones_consulta`
--
ALTER TABLE `peticiones_consulta`
  ADD CONSTRAINT `DOCTORC` FOREIGN KEY (`idDoctor`) REFERENCES `doctor` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ENFERMERAC` FOREIGN KEY (`idEnfermera`) REFERENCES `enfermera` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `PACIENTEC` FOREIGN KEY (`idPaciente`) REFERENCES `paciente` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `signosconsulta`
--
ALTER TABLE `signosconsulta`
  ADD CONSTRAINT `CONSULTA_S` FOREIGN KEY (`idconsulta`) REFERENCES `consulta` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `SIGNOC` FOREIGN KEY (`idsigno`) REFERENCES `signovital` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `unidad_medica`
--
ALTER TABLE `unidad_medica`
  ADD CONSTRAINT `DIRECCIONUNIDAD` FOREIGN KEY (`idDireccion`) REFERENCES `direccion` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `DIRECCION` FOREIGN KEY (`direccionId`) REFERENCES `direccion` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
