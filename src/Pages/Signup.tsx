import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import {
    Stack,
    TextField,
    PrimaryButton,
    MessageBar,
    MessageBarType, Spinner, SpinnerSize
} from '@fluentui/react';

const Signup: React.FC = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [isValid, setIsValid] = React.useState(false);
    const { signup, isAuthenticated, isLoggedIn, isLoading } = React.useContext(AuthContext);
    const [errorMessage, setErrorMessage] = React.useState('');
    const history = useHistory();

    React.useEffect(() => {
        if (isAuthenticated && isLoggedIn) {
            history.push('/');
        }
    }, [isAuthenticated, isLoggedIn, history]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!email || !password) {
            setErrorMessage('Please enter your email and password.');
            return;
        }
        signup(email, password);
    };
    const handlePasswordChange = (value: any) => {
        const newPassword = value;
        const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
        const isValidPassword = regex.test(newPassword);
        setPassword(newPassword);
        setIsValid(isValidPassword);
    };
    return (
        <>
            <Stack
                tokens={{ childrenGap: 10 }}
                styles={{ root: { maxWidth: 320, margin: '0 auto' } }}
            >
                {errorMessage && (
                    <MessageBar messageBarType={MessageBarType.error}>
                        {errorMessage}
                    </MessageBar>
                )}
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Email"
                        type="email"
                        required
                        value={email}
                        onChange={(e: any, newVal: any) => setEmail(newVal)}
                    />
                    <TextField
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e: any, newval: any) => handlePasswordChange(newval)}
                    />
                    {!isValid && <p>Password must have at least one uppercase letter, one lowercase letter, one digit, and one special character from @$!%*?& and be between 8 and 20 characters long.</p>}
                    <PrimaryButton type="submit">Signup</PrimaryButton>
                    <span>Already have an account? <a href="/login">Login</a>.</span>
                </form>
            </Stack>
            {
                isLoading ?
                    <div className='loader'> <Spinner size={SpinnerSize.large} /></div>
                    : ""
            }
        </>
    );
};

export default Signup;