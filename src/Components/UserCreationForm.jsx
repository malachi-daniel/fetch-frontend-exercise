import React, { useEffect, useState } from 'react';
import './userCreationForm.css';

const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};

const UserCreationForm = () => {
    // User creation state
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState('');
    const [selectedOccupation, setSelectedOccupation] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);

    // States for AJAX
    const [isLoaded, setIsLoaded] = useState(false);
    const [error, setError] = useState(null);
    const [occupations, setOccupations] = useState([]);
    const [states, setStates] = useState([]); 

    // Get JSON body when component mounts
    useEffect(() => {
        fetch('https://frontend-take-home.fetchrewards.com/form')
        .then((res) => res.json())
        .then((data) => {
            setIsLoaded(true);
            setOccupations(data.occupations);
            setStates(data.states)
        }, (err) => {
            setIsLoaded(true);
            setError(err);
        });
    }, []);

    // Handle submission to API endpoint
    const handleSubmit = (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setEmailError(true);
            return;
        } else {
            setEmailError(false);
        }

        let submittedData = {
            'name': name,
            'email': email,
            'password': password,
            'occupation': selectedOccupation,
            'state': selectedState,
        };

        document.getElementById('submit-button').disabled = true;
        fetch('https://frontend-take-home.fetchrewards.com/form', {
            method: 'POST',
            body: JSON.stringify(submittedData),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then((response) => {
            if (response.status === 200) {
                setIsSubmitted(true);
            } else {
                setError(new Error('An error occured when submitting the form, please refresh the page.'));
            }
        }, (err) => {
            setError(err);
        });
    }
    
    // Reset states so form can be re-filled out
    const resetForm = () => {
        setName('');
        setEmail('');
        setPassword('');
        setSelectedOccupation('');
        setSelectedState('');
        setIsSubmitted(false);
    }

    // If any error occers, display it on background element
    if (error) {
        return <div className='background'>Error: {error.message}<br/>Please reload</div>;
    // Loading message for GET request
    } else if (!isLoaded) {
        return <div className='background'>Loading...</div>;
    // If form has been submitted, provide feedback on completion
    } else if (isSubmitted) {
        return (
            <div className='background'>
                <div id='title-box-2'>
                    <img src='fetch-logo-text.png' alt='Fetch Logo' /> 
                </div>
                <p>
                    Thank you for completing the form! <br />
                    We've sent you a confirmation at <br />
                    the email address you provided.
                </p>
                <div className='form-button'>
                    <input type='button' value='Go back' onClick={resetForm}/>
                </div>
            </div>
        );
    // If no error, has loaded, and hasn't been submitted, render the form
    } else {
        return (
            <div className="background">
                <form
                    id="user-creation-form"
                    method="POST"
                    onSubmit={handleSubmit}
                >
                    <div id="title-box">
                        <img src="fetch-logo-text.png" alt="Fetch Logo" />
                    </div>
                    <div id="name-input">
                        <input
                            type="text"
                            placeholder="Full Name"
                            name={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
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
                                <p style={{ color: 'red' }}>
                                    Please enter a valid email.
                                </p>
                            </div>
                        ) : null}
                    </div>

                    <div id="password-input">
                        <input
                            type="password"
                            placeholder="Password"
                            name={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div id="dropdowns">
                        <div id="occupation-dropdown">
                            <select
                                name="occupation-select"
                                onChange={(e) =>
                                    setSelectedOccupation(e.target.value)
                                }
                                required
                            >
                                <option
                                    className="dropdown-placeholder"
                                    value=""
                                    selected
                                    disabled
                                    hidden
                                >
                                    Select Occupation
                                </option>
                                {occupations.map((occu) => (
                                    <option key={occu}>{occu}</option>
                                ))}
                            </select>
                        </div>
                        <div id="state-dropdown">
                            <select
                                name="state-select"
                                onChange={(e) =>
                                    setSelectedState(e.target.value)
                                }
                                required
                            >
                                <option
                                    className="dropdown-placeholder"
                                    value=""
                                    selected
                                    disabled
                                    hidden
                                >
                                    Select State
                                </option>
                                {states.map((state) => (
                                    <option key={state.abbreviation}>
                                        {state.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="form-button">
                        <input
                            id="submit-button"
                            type="submit"
                            value="Sign up"
                        />
                    </div>
                </form>
            </div>
        );
    }
}

export default UserCreationForm;