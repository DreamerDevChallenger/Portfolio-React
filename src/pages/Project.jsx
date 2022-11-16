import { useEffect, useState, useCallback } from "react";
import HeaderMain from "../components/HeaderMain";

import Loader from "../components/Loader";
import ArticleProject from "../components/project/ArticleProject";

import "../styles/css/pages/project.css";
import TitlePage from "../utils/TitlePage";

import { useDispatch, useSelector } from "react-redux";
import { selectProject } from "../redux/selector";
import { loadProject } from "../redux/features/actions/project";

import InfiniteScroll from "react-infinite-scroller";

const Project = () => {
  const [hasMore, setHasMore] = useState(true);
  const [perPage, setPerPage] = useState(2);

  const dispatch = useDispatch();

  const { data, loading, status } = useSelector(selectProject);

  const loadMore = () => {
    if (perPage === data.length) {
      setHasMore(false);
    } else {
      setTimeout(() => {
        setPerPage(perPage + 2);
      }, 1000);
    }
  };

  const getProject = useCallback(() => {
    dispatch(loadProject());
  }, [dispatch]);

  useEffect(() => {
    getProject();
  }, [getProject]);

  return status === "resolved" && loading === false ? (
    <main className="app-main-container app-project-main">
      <TitlePage title={"Projects"} />
      <HeaderMain Title={"Projects"} />

      <InfiniteScroll
        className="app-project-section"
        element={"section"}
        loadMore={loadMore}
        hasMore={hasMore}
        useWindow={true}
        threshold={-20}
        loader={
          <div className="app-project-section-loader-container" key={0.5}>
            {data.length > perPage ? (
              <div className="app-project-section-loader">
                <p>Loading ...</p>
              </div>
            ) : (
              ""
            )}
          </div>
        }
      >
        {data.slice(0, perPage).map((project, index) => (
          <ArticleProject data={project} key={index} />
        ))}
      </InfiniteScroll>
    </main>
  ) : status === "pending" ? (
    <Loader type={"projects"} />
  ) : status === "rejected" ? (
    <div style={{ marginTop: 500 }}>sorry error server</div>
  ) : (
    ""
  );
};

export default Project;
