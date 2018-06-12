
INSERT INTO categories (id, name) VALUES (11, 'geodatacore');
INSERT INTO categories (id, name) VALUES (12, 'climate-adapt');
INSERT INTO categories (id, name) VALUES (13, 'ETC-BD');

INSERT INTO categoriesdes (iddes, langid, label) VALUES (11, 'eng', 'geodatacore');
INSERT INTO categoriesdes (iddes, langid, label) VALUES (12, 'eng', 'climate-adapt');
INSERT INTO categoriesdes (iddes, langid, label) VALUES (13, 'eng', 'ETC-BD');


UPDATE metadata SET groupOwner = 3 WHERE groupOwner = 2;
DELETE FROM operationallowed WHERE groupId = 2;
DELETE FROM groupsDes WHERE iddes = 2;
DELETE FROM groups WHERE id = 2;
