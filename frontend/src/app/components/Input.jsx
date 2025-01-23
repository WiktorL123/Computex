export default function Input({type, placeholder, className, value, checked, onChange}) {
    return (
        <input
            className={`${className}`}
            type={type}
            placeholder={placeholder}
            onChange={onChange}
        />
    )
}