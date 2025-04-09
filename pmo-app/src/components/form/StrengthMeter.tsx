export function StrengthMeter() {
    return (
        <div className="mb-4">
            <div className="flex items-center mb-2">
                <div className="w-full h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="w-1/2 h-2 rounded-full bg-brand"></div>
                </div>
                <span className="pl-2">Strength</span>
            </div>
            <div className="flex flex-col">
                <span className="mb-2">Minimum requirements:</span>
                <span className="text-error">Strength meter at maximum</span>
                <span className="text-error">At least 12 characters long</span>
                <span className="text-error">At least 1 number</span>
                <span className="text-error">At least 1 lowercase letter</span>
                <span className="text-error">At least 1 uppercase letter</span>
                <span className="text-error">
                    At least 1 special character (!@$#%&_-^)
                </span>
            </div>
        </div>
    );
}
