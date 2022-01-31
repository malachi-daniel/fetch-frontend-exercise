import '../styles/dropdowns.css';

const Dropdowns = ({
    occupations,
    states,
    setSelectedOccupation,
    setSelectedState,
}) => {
    return (
        <div id="dropdowns">
            <div id="occupation-dropdown">
                <select
                    name="occupation-select"
                    onChange={(e) => setSelectedOccupation(e.target.value)}
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
                    onChange={(e) => setSelectedState(e.target.value)}
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
                        <option key={state.abbreviation}>{state.name}</option>
                    ))}
                </select>
            </div>
        </div>
    );
};

export default Dropdowns;
