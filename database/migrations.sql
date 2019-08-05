USE `czapp`;
DROP procedure IF EXISTS `selectKnownLexemes`;

DELIMITER $$
USE `czapp`$$
CREATE DEFINER=`czappDbUser`@`localhost` PROCEDURE `selectKnownLexemes`(
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
    AND 		map.map_familiarity = 'known'

    ORDER BY 	map.map_dateAdded DESC
    LIMIT 		startPosition, length;
END$$

DELIMITER ;

USE `czapp`;
DROP procedure IF EXISTS `czapp`.`selectFamiliarLexemes`;

DELIMITER $$
USE `czapp`$$
CREATE DEFINER=`czappDbUser`@`localhost` PROCEDURE `selectFamiliarLexemes`(
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
    AND 		map.map_familiarity = 'familiar'

    ORDER BY 	map.map_dateAdded DESC
    LIMIT 		startPosition, length;
END$$

DELIMITER ;
;



USE `czapp`;
DROP procedure IF EXISTS `czapp`.`selectUnknownLexemes`;

DELIMITER $$
USE `czapp`$$
CREATE DEFINER=`czappDbUser`@`localhost` PROCEDURE `selectUnknownLexemes`(
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
    AND 		map.map_familiarity = 'unknown'

    ORDER BY 	map.map_dateAdded DESC
    LIMIT 		startPosition, length;
END$$

DELIMITER ;
;

USE `czapp`;
DROP procedure IF EXISTS `selectRandomLexemes`;

DELIMITER $$
USE `czapp`$$
CREATE DEFINER=`czappDbUser`@`localhost` PROCEDURE `selectRandomLexemes`(
    IN  userId			TEXT,
    IN	length			INT
)
BEGIN
	SELECT 		*

    FROM 		lexemes_cz cz,
				lexemes_en en,
				lexeme_map map

    WHERE 		cz.cz_id = map.map_cz_id
    AND 		en.en_id = map.map_en_id
    AND 		map.map_userId = userId

    ORDER BY 	RAND()
    LIMIT 		length;
END$$

DELIMITER ;



