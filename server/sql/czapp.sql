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
-- Dumping data for table `lexeme_map`
--

LOCK TABLES `lexeme_map` WRITE;
/*!40000 ALTER TABLE `lexeme_map` DISABLE KEYS */;
INSERT INTO `lexeme_map` VALUES (1,8,''),(2,9,''),(3,10,''),(4,11,''),(5,12,''),(6,13,''),(7,14,''),(8,15,''),(9,16,''),(10,17,''),(11,18,''),(12,19,''),(13,20,''),(14,21,'');
/*!40000 ALTER TABLE `lexeme_map` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lexemes_cz`
--

LOCK TABLES `lexemes_cz` WRITE;
/*!40000 ALTER TABLE `lexemes_cz` DISABLE KEYS */;
INSERT INTO `lexemes_cz` VALUES (1,'2018-12-01 12:53:47','','','','','','','',''),(2,'2018-12-01 12:55:36','','','','','','','',''),(3,'2018-12-01 13:18:17','xsdf','','NOUN','NULL','WORD','','NEUTER','NULL'),(4,'2018-12-01 13:18:37','xsdf','','NOUN','NULL','WORD','','NEUTER','NULL'),(5,'2018-12-01 13:19:43','xsdf','','NOUN','NULL','WORD','','NEUTER','NULL'),(6,'2018-12-01 13:19:44','xsdf','','NOUN','NULL','WORD','','NEUTER','NULL'),(7,'2018-12-01 13:19:46','xsdf','','NOUN','NULL','WORD','','NEUTER','NULL'),(8,'2018-12-01 22:31:28','undefined','undefined','ADJECTIVE','NULL','WORD',NULL,'NULL','NULL'),(9,'2018-12-02 10:44:32','undefined','undefined','VERB','NULL','WORD',NULL,'NULL','PERFECTIVE'),(10,'2018-12-02 10:55:27','undefined','undefined','VERB','NULL','WORD',NULL,'NULL','PERFECTIVE'),(11,'2018-12-02 10:55:50','undefined','undefined','VERB','NULL','WORD',NULL,'NULL','PERFECTIVE'),(12,'2018-12-02 10:56:13','undefined','undefined','VERB','NULL','WORD',NULL,'NULL','PERFECTIVE'),(13,'2018-12-02 10:56:44','test1-cz','test1-en','VERB','NULL','WORD',NULL,'NULL','PERFECTIVE'),(14,'2018-12-02 10:57:25','test1-cz','test1-en','VERB','NULL','WORD',NULL,'NULL','PERFECTIVE'),(15,'2018-12-02 10:57:26','test1-cz','test1-en','VERB','NULL','WORD',NULL,'NULL','PERFECTIVE'),(16,'2018-12-02 10:57:29','test1-cz','test1-en','VERB','NULL','WORD',NULL,'NULL','PERFECTIVE'),(17,'2018-12-02 10:59:49','test1-cz','undefined','VERB','NULL','WORD',NULL,'NULL','PERFECTIVE'),(18,'2018-12-02 11:01:19','test1-cz','','VERB','NULL','WORD',NULL,'NULL','PERFECTIVE'),(19,'2018-12-02 11:02:19','','tohle je vyraz','NULL','OTHER','PHRASE',NULL,'NULL','NULL'),(20,'2018-12-02 11:05:23','','tohle je výraz s diakritiky +ěščřžýáíéúů atd.','NULL','OTHER','PHRASE',NULL,'NULL','NULL'),(21,'2018-12-02 11:10:10','','tohle je výraz s diakritiky +ěščřžýáíéúů atd.','NULL','OTHER','PHRASE',NULL,'NULL','NULL');
/*!40000 ALTER TABLE `lexemes_cz` ENABLE KEYS */;
UNLOCK TABLES;

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
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lexemes_en`
--

LOCK TABLES `lexemes_en` WRITE;
/*!40000 ALTER TABLE `lexemes_en` DISABLE KEYS */;
INSERT INTO `lexemes_en` VALUES (1,'2018-12-01 22:31:28','sdsd','rghrth','WORD','ADJECTIVE','NULL',NULL),(2,'2018-12-02 10:44:32','test1-cz','test1-en','WORD','VERB','NULL',NULL),(3,'2018-12-02 10:55:27','test1-cz','test1-en','WORD','VERB','NULL',NULL),(4,'2018-12-02 10:55:50','test1-cz','test1-en','WORD','VERB','NULL',NULL),(5,'2018-12-02 10:56:13','test1-cz','test1-en','WORD','VERB','NULL',NULL),(6,'2018-12-02 10:56:44','undefined','undefined','WORD','VERB','NULL',NULL),(7,'2018-12-02 10:57:25','undefined','undefined','WORD','VERB','NULL',NULL),(8,'2018-12-02 10:57:26','undefined','undefined','WORD','VERB','NULL',NULL),(9,'2018-12-02 10:57:29','undefined','undefined','WORD','VERB','NULL',NULL),(10,'2018-12-02 10:59:49','test1-en','undefined','WORD','VERB','NULL',NULL),(11,'2018-12-02 11:01:19','test1-en','','WORD','VERB','NULL',NULL),(12,'2018-12-02 11:02:19','','this is a phrase','PHRASE','NULL','OTHER',NULL),(13,'2018-12-02 11:05:23','','some crazy czech glyphs','PHRASE','NULL','OTHER',NULL),(14,'2018-12-02 11:10:10','','some crazy czech glyphs','PHRASE','NULL','OTHER',NULL);
/*!40000 ALTER TABLE `lexemes_en` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `phrases`
--

LOCK TABLES `phrases` WRITE;
/*!40000 ALTER TABLE `phrases` DISABLE KEYS */;
/*!40000 ALTER TABLE `phrases` ENABLE KEYS */;
UNLOCK TABLES;

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
-- Dumping data for table `words`
--

LOCK TABLES `words` WRITE;
/*!40000 ALTER TABLE `words` DISABLE KEYS */;
/*!40000 ALTER TABLE `words` ENABLE KEYS */;
UNLOCK TABLES;

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
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES' */ ;
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
	OUT pair_insert_id  INT(10)
)
BEGIN
	DECLARE cz_id INT;
	DECLARE en_id INT;
	DECLARE pair_insert_id INT;

	-- Insert the Czech version
	INSERT INTO lexemes_cz (word, phrase, wordType, phraseType, type, gender, verbAspect)
	VALUES (czWord, czPhrase, wordType, phraseType, type, gender, verbAspect);
	SET cz_id = LAST_INSERT_ID();

	-- Insert the English version
	INSERT INTO lexemes_en (type, word, phrase, wordType, phraseType)
	VALUES (type, enWord, enPhrase, wordType, phraseType);
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
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-12-02 12:35:21
