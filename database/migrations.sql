ALTER TABLE `czapp`.`lexeme_map`
ADD COLUMN `map_lastTested` TIMESTAMP NULL AFTER `map_userId`,
ADD COLUMN `map_familiarity` INT(1) NULL DEFAULT 0 AFTER `map_lastTested`;


ALTER TABLE `czapp`.`lexeme_map`
CHANGE COLUMN `map_familiarity` `map_familiarity` ENUM('known','familiar','unknown') NULL DEFAULT 'unknown' ;


USE `czapp`;
DROP procedure IF EXISTS `selectRecentLexemes`;

DELIMITER $$
USE `czapp`$$
CREATE DEFINER=`czappDbUser`@`localhost` PROCEDURE `selectRecentLexemes`(
    IN  userId			TEXT,
    IN	length			INT,
    IN 	startPosition	INT
)
BEGIN
	SELECT 		*

    FROM 		lexemes_cz cz,
				lexemes_en en,
				lexeme_map map

    WHERE 		cz.cz_id = map.map_cz_id
    AND 		en.en_id = map.map_en_id
    AND 		map.map_userId = userId

    ORDER BY 	map.map_dateAdded DESC
    LIMIT 		startPosition, length;
END$$

DELIMITER ;

