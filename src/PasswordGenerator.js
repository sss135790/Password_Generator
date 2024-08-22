import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './PasswordGenerator.css'; // Import the CSS file

const PasswordGenerator = () => {
    const [length, setLength] = useState(12);
    const [password, setPassword] = useState('');
    const [includeNumbers, setIncludeNumbers] = useState(true);
    const [includeSymbols, setIncludeSymbols] = useState(true);
    const [includeUppercase, setIncludeUppercase] = useState(true);
    const [includeLowercase, setIncludeLowercase] = useState(true);

    const generatePassword = () => {
        const numbers = '0123456789';
        const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';
        const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const lowercase = 'abcdefghijklmnopqrstuvwxyz';

        let characters = '';
        if (includeNumbers) characters += numbers;
        if (includeSymbols) characters += symbols;
        if (includeUppercase) characters += uppercase;
        if (includeLowercase) characters += lowercase;

        let generatedPassword = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * characters.length);
            generatedPassword += characters[randomIndex];
        }
        setPassword(generatedPassword);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(password).then(() => {
            toast.success('Password copied to clipboard!');
        }).catch(() => {
            toast.error('Failed to copy password.');
        });
    };

    return (
        <div className="password-generator-container">
            <div className="password-generator">
                <h2>Password Generator</h2>
                <div>
                    <label>Password Length:</label>
                    <input 
                        type="number" 
                        value={length} 
                        onChange={(e) => setLength(e.target.value)} 
                        min="1"
                    />
                </div>
                <div>
                    <label>
                        <input 
                            type="checkbox" 
                            checked={includeNumbers} 
                            onChange={(e) => setIncludeNumbers(e.target.checked)}
                        />
                        Include Numbers
                    </label>
                </div>
                <div>
                    <label>
                        <input 
                            type="checkbox" 
                            checked={includeSymbols} 
                            onChange={(e) => setIncludeSymbols(e.target.checked)}
                        />
                        Include Symbols
                    </label>
                </div>
                <div>
                    <label>
                        <input 
                            type="checkbox" 
                            checked={includeUppercase} 
                            onChange={(e) => setIncludeUppercase(e.target.checked)}
                        />
                        Include Uppercase Letters
                    </label>
                </div>
                <div>
                    <label>
                        <input 
                            type="checkbox" 
                            checked={includeLowercase} 
                            onChange={(e) => setIncludeLowercase(e.target.checked)}
                        />
                        Include Lowercase Letters
                    </label>
                </div>
                <button onClick={generatePassword}>Generate Password</button>
                {password && (
                    <div className="password-display">
                        <h3>Your Password:</h3>
                        <div className="password-box">
                            <p>{password}</p>
                            <button onClick={copyToClipboard}>Copy</button>
                        </div>
                    </div>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default PasswordGenerator;
