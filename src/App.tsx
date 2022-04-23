import React, {FormEvent, useState} from 'react';
import './App.css';
import {Button, Form, Spinner} from "react-bootstrap";
import axios from "axios";

function App() {
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState('');
    const [wasValidated, setWasValidated] = useState(false);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setWasValidated(true);

        const input = (event.target as HTMLFormElement)[0] as HTMLInputElement
        if (!input.value) {
            return;
        }

        const url = `${process.env.REACT_APP_BACKEND_BASEURL}/pokemon/${input.value}`;
        setIsLoading(true);
        setData("");
        try {
            const response = await axios.get(url);
            setData(response?.data ? JSON.stringify(response.data, null, 2) : "No data");
        } catch (e) {
            console.error(e);
        } finally {
            setIsLoading(false);
        }
    };


    return (
        <div className="container">
            <Form onSubmit={handleSubmit} noValidate
                  className={`needs-validation${wasValidated ? " was-validated" : ""}`}>
                <Form.Label htmlFor="pokemonName">Pokemon Name</Form.Label>
                <Form.Control id="pokemonName" name="pokemonName" type="text" disabled={isLoading}
                              placeholder="Enter Pokemon Name" required/>
                <Button variant="primary" type="submit" className='mt-3 mx-auto d-block' disabled={isLoading}>
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden={isLoading ? "false" : "true"}
                        className={`${isLoading ? "" : "d-none"}`}
                    />
                    Get translation
                </Button>
            </Form>
            <div className={`result${data ? "" : " d-none"}`}>
                Result:
                <pre>
                    {data}
                </pre>
            </div>
        </div>
    );
}

export default App;
