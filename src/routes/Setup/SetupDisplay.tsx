import React from 'react';
import { css } from '@emotion/core';
import { Button, DropdownSelect } from '@tableau/tableau-ui';
import stringsAll, { StringsLanguages } from '../../strings';
import { getStringsByLanguageCode } from '../../strings/utils';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { preferencesUpdateGlobal } from '../../store/slices/preferences';

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
  const { messages, components } = getStringsByLanguageCode(
    language
  ).strings.setup.launch;
  const languageSelect = [];
  for (const langCode in stringsAll) {
    languageSelect.push({
      code: langCode,
      localizedName: stringsAll[langCode as StringsLanguages].name.local,
    });
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
                {l.localizedName}
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
      </div>
    );

  return <div css={cssOuterContainer}>{content}</div>;
};
