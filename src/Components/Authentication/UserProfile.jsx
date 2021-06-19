import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../../Context";

export const UserProfile = () => {
  const { logOutUser, userData } = useAuthContext();

  useEffect(() => {
    document.title = "SupVision | User Profile";
  }, []);

  return (
    <>
      <h2 className="txt-header-2">
        User <span className="secondary-txt">Profile</span>
      </h2>
      <div className="div-container">
        <i className="fas fa-5x fa-user-circle primaryBg-txt"></i>
        <h3 className="txt-header-3">
          Welcome <span>{userData.name}</span>
        </h3>
        <div className="user-nav-container">
          <Link to="/" className="no-line fas fa-lg fa-video secondary-txt">
            <span className="txt-small primaryBg-txt"> Video List</span>
          </Link>

          <Link
            to="/history"
            className="no-line fas fa-lg fa-history secondary-txt"
          >
            <span className="txt-small primaryBg-txt"> Watch History</span>
          </Link>

          <Link
            to="/liked-videos"
            className="no-line fas fa-lg fa-thumbs-up secondary-txt"
          >
            <span className="txt-small primaryBg-txt"> Liked Videos</span>
          </Link>
          <Link
            to="/playlist"
            className="no-line fas fa-lg fa-list-alt secondary-txt"
          >
            <span className="txt-small primaryBg-txt"> My Playlists</span>
          </Link>
        </div>
        <button className="btn btn-primary" onClick={logOutUser}>
          Logout
        </button>
      </div>
    </>
  );
};
