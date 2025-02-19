import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function VerifyToken({ general, children }) {
  const navigate = useNavigate();
  useEffect(() => {
    const verify = async () => {
      try {
        const response = await fetch(
          "https://nameless-oasis-38481-2bd1b8ebfc5e.herokuapp.com/fetcher",
          {
            method: "POST",
            credentials: "include",
            body: JSON.stringify({ req: "username" }),
          }
        );
        if (!response.ok) {
          if (general !== "true") {
            return navigate("/");
          }
        } else {
          if (general === "true") {
            return navigate("/Home");
          }
        }
      } catch (e) {
        console.log(`Error in authinticating ${e}`);
        navigate("/");
      }
    };

    verify();
  }, [general]);
  return <>{children}</>;
}

export default VerifyToken;
