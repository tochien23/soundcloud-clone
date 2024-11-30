'use client'

import { Alert, Avatar, Box, Button, Divider, Grid, IconButton, InputAdornment, Snackbar, TextField, Typography } from "@mui/material";
import { ArrowBack, GitHub, Google, LockOutlined, Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const AuthSignIn = (props: any) => {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const [isErrorUsername, setIsErrorUsername] = useState<boolean>(false);
    const [isErrorPassword, setIsErrorPassword] = useState<boolean>(false);

    const [errorUsername, setErrorUsername] = useState<string>("");
    const [errorPassword, setErrorPassword] = useState<string>("");

    const [openMessage, setOpenMessage] = useState<boolean>(false);
    const [resMessage, setResMessage] = useState<string>("");

    const handleSubmit = async () => {
        setIsErrorUsername(false);
        setIsErrorPassword(false);
        setErrorUsername("");
        setErrorPassword("");

        if (!username) {
            setIsErrorUsername(true);
            setErrorUsername("User không được để trống");
            return;
        }

        if (!password) {
            setIsErrorPassword(true);
            setErrorPassword("Password không được để trống");
            return;
        };

        const res = await signIn("credentials", {
            username: username,
            password: password,
            redirect: false
        });

        if (!res?.error) {
            router.push("/");
        } else {
            setOpenMessage(true);
            setResMessage(res.error);
        }
    }

    return (
        <Box sx={{
            backgroundImage: "linear-gradient(to bottom, #ff9aef, #fedac1, #d5e1cf, #b7e6d9)",
            backgroundColor: "#b7e6d9",
            backgroundRepeat: "no-repeat"
        }}>
            <Grid container sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100vh"
            }}>
                <Grid item xs={12} sm={8} md={5} lg={4} sx={{boxShadow: "rgba(100,100,111,0.2) 0px 7px 29px 0px"}} >
                    <div style={{ margin: "20px" }}>
                        <Link href={"/"}>
                            <ArrowBack />
                        </Link>
                        <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            flexDirection: "column",
                            width: "100%"
                        }}>
                            <Avatar>
                                <LockOutlined />
                            </Avatar>

                            <Typography component={"h1"}>
                                Sign In
                            </Typography>
                        </Box>

                        <TextField
                            onChange={(e) => setUsername(e.target.value)}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth   
                            label="Username"
                            name="username"
                            autoFocus
                            error={isErrorUsername}
                            helperText={errorUsername}
                        />
                        <TextField
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSubmit();
                                }
                            }}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            label="Password"
                            name="password"
                            type={showPassword ? "text" : "password"}
                            error={isErrorPassword}
                            helperText={errorPassword}


                            InputProps={{
                                endAdornment: <InputAdornment position="end" >
                                    <IconButton onClick={() => setShowPassword(!showPassword)}>
                                        {showPassword === false ? <VisibilityOff/> : <Visibility /> }
                                    </IconButton>
                                </InputAdornment>
                            }}
                        />

                        <Button sx={{
                            my: 3
                        }}
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                        >
                            Sign In
                        </Button>
                        <Divider>Or using</Divider>

                        <Box sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: "25px",
                            mt: 3
                        }}>
                            <Avatar sx={{
                                cursor: "pointer",
                                bgcolor: "green"
                            }}
                                onClick={() => {
                                    signIn("github")
                                }}
                            >
                                <GitHub titleAccess="Login with Github"/>
                            </Avatar>

                            <Avatar sx={{
                                cursor: "pointer",
                                bgcolor: "green"
                            }}>
                                <Google titleAccess="Login with Google" />
                            </Avatar>
                        </Box>
                    </div>
                </Grid>
            </Grid>
            <Snackbar
                open={openMessage}
                anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
                <Alert
                    onClose={() => setOpenMessage(false)}
                    severity="error" sx={{ width: "100%" }}
                >
                    {resMessage}        
                </Alert>
            </Snackbar>
        </Box>
    )


}

export default AuthSignIn;