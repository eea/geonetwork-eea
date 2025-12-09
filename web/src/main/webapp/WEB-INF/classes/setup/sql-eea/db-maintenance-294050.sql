UPDATE metadata SET data = regexp_replace(data,
                                          '<mri:resourceConstraints>\s*<mco:MD_Constraints>\s*<mco:useLimitation>\s*<gco:CharacterString>License CC-BY 4.0 \(https://creativecommons.org/licenses/by/4.0/\).\s*</gco:CharacterString>\s*</mco:useLimitation>\s*</mco:MD_Constraints>\s*</mri:resourceConstraints>',
                                          '<mri:resourceConstraints>
                                          <mco:MD_LegalConstraints>
                                          <mco:useConstraints>
                                          <mco:MD_RestrictionCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_RestrictionCode"
                                          codeListValue="otherRestrictions"/>
                                          </mco:useConstraints>
                                          <mco:otherConstraints>
                                          <gco:CharacterString>License CC-BY 4.0 (https://creativecommons.org/licenses/by/4.0/).</gco:CharacterString>
                                          </mco:otherConstraints>
                                          </mco:MD_LegalConstraints>
                                          </mri:resourceConstraints>') FROM metadata WHERE data ~ '<mri:resourceConstraints>\s*<mco:MD_Constraints>\s*<mco:useLimitation>\s*<gco:CharacterString>License CC-BY 4.0 \(https://creativecommons.org/licenses/by/4.0/\).\s*</gco:CharacterString>\s*</mco:useLimitation>\s*</mco:MD_Constraints>\s*</mri:resourceConstraints>';


UPDATE metadata
SET data = regexp_replace(data,
                          '<mri:resourceConstraints>\s*<mco:MD_Constraints>\s*<mco:useLimitation>\s*<gco:CharacterString>License CC-BY 4.0 \(https://creativecommons.org/licenses/by/4.0/\). Copyright holder: European Environment Agency \(EEA\).</gco:CharacterString>\s*</mco:useLimitation>\s*</mco:MD_Constraints>\s*</mri:resourceConstraints>',
                          '<mri:resourceConstraints>
                          <mco:MD_LegalConstraints>
                          <mco:useConstraints>
                          <mco:MD_RestrictionCode codeList="http://standards.iso.org/iso/19139/resources/gmxCodelists.xml#MD_RestrictionCode"
                          codeListValue="otherRestrictions"/>
                          </mco:useConstraints>
                          <mco:otherConstraints>
                          <gco:CharacterString>License CC-BY 4.0 (https://creativecommons.org/licenses/by/4.0/). Copyright holder: European Environment Agency (EEA).</gco:CharacterString>
                          </mco:otherConstraints>
                          </mco:MD_LegalConstraints>
                          </mri:resourceConstraints>') WHERE data ~ '<mri:resourceConstraints>\s*<mco:MD_Constraints>\s*<mco:useLimitation>\s*<gco:CharacterString>License CC-BY 4.0 \(https://creativecommons.org/licenses/by/4.0/\). Copyright holder: European Environment Agency \(EEA\).</gco:CharacterString>\s*</mco:useLimitation>\s*</mco:MD_Constraints>\s*</mri:resourceConstraints>';

UPDATE metadata SET data = replace(data,
                                   '<mdq:scope xmlns:gco="http://www.isotc211.org/2005/gco" gco:nilReason="missing" />',
                                   '<mdq:scope>
                                               <mcc:MD_Scope>
                                                 <mcc:level>
                                                    <mcc:MD_ScopeCode codeList="http://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#MD_ScopeCode"
                                                                      codeListValue="dataset"/>
                                                 </mcc:level>
                                              </mcc:MD_Scope>
                                           </mdq:scope>')
WHERE data LIKE '%<mdq:scope xmlns:gco="http://www.isotc211.org/2005/gco" gco:nilReason="missing" />%' AND schemaId ='iso19115-3.2018';


UPDATE metadata
SET data = regexp_replace(data,
                          '<cit:Country codeList="http://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#Country"\s*codeListValue="DK"\s*codeSpace="ISO3166-1"\s*/>',
                          '<gco:CharacterString>Denmark</gco:CharacterString>', 'g') WHERE data ~ '<cit:Country codeList="http://standards.iso.org/iso/19115/resources/Codelists/cat/codelists.xml#Country"\s*codeListValue="DK"\s*codeSpace="ISO3166-1"\s*/>';


UPDATE metadata SET data = REPLACE(data, '<gml:endPosition />', '<gml:endPosition indeterminatePosition="now"/>') WHERE data LIKE '%<gml:endPosition />%';

UPDATE metadata SET data = REPLACE(data, '2015-07-17 12:00:00', '2015-07-17') WHERE data LIKE '%2015-07-17 12:00:00%';
