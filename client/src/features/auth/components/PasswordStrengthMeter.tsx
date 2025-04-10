import { useEffect, useState } from 'react';
import zxcvbn from 'zxcvbn';

interface PasswordStrengthMeterProps {
    password: string;
    menu?: boolean;
}

const passwordRules = [
    { regex: /^.{12,}$/, description: 'At least 12 characters long' },
    { regex: /[a-z]/, description: 'At least 1 lower case letter' },
    { regex: /[A-Z]/, description: 'At least 1 upper case letter' },
    { regex: /[0-9]/, description: 'At least 1 number' },
    {
        regex: /[^a-zA-Z0-9]/,
        description: 'At least 1 special character (e.g., !@#$%?&)',
    },
];

export function PasswordStrengthMeter({
    password,
    menu = false,
}: PasswordStrengthMeterProps) {
    const [metConditions, setMetConditions] = useState<boolean[]>([]);
    const [passwordScore, setPasswordScore] = useState<number>(0);

    useEffect(() => {
        if (!password) {
            setMetConditions([]);
            setPasswordScore(0);
            return;
        }

        const { score } = zxcvbn(password);
        const conditions = passwordRules.map((rule) =>
            rule.regex.test(password),
        );

        setPasswordScore(score);
        setMetConditions(conditions);
    }, [password]);

    const allCriteriaMet = metConditions.every(Boolean);
    const showMenu = menu && !(passwordScore === 4 && allCriteriaMet);

    return (
        <div>
            <div className="w-full flex justify-center items-center gap-2">
                <div className="w-full h-2 bg-text/10 rounded-full overflow-hidden">
                    <div
                        style={{ width: `${(passwordScore / 4) * 100}%` }}
                        className={`h-full transition-all duration-300 ease-out ${
                            passwordScore === 4
                                ? 'bg-brand'
                                : passwordScore >= 2
                                  ? 'bg-yellow-300'
                                  : 'bg-red-400'
                        }`}
                    />
                </div>
                <span className="text-sm">
                    {password
                        ? passwordScore === 4
                            ? 'Strong'
                            : passwordScore >= 2
                              ? 'Moderate'
                              : 'Weak'
                        : 'Strength'}
                </span>
            </div>

            {showMenu && (
                <>
                    <p className="text-md">Minimum requirements:</p>
                    <ul className="mt-2 space-y-1 text-sm">
                        <li
                            className={`flex items-center gap-2 ${
                                passwordScore === 4
                                    ? 'text-brand'
                                    : 'text-red-400'
                            }`}
                        >
                            Strength meter at maximum
                        </li>
                        {passwordRules.map((rule, index) => (
                            <li
                                key={index}
                                className={`flex items-center gap-2 ${
                                    metConditions[index]
                                        ? 'text-brand'
                                        : 'text-red-400'
                                }`}
                            >
                                {rule.description}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
}
