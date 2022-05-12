import { useApiContext } from "@app/core/api/ApiContext";
import { useEffect, useState } from "react";

export function HomeView() {
  const api = useApiContext();
  const [apiResponse, setApiResponse] = useState<string>("PENDING");

  useEffect(() => {
    api
      ?.apiRequest<Record<string, unknown>, string>(`helloWorld`, {})
      .then((res) => {
        const msg = res?.data;
        let status = "failed";
        if (msg) {
          status = msg;
        }
        setApiResponse(status.toUpperCase());
      })
      .catch((error) => {
        console.error(error);
      });
  }, [api]);
  return (
    <div>
      <h1>Welcome to the SKU Substitution Service</h1>
      <h3>The backend status is: {apiResponse}</h3>
    </div>
  );
}
