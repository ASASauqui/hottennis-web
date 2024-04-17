import './index.css';

function CustomInput({ label, type, id, name, value, onChange, onBlur, touched, errors, placeholder, autoComplete }) {
    return (
        <div className="relative">
            <label htmlFor={id}>{label}</label>
            <input
                id={id}
                name={name}
                type={type}
                autoComplete={autoComplete}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                placeholder={placeholder}
                className={"p-2 peer bg-white placeholder-transparent h-10 w-full border-2 text-gray-900 focus:outline-none rounded-md"
                + (touched[name] && errors[name] ? " border-rose-600 bg-rose-100" : "") + (touched[name] && !errors[name] ? " border-green-600 bg-green-100" : " ")}
                required />
            {touched[name] && !errors[name] ? (
                <div></div>
            ) : null}
            {touched[name] && errors[name] ? (
                <div className="mt-2 text-rose-600">{errors[name]}</div>
            ) : null}
        </div>
    );
};

export default CustomInput;
