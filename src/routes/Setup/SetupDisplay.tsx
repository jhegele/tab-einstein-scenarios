import React from 'react';
import { css } from '@emotion/core';
import { Button, DropdownSelect } from '@tableau/tableau-ui';
import stringsAll, { StringsLanguages } from '../../strings';
import { useSelector, shallowEqual } from 'react-redux';
import { RootState } from '../../store';

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

  const language: StringsLanguages = preferences.global.language;
  const { messages, components } = stringsAll[language].strings.setup.launch;
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
        <div>
          <DropdownSelect kind="line" value={language}>
            {languageSelect.map((l) => (
              <option value={l.code}>{l.localizedName}</option>
            ))}
          </DropdownSelect>
        </div>
        <div>{messages.completeSetup}</div>
        <div>
          <Button kind="primary" onClick={onOpenSetupDialog}>
            {components.buttons.openSetup}
          </Button>
        </div>
      </div>
    );

  return <div css={cssOuterContainer}>{content}</div>;
};
