import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
  background: #4f46e5;
  color: white;
  padding: 1rem 2rem;
  display: flex;
  gap: 2rem;
  font-weight: bold;
`;

export default function Navbar() {
    return (
        <Nav>
            <Link to="/" style={{ color: "white" }}>Home</Link>
            <Link to="/category/1" style={{ color: "white" }}>Category</Link>
            <Link to="/post/1" style={{ color: "white" }}>Post</Link>
            <Link to="/post/2" style={{ color: "white" }}>Postfrom</Link>
        </Nav>
    );
}
