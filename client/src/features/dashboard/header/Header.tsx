export default function Header() {
    return (
        <header className="h-full flex justify-between items-center px-5 w-full gap-6">
            <span className="text-lg font-light text-nowrap">
                Pass Manager Oasis
            </span>
            <form>
                <input
                    name="search"
                    className="border-1 border-white/75 py-1.5 px-2 rounded-md w-xs max-w-full"
                    type="text"
                    placeholder="Search vault"
                />
            </form>
            <div className="flex items-center gap-2.5">
                <div className="h-10 aspect-square rounded-full bg-purple-600 flex justify-center items-center">
                    <span className="-mt-px">XY</span>
                </div>
                <span className="text-nowrap"></span>
            </div>
        </header>
    );
}
