import { useRouteError } from "react-router-dom";

type Props = {};

const ErrorPage = (props: Props) => {
  const error: any = useRouteError();

  return (
    <div className="flex justify-center w-screen h-screen">
      <div className="w-1/2">
        <h1>Oops!</h1>
        {/* <p>Sorry, an unexpected error has occurred.</p> */}
        <p>We are excited to share that we are working on a new feature
          that will enhance your experience with our application. While
          we don't have a specific release date just yet, our team is
          diligently working to bring this feature to you as soon as
          possible. We appreciate your patience and enthusiasm as we
          continue to improve and expand our offerings. <b> Stay tuned for
            updates! </b>
        </p>
        <p>
          <i>{error?.statusText || error?.message}</i>
        </p>
      </div>
    </div>
  );
};

export default ErrorPage;
