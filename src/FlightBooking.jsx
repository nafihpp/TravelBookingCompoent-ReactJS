import React, { useState } from "react";
import styled from "styled-components";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 50px;
    background-color: #f8f8f8;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    background-image: url("https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902771.jpg");
    background-size: cover;
    background-position: center center;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 20px;
    width: 100%;
`;

const Label = styled.label`
    font-size: 18px;
    margin-bottom: 5px;
`;

const Input = styled(TextField)`
    font-size: 16px;
    padding: 10px;
    border-radius: 5px;
    border: none;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.1);
    width: 100%;
    margin-bottom: 10px;
`;

const Button = styled.button`
    font-size: 16px;
    padding: 10px 20px;
    border-radius: 5px;
    border: none;
    background-color: #007bff;
    color: white;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    margin-top: 10px;

    &:hover {
        background-color: #0062cc;
    }
`;

const SelectContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    width: 100%;
`;

const SelectLabel = styled(Label)`
    margin-right: 10px;
`;

const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-top: 30px;
`;

const TableHead = styled.thead`
    background-color: #f8f8f8;
`;

const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #f2f2f2;
    }
`;

const TableHeader = styled.th`
    padding: 15px;
    text-align: left;
`;

const TableData = styled.td`
    padding: 15px;
`;

const FlightBooking = () => {
    const [travelDate, setTravelDate] = useState("");
    const [departureAirport, setDepartureAirport] = useState("");
    const [arrivalAirport, setArrivalAirport] = useState("");
    const [results, setResults] = useState([]);
    const [numPassengers, setNumPassengers] = useState(1);
    const [cabinClass, setCabinClass] = useState("economy");
    const [directOnly, setDirectOnly] = useState(false);
    const [flexibleDates, setFlexibleDates] = useState(false);
    const [sortBy, setSortBy] = useState("price");

    const setPassenger = (e) => {
        if (e.target.value == 0) {
            setNumPassengers(1);
        } else {
            setNumPassengers(e.target.value);
        }
    };

    const handleSearch = async () => {
        // Fetch flights data from API
        const data = await fetchFlights();
        // Filter results based on user preference (cheapest/best)
        const filteredResults = filterResults(data);
        // Set filtered results to state
        setResults(filteredResults);
    };

    const fetchFlights = async () => {
        // Fetch data from API using user input
        const response = await fetch(
            `API_ENDPOINT?date=${travelDate}&departure=${departureAirport}&arrival=${arrivalAirport}`
        );
        const data = await response.json();
        return data;
    };

    const filterResults = (data) => {
        // Sort data based on user preference (cheapest/best)
        //const sortedData = sortData(data);
        // Return filtered results
        //return sortedData;
    };

    const handleSubmit = (data) => {
        // Sort data based on price or rating
        // Return sorted data
    };

    return (
        <>
            <FormContainer>
                <form onSubmit={handleSubmit}>
                    <InputContainer>
                        <Input
                            id="departureAirport"
                            label="Departure Airport"
                            value={departureAirport}
                            onChange={(e) =>
                                setDepartureAirport(e.target.value)
                            }
                            variant="outlined"
                            margin="normal"
                            required
                        />
                        <Input
                            id="arrivalAirport"
                            label="Arrival Airport"
                            value={arrivalAirport}
                            onChange={(e) => setArrivalAirport(e.target.value)}
                            variant="outlined"
                            margin="normal"
                            required
                        />
                    </InputContainer>
                    <InputContainer>
                        <Input
                            id="travelDate"
                            label="Travel Date"
                            type="date"
                            value={travelDate}
                            onChange={(e) => setTravelDate(e.target.value)}
                            variant="outlined"
                            margin="normal"
                            required
                            InputLabelProps={{
                                shrink: true,
                            }}
                        />
                        <Input
                            id="numPassengers"
                            label="Passengers"
                            type="number"
                            value={numPassengers}
                            onChange={(e) => setPassenger(e)}
                            variant="outlined"
                            margin="normal"
                            required
                        />
                    </InputContainer>
                    <SelectContainer>
                        <SelectLabel htmlFor="cabinClass">
                            Cabin Class
                        </SelectLabel>
                        <select
                            id="cabinClass"
                            value={cabinClass}
                            onChange={(e) => setCabinClass(e.target.value)}
                        >
                            <option value="economy">Economy</option>
                            <option value="business">Business</option>
                            <option value="first">First</option>
                        </select>
                    </SelectContainer>
                    <SelectContainer>
                        <input
                            id="directOnly"
                            type="checkbox"
                            checked={directOnly}
                            onChange={(e) => setDirectOnly(e.target.checked)}
                        />
                        <SelectLabel htmlFor="directOnly">
                            Direct flights
                        </SelectLabel>
                    </SelectContainer>

                    <Button type="submit">Search</Button>
                </form>
            </FormContainer>
        </>
    );
};

export default FlightBooking;
