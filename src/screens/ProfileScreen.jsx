import { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { useUpdateUserMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";

const ProfileScreen = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await updateUser({ name, email }).unwrap();
      dispatch(setCredentials({ ...userInfo, ...res }));
      toast.success("Successfully updated user");
    } catch (err) {
      toast.error(err?.data?.detail, { theme: "colored" });
    }
  };

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <FormContainer>
          <h1>Update Profile</h1>

          <Form onSubmit={submitHandler}>
            <Form.Group className="my-2" controlId="email">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                disabled
              ></Form.Control>
            </Form.Group>
            
            <Form.Group className="my-2" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="name"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button type="submit" variant="primary" className="mt-3">
              Update
            </Button>
          </Form>
        </FormContainer>
      )}
    </>
  );
};

export default ProfileScreen;