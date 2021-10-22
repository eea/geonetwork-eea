DELETE FROM usergroups;

-- All non admin, are Editor in SDI_DRAFT
INSERT INTO usergroups (userid, groupid, profile)
  (SELECT id, (SELECT id FROM groups WHERE name = 'SDI_EDITING_DEFAULT'), 3
  FROM users WHERE profile != 0);

-- All are Editor (instead of GUEST)
UPDATE users SET profile = 3 WHERE profile = 4;
