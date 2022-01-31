import '../styles/nameInput.css';

const NameInput = ({ name, setName }) => {
    return (
        <div id="name-input">
            <input
                type="text"
                placeholder="Full Name"
                name={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
        </div>
    );
};

export default NameInput;
