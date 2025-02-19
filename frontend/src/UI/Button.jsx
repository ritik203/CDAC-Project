function Button({ text, type = "primary", to, onClick }) {

    const buttonStyle = {
        primary : "px-4 py-1 border-none outline-none rounded-sm text-sm font-medium text-slate-100 bg-red-600 hover:bg-red-500 cursor-pointer",
        secondary : "px-4 py-1 outline-none rounded-sm text-sm font-medium text-stone-500 border border-stone-400 hover:bg-stone-50 hover:text-stone-600 hover:border-stone-500 cursor-pointer",
    }

    return (
        <button onClick={onClick} className={buttonStyle[type]}>
            {text}
        </button>
    )
}

export default Button;
