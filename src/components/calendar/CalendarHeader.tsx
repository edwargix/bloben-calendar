import {
  Button,
  Center,
  Flex,
  Heading,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Spinner,
  Stack,
} from '@chakra-ui/react';
import { CalendarView } from 'kalend';
import { Context, StoreContext } from '../../context/store';
import { checkHasNewVersion, parseCssDark } from '../../utils/common';
import { initialReduxState } from '../../redux/reducers';
import { replace } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ChevronLeft from '../eva-icons/chevron-left';
import ChevronRight from '../eva-icons/chevron-right';
import CircleFill from '../eva-icons/circle-fill';
import MenuIcon from '../eva-icons/menu';
import NewVersionModal from '../newVersionModal/NewVersionModal';
import PersonIcon from '../eva-icons/person';
import React, { useContext, useState } from 'react';
import RedCircle from '../redCircle/RedCircle';
import RefreshIcon from '../eva-icons/refresh';
import SearchIcon from '../eva-icons/search';
import Separator from '../separator/Separator';
import SettingsIcon from '../eva-icons/settings';
import UserApi from '../../api/UserApi';

interface CalendarHeaderProps {
  kalendRef: any;
  selectedDate: string;
  setSelectedView: any;
  selectedView: any;
  handleRefresh: any;
  handleOpenDrawer: any;
  openSearchModal: any;
  isPublic?: boolean;
}

