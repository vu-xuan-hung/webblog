import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
    Box,
    Button,
    Container,
    TextField,
    Typography,
    Tabs,
    Tab,
    Paper,
    Alert,
    Divider,
    Tooltip,
    InputAdornment,
    IconButton
} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// Removed framer-motion to prevent crashes
// import { motion, AnimatePresence } from 'framer-motion';

// REPLACE WITH YOUR ACTUAL GOOGLE CLIENT ID
const GOOGLE_CLIENT_ID = "YOUR_GOOGLE_CLIENT_ID_HERE";

// --- STYLES & SUB-COMPONENTS ---

// Simple Paper wrapper instead of motion(Paper)
const GlassCard = ({ children, ...props }) => (
    <Paper {...props}>{children}</Paper>
);

const CustomTab = (props) => (
    <Tab
        {...props}
        sx={{
            textTransform: 'none',
            fontSize: '1rem',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.7)',
            '&.Mui-selected': {
                color: '#fff',
            }
        }}
    />
);

const CustomTextField = (props) => (
    <TextField
        {...props}
        variant="outlined"
        sx={{
            marginBottom: 2,
            '& .MuiOutlinedInput-root': {
                backgroundColor: 'rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(5px)',
                borderRadius: '12px',
                color: '#fff',
                '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.3)' },
                '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.6)' },
                '&.Mui-focused fieldset': { borderColor: '#4facfe' },
            },
            '& .MuiInputLabel-root': { color: 'rgba(255, 255, 255, 0.7)' },
            '& .MuiInputLabel-root.Mui-focused': { color: '#4facfe' },
            '& .MuiInputBase-input': { color: '#fff' }
        }}
    />
);

const Login = () => {
    const [tabValue, setTabValue] = useState(0);
    const [formData, setFormData] = useState({ email: '', password: '', name: '' });
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
        setError('');
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // --- LOGIC ---
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        console.log("Submit clicked - Auth disabled for UI testing");
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                width: '100vw',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 100%)',
                backgroundImage: `
                    radial-gradient(at 0% 0%, hsla(253,16%,7%,1) 0, transparent 50%), 
                    radial-gradient(at 50% 0%, hsla(225,39%,30%,1) 0, transparent 50%), 
                    radial-gradient(at 100% 0%, hsla(339,49%,30%,1) 0, transparent 50%)
                `,
                backgroundSize: 'cover',
                padding: 2
            }}
        >
            <Container component="main" maxWidth="xs">
                <GlassCard
                    elevation={24}
                    sx={{
                        p: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        background: 'rgba(255, 255, 255, 0.08)',
                        backdropFilter: 'blur(20px)',
                        borderRadius: '24px',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)'
                    }}
                >
                    <Typography component="h1" variant="h4" sx={{ mb: 1, fontWeight: 700, color: '#fff', letterSpacing: '-0.5px' }}>
                        {tabValue === 0 ? 'Welcome Back' : 'Create Account'}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 4, color: 'rgba(255,255,255,0.6)' }}>
                        {tabValue === 0 ? 'Enter your details to sign in' : 'Start your journey with us'}
                    </Typography>

                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        variant="fullWidth"
                        sx={{
                            width: '100%',
                            mb: 4,
                            '& .MuiTabs-indicator': { backgroundColor: '#4facfe', height: '3px' }
                        }}
                    >
                        <CustomTab label="Login" />
                        <CustomTab label="Register" />
                    </Tabs>

                    {error && (
                        <Alert severity="error" sx={{ width: '100%', mb: 3, borderRadius: '12px' }}>{error}</Alert>
                    )}

                    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>

                        {tabValue === 1 && (
                            <CustomTextField
                                required
                                fullWidth
                                id="name"
                                label="Full Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                            />
                        )}

                        <CustomTextField
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                        />

                        <CustomTextField
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type={showPassword ? 'text' : 'password'}
                            id="password"
                            autoComplete="current-password"
                            value={formData.password}
                            onChange={handleChange}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={() => setShowPassword(!showPassword)}
                                            edge="end"
                                            sx={{ color: 'rgba(255,255,255,0.7)' }}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                mt: 2,
                                mb: 3,
                                py: 1.5,
                                borderRadius: '12px',
                                fontSize: '1rem',
                                fontWeight: 'bold',
                                background: 'linear-gradient(45deg, #4facfe 30%, #00f2fe 90%)',
                                boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                                textTransform: 'none',
                                '&:hover': {
                                    background: 'linear-gradient(45deg, #00f2fe 30%, #4facfe 90%)',
                                    transform: 'translateY(-1px)',
                                    boxShadow: '0 6px 10px 4px rgba(33, 203, 243, .3)'
                                },
                                transition: 'all 0.3s ease'
                            }}
                        >
                            {tabValue === 0 ? 'Sign In' : 'Sign Up'}
                        </Button>

                        <Divider sx={{ my: 2, '&::before, &::after': { borderColor: 'rgba(255,255,255,0.2)' } }}>
                            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', px: 1 }}>
                                OR CONTINUE WITH
                            </Typography>
                        </Divider>

                        <Tooltip title="Auth Disabled for UI Testing">
                            <span>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    startIcon={<GoogleIcon />}
                                    disabled
                                    sx={{
                                        mt: 2, py: 1.5,
                                        borderColor: 'rgba(255,255,255,0.1)',
                                        color: 'rgba(255,255,255,0.3)',
                                        borderRadius: '12px',
                                        textTransform: 'none'
                                    }}
                                >
                                    Sign in with Google (UI Mode Only)
                                </Button>
                            </span>
                        </Tooltip>

                    </Box>
                </GlassCard>
            </Container>
        </Box>
    );
};

export default Login;
