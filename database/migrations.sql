USE `czapp`;
DROP procedure IF EXISTS `updateLexemePair`;

DELIMITER $$
USE `czapp`$$
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
END$$

DELIMITER ;


USE `czapp`;
DROP procedure IF EXISTS `selectLexemePair`;

DELIMITER $$
USE `czapp`$$
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
END$$

DELIMITER ;


