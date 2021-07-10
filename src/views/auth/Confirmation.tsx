import React from "react";
import { Button, CircularProgress, styled, TextField } from "@material-ui/core";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";

import useInput from "../../hooks/useInput";

const Field = styled(TextField)({
  margin: "10px 0",
});

export default function Confirmation() {
  const [loading, setLoading] = React.useState(false);

  const history = useHistory();

  const { value: email, bind: bindEmail } = useInput("");
  const { value: code, bind: bindCode } = useInput("");

  const handleSubmit = async (e: React.SyntheticEvent<Element, Event>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await Auth.confirmSignUp(email, code);
      history.push("/signin");
    } catch (error) {
      // TODO: Do we want to log this somewhere?
      console.error(error.message);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-4/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Verify your account
                  </h6>
                </div>
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <form
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                  onSubmit={handleSubmit}
                >  
                  <Field label="Email" {...bindEmail} type="email" />
                  <Field label="Verification Code" {...bindCode} />

                  <div className="text-center mt-6">
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      type="submit"
                      disabled={loading}
                    >
                      {loading && <CircularProgress size={20} style={{ marginRight: 20 }} />}
                      Verify your account
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
