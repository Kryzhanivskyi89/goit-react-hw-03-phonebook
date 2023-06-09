import PropTypes from "prop-types";
import style from './Filter.module.css';

function Filter ({ value, onChange}) {
    return (
        <label className={style.name}>
            Find contacts by name
            <input className={style.input} type='text' value={value} onChange={onChange} />
        </label>
    )
};

Filter.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
};

export default Filter