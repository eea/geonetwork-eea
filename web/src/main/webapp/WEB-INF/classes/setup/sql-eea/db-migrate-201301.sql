ALTER TABLE HarvestHistory ADD elapsedTime int;

INSERT INTO Settings VALUES (956,1,'hidewithheldelements',NULL);
INSERT INTO Settings VALUES (957,956,'enable','false');
INSERT INTO Settings VALUES (958,956,'keepMarkedElement','true');
INSERT INTO Settings VALUES (24,20,'securePort','8443');


INSERT INTO StatusValues VALUES  (0,'unknown','y');
INSERT INTO StatusValues VALUES  (1,'draft','y');
INSERT INTO StatusValues VALUES  (2,'approved','y');
INSERT INTO StatusValues VALUES  (3,'retired','y');
INSERT INTO StatusValues VALUES  (4,'submitted','y');
INSERT INTO StatusValues VALUES  (5,'rejected','y');


INSERT INTO StatusValuesDes VALUES (0,'eng','Unknown');
INSERT INTO StatusValuesDes VALUES (1,'eng','Draft');
INSERT INTO StatusValuesDes VALUES (2,'eng','Approved');
INSERT INTO StatusValuesDes VALUES (3,'eng','Retired');
INSERT INTO StatusValuesDes VALUES (4,'eng','Submitted');
INSERT INTO StatusValuesDes VALUES (5,'eng','Rejected');

