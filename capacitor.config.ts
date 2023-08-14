import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.scrollable',
  appName: 'Scrollable',
  webDir: 'src',
  server: {
    androidScheme: 'https'
  }
};

export default config;
