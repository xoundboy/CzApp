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
  `map_en_id` int(11) NOT NULL,
  `map_cz_id` int(11) NOT NULL,
  `map_notes` tinytext,
  `map_dateAdded` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `map_ip` varchar(19) DEFAULT NULL,
  `map_userId` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`map_en_id`,`map_cz_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lexemes_cz`
--

DROP TABLE IF EXISTS `lexemes_cz`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lexemes_cz` (
  `cz_id` int(11) NOT NULL AUTO_INCREMENT,
  `cz_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `cz_text` text,
  `cz_wordType` enum('NULL','NOUN','VERB','ADJECTIVE','ADVERB','PREPOSITION','GERUND','CONJUNCTION','PRONOUN') DEFAULT NULL,
  `cz_phraseType` enum('NULL','PROVERB','PHRASALVERB','MODALVERB','IDIOM','COLLOQUIALISM','OTHER') DEFAULT NULL,
  `cz_type` enum('WORD','PHRASE') DEFAULT NULL,
  `cz_notes` text,
  `cz_gender` enum('NULL','MASCULINE','MASCULINEANIMATUM','FEMININE','NEUTER') DEFAULT NULL,
  `cz_verbAspect` enum('NULL','PERFECTIVE','IMPERFECTIVE') DEFAULT NULL,
  `cz_ip` varchar(45) DEFAULT NULL,
  `cz_userId` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`cz_id`),
  UNIQUE KEY `lexemes_cz_id_uindex` (`cz_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lexemes_en`
--

DROP TABLE IF EXISTS `lexemes_en`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lexemes_en` (
  `en_id` int(11) NOT NULL AUTO_INCREMENT,
  `en_ts` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `en_text` text,
  `en_type` enum('WORD','PHRASE') DEFAULT NULL,
  `en_wordType` enum('NULL','NOUN','VERB','ADJECTIVE','ADVERB','PREPOSITION','GERUND','CONJUNCTION','PRONOUN') DEFAULT NULL,
  `en_phraseType` enum('NULL','PROVERB','PHRASALVERB','MODALVERB','IDIOM','COLLOQUIALISM','OTHER') DEFAULT NULL,
  `en_notes` text,
  `en_ip` varchar(45) DEFAULT NULL,
  `en_userId` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`en_id`),
  UNIQUE KEY `lexemes_en_id_uindex` (`en_id`)
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
/*!50003 DROP PROCEDURE IF EXISTS `deleteLexemePair` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`czappDbUser`@`localhost` PROCEDURE `deleteLexemePair`(
	IN  czId		 INT(10),
    IN  enId		 INT(10)
)
BEGIN

	-- delete the mapping --
    DELETE FROM 	lexeme_map 
    WHERE 			lexeme_map.map_en_id = enId
    AND				lexeme_map.map_cz_id = czId;

	-- delete the English lexeme --
	DELETE FROM 	lexemes_en 
    WHERE 			en_id = enId;
    
	-- delete the Czech lexeme --
	DELETE FROM 	lexemes_cz 
    WHERE 			cz_id = czId;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
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
CREATE DEFINER=`czappDbUser`@`localhost` PROCEDURE `insertLexemePair`(

	IN  czId		 INT(10),
	IN  czText       TEXT,
    IN  czNotes      TEXT,
    IN  czType       ENUM('NULL', 'WORD', 'PHRASE'),
    IN  czWordType   ENUM('NULL', 'NOUN', 'VERB', 'ADJECTIVE', 'ADVERB', 'PREPOSITION', 'GERUND', 'CONJUNCTION', 'PRONOUN'),
	IN  czPhraseType ENUM('NULL', 'PROVERB', 'IDIOM', 'COLLOQUIALISM', 'OTHER'),
    IN  czGender     ENUM('NULL', 'MASCULINE', 'MASCULINE_ANIMATUM', 'FEMININE', 'NEUTER'),
    IN  czVerbAspect ENUM('NULL', 'PERFECTIVE', 'IMPERFECTIVE'),
    
    IN  enId		 INT(10),
    IN  enText       TEXT,
    IN  enNotes      TEXT,
    IN  enType       ENUM('NULL', 'WORD', 'PHRASE'),
	IN  enWordType   ENUM('NULL', 'NOUN', 'VERB', 'ADJECTIVE', 'ADVERB', 'PREPOSITION', 'GERUND', 'CONJUNCTION', 'PRONOUN'),
	IN  enPhraseType ENUM('NULL', 'PROVERB', 'IDIOM', 'COLLOQUIALISM', 'OTHER'),
	
	IN  mapNotes     TEXT,
    IN  mapIp        VARCHAR(16),
    IN  mapUserId    VARCHAR(50),
	OUT pair_insert_id  INT(10)
)
BEGIN
	DECLARE cz_id INT;
	DECLARE en_id INT;
	DECLARE pair_insert_id INT;
    
    IF czId THEN 
		SET cz_id = czId;
        
    ELSE
		-- Insert the Czech version
		INSERT INTO lexemes_cz (
			cz_text, 
            cz_wordType, 
            cz_phraseType, 
            cz_type, 
            cz_gender, 
            cz_verbAspect, 
            cz_notes, 
            cz_ip, 
            cz_userId)
            
		VALUES (
			czText,
            czWordType, 
            czPhraseType, 
            czType, 
            czGender, 
            czVerbAspect, 
            czNotes, 
            mapIp, 
            mapUserId);
		
        SET cz_id = LAST_INSERT_ID();
	END IF;

    IF enId THEN 
		SET en_id = enId;
        
	ELSE
		-- Insert the English version
		INSERT INTO lexemes_en (
			en_text, 
            en_wordType, 
            en_phraseType, 
            en_type, 
            en_notes, 
            en_ip, 
            en_userId)

		VALUES (
			enText,
            enWordType,
            enPhraseType,
			enType, 
            enNotes, 
            mapIp, 
            mapUserId);
		
        SET en_id = LAST_INSERT_ID();
	END IF;

	-- Insert the mapping
	INSERT INTO lexeme_map (
		map_en_id, 
        map_cz_id, 
        map_notes, 
        map_ip, 
        map_userId)
        
	VALUES (
		en_id, 
        cz_id, 
        mapNotes, 
        mapIp, 
        mapUserId);
        
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
/*!50003 DROP PROCEDURE IF EXISTS `selectLexemePair` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`czappDbUser`@`localhost` PROCEDURE `selectLexemePair`(
	IN 	czId 	INT(10),
	IN	enId	INT(10)
)
BEGIN
	SELECT *
    FROM 	lexemes_cz cz, 
			lexemes_en en,
            lexeme_map lm
    WHERE 	cz.cz_id = czId
    AND 	en.en_id = enId
    AND 	lm.map_en_id = enId
    AND 	lm.map_cz_id = czId;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `selectRecentLexemes` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`czappDbUser`@`localhost` PROCEDURE `selectRecentLexemes`(
    IN  userId     TEXT
)
BEGIN
	SELECT *
    FROM lexemes_cz cz, lexemes_en en, lexeme_map map
    WHERE cz.cz_id = map.map_cz_id
    AND en.en_id = map.map_en_id
    AND map.map_userId = userId
    ORDER BY map.map_dateAdded DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `updateLexemePair` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = '' */ ;
DELIMITER ;;
CREATE DEFINER=`czappDbUser`@`localhost` PROCEDURE `updateLexemePair`(

	IN  czId		 INT(10),
	IN  czText       TEXT,
    IN  czNotes      TEXT,
    IN  czType       ENUM('NULL', 'WORD', 'PHRASE'),
    IN  czWordType   ENUM('NULL', 'NOUN', 'VERB', 'ADJECTIVE', 'ADVERB', 'PREPOSITION', 'GERUND', 'CONJUNCTION', 'PRONOUN'),
	IN  czPhraseType ENUM('NULL', 'PROVERB', 'IDIOM', 'COLLOQUIALISM', 'OTHER'),
    IN  czGender     ENUM('NULL', 'MASCULINE', 'MASCULINE_ANIMATUM', 'FEMININE', 'NEUTER'),
    IN  czVerbAspect ENUM('NULL', 'PERFECTIVE', 'IMPERFECTIVE'),
    
    IN  enId		 INT(10),
    IN  enText       TEXT,
    IN  enNotes      TEXT,
    IN  enType       ENUM('NULL', 'WORD', 'PHRASE'),
	IN  enWordType   ENUM('NULL', 'NOUN', 'VERB', 'ADJECTIVE', 'ADVERB', 'PREPOSITION', 'GERUND', 'CONJUNCTION', 'PRONOUN'),
	IN  enPhraseType ENUM('NULL', 'PROVERB', 'IDIOM', 'COLLOQUIALISM', 'OTHER'),
	
	IN  mapNotes     TEXT,
    IN  mapIp        VARCHAR(16),
    IN  mapUserId    VARCHAR(50)
)
BEGIN

	-- TODO: ensure that the czId and enId pair have a valid mapping to avoid data corruption if one or both of them have somehow been modified --

	-- Update the Czech version
	UPDATE lexemes_cz
    
	SET	cz_text = czText, 
		cz_wordType = czWordType, 
		cz_phraseType = czPhraseType, 
		cz_type = czType, 
		cz_gender = czGender, 
		cz_verbAspect = czVerbAspect, 
		cz_notes = czNotes, 
		cz_ip = mapIp, 
		cz_userId = mapUserId
        
	WHERE cz_id = czId;
 
 	-- Update the English version
	UPDATE lexemes_en
    
	SET	en_text = enText, 
		en_wordType = enWordType, 
		en_phraseType = enPhraseType, 
		en_type = enType, 
		en_notes = enNotes, 
		en_ip = mapIp, 
		en_userId = mapUserId
        
	WHERE en_id = enId;
    
    -- Update pairing notes in map table --
    UPDATE 	lexeme_map
    SET 	map_notes = mapNotes
    WHERE	map_en_id = enId
    AND		map_cz_id = czId;
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

-- Dump completed on 2019-08-04 20:03:12
