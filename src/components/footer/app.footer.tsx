'use client'
import { useHasMounted } from "@/utils/customHook";
import { AppBar, Container } from "@mui/material";
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

const AppFooter = () => {
    const hasMounted = useHasMounted();

    if (!hasMounted) return (<></>)
    
    return(
        <>
            <AppBar position="fixed"sx={{
                top: 'auto', bottom: 0, 
                background: "#f2f2f2"
            }}>
                <Container sx={{display: "flex", gap: 10}}>
                    <AudioPlayer
                        src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/tracks/wrongstime.mp3`}
                        volume={0.5}
                        style={{
                            boxShadow: "unset",
                            background: "#f2f2f2"
                        }}
                    />
                    <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        minWidth: 100
                    }}>
                        <div style={{ color: "#ccc" }}>To Chien</div>
                        <div style={{ color: "black" }}>Ngựa Ô</div>
                    </div>
                </Container>
            </AppBar>
        </>
    )
};

export default AppFooter;