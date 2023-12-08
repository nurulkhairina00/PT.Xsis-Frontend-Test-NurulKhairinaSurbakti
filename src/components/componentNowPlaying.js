/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import { Card } from "react-bootstrap";
import ComponentModal from "./componentModal";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";

function componentNowPlaying(props) {
  const { data } = props;
  const [show, setShow] = useState(false);
  const [dataMovie, setDataMovie] = useState({});

  const handleShowOpen = (item) => {
    setShow(true);
    setDataMovie(item);
  };
  return (
    <>
      <div className="p-4">
        <h2 className="py-4 mb-3 text-gray fw-bold">Now Playing</h2>
        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
            el: ".swiper-pagination",
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper"
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            576: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 4,
            },
          }}
        >
          {data.map((item, index) => (
            <SwiperSlide key={index}>
              {/* <Col key={index} lg={3} md={4} sm={6} xs={12} className="p-2"> */}
              <div onClick={() => handleShowOpen(item)}>
                <Card className="p-2 border-0 shadow">
                  <Card.Img
                    variant="top"
                    src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                    className="rounded-2"
                  />
                  <Card.Title className="d-flex justify-content-between mt-auto pt-3">
                    <span className="h6">{item.title}</span>
                    <span className="text-warning">
                      {parseInt(item.vote_average).toFixed(1)}
                    </span>
                  </Card.Title>
                </Card>
              </div>
              {/* </Col> */}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <ComponentModal show={show} setShow={setShow} data={dataMovie} />
    </>
  );
}

export default componentNowPlaying;
