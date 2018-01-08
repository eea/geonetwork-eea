
UPDATE metadata SET data = replace(data, 'eea.enquiries@eea.europa.eu', 'info@eea.europa.eu') WHERE data LIKE '%eea.enquiries@eea.europa.eu%';


UPDATE harvestersettings SET value= replace(value, 'eea.enquiries@eea.europa.eu', 'info@eea.europa.eu') WHERE value LIKE '%eea.enquiries@eea.europa.eu%';

-- After running this script, trigger a catalogue reindex from the admin page.
