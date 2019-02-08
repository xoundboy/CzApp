USE `czapp`;
DROP procedure IF EXISTS `selectRecentLexemes`;

DELIMITER $$
USE `czapp`$$
CREATE DEFINER=`czappDbUser`@`localhost` PROCEDURE `selectRecentLexemes`(
    IN  userId     TEXT
)
BEGIN
	SELECT
		cz.word as cz_word,
        cz.notes as cz_notes,
        cz.userId as cz_userId,
        en.word as en_word,
        en.notes as en_notes,
		en.userId as en_userId
    FROM lexemes_cz cz, lexemes_en en, lexeme_map map
    WHERE cz.id = map.cz_id
    AND en.id = map.en_id
    AND map.userId = userId;
END$$

DELIMITER ;

