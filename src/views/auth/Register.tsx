import React from "react";
import { Auth } from "aws-amplify";
import { useHistory } from "react-router-dom";
import { Button, CircularProgress, styled, TextField } from "@material-ui/core";

import useInput from "../../hooks/useInput";

const Field = styled(TextField)({
  margin: "10px 0",
});

export default function Register() {
  const [loading, setLoading] = React.useState(false);

  const history = useHistory();

  const { value: name, bind: bindName } = useInput("");
  const { value: email, bind: bindEmail } = useInput("");
  const { value: password, bind: bindPassword } = useInput("");
  const { value: confirmPassword, bind: bindConfirmPassword } = useInput("");


  const handleSignUp = async (e: React.SyntheticEvent<Element, Event>) => {
    e.preventDefault();
    setLoading(true);

    if (password !== confirmPassword) {
      // TODO: Make this visible to user
      console.error(
        "Error!!",
        "Password and Confirm Password should be same",
      );
      return;
    }
    try {
      await Auth.signUp({
        username: email,
        password: confirmPassword,
        attributes: {
          email,
          name,
        },
      });
      history.push("/confirmation");
    } catch (error) {
      console.error(error);
      // TODO: Do we want to log this somewhere?
      console.error(error.message);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="container mx-auto px-4 h-full">
        <div className="flex content-center items-center justify-center h-full">
          <div className="w-full lg:w-6/12 px-4">
            <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-200 border-0">
              <div className="rounded-t mb-0 px-6 py-6">
                <div className="text-center mb-3">
                  <h6 className="text-blueGray-500 text-sm font-bold">
                    Sign up with
                  </h6>
                </div>
                <div className="btn-wrapper text-center">
                  <button
                    className="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                    type="button"
                  >
                    <img
                      alt="..."
                      className="w-5 mr-1"
                      src={require("../../assets/img/google.svg").default}
                    />
                    Google
                  </button>
                </div>
                <hr className="mt-6 border-b-1 border-blueGray-300" />
              </div>
              <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                <div className="text-blueGray-400 text-center mb-3 font-bold">
                  <small>Or sign up with credentials</small>
                </div>
                <form
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                  onSubmit={handleSignUp}
                >
                  <Field label="Name" {...bindName} />
                  <Field label="Email" {...bindEmail} type="email" />
                  <Field label="Password" type="password" {...bindPassword} />
                  <Field
                    label="Confirm Password"
                    type="password"
                    {...bindConfirmPassword}
                  />

                  <div>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        id="customCheckLogin"
                        type="checkbox"
                        className="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
                      />
                      <span className="ml-2 text-sm font-semibold text-blueGray-600">
                        I agree with the{" "}
                        <a
                          href="#pablo"
                          className="text-lightBlue-500"
                          onClick={(e) => e.preventDefault()}
                        >
                          Privacy Policy
                        </a>
                      </span>
                    </label>
                  </div>

                  <div className="text-center mt-6">
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    type="submit"
                    disabled={loading}
                  >
                    {loading && <CircularProgress size={20} style={{ marginRight: 20 }} />}
                    Sign Up
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
