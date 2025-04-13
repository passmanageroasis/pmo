import { ButtonSubmit, InputField } from '../../components/form';
import { useState } from 'react';
import { PasswordStrengthMeter } from '../../features/auth';

export function PasswordGenerator() {
    const [generatedPassword, setGeneratedPassword] = useState('');
    const [passwordOptions, setPasswordOption] = useState({
        length: 12,
        upperCase: true,
        lowerCase: true,
        numbers: true,
        special: true,
    });

    function generatePassword(length: number) {
        const letters = 'abcdefghijklmnopqrstuvwxyz';
        const numbers = '0123456789';
        const special = Array.from({ length: 94 }, (_, i) => i + 33)
            .map((c) => String.fromCharCode(c))
            .filter((char) => !/[a-zA-Z0-9]/.test(char)) // remove letters and numbers
            .join('');

        const symbols =
            (passwordOptions.lowerCase ? letters : '') +
            (passwordOptions.upperCase ? letters.toUpperCase() : '') +
            (passwordOptions.numbers ? numbers : '') +
            (passwordOptions.special ? special : '');

        let password = '';

        if (symbols.length > 0) {
            for (let i = 0; i < length; i++) {
                const character =
                    symbols[Math.floor(cryptoRandom() * symbols.length)];
                password = password + character;
            }
        }

        setGeneratedPassword(password);
    }

    function cryptoRandom() {
        const array = new Uint32Array(1);
        crypto.getRandomValues(array);
        return array[0] / (0xffffffff + 1);
    }

    return (
        <>
            <h1 className="text-3xl mb-5">Password generator</h1>
            <div className="w-md">
                <div className="flex flex-col">
                    <label>
                        <input
                            type="checkbox"
                            checked={passwordOptions.lowerCase}
                            onChange={(e) =>
                                setPasswordOption((prev) => ({
                                    ...prev,
                                    lowerCase: e.target.checked,
                                }))
                            }
                        />
                        Lower case
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={passwordOptions.upperCase}
                            onChange={(e) =>
                                setPasswordOption((prev) => ({
                                    ...prev,
                                    upperCase: e.target.checked,
                                }))
                            }
                        />
                        Upper case
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={passwordOptions.numbers}
                            onChange={(e) =>
                                setPasswordOption((prev) => ({
                                    ...prev,
                                    numbers: e.target.checked,
                                }))
                            }
                        />
                        Numbers
                    </label>
                    <label>
                        <input
                            type="checkbox"
                            checked={passwordOptions.special}
                            onChange={(e) =>
                                setPasswordOption((prev) => ({
                                    ...prev,
                                    special: e.target.checked,
                                }))
                            }
                        />
                        Special characters
                    </label>
                </div>
                <div className="flex w-full justify-between">
                    <input
                        className={'w-15/16'}
                        type={'range'}
                        min={6}
                        max={64}
                        value={passwordOptions.length}
                        onChange={(e) =>
                            setPasswordOption((prev) => ({
                                ...prev,
                                length: Number(e.target.value),
                            }))
                        }
                    />
                    {passwordOptions.length}
                </div>
                <ButtonSubmit
                    text="Generate password"
                    onClick={() => generatePassword(passwordOptions.length)}
                />
                <InputField
                    label="Password"
                    value={generatedPassword}
                    disabled
                />
                <PasswordStrengthMeter
                    password={generatedPassword}
                    menu={false}
                />
            </div>
        </>
    );
}
