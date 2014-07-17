SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

CREATE SCHEMA IF NOT EXISTS `HackDFTest` DEFAULT CHARACTER SET utf8 ;
USE `HackDFTest` ;

-- -----------------------------------------------------
-- Table `HackDFTest`.`clients`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HackDFTest`.`clients` ;

CREATE TABLE IF NOT EXISTS `HackDFTest`.`clients` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `destiny` VARCHAR(255) NOT NULL,
  `date_created` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` INT(11) NOT NULL DEFAULT '1',
  `direction` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 28
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `HackDFTest`.`concesiones_taxis`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HackDFTest`.`concesiones_taxis` ;

CREATE TABLE IF NOT EXISTS `HackDFTest`.`concesiones_taxis` (
  `field1` VARCHAR(255) NULL DEFAULT NULL,
  `field2` VARCHAR(255) NULL DEFAULT NULL,
  `field3` VARCHAR(255) NULL DEFAULT NULL,
  `field4` VARCHAR(255) NULL DEFAULT NULL,
  `field5` VARCHAR(255) NULL DEFAULT NULL,
  `field6` VARCHAR(255) NULL DEFAULT NULL,
  `field7` INT(11) NULL DEFAULT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `HackDFTest`.`geo_red_metro`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HackDFTest`.`geo_red_metro` ;

