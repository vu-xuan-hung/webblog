import React from 'react';
import { Box, Card, CardContent, Typography, Avatar, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';

const ProfileHeader = () => {
    return (
        <Card
            sx={{
                borderRadius: '24px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                background: 'linear-gradient(135deg, #ffffff 0%, #f9fafb 100%)',
                mb: 3,
                mt: 2,
                overflow: 'visible',
            }}
        >
            <CardContent sx={{ p: 3, textAlign: 'center' }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: 1.5,
                    }}
                >
                    <Box
                        sx={{
                            width: 80,
                            height: 80,
                            borderRadius: '50%',
                            background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white',
                            mt: -2,
                            boxShadow: '0 4px 12px rgba(33, 150, 243, 0.3)',
                        }}
                    >
                        <Typography variant="h4" fontWeight="bold">H</Typography>
                    </Box>

                    <Typography variant="h5" fontWeight="800" color="text.primary">
                        Vũ Xuân Hùng
                    </Typography>

                    <Typography variant="body1" color="text.secondary" sx={{ maxWidth: '300px', margin: '0 auto' }}>
                        Computer Science student at Hanoi University of Industry.
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, mt: 1 }}>
                        <IconButton
                            component="a"
                            href="https://www.facebook.com/vu.xuan.hung.883474"
                            target="_blank"
                            rel="noreferrer"
                            sx={{
                                color: '#1877f2',
                                bgcolor: 'rgba(24, 119, 242, 0.1)',
                                '&:hover': { bgcolor: 'rgba(24, 119, 242, 0.2)' },
                            }}
                        >
                            <FacebookIcon />
                        </IconButton>
                        <IconButton
                            component="a"
                            href="https://github.com/vu-xuan-hung"
                            target="_blank"
                            rel="noreferrer"
                            sx={{
                                color: '#333',
                                bgcolor: 'rgba(0, 0, 0, 0.05)',
                                '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.1)' },
                            }}
                        >
                            <GitHubIcon />
                        </IconButton>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ProfileHeader;
