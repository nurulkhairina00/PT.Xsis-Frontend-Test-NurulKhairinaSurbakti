/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";
import moment from "moment";

function componentModal(props) {
  const { show, setShow, data } = props;
  const [videoLink, setVideoLink] = useState(null);
  const [loading, setLoading] = useState(true);

  // get link video yt
  useEffect(() => {
    const fetchVideoLink = async () => {
      try {
        const options = {
          method: "GET",
          url: `https://api.themoviedb.org/3/movie/${data.id}/videos`,
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4YWQwMDg5MDc1YjdhMmY3OTBmYmQ2MWRlZWM4NzRmMCIsInN1YiI6IjY1NzBhYTg5OWFjNTM1MDFmNDFkZTBkMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XSP_BPAmzxnbYyGgq1B7l_FhKZBCXOT_i8MPk6D_O3Y",
          },
        };
        await axios
          .request(options)
          .then((response) => {
            let videoData = response.data?.results[0];
            setVideoLink({
              key: videoData.key,
              name: videoData.name,
            });
          })
          .catch((error) => {
            console.error(error);
          });
      } catch (error) {
        console.error("Error fetching video link:", error);
      } finally {
        setLoading(false);
      }
    };

    if (show && data.id) {
      fetchVideoLink();
    }
  }, [show, data.id]);

  // close modal
  const handleClose = () => {
    setShow(false);
    setVideoLink(null);
    setLoading(true);
  };

  return (
    <>
      {loading ? (
        ""
      ) : (
        <Modal size="lg" show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="embed-responsive embed-responsive-16by9">
              <iframe
                src={`https://www.youtube.com/embed/${videoLink.key}`}
                title={videoLink.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                className="embed-responsive-item rounded-2 w-100"
                height={360}
              ></iframe>
            </div>
            <h4 className="pt-2">
              {data.title}
              <span className="ms-1 fs-5">
                ({moment(data.release_date).format("YYYY")})
              </span>
            </h4>
            <p>{data.overview}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClose}>Close</Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default componentModal;