CREATE TABLE IF NOT EXISTS `HackDFTest`.`geo_red_metro` (
  `gid` FLOAT(10,0) NULL DEFAULT NULL,
  `id_linea` VARCHAR(255) NULL DEFAULT NULL,
  `origen` FLOAT(10,0) NULL DEFAULT NULL,
  `destino` FLOAT(10,0) NULL DEFAULT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `HackDFTest`.`indicadores_delegacionales`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HackDFTest`.`indicadores_delegacionales` ;

CREATE TABLE IF NOT EXISTS `HackDFTest`.`indicadores_delegacionales` (
  `field1` VARCHAR(255) NULL DEFAULT NULL,
  `field2` VARCHAR(255) NULL DEFAULT NULL,
  `field3` VARCHAR(255) NULL DEFAULT NULL,
  `field4` VARCHAR(255) NULL DEFAULT NULL,
  `field5` VARCHAR(255) NULL DEFAULT NULL,
  `field6` VARCHAR(255) NULL DEFAULT NULL,
  `field7` VARCHAR(255) NULL DEFAULT NULL,
  `field8` VARCHAR(255) NULL DEFAULT NULL,
  `field9` VARCHAR(255) NULL DEFAULT NULL,
  `field10` VARCHAR(255) NULL DEFAULT NULL,
  `field11` VARCHAR(255) NULL DEFAULT NULL,
  `field12` VARCHAR(255) NULL DEFAULT NULL,
  `field13` VARCHAR(255) NULL DEFAULT NULL,
  `field14` VARCHAR(255) NULL DEFAULT NULL,
  `field15` VARCHAR(255) NULL DEFAULT NULL,
  `field16` VARCHAR(255) NULL DEFAULT NULL,
  `field17` VARCHAR(255) NULL DEFAULT NULL,
  `field18` VARCHAR(255) NULL DEFAULT NULL,
  `field19` VARCHAR(255) NULL DEFAULT NULL,
  `field20` VARCHAR(255) NULL DEFAULT NULL,
  `field21` VARCHAR(255) NULL DEFAULT NULL,
  `field22` VARCHAR(255) NULL DEFAULT NULL,
  `field23` VARCHAR(255) NULL DEFAULT NULL,
  `field24` VARCHAR(255) NULL DEFAULT NULL,
  `field25` VARCHAR(255) NULL DEFAULT NULL,
  `field26` VARCHAR(255) NULL DEFAULT NULL,
  `field27` VARCHAR(255) NULL DEFAULT NULL,
  `field28` VARCHAR(255) NULL DEFAULT NULL,
  `field29` VARCHAR(255) NULL DEFAULT NULL,
  `field30` VARCHAR(255) NULL DEFAULT NULL,
  `field31` VARCHAR(255) NULL DEFAULT NULL,
  `field32` VARCHAR(255) NULL DEFAULT NULL,
  `field33` VARCHAR(255) NULL DEFAULT NULL,
  `field34` VARCHAR(255) NULL DEFAULT NULL,
  `field35` VARCHAR(255) NULL DEFAULT NULL,
  `field36` VARCHAR(255) NULL DEFAULT NULL,
  `field37` VARCHAR(255) NULL DEFAULT NULL,
  `field38` VARCHAR(255) NULL DEFAULT NULL,
  `field39` VARCHAR(255) NULL DEFAULT NULL,
  `field40` VARCHAR(255) NULL DEFAULT NULL,
  `field41` VARCHAR(255) NULL DEFAULT NULL,
  `field42` VARCHAR(255) NULL DEFAULT NULL,
  `field43` VARCHAR(255) NULL DEFAULT NULL,
  `field44` VARCHAR(255) NULL DEFAULT NULL,
  `field45` VARCHAR(255) NULL DEFAULT NULL,
  `field46` VARCHAR(255) NULL DEFAULT NULL,
  `field47` VARCHAR(255) NULL DEFAULT NULL,
  `field48` VARCHAR(255) NULL DEFAULT NULL,
  `field49` VARCHAR(255) NULL DEFAULT NULL,
  `field50` VARCHAR(255) NULL DEFAULT NULL,
  `field51` VARCHAR(255) NULL DEFAULT NULL,
  `field52` VARCHAR(255) NULL DEFAULT NULL,
  `field53` VARCHAR(255) NULL DEFAULT NULL,
  `field54` VARCHAR(255) NULL DEFAULT NULL,
  `field55` VARCHAR(255) NULL DEFAULT NULL,
  `field56` VARCHAR(255) NULL DEFAULT NULL,
  `field57` VARCHAR(255) NULL DEFAULT NULL,
  `field58` VARCHAR(255) NULL DEFAULT NULL,
  `field59` VARCHAR(255) NULL DEFAULT NULL,
  `field60` VARCHAR(255) NULL DEFAULT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `HackDFTest`.`licenciasB_taxis`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HackDFTest`.`licenciasB_taxis` ;

CREATE TABLE IF NOT EXISTS `HackDFTest`.`licenciasB_taxis` (
  `field1` VARCHAR(255) NULL DEFAULT NULL,
  `field2` VARCHAR(255) NULL DEFAULT NULL,
  `field3` VARCHAR(255) NULL DEFAULT NULL,
  `field4` VARCHAR(255) NULL DEFAULT NULL,
  `field5` VARCHAR(255) NULL DEFAULT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `HackDFTest`.`mercados`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HackDFTest`.`mercados` ;

CREATE TABLE IF NOT EXISTS `HackDFTest`.`mercados` (
  `field1` VARCHAR(255) NULL DEFAULT NULL,
  `field2` VARCHAR(255) NULL DEFAULT NULL,
  `field3` VARCHAR(255) NULL DEFAULT NULL,
  `field4` VARCHAR(255) NULL DEFAULT NULL,
  `field5` VARCHAR(255) NULL DEFAULT NULL,
  `field6` VARCHAR(255) NULL DEFAULT NULL,
  `field7` VARCHAR(255) NULL DEFAULT NULL,
  `field8` VARCHAR(255) NULL DEFAULT NULL,
  `field9` VARCHAR(255) NULL DEFAULT NULL,
  `field10` VARCHAR(255) NULL DEFAULT NULL,
  `field11` VARCHAR(255) NULL DEFAULT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `HackDFTest`.`reporte_vial`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HackDFTest`.`reporte_vial` ;

CREATE TABLE IF NOT EXISTS `HackDFTest`.`reporte_vial` (
  `no_ticket` VARCHAR(255) NULL DEFAULT NULL,
  `apertura` VARCHAR(255) NULL DEFAULT NULL,
  `motivo` VARCHAR(255) NULL DEFAULT NULL,
  `lat` VARCHAR(255) NULL DEFAULT NULL,
  `lng` VARCHAR(255) NULL DEFAULT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `HackDFTest`.`verificaciones`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HackDFTest`.`verificaciones` ;

CREATE TABLE IF NOT EXISTS `HackDFTest`.`verificaciones` (
  `field1` VARCHAR(255) NULL DEFAULT NULL,
  `field2` VARCHAR(255) NULL DEFAULT NULL,
  `field3` VARCHAR(255) NULL DEFAULT NULL,
  `field4` VARCHAR(255) NULL DEFAULT NULL,
  `field5` VARCHAR(255) NULL DEFAULT NULL,
  `field6` VARCHAR(255) NULL DEFAULT NULL,
  `field7` VARCHAR(255) NULL DEFAULT NULL,
  `field8` VARCHAR(255) NULL DEFAULT NULL,
  `field9` VARCHAR(255) NULL DEFAULT NULL,
  `field10` VARCHAR(255) NULL DEFAULT NULL,
  `field11` VARCHAR(255) NULL DEFAULT NULL,
  `field12` VARCHAR(255) NULL DEFAULT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `HackDFTest`.`verificentros`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `HackDFTest`.`verificentros` ;

CREATE TABLE IF NOT EXISTS `HackDFTest`.`verificentros` (
  `field1` VARCHAR(255) NULL DEFAULT NULL,
  `field2` VARCHAR(255) NULL DEFAULT NULL,
  `field3` VARCHAR(255) NULL DEFAULT NULL,
  `field4` VARCHAR(255) NULL DEFAULT NULL,
  `field5` VARCHAR(255) NULL DEFAULT NULL,
  `field6` VARCHAR(255) NULL DEFAULT NULL,
  `field7` VARCHAR(255) NULL DEFAULT NULL)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
