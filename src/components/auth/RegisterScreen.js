import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import validator from 'validator';
import { startRegisterWithEmailPasswordName } from '../../actions/auth';

import { removeError, setError } from '../../actions/ui';

import { useForm } from '../../hooks/useForm';

export const RegisterScreen = () => {
    const dispatch = useDispatch();
    const { msgError } = useSelector(state => state.ui);

    const [formValues, handleInputChange] = useForm({
        name: 'Arturo',
        email: 'arturo@gmail.com',
        password: '123456',
        password2: '123456',
    });
    const { name, email, password, password2 } = formValues;

    const handleRegister = (e) => {
        e.preventDefault();

        if (isFormValid()) {
            dispatch(startRegisterWithEmailPasswordName(email, password, name));
        }
    }

    const isFormValid = () => {
        if (name.trim().length === 0) {
            dispatch(setError('Name is required'));
            return false;
        } else if (!validator.isEmail(email)) {
            dispatch(setError('Email is not valid'));
            return false;
        } else if (password !== password2 || password.length < 5) {
            dispatch(setError('Password should be at least 6 characters and match each other'));
            return false;
        }

        dispatch(removeError());
        return true;
    }

    return (
        <>
        <h3 className="auth__title">Register</h3>
        <form
            className="animate__animated animate__fadeIn animate__faster"
            onSubmit={ handleRegister }
        >
            {
                msgError &&
                (
                    <div className="auth__alert-error">
                        { msgError }
                    </div>
                )

            }
            <input
                className="auth__input"
                type="text"
                placeholder="Name"
                name="name"
                value={ name }
                onChange={ handleInputChange }
                autoComplete="off"
            />
            <input
                className="auth__input"
                type="text"
                placeholder="Email"
                name="email"
                value={ email }
                onChange={ handleInputChange }
                autoComplete="off"
            />
            <input
                className="auth__input"
                type="password"
                placeholder="Password"
                name="password"
                value={ password }
                onChange={ handleInputChange }
            />
            <input
                className="auth__input"
                type="password"
                placeholder="Confirm password"
                name="password2"
                value={ password2 }
                onChange={ handleInputChange }
            />

            <button
                className="btn btn-primary btn-block mb-5"
                type="submit"
            >
                Register
            </button>

            <Link className="link" to="/auth/login">Already registered?</Link>
        </form>
    </>
    )
}
