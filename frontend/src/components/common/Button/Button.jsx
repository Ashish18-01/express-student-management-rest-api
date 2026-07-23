import "./Button.css";

function Button({
    children,
    type = "button",
    variant = "primary",
    size = "md",
    loading = false,
    disabled = false,
    onClick,
    className = ""
}) {

    const buttonClass = `btn btn-${variant} btn-${size} ${className}`;

    return (
        <button
            type={type}
            className={buttonClass}
            onClick={onClick}
            disabled={disabled || loading}
        >
            {loading ? "Loading..." : children}
        </button>
    );
}

export default Button;