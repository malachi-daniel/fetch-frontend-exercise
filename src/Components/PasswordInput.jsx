import '../styles/passwordInput.css';

const PasswordInput = ({ password, setPassword }) => {
    return (
        <div id="password-input">
            <input
                type="password"
                placeholder="Password"
                name={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
        </div>
    );
};

export default PasswordInput;
