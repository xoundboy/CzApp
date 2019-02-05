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
    WHERE cz.id = map.cz_id
    AND en.id = map.en_id
    AND map.userId = userId;
END$$

DELIMITER ;
