import MainSlider from "@/components/main/main.slider";
import { sendRequest } from "@/utils/api";
import { Container } from "@mui/material";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  
  const chills = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:8000/api/v1/tracks",
    method: "POST",
    body: { category: "Chill", limit: 10}
  });

  const hiphops = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:8000/api/v1/tracks",
    method: "POST",
    body: { category: "Hiphop", limit: 10 }
  });
  
  const trappers = await sendRequest<IBackendRes<ITrackTop[]>>({
    url: "http://localhost:8000/api/v1/tracks",
    method: "POST",
    body: { category: "Trapper", limit: 10 }
  });
  
  return (
    <Container>
      <MainSlider
        title={"Top Chill"}
        data={chills?.data ?? []}
      />
      <MainSlider
        title={"Top Workout"}
        data={hiphops?.data ?? []}
      />
      <MainSlider
        title={"Top Party"}
        data={trappers?.data ?? []}
      />
    </Container>
  );
}
