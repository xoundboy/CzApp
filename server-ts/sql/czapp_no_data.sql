-- MySQL dump 10.13  Distrib 5.5.62, for osx10.11 (x86_64)
--
-- Host: localhost    Database: czapp
-- ------------------------------------------------------
-- Server version	5.5.62

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `lexeme_map`
--

DROP TABLE IF EXISTS `lexeme_map`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lexeme_map` (
  `en_id` int(11) NOT NULL,
  `cz_id` int(11) NOT NULL,
  `notes` tinytext,
  PRIMARY KEY (`en_id`,`cz_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lexemes_cz`
--

DROP TABLE IF EXISTS `lexemes_cz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lexemes_cz` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `word` varchar(50) DEFAULT NULL,
  `phrase` text,
  `wordType` enum('NULL','NOUN','VERB','ADJECTIVE','ADVERB','PREPOSITION','GERUND','CONJUNCTION','PRONOUN') DEFAULT NULL,
  `phraseType` enum('NULL','PROVERB','PHRASALVERB','MODALVERB','IDIOM','COLLOQUIALISM','OTHER') DEFAULT NULL,
  `type` enum('WORD','PHRASE') DEFAULT NULL,
  `notes` text,
  `gender` enum('NULL','MASCULINE','MASCULINEANIMATUM','FEMININE','NEUTER') DEFAULT NULL,
  `verbAspect` enum('NULL','PERFECTIVE','IMPERFECTIVE') DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexemes_cz_id_uindex` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lexemes_en`
--

DROP TABLE IF EXISTS `lexemes_en`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lexemes_en` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `word` varchar(50) DEFAULT NULL,
  `phrase` text,
  `type` enum('WORD','PHRASE') DEFAULT NULL,
  `wordType` enum('NULL','NOUN','VERB','ADJECTIVE','ADVERB','PREPOSITION','GERUND','CONJUNCTION','PRONOUN') DEFAULT NULL,
  `phraseType` enum('NULL','PROVERB','PHRASALVERB','MODALVERB','IDIOM','COLLOQUIALISM','OTHER') DEFAULT NULL,
  `notes` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `lexemes_en_id_uindex` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `phrases`
--

DROP TABLE IF EXISTS `phrases`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `phrases` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `text` text,
  `language` enum('EN','CZ') DEFAULT NULL,
  `type` enum('NONE','PROVERB','PHRASALVERB','MODALVERB','IDIOM','COLLOQUIALISM','OTHER') DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `phrases_id_uindex` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `words`
--

DROP TABLE IF EXISTS `words`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `words` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` varchar(50) NOT NULL,
  `note` text,
  `ts` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `language` enum('EN','CZ') DEFAULT NULL,
  `type` enum('NONE','NOUN','VERB','ADJECTIVE','ADVERB','PREPOSITION','GERUND','CONJUNCTION','PRONOUN') DEFAULT NULL,
  `czGender` enum('NONE','FEMININE','MASCULINE','MASCULINE_ANIMATUM') DEFAULT NULL,
  `czVerbAspect` enum('UNKNOWN','PERFECTIVE','IMPERFECTIVE') DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `words_id_uindex` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'czapp'
--
/*!50003 DROP PROCEDURE IF EXISTS `insertLexemePair` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`czapp`@`localhost` PROCEDURE `insertLexemePair`(
	IN  czWord     VARCHAR(50),
	IN  enWord     VARCHAR(50),
	IN  czPhrase   VARCHAR(50),
	IN  enPhrase   VARCHAR(50),
	IN  wordType   ENUM('NULL', 'NOUN', 'VERB', 'ADJECTIVE', 'ADVERB', 'PREPOSITION', 'GERUND', 'CONJUNCTION', 'PRONOUN'),
	IN  phraseType ENUM('NULL', 'PROVERB', 'IDIOM', 'COLLOQUIALISM', 'OTHER'),
	IN  type       ENUM('NULL', 'WORD', 'PHRASE'),
	IN  gender     ENUM('NULL', 'MASCULINE', 'MASCULINE_ANIMATUM', 'FEMININE', 'NEUTER'),
	IN  verbAspect ENUM('NULL', 'PERFECTIVE', 'IMPERFECTIVE'),
	IN  notes      TEXT,
    IN  enNotes	   TEXT,
    IN  czNotes    TEXT,
	OUT pair_insert_id  INT(10)
)
BEGIN
	DECLARE cz_id INT;
	DECLARE en_id INT;
	DECLARE pair_insert_id INT;

	-- Insert the Czech version
	INSERT INTO lexemes_cz (word, phrase, wordType, phraseType, type, gender, verbAspect, notes)
	VALUES (czWord, czPhrase, wordType, phraseType, type, gender, verbAspect, czNotes);
	SET cz_id = LAST_INSERT_ID();

	-- Insert the English version
	INSERT INTO lexemes_en (type, word, phrase, wordType, phraseType, notes)
	VALUES (type, enWord, enPhrase, wordType, phraseType, enNotes);
	SET en_id = LAST_INSERT_ID();

	-- Insert the mapping
	INSERT INTO lexeme_map (en_id, cz_id, notes)
	VALUES (en_id, cz_id, notes);
	SET pair_insert_id = LAST_INSERT_ID();
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `searchDb` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `searchDb`()
BEGIN

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-24 12:20:34
