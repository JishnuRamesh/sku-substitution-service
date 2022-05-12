import { useApiContext } from "@app/core/api/ApiContext";
import { Notification } from "@app/core/notification/Notification";
import { Button, Card, Divider } from "@mui/material";
import { useEffect, useState } from "react";

type AlbumApi = {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
};

export function CardsView() {
  const api = useApiContext();
  const [apiResponse, setApiResponse] = useState<AlbumApi[]>([]);

  useEffect(() => {
    api
      ?.apiRequest<
        {
          showLoader: boolean;
          showNotification: boolean;
        },
        AlbumApi[]
      >(`getCardPhotos`, {
        showLoader: true,
        showNotification: true,
      })
      .then((res) => setApiResponse(res.data))
      .catch((error) => {
        console.error(error);
      });
  }, [api]);

  if (!apiResponse.length) return null;

  const cards = apiResponse.slice(0, 10);

  return (
    <>
      <h1>Cards Example</h1>
      <section style={{ maxWidth: "100%" }}>
        <Notification
          open={true}
          title="Showing from cards component"
          message="Notification is working!!!"
          severity="success"
        />
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gridTemplateRows: "repeat(auto, 1fr)",
            gridColumnGap: "16px",
            gridRowGap: "16px",
          }}
        >
          {cards.map((item: AlbumApi) => (
            <Card key={item.id}>
              <div>{item.title}</div>
              <Divider />
              <div>Bottom</div>
              <Button>Click</Button>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
