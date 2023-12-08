/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import ComponentModal from "./componentModal";

function componentPopuler(props) {
  const { data, text } = props;
  const [show, setShow] = useState(false);
  const [dataMovie, setDataMovie] = useState({});

  const handleShowOpen = (item) => {
    setShow(true);
    setDataMovie(item);
  };

  return (
    <>
      <div className="p-4">
        <h2 className="p-2 text-gray fw-bold">{text}</h2>
        <Row className="p-3">
          {data.map((item, index) => (
            <Col
              key={index}
              lg={2}
              md={4}
              sm={6}
              xs={4}
              className="p-sm-0 p-md-2 mb-3"
            >
              <div onClick={() => handleShowOpen(item)}>
                <Card className="p-2 border-0 shadow">
                  <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                    className="rounded-2"
                  />
                </Card>
              </div>
            </Col>
          ))}
        </Row>
      </div>
      <ComponentModal show={show} setShow={setShow} data={dataMovie} />
    </>
  );
}

export default componentPopuler;
