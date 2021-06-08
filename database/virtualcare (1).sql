-- phpMyAdmin SQL Dump
-- version 4.9.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 08-06-2021 a las 20:35:42
-- Versión del servidor: 10.4.8-MariaDB
-- Versión de PHP: 7.3.11

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
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
-- Creación: 30-05-2021 a las 00:03:29
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `chat`
--
-- Creación: 30-05-2021 a las 01:27:17
--

DROP TABLE IF EXISTS `chat`;
CREATE TABLE IF NOT EXISTS `chat` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `idusuario` int(11) NOT NULL,
  `idconsulta` int(11) NOT NULL,
  `mensaje` text COLLATE utf8_unicode_ci NOT NULL,
  `fecha` datetime NOT NULL,
  `status` tinyint(1) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `USUARIOCH` (`idusuario`),
  KEY `CONSULTACH` (`idconsulta`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- RELACIONES PARA LA TABLA `chat`:
--   `idconsulta`
--       `consulta` -> `Id`
--   `idusuario`
--       `usuario` -> `Id`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `consulta`
--
-- Creación: 30-05-2021 a las 01:12:47
--

DROP TABLE IF EXISTS `consulta`;
CREATE TABLE IF NOT EXISTS `consulta` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `idpaciente` int(11) NOT NULL,
  `iddoctor` int(11) NOT NULL,
  `idenfermera` int(11) NOT NULL,
  `idvllamada` int(11) NOT NULL,
  `anotaciones` text COLLATE utf8_unicode_ci DEFAULT NULL,
  `sintomas` text COLLATE utf8_unicode_ci NOT NULL,
  `fecha` datetime NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `VIDEOLL` (`idvllamada`) USING BTREE,
  KEY `PACIENTEC` (`idpaciente`),
  KEY `DOCTORC` (`iddoctor`),
  KEY `ENFERMERAC` (`idenfermera`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- RELACIONES PARA LA TABLA `consulta`:
--   `iddoctor`
--       `doctor` -> `Id`
--   `idenfermera`
--       `enfermera` -> `Id`
--   `idpaciente`
--       `paciente` -> `Id`
--   `idvllamada`
--       `videollamada` -> `Id`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `diagenf`
--
-- Creación: 30-05-2021 a las 01:51:47
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `diagnostico`
--
-- Creación: 30-05-2021 a las 01:47:50
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `direccion`
--
-- Creación: 29-05-2021 a las 23:49:36
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `doctor`
--
-- Creación: 06-06-2021 a las 00:15:24
--

DROP TABLE IF EXISTS `doctor`;
CREATE TABLE IF NOT EXISTS `doctor` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `cedula` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `idpersonal` int(11) NOT NULL,
  `activo` tinyint(1) NOT NULL,
  `consultando` tinyint(1) NOT NULL,
  `especialidad` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `PERSONALD` (`idpersonal`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- RELACIONES PARA LA TABLA `doctor`:
--   `idpersonal`
--       `doctor` -> `Id`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `enfermedad`
--
-- Creación: 30-05-2021 a las 01:42:25
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `enfermera`
--
-- Creación: 30-05-2021 a las 00:47:42
-- Última actualización: 08-06-2021 a las 18:28:10
--

DROP TABLE IF EXISTS `enfermera`;
CREATE TABLE IF NOT EXISTS `enfermera` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `idpersonal` int(11) NOT NULL,
  `locacion` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `PERSONALE` (`idpersonal`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- RELACIONES PARA LA TABLA `enfermera`:
--   `idpersonal`
--       `personal` -> `Id`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estudiolab`
--
-- Creación: 30-05-2021 a las 00:44:28
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `historialmedico`
--
-- Creación: 30-05-2021 a las 00:50:12
--

DROP TABLE IF EXISTS `historialmedico`;
CREATE TABLE IF NOT EXISTS `historialmedico` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `idpaciente` int(11) NOT NULL,
  `alergias` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ;

--
-- RELACIONES PARA LA TABLA `historialmedico`:
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `paciente`
--
-- Creación: 02-06-2021 a las 05:09:12
--

DROP TABLE IF EXISTS `paciente`;
CREATE TABLE IF NOT EXISTS `paciente` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `idusuario` int(11) NOT NULL,
  `fecha_registro` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  PRIMARY KEY (`Id`),
  KEY `USUARIOP` (`idusuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- RELACIONES PARA LA TABLA `paciente`:
--   `idusuario`
--       `usuario` -> `Id`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal`
--
-- Creación: 08-06-2021 a las 18:34:35
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `receta`
--
-- Creación: 30-05-2021 a las 01:48:25
--

DROP TABLE IF EXISTS `receta`;
CREATE TABLE IF NOT EXISTS `receta` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `id_diagnostico` int(11) NOT NULL,
  `medicamentos` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL
) ;

--
-- RELACIONES PARA LA TABLA `receta`:
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `signosconsulta`
--
-- Creación: 30-05-2021 a las 01:38:44
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `signovital`
--
-- Creación: 30-05-2021 a las 01:35:03
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

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--
-- Creación: 05-06-2021 a las 23:39:18
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
--   `direccionId`
--       `direccion` -> `Id`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios_pendientes`
--
-- Creación: 06-06-2021 a las 01:43:12
--

DROP TABLE IF EXISTS `usuarios_pendientes`;
CREATE TABLE IF NOT EXISTS `usuarios_pendientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `idusuario` int(11) NOT NULL,
  `access_token` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `USUARIO_PENDIENTE` (`idusuario`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- RELACIONES PARA LA TABLA `usuarios_pendientes`:
--   `idusuario`
--       `personal` -> `Id`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `videollamada`
--
-- Creación: 30-05-2021 a las 01:17:43
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
--   `idconsulta`
--       `consulta` -> `Id`
--

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
  ADD CONSTRAINT `USUARIOCH` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `consulta`
--
ALTER TABLE `consulta`
  ADD CONSTRAINT `DOCTORC` FOREIGN KEY (`iddoctor`) REFERENCES `doctor` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ENFERMERAC` FOREIGN KEY (`idenfermera`) REFERENCES `enfermera` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `PACIENTEC` FOREIGN KEY (`idpaciente`) REFERENCES `paciente` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
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
  ADD CONSTRAINT `PERSONALD` FOREIGN KEY (`idpersonal`) REFERENCES `doctor` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `enfermera`
--
ALTER TABLE `enfermera`
  ADD CONSTRAINT `PERSONALE` FOREIGN KEY (`idpersonal`) REFERENCES `personal` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `estudiolab`
--
ALTER TABLE `estudiolab`
  ADD CONSTRAINT `PACIENTEL` FOREIGN KEY (`idpaciente`) REFERENCES `paciente` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `paciente`
--
ALTER TABLE `paciente`
  ADD CONSTRAINT `USUARIOP` FOREIGN KEY (`idusuario`) REFERENCES `usuario` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `personal`
--
ALTER TABLE `personal`
  ADD CONSTRAINT `USUARIO` FOREIGN KEY (`idUsuario`) REFERENCES `usuario` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `signosconsulta`
--
ALTER TABLE `signosconsulta`
  ADD CONSTRAINT `CONSULTA_S` FOREIGN KEY (`idconsulta`) REFERENCES `consulta` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `SIGNOC` FOREIGN KEY (`idsigno`) REFERENCES `signovital` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `DIRECCION` FOREIGN KEY (`direccionId`) REFERENCES `direccion` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `usuarios_pendientes`
--
ALTER TABLE `usuarios_pendientes`
  ADD CONSTRAINT `USUARIO_PENDIENTE` FOREIGN KEY (`idusuario`) REFERENCES `personal` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Filtros para la tabla `videollamada`
--
ALTER TABLE `videollamada`
  ADD CONSTRAINT `CONSULTAV` FOREIGN KEY (`idconsulta`) REFERENCES `consulta` (`Id`) ON DELETE CASCADE ON UPDATE CASCADE;
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
