import { Link, Text } from '@chakra-ui/react';
import React from 'react';
import Separator from '../../../components/separator/Separator';
import SettingsCard from '../settingsCard/SettingsCard';

const AboutSettings = () => {
  return (
    <>
      <SettingsCard title={'About'}>
        <Text fontSize="md">
          Bloben is calendar web application for interacting with your CalDav
          servers.
        </Text>
        <Separator height={8} />
        <Text fontSize="md">
          <Link
            _focus={{ boxShadow: 'none' }}
            target={'_blank'}
            color={'primary.400'}
            href={'https://bloben.com/docs'}
          >
            Documentation
          </Link>{' '}
        </Text>
        <Separator />
      </SettingsCard>
    </>
  );
};

export default AboutSettings;
