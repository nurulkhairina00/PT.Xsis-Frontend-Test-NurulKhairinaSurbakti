/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { Container, Form, Nav, Navbar } from "react-bootstrap";

export default function componentNavbar(props) {
  const { onSearchInputChange } = props;
  return (
    <>
      <Navbar expand="lg" className="bg-nav py-3">
        <Container fluid>
          <Navbar.Brand href="#" className="fw-bold">
            Netplix
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "150px" }}
              navbarScroll
            >
              <Nav.Link href="#action1" className="text-black fw-semibold ps-5">
                Serie
              </Nav.Link>
              <Nav.Link href="#action2" className="text-black fw-semibold ps-5">
                Movie
              </Nav.Link>
              <Nav.Link href="#action3" className="text-black fw-semibold ps-5">
                Genre
              </Nav.Link>
            </Nav>
            <Form className="d-flex mb-10">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                onChange={(e) => onSearchInputChange(e.target.value)}
              />
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
