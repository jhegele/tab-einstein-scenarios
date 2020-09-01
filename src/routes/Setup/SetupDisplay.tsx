import React from 'react';
import { css } from '@emotion/core';
import { Button, DropdownSelect } from '@tableau/tableau-ui';
import stringsAll, { StringsLanguages } from '../../strings';
import { getStringsByLanguageCode } from '../../strings/utils';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { preferencesUpdateGlobal } from '../../store/slices/preferences';
import { AiOutlineWarning } from 'react-icons/ai';

const cssOuterContainer = css`
  display: flex;
  height: 100%;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const cssContent = css`
  margin: 10px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  display: flex;
`;

const cssContainerTranslateWarning = css`
  border-radius: 5px;
  padding: 10px;
  color: #353535;
  font-size: 11px;
  margin-top: 10px;
  display: flex;
  flex-direction: row;
`;

const cssContainerTranslateWarningIcon = css`
  width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const cssContainerTranslateWarningText = css`
  color: #353535;
  font-size: 11px;
  flex: 1;
  font-style: italic;
  display: flex;
  align-items: center;
`;

const cssTranslateWarningIcon = css`
  color: #c3bc3f;
  width: 25px;
  height: 25px;
`;

interface SetupDisplayProps {
  isAuthoring?: boolean;
  onOpenSetupDialog: () => void;
}

export const SetupDisplay: React.FC<SetupDisplayProps> = ({
  isAuthoring,
  onOpenSetupDialog,
}) => {
  const { preferences } = useSelector(
    (state: RootState) => state,
    shallowEqual
  );
  const dispatch = useDispatch();

  const language: StringsLanguages = preferences.global.language;
  const {
    translationStatus,
    strings: {
      setup: {
        launch: { components, messages },
      },
    },
  } = getStringsByLanguageCode(language);
  const languageSelect = [];
  for (const langCode in stringsAll) {
    languageSelect.push({
      code: langCode,
      localizedName: stringsAll[langCode as StringsLanguages].name.local,
      englishName: stringsAll[langCode as StringsLanguages].name.english,
    });
  }
  if (languageSelect.length > 0) {
    languageSelect.sort((a, b) =>
      a.englishName > b.englishName ? 1 : a.englishName < b.englishName ? -1 : 0
    );
  }

  let content: React.ReactNode = (
    <div css={cssContent}>{messages.requiresConfig}</div>
  );

  if (isAuthoring)
    content = (
      <div css={cssContent}>
        <div
          css={css`
            margin-bottom: 10px;
            display: flex;
            flex-direction: row;
          `}
        >
          <div
            css={css`
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              margin-right: 5px;
            `}
          >
            {components.selects.language.label}
          </div>
          <DropdownSelect
            kind="line"
            value={language}
            onChange={({ target: { value } }) =>
              dispatch(
                preferencesUpdateGlobal({
                  ...preferences.global,
                  language: value as StringsLanguages,
                })
              )
            }
          >
            {languageSelect.map((l) => (
              <option key={l.code} value={l.code}>
                {`${l.englishName} (${l.localizedName})`}
              </option>
            ))}
          </DropdownSelect>
        </div>
        <div
          css={css`
            margin-bottom: 10px;
          `}
        >
          {messages.completeSetup}
        </div>
        <div>
          <Button kind="primary" onClick={onOpenSetupDialog}>
            {components.buttons.openSetup}
          </Button>
        </div>
        {translationStatus.toLowerCase() !== 'native' ? (
          <div css={cssContainerTranslateWarning}>
            <div css={cssContainerTranslateWarningIcon}>
              <AiOutlineWarning css={cssTranslateWarningIcon} />
            </div>
            <div css={cssContainerTranslateWarningText}>
              This translation was produced by a translation service and not a
              native speaker. As a result, there may be errors and
              inconsistencies.
            </div>
          </div>
        ) : null}
      </div>
    );

  return <div css={cssOuterContainer}>{content}</div>;
};
