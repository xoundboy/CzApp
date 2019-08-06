USE `czapp`;
DROP procedure IF EXISTS `updateLexemePairFamiliarity`;

DELIMITER $$
USE `czapp`$$
CREATE DEFINER=`czappDbUser`@`localhost` PROCEDURE `updateLexemePairFamiliarity`(
	IN  czId		 	INT(10),
    IN  enId		 	INT(10),
    IN  familiarity		ENUM('unknown','familiar','known')
)
BEGIN
   -- Update pairing notes in map table --
    UPDATE 	lexeme_map
    SET 	map_familiarity = familiarity
    WHERE	map_en_id = enId
    AND		map_cz_id = czId;
END$$

DELIMITER ;

