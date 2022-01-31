import '../styles/emailInput.css';

const EmailInput = ({ email, setEmail, emailError }) => {
    return (
        <div id="email-input">
            <input
                type="text"
                placeholder="Email"
                name={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            {emailError ? (
                <div>
                    <p style={{ color: 'red' }}>Please enter a valid email.</p>
                </div>
            ) : null}
        </div>
    );
};

export default EmailInput;
