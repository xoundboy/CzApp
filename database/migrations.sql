USE `czapp`;
DROP procedure IF EXISTS `selectRecentLexemes`;

DELIMITER $$
USE `czapp`$$
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
END$$

DELIMITER ;




ALTER TABLE `czapp`.`lexeme_map`
DROP COLUMN `testColumn`,
DROP COLUMN `testColumn2`;

USE `czapp`;
DROP procedure IF EXISTS `selectRecentLexemes`;

DELIMITER $$
USE `czapp`$$
CREATE DEFINER=`czappDbUser`@`localhost` PROCEDURE `selectRecentLexemes`(
    IN  userId     TEXT
)
BEGIN
	SELECT *,
		cz.id as cz_id,
        cz.ts as cz_ts,
		cz.text as cz_text,
        cz.notes as cz_notes,
        cz.userId as cz_userId,
        en.text as en_text,
        en.notes as en_notes,
		en.userId as en_userId
    FROM lexemes_cz cz, lexemes_en en, lexeme_map map
    WHERE cz.id = map.cz_id
    AND en.id = map.en_id
    AND map.userId = userId;
END$$

DELIMITER ;

ALTER TABLE `czapp`.`lexemes_cz`
DROP COLUMN `word`,
CHANGE COLUMN `id` `cz_id` INT(11) NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `ts` `cz_ts` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
CHANGE COLUMN `phrase` `cz_text` TEXT NULL DEFAULT NULL ,
CHANGE COLUMN `wordType` `cz_wordType` ENUM('NULL','NOUN','VERB','ADJECTIVE','ADVERB','PREPOSITION','GERUND','CONJUNCTION','PRONOUN') NULL DEFAULT NULL ,
CHANGE COLUMN `phraseType` `cz_phraseType` ENUM('NULL','PROVERB','PHRASALVERB','MODALVERB','IDIOM','COLLOQUIALISM','OTHER') NULL DEFAULT NULL ,
CHANGE COLUMN `type` `cz_type` ENUM('WORD','PHRASE') NULL DEFAULT NULL ,
CHANGE COLUMN `notes` `cz_notes` TEXT NULL DEFAULT NULL ,
CHANGE COLUMN `gender` `cz_gender` ENUM('NULL','MASCULINE','MASCULINEANIMATUM','FEMININE','NEUTER') NULL DEFAULT NULL ,
CHANGE COLUMN `verbAspect` `cz_verbAspect` ENUM('NULL','PERFECTIVE','IMPERFECTIVE') NULL DEFAULT NULL ,
CHANGE COLUMN `ip` `cz_ip` VARCHAR(45) NULL DEFAULT NULL ,
CHANGE COLUMN `userId` `cz_userId` VARCHAR(45) NULL DEFAULT NULL ;


ALTER TABLE `czapp`.`lexemes_en`
DROP COLUMN `word`,
CHANGE COLUMN `id` `en_id` INT(11) NOT NULL AUTO_INCREMENT ,
CHANGE COLUMN `ts` `en_ts` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ,
CHANGE COLUMN `phrase` `en_text` TEXT NULL DEFAULT NULL ,
CHANGE COLUMN `type` `en_type` ENUM('WORD','PHRASE') NULL DEFAULT NULL ,
CHANGE COLUMN `wordType` `en_wordType` ENUM('NULL','NOUN','VERB','ADJECTIVE','ADVERB','PREPOSITION','GERUND','CONJUNCTION','PRONOUN') NULL DEFAULT NULL ,
CHANGE COLUMN `phraseType` `en_phraseType` ENUM('NULL','PROVERB','PHRASALVERB','MODALVERB','IDIOM','COLLOQUIALISM','OTHER') NULL DEFAULT NULL ,
CHANGE COLUMN `notes` `en_notes` TEXT NULL DEFAULT NULL ,
CHANGE COLUMN `ip` `en_ip` VARCHAR(45) NULL DEFAULT NULL ,
CHANGE COLUMN `userId` `en_userId` VARCHAR(45) NULL DEFAULT NULL ;

ALTER TABLE `czapp`.`lexeme_map`
CHANGE COLUMN `en_id` `map_en_id` INT(11) NOT NULL ,
CHANGE COLUMN `cz_id` `map_cz_id` INT(11) NOT NULL ,
CHANGE COLUMN `notes` `map_notes` TINYTEXT NULL DEFAULT NULL ,
CHANGE COLUMN `dateAdded` `map_dateAdded` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ,
CHANGE COLUMN `ip` `map_ip` VARCHAR(19) NULL DEFAULT NULL ,
CHANGE COLUMN `userId` `map_userId` VARCHAR(45) NULL DEFAULT NULL ;


USE `czapp`;
DROP procedure IF EXISTS `insertLexemePair`;

DELIMITER $$
USE `czapp`$$
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
END$$

DELIMITER ;

