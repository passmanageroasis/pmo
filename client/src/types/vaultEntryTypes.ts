export type VaultEntryTypeValue =
    | 'login'
    | 'creditCard'
    | 'secureNote'
    | 'custom';

export interface BaseVaultEntry {
    entryType: VaultEntryTypeValue;
    name: string;
    notes?: string;
    tags?: string[];
    isFavorite?: boolean;
    schemaVersion?: number;
}

export interface LoginEntry extends BaseVaultEntry {
    entryType: 'login';
    username?: string;
    password?: string;
    urls?: string[];
}

export interface CreditCardEntry extends BaseVaultEntry {
    entryType: 'creditCard';
    cardholderName?: string;
    number?: string;
    expiry?: string;
    cvv?: number;
    pin?: string;
    urls?: string[];
}

export interface SecureNoteEntry extends BaseVaultEntry {
    entryType: 'secureNote';
    content?: string;
}
