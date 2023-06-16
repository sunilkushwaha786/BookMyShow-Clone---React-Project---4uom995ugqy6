import styled from "styled-components";
import Button from "../button/Button";
import Logo from "../logo/Logo";
import logoImage from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setUserLoggedIn } from "../../store/userSlice";


const Div = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: inherit;
  margin-right: 20px;
`;

// heading style first page sighnup
const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  width: 100vw;
  background-color: none ;
`;


const HeaderContainer = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.isLoggedIn);

  const showToastMessage = () => {
    toast.success("Log Out Success !", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  return (
    <Header>
      <Logo src={logoImage} alt="Logo" />
      {user ?
        <h4 style={{
          fontSize: "30px",
          color: "red",
          textTransform: "uppercase"
        }}>{sessionStorage.getItem("name")}</h4> : ""}


      <Div>
        {!user ? (
          <Button
            height={"50px"}
            width={"100px"}
            backgroundColor={"#ff4500"}
            borderRadius={"20px"}
            border={"none"}
            fontColor={"white"}
            fontSize={"15px"}
            hover={"0.7"}
          >

            {/* sign in button design */}
            <Link to="./register">SIGN UP</Link></Button>
            ): (
            <Button
              height={"40px"}
              width={"100px"}
              backgroundColor={"#ff4500"}
              borderRadius={"20px"}
              border={"none"}
              fontColor={"white"}
              fontSize={"16px"}
              hover={"0.7"}
              onClick={() => {
                navigate("/signin");
                dispatch(setUserLoggedIn(false));
                showToastMessage();
              }}
            >
              <Link to="./">LOG OUT</Link>
            </Button>
        )}

          </Div>
    </Header>

    // <footer><footer/>
  );
};

export default HeaderContainer;