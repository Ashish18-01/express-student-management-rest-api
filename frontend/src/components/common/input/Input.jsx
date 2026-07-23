import "./Input.css";

function Input({
    label,
    type = "text",
    placeholder = "",
    value,
    onChange,
    name,
    id,
    required = false,
    disabled = false,
    error = ""
}) {
    return (
        <div className="input-group">
            {label && (
                <label className="input-label">
                    {label}
                </label>
            )}

            <input
                className={`input ${error ? "input-error" : ""}`}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                name={name}
                id={id}
                required={required}
                disabled={disabled}
            />

            {error && (
                <small className="error-text">
                    {error}
                </small>
            )}
        </div>
    );
}

export default Input;