'use client'
import WareTrack from "@/components/track/ware.track";
import { useSearchParams } from "next/navigation";
import { Container } from "@mui/material";

const DetailTrackPage = (props: any) => {
    const { params } = props;

    const searchParams = useSearchParams();

    const search = searchParams.get("audio");

    return (
        <Container>
            <div>
                <WareTrack />
            </div>
        </Container>
    )
}

export default DetailTrackPage;