const CalendarHeader = (props: CalendarHeaderProps) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [store, dispatchContext]: [StoreContext, any] = useContext(Context);
  const setContext = (type: string, payload: any) => {
    dispatchContext({ type, payload });
  };
  const { isSyncing, isMobile, version } = store;

  const {
    kalendRef,
    selectedDate,
    setSelectedView,
    selectedView,
    handleRefresh,
    handleOpenDrawer,
    openSearchModal,
    isPublic,
  } = props;

  const [versionModalOpen, openVersionModal] = useState(false);

  const goForward = () => {
    kalendRef?.current?.navigateForward();
  };
  const goBack = () => {
    kalendRef?.current?.navigateBackwards();
  };
  const goToday = () => {
    kalendRef?.current?.navigateToTodayDate();
  };

  const handleOpenSettings = () => {
    setContext('settingsOpen', true);
  };

  const handleLogout = async () => {
    await UserApi.logout();

    dispatch(replace(initialReduxState));
    navigate('/calendar');
    setContext('isLogged', false);
  };

  const hasNewVersion = checkHasNewVersion(
    version.lastVersion,
    version.dockerImageVersion
  );

  return (
    <Flex
      direction={'column'}
      paddingTop={3}
      paddingLeft={8}
      paddingRight={isMobile ? 6 : 14}
    >
      {!isMobile ? (
        <Flex direction={'row'} justifyContent={'center'}>
          {!isPublic ? (
            <IconButton
              variant={'ghost'}
              aria-label="Drawer"
              icon={
                <MenuIcon
                  className={parseCssDark('HeaderModal__icon', store.isDark)}
                />
              }
              isRound
              autoFocus={false}
              onClick={handleOpenDrawer}
              style={{ marginLeft: 18 }}
            />
          ) : null}
          <Center margin={'0 auto'}>
            <Stack
              spacing={0}
              direction={'row'}
              border={store.isDark ? '' : 'solid 0.4px #E2E8F0'}
              borderRadius={4}
            >
              <Button
                _focus={{ boxShadow: 'none' }}
                variant={
                  selectedView === CalendarView.AGENDA ? 'solid' : 'ghost'
                }
                fontSize={12}
                width={20}
                fontWeight={
                  selectedView === CalendarView.AGENDA ? 'bold' : 'normal'
                }
                size={'sm'}
                onClick={() => setSelectedView(CalendarView.AGENDA)}
              >
                Agenda
              </Button>
              <Button
                _focus={{ boxShadow: 'none' }}
                variant={selectedView === CalendarView.DAY ? 'solid' : 'ghost'}
                fontSize={12}
                size={'sm'}
                width={20}
                fontWeight={
                  selectedView === CalendarView.DAY ? 'bold' : 'normal'
                }
                onClick={() => setSelectedView(CalendarView.DAY)}
              >
                Day
              </Button>
              <Button
                _focus={{ boxShadow: 'none' }}
                variant={
                  selectedView === CalendarView.THREE_DAYS ? 'solid' : 'ghost'
                }
                fontWeight={
                  selectedView === CalendarView.THREE_DAYS ? 'bold' : 'normal'
                }
                width={24}
                fontSize={12}
                size={'sm'}
                onClick={() => setSelectedView(CalendarView.THREE_DAYS)}
              >
                Three days
              </Button>
              <Button
                _focus={{ boxShadow: 'none' }}
                variant={selectedView === CalendarView.WEEK ? 'solid' : 'ghost'}
                fontSize={12}
                size={'sm'}
                width={24}
                fontWeight={
                  selectedView === CalendarView.WEEK ? 'bold' : 'normal'
                }
                onClick={() => setSelectedView(CalendarView.WEEK)}
              >
                Week
              </Button>
              <Button
                _focus={{ boxShadow: 'none' }}
                variant={
                  selectedView === CalendarView.MONTH ? 'solid' : 'ghost'
                }
                fontSize={12}
                width={24}
                size={'sm'}
                fontWeight={
                  selectedView === CalendarView.MONTH ? 'bold' : 'normal'
                }
                onClick={() => setSelectedView(CalendarView.MONTH)}
              >
                Month
              </Button>
            </Stack>
            <Spacer />
          </Center>
          <Flex>
            <Separator width={20} height={0} />
            <IconButton
              _focus={{ boxShadow: 'none' }}
              variant={'ghost'}
              aria-label="Search"
              icon={
                <SearchIcon
                  className={parseCssDark('HeaderModal__icon', store.isDark)}
                />
              }
              isRound
              // size={"sm"}
              autoFocus={false}
              onClick={() => openSearchModal(true)}
            />
            <Separator width={20} height={0} />
            {isSyncing ? (
              <Spinner color="red.500" />
            ) : (
              <IconButton
                _focus={{ boxShadow: 'none' }}
                variant={'ghost'}
                aria-label="Refresh"
                icon={
                  <RefreshIcon
                    className={parseCssDark('HeaderModal__icon', store.isDark)}
                  />
                }
                isRound
                // size={"sm"}
                autoFocus={false}
                onClick={handleRefresh}
              />
            )}
            <Separator width={20} height={0} />
            <div style={{ position: 'relative' }}>
              {isPublic ? (
                <IconButton
                  variant={'ghost'}
                  aria-label="Settings"
                  icon={
                    <SettingsIcon
                      className={parseCssDark(
                        'HeaderModal__icon',
                        store.isDark
                      )}
                    />
                  }
                  isRound
                  autoFocus={false}
                  onClick={handleOpenSettings}
                  // style={{ marginLeft: 18 }}
                />
              ) : (
                <Menu closeOnSelect={true}>
                  <MenuButton
                    as={IconButton}
                    _focus={{ boxShadow: 'none' }}
                    variant={'ghost'}
                    aria-label="Settings"
                    isRound
                    icon={
                      <SettingsIcon
                        className={parseCssDark(
                          'HeaderModal__icon',
                          store.isDark
                        )}
                      />
                    }
                    fontSize={14}
                    style={{ position: 'relative' }}
                  />
                  <MenuList zIndex={9991}>
                    <MenuItem
                      as={Button}
                      _focus={{ boxShadow: 'none' }}
                      leftIcon={
                        <SettingsIcon
                          className={parseCssDark(
                            'SettingsMenu__icon',
                            store.isDark
                          )}
                        />
                      }
                      variant={'ghost'}
                      onClick={handleOpenSettings}
                      width={'full'}
                      justifyContent={'flex-start'}
                      fontSize={14}
                    >
                      Settings
                    </MenuItem>
                    {hasNewVersion ? (
                      <MenuItem
                        as={Button}
                        _focus={{ boxShadow: 'none' }}
                        leftIcon={
                          <CircleFill
                            className={parseCssDark(
                              'SettingsMenu__icon-red',
                              store.isDark
                            )}
                          />
                        }
                        variant={'ghost'}
                        onClick={() => openVersionModal(true)}
                        width={'full'}
                        justifyContent={'flex-start'}
                        fontSize={14}
                      >
                        New version
                      </MenuItem>
                    ) : null}
                    <MenuItem
                      as={Button}
                      _focus={{ boxShadow: 'none' }}
                      leftIcon={
                        <PersonIcon
                          className={parseCssDark(
                            'SettingsMenu__icon',
                            store.isDark
                          )}
                        />
                      }
                      variant={'ghost'}
                      onClick={handleLogout}
                      width={'full'}
                      justifyContent={'flex-start'}
                      fontSize={14}
                    >
                      Logout
                    </MenuItem>
                  </MenuList>
                </Menu>
              )}
              {hasNewVersion ? <RedCircle /> : null}
            </div>
          </Flex>
        </Flex>
      ) : null}
      <Flex
        direction={'row'}
        paddingTop={isMobile ? 0 : 3}
        paddingBottom={3}
        paddingLeft={isMobile ? 0 : 8}
        flex={1}
        // paddingRight={14}
      >
        <Center>
          <Heading as="h3" size="lg">
            {selectedDate}
          </Heading>
        </Center>
        <Spacer />
        {isMobile ? (
          <>
            <Flex flex="1" justifyContent={'flex-end '}>
              <Spacer />
              <IconButton
                _focus={{ boxShadow: 'none' }}
                variant={'ghost'}
                aria-label="Refresh"
                icon={
                  <RefreshIcon
                    className={parseCssDark('HeaderModal__icon', store.isDark)}
                  />
                }
                isRound
                // size={"sm"}
                autoFocus={false}
                onClick={handleRefresh}
              />
            </Flex>
          </>
        ) : null}
        {!isMobile ? (
          <Flex flex="1" justifyContent={'flex-end'}>
            <Separator width={12} height={0} />
            <Center w="100px">
              <Button
                _focus={{ boxShadow: 'none' }}
                variant={'solid'}
                fontSize={14}
                onClick={goToday}
              >
                Today
              </Button>
            </Center>
            <Center w="50px">
              <IconButton
                _focus={{ boxShadow: 'none' }}
                aria-label="Go back calendar"
                icon={
                  <ChevronLeft
                    className={parseCssDark('HeaderModal__icon', store.isDark)}
                  />
                }
                isRound
                onClick={goBack}
              />
            </Center>
            <Center w="50px">
              <IconButton
                _focus={{ boxShadow: 'none' }}
                aria-label="Go forward calendar"
                icon={
                  <ChevronRight
                    className={parseCssDark('HeaderModal__icon', store.isDark)}
                  />
                }
                isRound
                onClick={goForward}
              />
            </Center>
            <Center>
              {/*<Menu>*/}
              {/*  <MenuButton*/}
              {/*    as={Button}*/}
              {/*    _focus={{ boxShadow: "none" }}*/}
              {/*    variant={"solid"}*/}
              {/*    fontSize={14}*/}
              {/*  >*/}
              {/*    {formatCalendarView(selectedView)}*/}
              {/*  </MenuButton>*/}
              {/*  <MenuList zIndex={9991}>*/}
              {/*    <MenuItem onClick={() => setSelectedView(CalendarView.AGENDA)}>*/}
              {/*      Agenda*/}
              {/*    </MenuItem>*/}
              {/*    <MenuItem onClick={() => setSelectedView(CalendarView.DAY)}>*/}
              {/*      Day*/}
              {/*    </MenuItem>*/}
              {/*    <MenuItem*/}
              {/*      onClick={() => setSelectedView(CalendarView.THREE_DAYS)}*/}
              {/*    >*/}
              {/*      Three days*/}
              {/*    </MenuItem>*/}
              {/*    <MenuItem onClick={() => setSelectedView(CalendarView.WEEK)}>*/}
              {/*      Week*/}
              {/*    </MenuItem>*/}
              {/*    <MenuItem onClick={() => setSelectedView(CalendarView.MONTH)}>*/}
              {/*      Month*/}
              {/*    </MenuItem>*/}
              {/*  </MenuList>*/}
              {/*</Menu>*/}
            </Center>
          </Flex>
        ) : null}

        {versionModalOpen ? (
          <NewVersionModal handleClose={() => openVersionModal(false)} />
        ) : null}
      </Flex>
    </Flex>
  );
};

export default CalendarHeader;
