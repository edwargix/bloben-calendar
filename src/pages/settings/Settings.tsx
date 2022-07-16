import './Settings.scss';
import React, { useContext, useState } from 'react';

import { Context } from '../../context/store';
import { Flex } from '@chakra-ui/react';
import { SETTINGS_PATHS } from '../../types/enums';
import { parseCssDark } from '../../utils/common';
import ModalNew from '../../components/modalNew/ModalNew';
import SettingsContent from './settingsContent/SettingsContent';
import SettingsContentPublic from './settingsContent/SettingsContentPublic';
import SettingsMenu from './settingsMenu/SettingsMenu';
import SettingsMenuPublic from './settingsMenu/SettingsMenuPublic';

const getInitialSettingsPath = (isMobile: boolean, isPublic?: boolean) => {
  if (isMobile) {
    return '';
  }

  if (isPublic) {
    return SETTINGS_PATHS.GENERAL;
  }

  return SETTINGS_PATHS.ABOUT;
};

interface SettingsProps {
  isPublic?: boolean;
}
const Settings = (props: SettingsProps) => {
  const { isPublic } = props;
  const [store, dispatchContext] = useContext(Context);
  const setContext = (type: string, payload: any) => {
    dispatchContext({ type, payload });
  };
  const { isMobile } = store;

  const [selected, setSelected] = useState(
    getInitialSettingsPath(isMobile, isPublic)
  );

  const handleClose = () => setContext('settingsOpen', false);

  return isMobile ? (
    <Flex>
      {store.settingsOpen ? (
        <div className={parseCssDark('Settings__wrapper', store.isDark)}>
          {selected === '' ? (
            <>
              <SettingsMenu setSelected={setSelected} selected={selected} />
            </>
          ) : (
            <SettingsContent selected={selected} />
          )}
        </div>
      ) : (
        <div />
      )}
    </Flex>
  ) : store.settingsOpen ? (
    <ModalNew handleClose={handleClose} className={'SettingsModal'}>
      <div className={parseCssDark('Settings__wrapper', store.isDark)}>
        <div className={'Settings__content__row'}>
          {isPublic ? (
            <SettingsMenuPublic setSelected={setSelected} selected={selected} />
          ) : (
            <SettingsMenu setSelected={setSelected} selected={selected} />
          )}
          {isPublic ? (
            <SettingsContentPublic selected={selected} />
          ) : (
            <SettingsContent selected={selected} />
          )}
        </div>
      </div>
    </ModalNew>
  ) : null;
};

export default Settings;
