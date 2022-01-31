import '../styles/formButton.css';

const FormButton = ({ type, value, onClick = null }) => {
    return (
        <div className="form-button">
            <input
                id="submit-button"
                type={type}
                value={value}
                onClick={onClick}
            />
        </div>
    );
};

export default FormButton;
