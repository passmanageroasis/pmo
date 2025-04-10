import { ShieldLock, Settings, Key } from '../../assets/icons';

export const icons = {
    vault: ShieldLock,
    settings: Settings,
    key: Key,
};

export type IconName = keyof typeof icons;
