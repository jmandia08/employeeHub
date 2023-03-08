import * as React from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import {
    Stack,
    TextField,
    PrimaryButton,
    MessageBar,
    MessageBarType,
    SpinnerSize,
    Spinner
} from '@fluentui/react';

const Login: React.FC = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [errorMessage, setErrorMessage] = React.useState('');
    const { login, isAuthenticated, isLoggedIn, isLoading } = React.useContext(AuthContext);
    const history = useHistory();

    React.useEffect(() => {
        if (isAuthenticated) {
            history.push('/');
        }
    }, [isAuthenticated, isLoggedIn, history]);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (!email || !password) {
            setErrorMessage('Please enter your email and password.');
            return;
        }
        login(email, password);
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
                        label="Password"
                        type="password"
                        required
                        value={password}
                        onChange={(e: any, newVal: any) => setPassword(newVal)}
                    />
                    <PrimaryButton type="submit">Log in</PrimaryButton>
                    <span>No account? <a href="/signup">Sign up</a>.</span>
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

export default Login;