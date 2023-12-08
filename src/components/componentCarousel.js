import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import moment from "moment";

function componentCarousel(props) {
  const { data } = props;
  return (
    <>
      <div className="p-4 pb-2">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
            clickable: true,
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {data.map((item, index) => (
            <SwiperSlide key={index} className="shadow-lg rounded-3">
              <Row className="p-3">
                <Col lg={6}>
                  <div className="d-flex justify-content-center">
                    <Image
                      src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                      width="100%"
                      height="100%"
                      className="rounded-3"
                    />
                  </div>
                </Col>
                <Col lg={6}>
                  <h2 className="text-gray fw-bold pt-2">
                    {item.title}
                    <span> ({moment(item.release_date).format("YYYY")})</span>
                  </h2>
                  <h6 className="text-justify fw-normal text-white">
                    {item.overview}
                  </h6>
                </Col>
              </Row>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default componentCarousel;
