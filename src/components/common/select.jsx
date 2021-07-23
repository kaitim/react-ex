import React from "react";

const Select = ({ name, label, error, lists, ...rest }) => {
    return (
        <div className="form-group">
            <label htmlFor={name}>{label}</label>
            <select
                {...rest}
                className="form-control"
                name={name}
                id={name}
            >
                <option value="">Please select</option>
                {lists.length > 0 &&
                    lists.map((g) => (
                        <option key={g._id} value={g._id}>
                            {g.name}
                        </option>
                    ))}
            </select>
            {error && (
                <div className="alert alert-danger">{error}</div>
            )}
        </div>
    );
};

export default Select;
